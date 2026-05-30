import "server-only";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

let warnedUnconfigured = false;

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * Reads `TURNSTILE_SECRET_KEY` at request time. If the secret is not configured
 * (e.g. local dev, or before the widget is provisioned), Turnstile is treated
 * as not-required and this returns `true` — the honeypot and rate limiter still
 * guard the endpoint. In production we additionally log a one-time warning so
 * the gap is visible in logs.
 *
 * Setting `TURNSTILE_SECRET_KEY` flips the endpoint to fail-closed
 * automatically: from then on a missing or invalid token is rejected. To turn
 * the widget on, also set the public `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build
 * time — the production CSP already allows challenges.cloudflare.com.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    if (process.env.NODE_ENV === "production" && !warnedUnconfigured) {
      warnedUnconfigured = true;
      console.warn(
        "contact: TURNSTILE_SECRET_KEY is unset in production — bot challenge " +
          "is disabled. Set it (and NEXT_PUBLIC_TURNSTILE_SITE_KEY) to enforce.",
      );
    }
    // Not configured → don't block submissions on it.
    return true;
  }
  if (!token) {
    return false;
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) {
      body.set("remoteip", remoteIp);
    }
    const res = await fetch(SITEVERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    if (!res.ok) {
      return false;
    }
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (error) {
    console.warn("contact: Turnstile verification failed", error);
    return false;
  }
}
