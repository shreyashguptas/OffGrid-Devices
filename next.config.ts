import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

// Tightened CSP. `unsafe-inline` is required for:
//   - the early-paint theme script in layout.tsx (sets data-theme before
//     React hydrates; using a nonce would defeat the "early" goal)
//   - JSON-LD <script type="application/ld+json"> blocks
//   - Tailwind's runtime style injection
// Vercel-side observability + BotID need the matching script/connect hosts.
// Shopify CDN serves product imagery; Vercel analytics/insights ride their
// own subdomains. Tighten further once we have a CSP report endpoint.
const contentSecurityPolicy = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com https://*.vercel-insights.com https://*.botid.dev",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://cdn.shopify.com",
  "font-src 'self' data:",
  "connect-src 'self' https://*.vercel-insights.com https://va.vercel-scripts.com https://*.botid.dev https://*.myshopify.com https://cdn.shopify.com",
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
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Modern browsers honor CSP `frame-ancestors 'none'`; X-Frame-Options
          // is the legacy-scanner / corporate-proxy fallback.
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
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
        ],
      },
    ];
  },
};

// BotID auto-injects its client SDK and gates routes that call checkBotId()
// server-side. The two Shopify checkout POST handlers do the gating.
export default withBotId(nextConfig);
