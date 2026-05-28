import type { NextConfig } from "next";

// Tightened CSP. `unsafe-inline` is required for:
//   - the early-paint theme script in layout.tsx (sets data-theme before
//     React hydrates; using a nonce would defeat the "early" goal)
//   - JSON-LD <script type="application/ld+json"> blocks
//   - Tailwind's runtime style injection
// Shopify CDN serves product imagery. Tighten further once we have a CSP
// report endpoint.
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'wasm-unsafe-eval' is needed because @react-three/drei sets up the
  // Draco / Meshopt / KTX2 decoders eagerly when useGLTF.preload runs,
  // and WebAssembly.instantiate counts as eval under script-src. Modern
  // browsers (Chrome 97+, Firefox 102+, Safari 16+) treat this token as
  // strictly narrower than 'unsafe-eval' — only WASM compiles are
  // allowed, not arbitrary string-eval'd JS.
  "script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.shopify.com",
  "font-src 'self' data:",
  // blob: is needed because three.js/drei reads GLB-embedded textures as
  // Blob → URL.createObjectURL → fetch(blob:...). Without it the 15
  // textures in beacon-2.glb fail to load and the Beacon renders without
  // its CAD-assigned surface detail.
  "connect-src 'self' blob: https://*.myshopify.com https://cdn.shopify.com",
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
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/**",
      },
    ],
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

      // Four blog posts consolidated into /blog/why-offgrid (the
      // "Why OffGrid" brand story). The setup-focused post points at the
      // Beacon 2 quickstart reference instead. These preserve any
      // accumulated link equity and prevent 404s on indexed URLs.
      {
        source: "/blog/getting-started-with-meshtastic",
        destination: "/beacon-2/start",
        statusCode: 301,
      },
      {
        source: "/blog/what-is-lora-mesh-off-grid-communication-explained",
        destination: "/blog/why-offgrid",
        statusCode: 301,
      },
      {
        source: "/blog/meshtastic-vs-walkie-talkies-frs-gmrs",
        destination: "/blog/why-offgrid",
        statusCode: 301,
      },
      {
        source: "/blog/backup-comms-when-cell-towers-go-down",
        destination: "/blog/why-offgrid",
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
