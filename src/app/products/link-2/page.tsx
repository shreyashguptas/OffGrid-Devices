import type { Metadata } from "next";
import Link from "next/link";
import { WaypointMark } from "@/components/shared/WaypointMark";
import { COMING_SOON_LABEL, link2Content } from "@/content/products";

export const metadata: Metadata = {
  title: `${link2Content.brandedName} — Coming Soon`,
  description: `${link2Content.brandedName} is in development at OffGrid Devices. In the meantime, Beacon 1 is shipping now.`,
  alternates: { canonical: "/products/link-2" },
  // Placeholder page — keep out of search until real content lands.
  robots: {
    index: false,
    follow: true,
  },
};

export default function Link2Product() {
  return (
    <>
      <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-orange-500">
                {COMING_SOON_LABEL}
              </span>
              {link2Content.brandedName}
            </div>

            <h1 className="mt-8 font-display text-5xl font-bold tracking-tight md:text-7xl">
              {link2Content.name}
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold text-muted md:text-4xl">
              {COMING_SOON_LABEL}
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-light md:text-xl">
              {link2Content.description}
            </p>
          </div>

          <div className="section-stage mx-auto mt-12 max-w-3xl p-10">
            <div className="mx-auto flex h-28 w-28 items-center justify-center border border-sand/20 bg-pitch-deep">
              <WaypointMark size={84} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
          {link2Content.cards.map((card) => (
            <article key={card.title} className="section-card rounded-[2rem] p-6">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                {card.kicker}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                {card.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-light">
                {card.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-b border-border-subtle bg-background py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="section-card rounded-[2.5rem] px-8 py-12 md:px-14 md:py-16">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              In the meantime
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Beacon 1 is available now.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              If you want the current OffGrid hardware, Beacon 1 is shipping now
              and already works with the mesh tools people use today.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products/link-1"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              >
                View Beacon 1
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface-elevated px-8 py-4 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-background"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
