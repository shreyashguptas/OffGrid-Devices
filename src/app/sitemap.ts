import type { MetadataRoute } from "next";
import { allBlogPosts } from "@/content/blog";
import { absoluteUrl } from "@/lib/siteUrl";

export default function sitemap(): MetadataRoute.Sitemap {
  const ROUTE_LAST_MODIFIED = {
    home: "2026-05-18",
    beacon2: "2026-05-18",
    beacon1: "2026-05-17",
    blog: "2026-05-18",
    beacon2Start: "2026-05-10",
  } as const;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
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
      changeFrequency: "weekly",
      priority: 0.7,
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
  ];

  const blogRoutes: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
