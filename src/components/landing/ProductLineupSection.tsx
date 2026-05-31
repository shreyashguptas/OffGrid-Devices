import Image from "next/image";
import Link from "next/link";
import { beacon1Content } from "@/content/beacon1";
import { beacon2Content } from "@/content/products";

/**
 * Apple-style product lineup on the company home. Beacon 2 is the featured,
 * in-stock model; Beacon 1 is shown below as a de-emphasized "retired" row.
 *
 * Only two SKUs exist (one retired), so this is driven by an explicit two-item
 * config rather than a generic CMS loop. "Buy" on the featured row deep-links
 * to /products/beacon-2#buy (the merged Beacon 2 page's checkout area);
 * "Learn more" opens the page at the top.
 */
type LineupItem = {
  image: { src: string; alt: string };
  name: string;
  tagline: string;
  learnMoreHref: string;
  buyHref?: string;
  retired?: boolean;
};

const BEACON_2: LineupItem = {
  // Bright Ember-orange hero shot (same family as the PDP collage). The dark
  // plinth `summary.heroImage` stays as the product page's share/OG image.
  image: {
    src: "/beacon-2/parallax/hero-front.jpg",
    alt: "OffGrid Beacon 2 standing on Ember — front face, antenna up",
  },
  name: beacon2Content.summary.brandedName,
  tagline:
    "The MagSafe mesh radio. 3000 mAh, replaceable SMA antenna, magnets that hold.",
  learnMoreHref: beacon2Content.summary.href,
  buyHref: `${beacon2Content.summary.href}#buy`,
};

const BEACON_1: LineupItem = {
  image: beacon1Content.summary.heroImage,
  name: beacon1Content.summary.brandedName,
  tagline: "The original MagSafe Meshtastic radio. Retired.",
  learnMoreHref: beacon1Content.summary.href,
  retired: true,
};

export function ProductLineupSection() {
  return (
    <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <p className="type-mono-label text-ember">THE LINEUP</p>
        <h2 className="type-display-section mt-4 text-bone">The OffGrid lineup.</h2>
        <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.55] text-sand/80">
          The radio in your pocket today, and the one that started it.
        </p>

        <div className="mt-14 space-y-8 md:space-y-12">
          <FeaturedRow item={BEACON_2} />
          <RetiredRow item={BEACON_1} />
        </div>
      </div>
    </section>
  );
}

function FeaturedRow({ item }: { item: LineupItem }) {
  return (
    <article className="border border-bark/40 bg-pitch p-8 text-center md:p-14">
      <div className="relative mx-auto aspect-[4/3] w-full max-w-xl">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          unoptimized
          sizes="(min-width: 768px) 36rem, 90vw"
          className="object-cover"
          priority
        />
      </div>
      <h3 className="type-display-card mt-10 text-bone">{item.name}</h3>
      <p className="font-editorial mx-auto mt-3 max-w-xl text-lg leading-[1.5] text-sand/80">
        {item.tagline}
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
        {item.buyHref ? (
          <Link
            href={item.buyHref}
            className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone sm:px-10 sm:py-5"
          >
            Buy →
          </Link>
        ) : null}
        <Link
          href={item.learnMoreHref}
          className="type-mono-label text-sand transition-colors hover:text-ember"
        >
          Learn more →
        </Link>
      </div>
    </article>
  );
}

function RetiredRow({ item }: { item: LineupItem }) {
  return (
    <article className="flex flex-col gap-6 border border-bark/40 bg-pitch/50 p-6 sm:flex-row sm:items-center sm:gap-8 md:p-8">
      <div className="relative aspect-[4/3] w-full shrink-0 opacity-70 sm:w-56">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          unoptimized
          sizes="(min-width: 640px) 14rem, 90vw"
          className="object-cover"
        />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="font-display text-xl font-bold uppercase tracking-[-0.01em] text-bone/80">
            {item.name}
          </h3>
          <span className="border border-bark px-2 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-dim">
            Sold out
          </span>
        </div>
        <p className="font-editorial mt-2 text-sand/70">{item.tagline}</p>
        <Link
          href={item.learnMoreHref}
          className="type-mono-label mt-4 inline-block text-sand/80 transition-colors hover:text-ember"
        >
          Learn more →
        </Link>
      </div>
    </article>
  );
}
