import "server-only";
import type { ContactSubmission } from "@/lib/contact-db";

const DEFAULT_TO = "hello@offgridevices.com";
const DEFAULT_FROM = "website@offgridevices.com";

function toAddress(): string {
  return process.env.CONTACT_TO_EMAIL?.trim() || DEFAULT_TO;
}

function fromAddress(): string {
  return process.env.CONTACT_FROM_EMAIL?.trim() || DEFAULT_FROM;
}

function subjectFor(s: ContactSubmission): string {
  return `[OffGrid Contact] ${s.inquiryType} — ${s.name}`;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function textBody(s: ContactSubmission): string {
  return [
    `Inquiry type: ${s.inquiryType}`,
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    `Company: ${s.company || "—"}`,
    `Phone: ${s.phone || "—"}`,
    "",
    "Message:",
    s.message,
  ].join("\n");
}

function htmlBody(s: ContactSubmission): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#9A9082;">${label}</td>` +
    `<td style="padding:4px 0;color:#1B1813;">${escapeHtml(value)}</td></tr>`;
  return [
    '<div style="font-family:system-ui,sans-serif;">',
    `<h2 style="margin:0 0 12px;">New contact submission</h2>`,
    '<table style="border-collapse:collapse;font-size:14px;">',
    row("Inquiry type", s.inquiryType),
    row("Name", s.name),
    row("Email", s.email),
    row("Company", s.company || "—"),
    row("Phone", s.phone || "—"),
    "</table>",
    `<p style="margin:16px 0 4px;color:#9A9082;font-size:13px;">Message</p>`,
    `<p style="white-space:pre-wrap;color:#1B1813;font-size:14px;">${escapeHtml(
      s.message,
    )}</p>`,
    "</div>",
  ].join("");
}

/** Minimal slice of the Cloudflare Email Service binding `send()` API. */
type EmailBinding = {
  send: (message: Record<string, unknown>) => Promise<unknown>;
};

/**
 * Primary transport: Cloudflare Email Service "Email Sending" binding
 * (`env.CONTACT_EMAIL`). Keeps notifications on Cloudflare and does not touch
 * the domain's MX records, so the iCloud-hosted inbox is unaffected. Returns
 * false (never throws) if the binding is unavailable.
 */
async function sendViaCloudflare(s: ContactSubmission): Promise<boolean> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const binding = (env as Record<string, unknown>).CONTACT_EMAIL as
      | EmailBinding
      | undefined;
    if (typeof binding?.send !== "function") {
      return false;
    }
    await binding.send({
      to: toAddress(),
      from: fromAddress(),
      replyTo: s.email,
      subject: subjectFor(s),
      text: textBody(s),
      html: htmlBody(s),
    });
    return true;
  } catch (error) {
    console.warn("contact: Cloudflare email send failed", error);
    return false;
  }
}

/**
 * Fallback transport: Resend. Requires RESEND_API_KEY. Returns false (never
 * throws) if the key is absent or the send fails.
 */
async function sendViaResend(s: ContactSubmission): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return false;
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromAddress(),
      to: toAddress(),
      replyTo: s.email,
      subject: subjectFor(s),
      text: textBody(s),
      html: htmlBody(s),
    });
    if (error) {
      console.warn("contact: Resend returned an error", error);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("contact: Resend send threw", error);
    return false;
  }
}

/**
 * Send the contact notification to CONTACT_TO_EMAIL with reply-to set to the
 * submitter. Tries Cloudflare Email Sending first (all-Cloudflare), then Resend.
 * Returns true only if a transport accepted the message; the route returns 500
 * when this is false so a misconfigured site surfaces clearly.
 */
export async function sendContactNotification(
  s: ContactSubmission,
): Promise<boolean> {
  if (await sendViaCloudflare(s)) {
    return true;
  }
  return sendViaResend(s);
}

/**
 * Optional confirmation email to the submitter, gated by CONTACT_AUTOREPLY="1".
 * Best-effort: never throws, never blocks the request.
 */
export async function sendContactAutoreply(s: ContactSubmission): Promise<void> {
  if (process.env.CONTACT_AUTOREPLY !== "1") {
    return;
  }
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return;
  }
  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: fromAddress(),
      to: s.email,
      replyTo: toAddress(),
      subject: "Thanks for reaching out to OffGrid",
      text: `Hi ${s.name},\n\nThanks for reaching out — we've got your message and typically reply within 1–2 business days.\n\n— OffGrid`,
    });
  } catch (error) {
    console.warn("contact: autoreply failed", error);
  }
}
