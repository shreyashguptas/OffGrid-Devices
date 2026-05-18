import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/Faq";
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
  faqJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";

function ContentSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          id={getSectionId(section)}
          className="scroll-mt-28 mt-12 font-display text-3xl font-semibold tracking-tight text-foreground first:mt-0"
        >
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3
          id={getSectionId(section)}
          className="scroll-mt-28 mt-8 font-display text-2xl font-semibold tracking-tight text-foreground"
        >
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p className="mt-5 text-lg leading-relaxed text-muted-light first:mt-0">
          {section.content}
        </p>
      );
    case "list":
      return (
        <ul className="mt-5 list-disc space-y-3 pl-5 text-lg leading-relaxed text-muted-light marker:text-accent">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-lg leading-relaxed text-muted-light marker:text-accent">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className="mt-8">
          <div className="overflow-hidden rounded-[1.5rem] bg-background">
            <Image
              src={section.src}
              alt={section.alt}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 800px, 100vw"
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
        <blockquote className="mt-8 border-l-2 border-accent pl-5 text-xl leading-relaxed text-foreground">
          <p>{section.content}</p>
          {section.cite ? (
            <cite className="mt-3 block text-sm not-italic text-muted">
              {section.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "callout": {
      const toneClass =
        section.tone === "warn"
          ? "border-ember/50 bg-ember/10"
          : section.tone === "tip"
            ? "border-accent/50 bg-accent/10"
            : "border-border-card bg-background";
      return (
        <aside className={`mt-8 border p-5 text-base leading-relaxed ${toneClass}`}>
          {section.content}
        </aside>
      );
    }
    case "code":
      return (
        <pre className="mt-8 overflow-x-auto rounded-[1rem] bg-pitch p-5 text-sm leading-relaxed text-bone">
          <code>{section.code}</code>
        </pre>
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
    title: post.seoTitle ?? post.title,
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
      {post.faq && post.faq.length > 0 ? (
        <script {...jsonLdScriptProps(faqJsonLd(post.faq))} />
      ) : null}

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
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {post.title}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-light">
              {post.excerpt}
            </p>

            <p className="mt-4 text-sm text-muted">
              By{" "}
              <span className="text-foreground">{post.author.name}</span>
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
        <div className="mx-auto max-w-5xl px-6">
          <div className="section-stage rounded-[2.25rem] p-5 md:p-6">
            <div className="overflow-hidden rounded-[1.75rem] bg-background">
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

          <div
            className={
              hasToc
                ? "mt-8 grid gap-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start"
                : "mt-8"
            }
          >
            {hasToc ? <TableOfContents sections={post.sections} /> : null}
            <article className="section-card rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
              {post.sections.map((section, index) => (
                <ContentSection
                  key={`${post.slug}-${index}`}
                  section={section}
                />
              ))}
            </article>
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
            <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Keep reading
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-light">
              More from the OffGrid blog on Meshtastic, LoRa mesh, and off-grid
              communication.
            </p>
            <ul className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <li key={r.slug} className="section-card rounded-[1.5rem] p-6">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    {r.category}
                  </p>
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
