import type { MetadataRoute } from "next";
import { allBlogPosts } from "@/content/blog";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const ROUTE_LAST_MODIFIED = {
    home: "2026-05-31",
    beacon2: "2026-05-31",
    beacon1: "2026-05-17",
    blog: "2026-05-18",
    beacon2Start: "2026-05-10",
    about: "2026-05-18",
    contact: "2026-05-29",
    shipping: "2026-05-18",
    returns: "2026-05-18",
    privacy: "2026-05-18",
    terms: "2026-05-18",
  } as const;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      // Use bare origin (no trailing slash) so the sitemap matches the
      // homepage's self-canonical (`/`). `absoluteUrl("/")` would render
      // `https://offgridevices.com/` which contradicts the canonical tag.
      url: getSiteUrl(),
      lastModified: ROUTE_LAST_MODIFIED.home,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/products/beacon-2"),
      lastModified: ROUTE_LAST_MODIFIED.beacon2,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: absoluteUrl("/products/beacon-1"),
      lastModified: ROUTE_LAST_MODIFIED.beacon1,
      // Beacon 1 is retired — no expected content updates.
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: ROUTE_LAST_MODIFIED.blog,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/beacon-2/start"),
      lastModified: ROUTE_LAST_MODIFIED.beacon2Start,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: ROUTE_LAST_MODIFIED.about,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: ROUTE_LAST_MODIFIED.contact,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: absoluteUrl("/shipping"),
      lastModified: ROUTE_LAST_MODIFIED.shipping,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/returns"),
      lastModified: ROUTE_LAST_MODIFIED.returns,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: absoluteUrl("/privacy"),
      lastModified: ROUTE_LAST_MODIFIED.privacy,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: ROUTE_LAST_MODIFIED.terms,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    // Pass the raw ISO date string (not a Date) so Next.js serializes as
    // `YYYY-MM-DD`, matching the format used by static routes above.
    lastModified: (post.updatedAt ?? post.publishedAt).slice(0, 10),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
