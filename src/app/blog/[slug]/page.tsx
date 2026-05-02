import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Faq } from "@/components/Faq";
import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import {
  blogPosts,
  getBlogPost,
  getRelatedPosts,
  type BlogSection,
} from "@/content/blog";
import { link1Content } from "@/content/link1";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";

function ContentSection({ section }: { section: BlogSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="mt-12 font-display text-3xl font-semibold tracking-tight text-foreground first:mt-0">
          {section.content}
        </h2>
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
                alt={`${post.title} — OffGrid Devices`}
                width={1400}
                height={800}
                priority
                sizes="(min-width: 1024px) 960px, 100vw"
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </div>

          <article className="section-card mt-8 rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
            {post.sections.map((section, index) => (
              <ContentSection key={`${post.slug}-${index}`} section={section} />
            ))}
          </article>
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

      <Link1CallToAction
        eyebrow={link1Content.blog.cta.eyebrow}
        title={link1Content.blog.cta.title}
        description={link1Content.blog.cta.description}
        secondaryHref={link1Content.blog.cta.secondaryHref}
        secondaryLabel={link1Content.blog.cta.secondaryLabel}
        backgroundClassName="bg-surface-elevated"
      />
    </>
  );
}

