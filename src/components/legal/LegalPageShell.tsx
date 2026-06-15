import type { ReactNode } from "react";

/**
 * Shared layout for legal / policy pages (Privacy, Terms, Shipping, Returns).
 *
 * Light by design: a centered single-column reading layout with eyebrow,
 * title, "Last updated" timestamp, and the lawyer's-disclaimer line at the
 * top so visitors immediately understand the content is templated and
 * should be read against an actual purchase agreement (Etsy checkout
 * presents its own ToS at the point of sale).
 */
export function LegalPageShell({
  eyebrow,
  title,
  lastUpdated,
  children,
}: {
  eyebrow: string;
  title: string;
  /** ISO date string, e.g. "2026-05-18" */
  lastUpdated: string;
  children: ReactNode;
}) {
  return (
    <article className="bg-pitch">
      <header className="border-b border-bark/30 pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-3xl px-6">
          <p className="type-mono-label text-ember">{eyebrow}</p>
          <h1 className="type-display-section mt-4 text-bone">{title}</h1>
          <p className="type-mono-label mt-6 text-sand/65">
            LAST UPDATED ·{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </div>
      </header>

      <div className="border-b border-bark/30 bg-pitch-deep py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <div className="prose-legal font-editorial space-y-6 text-base leading-[1.7] text-sand/85 md:text-lg [&_h2]:type-display-section [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-2xl [&_h2]:text-bone [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-display [&_h3]:text-lg [&_h3]:font-bold [&_h3]:uppercase [&_h3]:tracking-[0.1em] [&_h3]:text-bone [&_a]:text-ember [&_a:hover]:underline [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-bone">
            {children}
          </div>
        </div>
      </div>
    </article>
  );
}
