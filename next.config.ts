import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const contentSecurityPolicy = [
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
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
      {
        source: "/products/link-1",
        destination: "/products/beacon-1",
        statusCode: 301,
      },
      {
        source: "/products/link-2",
        destination: "/",
        statusCode: 301,
      },
      {
        source: "/start",
        destination: "/beacon-2/start",
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
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
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
