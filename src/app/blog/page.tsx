import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import {
  breadcrumbJsonLd,
  itemListJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";

const TITLE = "OffGrid Blog — Meshtastic & LoRa Mesh Notes";
const DESCRIPTION =
  "Guides, comparisons, and practical notes on Meshtastic, LoRa mesh networking, and off-grid communication — from the team behind OffGrid Beacon 2.";

export const metadata: Metadata = {
  // `title.absolute` keeps the rendered <title> short by skipping the global
  // ` | OffGrid Devices` template.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "Meshtastic blog",
    "LoRa mesh guides",
    "off-grid communication blog",
    "OffGrid Devices blog",
    "Meshtastic tutorials",
    "LoRa radio comparisons",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function BlogPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
          ]),
        )}
      />
      {/* ItemList JSON-LD surfaces the post collection to search engines so the
          blog index is discoverable as a set, not just via link-following. */}
      <script
        {...jsonLdScriptProps(
          itemListJsonLd(
            "OffGrid Blog — Meshtastic & LoRa Mesh Notes",
            blogPosts.map((post) => ({
              name: post.title,
              url: `/blog/${post.slug}`,
              description: post.excerpt,
            })),
          ),
        )}
      />
      <section className="border-b border-border-subtle bg-background pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="type-mono-label text-ember">Blog · OffGrid</p>
          <h1 className="mt-4 type-display-section text-foreground">Blog</h1>
          <p className="mt-8 max-w-2xl font-editorial text-xl leading-[1.55] text-muted-light">
            Thoughts, projects, and notes on LoRa mesh and the hardware I build.
          </p>
        </div>
      </section>

      <section className="bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <ul className="divide-y divide-border-subtle">
            {blogPosts.map((post, index) => {
              const featured = index === 0;
              return (
                <li
                  key={post.slug}
                  className="py-10 first:pt-0 last:pb-0 md:py-12"
                >
                  <article className="group">
                    <Link href={`/blog/${post.slug}`} className="block">
                      {/* Every post shows its hero image — not just the first.
                          `priority` stays on the top post only so it's the LCP
                          candidate; the rest lazy-load. This is the standing
                          rule for all future posts. */}
                      <div className="mb-7 overflow-hidden border border-border-subtle bg-background">
                        <Image
                          src={post.image}
                          alt={post.heroImageAlt ?? post.title}
                          width={1200}
                          height={675}
                          priority={featured}
                          sizes="(min-width: 768px) 768px, 100vw"
                          className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                        <span className="bg-accent/10 px-3 py-1 text-accent-text">
                          {post.category}
                        </span>
                        <time dateTime={post.publishedAt}>{post.date}</time>
                        <span className="h-1 w-1 rounded-full bg-muted" />
                        <span>{post.readTime}</span>
                      </div>

                      <h2
                        className={
                          featured
                            ? "mt-5 type-display-card transition-colors duration-300 group-hover:text-accent"
                            : "mt-4 type-display-card text-foreground transition-colors duration-300 group-hover:text-accent"
                        }
                      >
                        {post.title}
                      </h2>

                      {featured ? (
                        <p className="type-editorial-lead mt-4 text-muted-light">
                          {post.excerpt}
                        </p>
                      ) : (
                        <p className="mt-3 text-base leading-relaxed text-muted-light">
                          {post.excerpt}
                        </p>
                      )}

                      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-accent transition-colors group-hover:text-foreground">
                        Read the story →
                      </span>
                    </Link>
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
