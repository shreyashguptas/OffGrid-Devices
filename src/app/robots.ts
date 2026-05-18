import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/siteUrl";

/**
 * Robots config.
 *
 * Wildcard rule: allow everything except /api/.
 *
 * AI inference crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot,
 * Google-Extended): explicitly allowed so they surface OffGrid Beacon
 * content in AI search results, citations, and answer engines.
 *
 * Training-only crawlers (CCBot, anthropic-ai, cohere-ai): blocked. They
 * scrape content for model training without contributing to search visibility
 * or citation back to the site.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },

      // AI inference / search crawlers — explicitly welcome.
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },

      // Training-only crawlers — blocked.
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "anthropic-ai", disallow: "/" },
      { userAgent: "cohere-ai", disallow: "/" },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
