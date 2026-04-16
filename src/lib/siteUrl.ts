const DEFAULT_SITE_URL = "https://offgridevices.com";

function getFirstNonEmptyString(...values: Array<string | undefined>) {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

function normalizeUrl(raw: string) {
  const hasProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(raw);
  const withProtocol = hasProtocol ? raw : `https://${raw}`;
  try {
    const url = new URL(withProtocol);
    // Strip trailing slash from origin form for consistent concatenation.
    const origin = url.origin;
    return origin;
  } catch {
    return DEFAULT_SITE_URL;
  }
}

/**
 * Canonical production origin (no trailing slash). Falls back to
 * production domain so sitemap/robots/JSON-LD always have a real URL,
 * even during local dev.
 */
export function getSiteUrl(): string {
  const raw =
    getFirstNonEmptyString(
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.VERCEL_URL,
    ) ?? DEFAULT_SITE_URL;
  return normalizeUrl(raw);
}

/** Same value wrapped as a URL for Next.js `metadataBase`. */
export function getMetadataBase(): URL {
  return new URL(getSiteUrl());
}

/** Build an absolute URL for a site-relative path ("/blog/foo"). */
export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (!path.startsWith("/")) path = `/${path}`;
  return `${base}${path}`;
}
