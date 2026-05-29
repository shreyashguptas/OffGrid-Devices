import { NextResponse } from "next/server";
import { verifyTurnstile } from "@/lib/turnstile";
import { saveContactSubmission, type ContactSubmission } from "@/lib/contact-db";
import {
  sendContactNotification,
  sendContactAutoreply,
} from "@/lib/contact-email";
import { getPostHogClient } from "@/lib/posthog-server";
import {
  checkRateLimit,
  getRateLimitKey,
  rateLimitHeaders,
} from "@/lib/rate-limit";
import { INQUIRY_TYPES, CONTACT_LIMITS, HONEYPOT_FIELD } from "@/content/contact";

const CONTACT_RATE_LIMIT = {
  limit: 5,
  windowMs: 60_000,
};

const POSTHOG_HEADER = "x-posthog-distinct-id";
const ANONYMOUS_DISTINCT_ID = "anonymous-contact";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type Validated = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType: string;
  message: string;
};

function validate(body: Record<string, unknown>): {
  error?: string;
  data?: Validated;
} {
  const name = str(body.name);
  const email = str(body.email);
  const company = str(body.company);
  const phone = str(body.phone);
  const inquiryType = str(body.inquiryType);
  const message = str(body.message);

  if (!name) return { error: "Name is required." };
  if (name.length > CONTACT_LIMITS.name) return { error: "Name is too long." };
  if (!email) return { error: "Email is required." };
  if (email.length > CONTACT_LIMITS.email || !EMAIL_RE.test(email)) {
    return { error: "A valid email is required." };
  }
  if (company.length > CONTACT_LIMITS.company) {
    return { error: "Company name is too long." };
  }
  if (phone.length > CONTACT_LIMITS.phone) {
    return { error: "Phone number is too long." };
  }
  if (!inquiryType || !(INQUIRY_TYPES as readonly string[]).includes(inquiryType)) {
    return { error: "Please choose an inquiry type." };
  }
  if (!message) return { error: "Message is required." };
  if (message.length > CONTACT_LIMITS.message) {
    return { error: "Message is too long." };
  }

  return {
    data: {
      name,
      email,
      company: company || undefined,
      phone: phone || undefined,
      inquiryType,
      message,
    },
  };
}

function clientIp(request: Request): string | undefined {
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    forwardedFor ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined
  );
}

async function hashIp(ip: string | undefined): Promise<string | undefined> {
  if (!ip) return undefined;
  try {
    const salt = process.env.CONTACT_IP_SALT ?? "offgrid";
    const data = new TextEncoder().encode(`${salt}:${ip}`);
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("")
      .slice(0, 32);
  } catch {
    return undefined;
  }
}

export async function POST(request: Request) {
  // 1. Rate limit — cheapest guard, runs first to protect everything below.
  const rateLimit = checkRateLimit({
    key: getRateLimitKey(request, "contact"),
    ...CONTACT_RATE_LIMIT,
  });
  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment and try again." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(rateLimit),
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400, headers: rateLimitHeaders(rateLimit) },
    );
  }

  // 2. Honeypot — if the hidden field is filled, accept silently without doing
  // anything. Return a success shape so the bot can't detect the trap.
  const honeypot = body[HONEYPOT_FIELD];
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return NextResponse.json(
      { ok: true },
      { status: 200, headers: rateLimitHeaders(rateLimit) },
    );
  }

  // 3. Turnstile — verify the challenge token (no-op if not configured).
  const ip = clientIp(request);
  const turnstileToken =
    typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;
  const turnstileOk = await verifyTurnstile(turnstileToken, ip);
  if (!turnstileOk) {
    return NextResponse.json(
      { error: "Verification failed. Please complete the challenge and retry." },
      { status: 403, headers: rateLimitHeaders(rateLimit) },
    );
  }

  // 4. Validation.
  const { error, data } = validate(body);
  if (error || !data) {
    return NextResponse.json(
      { error: error ?? "Invalid submission." },
      { status: 400, headers: rateLimitHeaders(rateLimit) },
    );
  }

  const submission: ContactSubmission = {
    ...data,
    userAgent: request.headers.get("user-agent") ?? undefined,
    ipHash: await hashIp(ip),
  };

  // 5. Persist to D1 first (durable backup). Best-effort — a persistence
  // failure must NOT fail the request; email is the source of truth.
  try {
    await saveContactSubmission(submission);
  } catch (err) {
    console.warn("contact: persistence failed (continuing)", err);
  }

  // 6. Email notification (required for a 200).
  let emailed = false;
  try {
    emailed = await sendContactNotification(submission);
  } catch (err) {
    console.error("contact: notification send threw", err);
  }
  if (!emailed) {
    return NextResponse.json(
      {
        error:
          "We couldn't send your message right now. Please email hello@offgridevices.com directly.",
      },
      { status: 500, headers: rateLimitHeaders(rateLimit) },
    );
  }

  // Optional confirmation email to the submitter (best-effort).
  try {
    await sendContactAutoreply(submission);
  } catch {
    // Never block on the autoreply.
  }

  // 7. Server-side analytics (best-effort).
  const distinctId =
    request.headers.get(POSTHOG_HEADER) ?? ANONYMOUS_DISTINCT_ID;
  const posthog = getPostHogClient();
  if (posthog) {
    try {
      posthog.capture({
        distinctId,
        event: "contact_submitted",
        properties: { inquiry_type: submission.inquiryType, source: "api" },
      });
      await posthog.shutdown();
    } catch (err) {
      console.warn("contact: posthog capture failed", err);
    }
  }

  return NextResponse.json(
    { ok: true },
    { status: 200, headers: rateLimitHeaders(rateLimit) },
  );
}
