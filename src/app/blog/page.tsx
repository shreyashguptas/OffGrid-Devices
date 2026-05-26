import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/blog";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

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
      <section className="border-b border-border-subtle bg-background pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
            Journal
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            OffGrid Blog — Meshtastic & Off-Grid Communication Guides
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            Practical writing on Meshtastic, LoRa mesh networking, and the
            hardware that keeps it usable in the field. Written by Shreyash
            Gupta &mdash; founder of OffGrid Devices and the builder behind
            OffGrid Beacon &mdash; for hikers, preppers, event organizers,
            and the wider Meshtastic community.
          </p>
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-muted-light">
            What you&rsquo;ll find here: device comparisons grounded in
            specs and field use, protocol explainers that resolve the
            recurring LoRa-vs-LoRaWAN-vs-Meshtastic confusion, and the
            running story of how Beacon hardware evolves from one revision
            to the next. No filler, no affiliate stack &mdash; just notes
            from people who carry the radios they ship.
          </p>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 border border-border-card bg-background p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-muted">
                New
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                Beacon 2 — the MagSafe mesh radio
              </h2>
            </div>
            <Link
              href="/"
              className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.16em] text-accent transition-colors hover:text-foreground md:mt-0"
            >
              See Beacon 2 →
            </Link>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post, index) => (
              <article
                key={post.slug}
                className="group section-card overflow-hidden rounded-[2rem]"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="bg-background p-5 md:p-6">
                    <div className="overflow-hidden rounded-[1.5rem] bg-surface-elevated">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={1000}
                        height={700}
                        priority={index === 0}
                        sizes="(min-width: 1024px) 50vw, 100vw"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>

                  <div className="px-6 pb-8 md:px-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                        {post.category}
                      </span>
                      <time dateTime={post.publishedAt}>{post.date}</time>
                      <span className="h-1 w-1 rounded-full bg-muted" />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent">
                      {post.title}
                    </h2>

                    <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-light">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
