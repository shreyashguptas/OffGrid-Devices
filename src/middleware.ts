import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Collapse the `www` subdomain onto the apex domain with a permanent redirect.
 *
 * Without this, https://www.offgridevices.com serves a full 200 duplicate of
 * every page. Search Console discovers it and flags it as "Alternative page
 * with proper canonical tag" — the canonical points at the apex, so it is
 * handled correctly, but the cleaner outcome is to never serve the duplicate
 * at all. A 301 to the apex removes it from the crawl entirely.
 *
 * Apex and preview/`workers.dev` hosts fall through untouched.
 */
export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? request.nextUrl.host;

  if (host.startsWith("www.")) {
    const apexHost = host.slice("www.".length);
    const { pathname, search } = request.nextUrl;
    return NextResponse.redirect(`https://${apexHost}${pathname}${search}`, 301);
  }

  return NextResponse.next();
}

export const config = {
  // Skip Next internals and the first-party PostHog proxy; everything else is
  // eligible for the www→apex redirect.
  matcher: ["/((?!_next/|ingest/).*)"],
};
