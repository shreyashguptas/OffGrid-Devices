import { ImageResponse } from "next/og";
import { blogPosts, getBlogPost } from "@/content/blog";

// Using the Node runtime (default) so we can combine generateStaticParams
// with ImageResponse — edge runtime is incompatible with that combination.
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
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b1f1c 0%, #0f2a27 50%, #133731 100%)",
          color: "#f3f7f2",
          fontFamily: "sans-serif",
        }}
      >
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
              color: "#a8c1b9",
            }}
          >
            OffGrid Devices · Blog
          </div>
          <div
            style={{
              fontSize: 22,
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid #2f5b52",
              color: "#c7d8d2",
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
            color: "#8fb0a6",
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
