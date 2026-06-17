// Single source of truth for icon/favicon cache-busting.
//
// Bump this string whenever any icon/favicon art changes:
//   public/icon-192.png, public/icon-512.png, public/logo.svg,
//   src/app/icon.png, src/app/apple-icon.png
//
// Changing it re-stamps the manifest, favicon, and manifest-link URLs
// (?v=ICON_VERSION) so browser + Cloudflare caches fetch fresh bytes and
// every FUTURE PWA install ("Add to Home Screen") picks up the new art.
//
// Note: src/app/icon.png and src/app/apple-icon.png are auto-hashed by
// Next.js, so they cache-bust on their own — you do not need to bump for
// those, but bumping is harmless. An ALREADY-installed iOS home-screen tile
// cannot be refreshed by any code; it must be manually deleted and re-added.
export const ICON_VERSION = "2";
