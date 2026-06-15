import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Absolute path to this project dir. Used to pin Turbopack's workspace root so
// it doesn't walk up and latch onto a parent repo's lockfile (this checkout can
// live inside a git worktree nested under the main repo).
const projectRoot = dirname(fileURLToPath(import.meta.url));

// Tightened CSP. `unsafe-inline` is required for:
//   - the early-paint theme script in layout.tsx (sets data-theme before
//     React hydrates; using a nonce would defeat the "early" goal)
//   - JSON-LD <script type="application/ld+json"> blocks
//   - Tailwind's runtime style injection
// All imagery is now first-party (served from /public), so img-src stays 'self'.
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'wasm-unsafe-eval' is needed because @react-three/drei sets up the
  // Draco / Meshopt / KTX2 decoders eagerly when useGLTF.preload runs,
  // and WebAssembly.instantiate counts as eval under script-src. Modern
  // browsers (Chrome 97+, Firefox 102+, Safari 16+) treat this token as
  // strictly narrower than 'unsafe-eval' — only WASM compiles are
  // allowed, not arbitrary string-eval'd JS.
  // challenges.cloudflare.com is required for the Cloudflare Turnstile widget
  // (loaded on /contact). Per Cloudflare's CSP reference the loader script and
  // the challenge iframe both come from this origin; connect-src is included
  // for the widget's verification calls. Without these the form's submit
  // button stays permanently disabled once a Turnstile site key is set.
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval' https://challenges.cloudflare.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  // blob: is needed because three.js/drei reads GLB-embedded textures as
  // Blob → URL.createObjectURL → fetch(blob:...). Without it the 15
  // textures in beacon-2.glb fail to load and the Beacon renders without
  // its CAD-assigned surface detail.
  "connect-src 'self' blob: https://challenges.cloudflare.com",
  "frame-src 'self' https://challenges.cloudflare.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  // Pin the workspace root to this project so Turbopack stops inferring the
  // wrong one (and emitting the "multiple lockfiles" warning) when the repo is
  // checked out as a nested git worktree.
  turbopack: {
    root: projectRoot,
  },
  images: {
    // OpenNext-Cloudflare does NOT optimize next/image — the /_next/image
    // endpoint is a passthrough that fetches the original asset *through the
    // Worker* and returns it byte-for-byte (no resize, no AVIF/WebP), and
    // those responses are not edge-cached. That had two costs:
    //   1. Every image request ran the Worker and buffered a multi-MB file,
    //      which is what pushed the 128 MB isolate over its limit and produced
    //      the `exceededResources` invocation errors.
    //   2. Images missed the edge cache (cf-cache-status absent) and were
    //      re-fetched from the Worker on every view.
    // With `unoptimized`, next/image emits the direct asset URL, which Workers
    // serves straight from the cached ASSETS binding (cf-cache-status: HIT) and
    // never touches the SSR Worker. Source images are pre-sized JPEGs, so there
    // is no optimization left to do.
    unoptimized: true,
  },
  // PostHog ingest + asset bundle proxied behind /ingest so the browser only
  // talks to our own origin. Keeps cookies first-party, dodges ad-blocker
  // hostname rules, and lets the CSP stay 'self' everywhere.
  // skipTrailingSlashRedirect is required — PostHog returns 308s for trailing
  // slashes that would otherwise drop the POST body.
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/array/:path*",
        destination: "https://us-assets.i.posthog.com/array/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
    ];
  },
  skipTrailingSlashRedirect: true,
  async redirects() {
    return [
      // Legacy "Link" product slugs from the pre-rebrand site.
      {
        source: "/products/link-1",
        destination: "/products/beacon-1",
        statusCode: 301,
      },
      {
        source: "/products/link-2",
        destination: "/products/beacon-2",
        statusCode: 301,
      },

      // Legacy /start (Beacon 2 setup) — canonical lives under the product.
      {
        source: "/start",
        destination: "/beacon-2/start",
        statusCode: 301,
      },

      // The blog was consolidated to a single story post,
      // /blog/why-i-built-beacon. The setup-focused post points at the
      // Beacon 2 quickstart reference instead. Every other retired blog URL
      // (including the former why-offgrid story and the two guide posts)
      // 301s to the story post to preserve link equity and prevent 404s on
      // indexed URLs.
      {
        source: "/blog/getting-started-with-meshtastic",
        destination: "/beacon-2/start",
        statusCode: 301,
      },
      {
        source: "/blog/why-offgrid",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
      {
        source: "/blog/best-meshtastic-devices-2026",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
      {
        source: "/blog/meshtastic-vs-lorawan",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
      {
        source: "/blog/what-is-lora-mesh-off-grid-communication-explained",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
      {
        source: "/blog/meshtastic-vs-walkie-talkies-frs-gmrs",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
      {
        source: "/blog/backup-comms-when-cell-towers-go-down",
        destination: "/blog/why-i-built-beacon",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    // CSP is production-only. React's dev build relies on runtime code
    // evaluation for richer error overlays and stack reconstruction, and
    // emitting the policy in `next dev` produces a stream of console
    // noise without catching real issues — `pnpm build` still exercises
    // the policy against every static + dynamic route before deploy.
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      // Modern browsers honor CSP `frame-ancestors 'none'`; X-Frame-Options
      // is the legacy-scanner / corporate-proxy fallback.
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      {
        // `preload` enables submission to hstspreload.org (Chrome's
        // built-in HSTS list, also honored by Firefox/Safari) so that
        // first-visit users on a fresh network never make a plaintext
        // HTTP request before the 308 fires.
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Permissions-Policy",
        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
      },
      { key: "X-DNS-Prefetch-Control", value: "on" },
    ];
    if (process.env.NODE_ENV === "production") {
      securityHeaders.push({
        key: "Content-Security-Policy",
        value: contentSecurityPolicy,
      });
    }
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
