import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/content/blog";

export default function BlogPage() {
  return (
    <>
      <section className="border-b border-border-subtle bg-background pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
            Journal
          </p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
            The OffGrid Blog
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-light md:text-xl">
            Tutorials, setup guides, and practical notes on off-grid
            communication, mesh networking, and the hardware that keeps it
            usable.
          </p>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {blogPosts.map((post) => (
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
                        className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                      />
                    </div>
                  </div>

                  <div className="px-6 pb-8 md:px-8">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
                      <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                        {post.category}
                      </span>
                      <span>{post.date}</span>
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
