import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/Faq";
import { TrackBlogView } from "@/components/analytics/TrackBlogView";
import { Beacon2CallToAction } from "@/components/beacon2/Beacon2CallToAction";
import {
  getSectionId,
  TableOfContents,
} from "@/components/blog/TableOfContents";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  type BlogSection,
} from "@/content/blog";
import { beacon2Content } from "@/content/products";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";

function getSocialLinkLabel(href: string): string {
  if (href.includes("x.com")) return "X / Twitter →";
  if (href.includes("github.com")) return "GitHub →";
  if (href.includes("youtube.com")) return "YouTube →";
  return "Profile →";
}

function ContentSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 id={getSectionId(section)} className="scroll-mt-28">
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 id={getSectionId(section)} className="scroll-mt-28">
          {section.content}
        </h3>
      );
    case "paragraph":
      return <p>{section.content}</p>;
    case "list":
      return (
        <ul>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "orderedList":
      return (
        <ol>
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="blog-figure">
          <div className="overflow-hidden border border-border-subtle bg-background">
            <Image
              src={section.src}
              alt={section.alt}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 700px, 100vw"
              className="w-full object-cover"
            />
          </div>
          {section.caption ? (
            <figcaption className="mt-3 text-sm text-muted">
              {section.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    case "quote":
      return (
        <blockquote>
          <p>{section.content}</p>
          {section.cite ? (
            <cite className="mt-3 block font-body text-sm not-italic tracking-[0.02em] text-muted">
              {section.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "callout": {
      let toneClass: string;
      switch (section.tone) {
        case "warn":
          toneClass = "border-ember/50 bg-ember/10";
          break;
        case "tip":
          toneClass = "border-accent/50 bg-accent/10";
          break;
        default:
          toneClass = "border-border-card bg-background";
      }
      return (
        <aside
          className={`mt-8 border p-5 text-base leading-relaxed ${toneClass}`}
        >
          {section.content}
        </aside>
      );
    }
    case "code":
      return (
        <pre className="mt-8 overflow-x-auto border border-border-subtle bg-pitch p-5 text-sm leading-relaxed text-bone">
          <code>{section.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="mt-8 overflow-x-auto">
          <table className="w-full border-collapse border border-border-card text-sm">
            {section.caption ? (
              <caption className="caption-bottom pt-3 text-left text-xs text-muted">
                {section.caption}
              </caption>
            ) : null}
            <thead>
              <tr>
                {section.headers.map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="border border-border-card bg-surface-elevated px-3 py-2 text-left font-display text-[11px] font-bold uppercase tracking-[0.14em] text-foreground"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {section.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={cellIndex}
                      className="border border-border-card px-3 py-2 align-top text-muted-light"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "This blog post does not exist on OffGrid Devices.",
      robots: { index: false, follow: true },
    };
  }

  const canonical = `/blog/${post.slug}`;
  const ogImage = post.ogImage ?? `/blog/${post.slug}/opengraph-image`;

  return {
    // `title.absolute` skips the global ` | OffGrid Devices` template so
    // long SEO titles don't exceed the SERP truncation threshold.
    title: { absolute: post.seoTitle ?? post.title },
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name, url: post.author.url }],
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.seoTitle ?? post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.author.name],
      section: post.category,
      tags: post.keywords,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle ?? post.title,
      description: post.metaDescription,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const related = getRelatedPosts(post);
  const hasToc =
    post.sections.filter((section) => section.type === "heading").length >= 3;

  return (
    <>
      <TrackBlogView slug={post.slug} />
      <script {...jsonLdScriptProps(articleJsonLd(post))} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        )}
      />
      {/* FAQPage JSON-LD is emitted by the <Faq> component itself, below,
          when the post defines a FAQ. Avoids duplicate-schema warnings. */}

      <section className="border-b border-border-subtle bg-background pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>

          <header className="mt-10">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="bg-accent/10 px-3 py-1 text-accent">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 type-display-hero">{post.title}</h1>

            <p className="type-editorial-lead mt-6 max-w-2xl text-muted-light">
              {post.excerpt}
            </p>

            <p className="mt-4 text-sm text-muted">
              By <span className="text-foreground">{post.author.name}</span>
              {" · "}
              <time dateTime={post.publishedAt}>{post.date}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt ? (
                <>
                  {" · Updated "}
                  <time dateTime={post.updatedAt}>{post.updatedAt}</time>
                </>
              ) : null}
            </p>
          </header>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        {/* Hero image runs wide; the prose below sits in a tight measure for
            comfortable reading — the editorial split that carries the page. */}
        <div className="mx-auto max-w-5xl px-6">
          <div className="section-stage p-5 md:p-6">
            <div className="overflow-hidden bg-background">
              <Image
                src={post.image}
                alt={post.heroImageAlt ?? `${post.title} — OffGrid Devices`}
                width={1400}
                height={800}
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-6xl px-6 md:mt-16">
          <div
            className={
              hasToc
                ? "xl:grid xl:grid-cols-[15rem_minmax(0,44rem)_minmax(0,1fr)] xl:justify-center xl:gap-12"
                : ""
            }
          >
            {hasToc ? (
              <aside className="hidden xl:block">
                <TableOfContents sections={post.sections} />
              </aside>
            ) : null}

            <div className="mx-auto w-full max-w-[44rem] xl:mx-0">
              <article className="blog-prose">
                {post.sections.map((section, index) => (
                  <ContentSection
                    key={`${post.slug}-${index}`}
                    section={section}
                  />
                ))}
              </article>

              {/* Author bio — visible byline + bio block strengthens E-E-A-T
                  beyond what the BlogPosting JSON-LD alone signals. Links to
                  /about (founder page) so quality raters and AI Overviews can
                  corroborate authorship. */}
              <aside className="mt-14 border-t border-border-subtle pt-10">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-accent/15 font-display text-lg font-bold uppercase tracking-tight text-accent">
                    {post.author.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")
                      .slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <p className="type-eyebrow text-muted">Written by</p>
                    <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
                      {post.author.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-light md:text-base">
                      Founder of OffGrid Devices and the builder behind OffGrid
                      Beacon — a MagSafe-compatible LoRa mesh radio that ships
                      with Meshtastic pre-flashed. Based in Maryland.
                    </p>
                    <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.18em] text-muted">
                      <Link href="/about" className="hover:text-accent">
                        About OffGrid →
                      </Link>
                      {post.author.sameAs?.map((href) => (
                        <a
                          key={href}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent"
                        >
                          {getSocialLinkLabel(href)}
                        </a>
                      ))}
                    </p>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {post.faq && post.faq.length > 0 ? (
        <Faq
          items={post.faq}
          eyebrow="FAQ"
          title="Questions readers ask about this guide"
        />
      ) : null}

      {related.length > 0 ? (
        <section className="border-b border-border-subtle bg-background py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="type-display-section">Keep reading</h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-light">
              More from the OffGrid blog on Meshtastic, LoRa mesh, and off-grid
              communication.
            </p>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="section-card p-6">
                  <p className="type-eyebrow text-muted">{r.category}</p>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug">
                    <Link
                      href={`/blog/${r.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {r.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-light">
                    {r.excerpt}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Beacon2CallToAction
        eyebrow={beacon2Content.home.cta.eyebrow}
        title={beacon2Content.home.cta.title}
        description={beacon2Content.home.cta.description}
        secondaryHref={beacon2Content.home.cta.secondaryHref}
        secondaryLabel={beacon2Content.home.cta.secondaryLabel}
        backgroundClassName="bg-surface-elevated"
      />
    </>
  );
}
