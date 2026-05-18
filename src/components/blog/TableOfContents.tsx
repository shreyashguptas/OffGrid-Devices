import type { BlogSection } from "@/content/blog";

export function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSectionId(section: Extract<BlogSection, { content: string }>) {
  if ("id" in section && section.id) {
    return section.id;
  }
  return slugifyHeading(section.content);
}

export function TableOfContents({ sections }: { sections: BlogSection[] }) {
  const headings = sections.filter(
    (section): section is Extract<BlogSection, { type: "heading" }> =>
      section.type === "heading",
  );

  if (headings.length < 3) {
    return null;
  }

  return (
    <nav
      aria-label="Table of contents"
      className="section-card rounded-[1.5rem] p-5 lg:sticky lg:top-28"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        Contents
      </p>
      <ol className="mt-4 space-y-3">
        {headings.map((heading) => (
          <li key={getSectionId(heading)}>
            <a
              href={`#${getSectionId(heading)}`}
              className="text-sm leading-snug text-muted-light transition-colors hover:text-foreground"
            >
              {heading.content}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
