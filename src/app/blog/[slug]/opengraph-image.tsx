import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "@/content/blog";
import {
  BLOG_OG_BADGE_BORDER,
  BLOG_OG_BADGE_FG,
  BLOG_OG_FOOTER,
  BLOG_OG_MUTED,
  blogOgShellStyle,
} from "@/lib/blogOgLayout";

export const alt = "OffGrid blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const title = post?.title ?? "OffGrid Blog";
  const category = post?.category ?? "OffGrid";
  const readTime = post?.readTime;

  return new ImageResponse(
    (
      <div style={blogOgShellStyle}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: BLOG_OG_MUTED,
            }}
          >
            OffGrid Devices · Blog
          </div>
          <div
            style={{
              fontSize: 22,
              padding: "10px 18px",
              borderRadius: 999,
              border: `1px solid ${BLOG_OG_BADGE_BORDER}`,
              color: BLOG_OG_BADGE_FG,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {category}
          </div>
        </div>

        <div
          style={{
            fontSize: title.length > 60 ? 62 : 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: BLOG_OG_FOOTER,
            fontSize: 26,
          }}
        >
          <div>offgridevices.com</div>
          {readTime ? <div>{readTime}</div> : null}
        </div>
      </div>
    ),
    { ...size },
  );
}
