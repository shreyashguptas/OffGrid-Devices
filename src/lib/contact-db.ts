import "server-only";

export type ContactSubmission = {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  inquiryType: string;
  message: string;
  userAgent?: string;
  /** SHA-256 hash of the IP (never the raw IP) — matches the privacy policy. */
  ipHash?: string;
};

const INSERT_SQL =
  "INSERT INTO contact_submissions " +
  "(name, email, company, phone, inquiry_type, message, user_agent, ip_hash) " +
  "VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

function insertParams(s: ContactSubmission): Array<string | null> {
  return [
    s.name,
    s.email,
    s.company ?? null,
    s.phone ?? null,
    s.inquiryType,
    s.message,
    s.userAgent ?? null,
    s.ipHash ?? null,
  ];
}

/** Minimal slice of the Cloudflare D1 binding API we rely on. */
type D1Like = {
  prepare: (sql: string) => {
    bind: (...values: unknown[]) => { run: () => Promise<unknown> };
  };
};

/**
 * Primary path: write through the D1 binding exposed by the OpenNext Cloudflare
 * runtime (`env.CONTACT_DB`). Returns false (never throws) if the runtime,
 * context, or binding is unavailable so the caller can fall back or continue.
 */
async function saveViaBinding(submission: ContactSubmission): Promise<boolean> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const db = (env as Record<string, unknown>).CONTACT_DB as
      | D1Like
      | undefined;
    if (!db?.prepare) {
      return false;
    }
    await db
      .prepare(INSERT_SQL)
      .bind(...insertParams(submission))
      .run();
    return true;
  } catch (error) {
    console.warn("contact: D1 binding insert failed", error);
    return false;
  }
}

/**
 * Fallback path: the D1 HTTP API, usable from any runtime when the binding is
 * absent. Requires CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_D1_DATABASE_ID +
 * CLOUDFLARE_API_TOKEN. Returns false (never throws) on any failure.
 */
async function saveViaHttp(submission: ContactSubmission): Promise<boolean> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !databaseId || !apiToken) {
    return false;
  }

  try {
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/d1/database/${databaseId}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sql: INSERT_SQL, params: insertParams(submission) }),
      },
    );
    if (!res.ok) {
      console.warn("contact: D1 HTTP insert failed", res.status);
      return false;
    }
    return true;
  } catch (error) {
    console.warn("contact: D1 HTTP insert errored", error);
    return false;
  }
}

/**
 * Persist a contact submission to Cloudflare D1. Best-effort and graceful:
 * tries the binding, then the HTTP API, and resolves false rather than throwing
 * if neither is configured or both fail. Email is the source of truth; this is
 * the durable backup so a lead is captured even if email delivery later fails.
 */
export async function saveContactSubmission(
  submission: ContactSubmission,
): Promise<boolean> {
  if (await saveViaBinding(submission)) {
    return true;
  }
  return saveViaHttp(submission);
}
