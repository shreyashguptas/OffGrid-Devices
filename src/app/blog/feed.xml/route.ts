import { allBlogPosts } from "@/content/blog";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function feedUpdatedAt() {
  const timestamps = allBlogPosts.map((post) =>
    new Date(post.updatedAt ?? post.publishedAt).getTime(),
  );
  return new Date(Math.max(...timestamps)).toISOString();
}

function buildAtomFeed() {
  const siteUrl = getSiteUrl();
  const updated = feedUpdatedAt();

  const entries = allBlogPosts
    .map((post) => {
      const url = absoluteUrl(`/blog/${post.slug}`);
      return `
  <entry>
    <title>${escapeXml(post.title)}</title>
    <link href="${escapeXml(url)}" />
    <id>${escapeXml(url)}</id>
    <updated>${new Date(post.updatedAt ?? post.publishedAt).toISOString()}</updated>
    <published>${new Date(post.publishedAt).toISOString()}</published>
    <summary>${escapeXml(post.excerpt)}</summary>
    <author><name>${escapeXml(post.author.name)}</name></author>
  </entry>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>OffGrid Blog</title>
  <link href="${escapeXml(absoluteUrl("/blog/feed.xml"))}" rel="self" />
  <link href="${escapeXml(siteUrl)}" />
  <id>${escapeXml(siteUrl)}</id>
  <updated>${updated}</updated>${entries}
</feed>
`;
}

export function GET() {
  return new Response(buildAtomFeed(), {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
    },
  });
}
