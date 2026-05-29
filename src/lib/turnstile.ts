import "server-only";

const SITEVERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Verify a Cloudflare Turnstile token server-side.
 *
 * Reads `TURNSTILE_SECRET_KEY` at request time. If the secret is not configured
 * (e.g. local dev, or before the widget is provisioned), Turnstile is treated
 * as not-required and this returns `true` — the honeypot and rate limiter still
 * guard the endpoint. Once the secret is set, a valid token is required.
 */
export async function verifyTurnstile(
  token: string | undefined | null,
  remoteIp?: string,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
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
