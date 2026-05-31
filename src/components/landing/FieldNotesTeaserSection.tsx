import Link from "next/link";
import { allBlogPosts } from "@/content/blog";

/**
 * Latest-blog-post teaser on the company home. Moved out of the old inline
 * home block and restyled onto the brand palette (pitch / bone / sand / ember)
 * so it reads as one cohesive page with the other landing sections.
 */
export function FieldNotesTeaserSection() {
  const latestPost = allBlogPosts[0];
  if (!latestPost) return null;

  return (
    <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <div>
          <p className="type-mono-label text-ember">FIELD NOTES</p>
          <h2 className="type-display-section mt-4 text-bone">
            Practical notes from the mesh.
          </h2>
        </div>
        <Link
          href={`/blog/${latestPost.slug}`}
          className="group border border-bark/40 bg-pitch-deep p-6 transition-colors hover:border-ember/50 md:p-8"
        >
          <p className="type-mono-label text-sand/55">Latest from the blog</p>
          <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-bone transition-colors group-hover:text-ember">
            {latestPost.title}
          </h3>
          <p className="font-editorial mt-3 text-base leading-[1.6] text-sand/80">
            {latestPost.excerpt}
          </p>
          <span className="type-mono-label mt-5 inline-block text-ember">
            Read field notes →
          </span>
        </Link>
      </div>
    </section>
  );
}
