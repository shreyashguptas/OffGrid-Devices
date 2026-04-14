import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import { blogPosts, getBlogPost, type BlogSection } from "@/content/blog";
import { link1Content } from "@/content/link1";

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

  return (
    <>
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
          </header>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="section-stage rounded-[2.25rem] p-5 md:p-6">
            <div className="overflow-hidden rounded-[1.75rem] bg-background">
              <Image
                src={post.image}
                alt={post.title}
                width={1400}
                height={800}
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </div>

          <div className="section-card mt-8 rounded-[2rem] px-6 py-10 md:px-10 md:py-12">
            {post.sections.map((section, index) => (
              <ContentSection key={`${post.slug}-${index}`} section={section} />
            ))}
          </div>
        </div>
      </section>

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
