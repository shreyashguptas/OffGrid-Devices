import Link from "next/link";
import type { Explainer } from "@/content/learn";

/**
 * The card for a single interactive explainer. Shared so the /learn hub and
 * the home-page build log render the exact same block. Self-contained (its own
 * hairline border + hover lift), so it works standalone (stacked on the home
 * page) or inside a grid (the /learn hub).
 */
export function ExplainerCard({ explainer }: { explainer: Explainer }) {
  return (
    <Link
      href={`/learn/${explainer.slug}`}
      className="group flex h-full flex-col border border-border-card bg-pitch p-7 transition-colors hover:bg-surface-elevated md:p-9"
    >
      <span className="type-mono-label-sm text-sand/70">{explainer.eyebrow}</span>
      <div className="type-display-card mt-4 text-bone">{explainer.title}</div>
      <p className="font-body mt-4 flex-1 text-[15px] leading-[1.6] text-sand/90">
        {explainer.blurb}
      </p>
      <span className="mt-7 inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-ember">
        Open the interactive
        <span className="transition-transform group-hover:translate-x-0.5">
          &rarr;
        </span>
      </span>
    </Link>
  );
}
