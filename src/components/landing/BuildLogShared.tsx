import Link from "next/link";
import { FOLLOW_LINKS, type RoadmapStatus } from "@/content/roadmap";

/**
 * Shared building blocks for the home-page build log (the "Flight Plan" home).
 *
 * Brand rule honored here: ONE Ember accent per surface. On the timeline the
 * single `active` phase is the only Ember element; the follow-the-build CTA is
 * its own surface, so it gets its own single Ember moment (the primary CTA).
 */

/* ─── Status chip ──────────────────────────────────────────────────────────
   Maps a roadmap status to a small instrument-style chip. Only `active`
   spends the Ember accent (with a live pulse dot); every other status reads
   in neutral Sand/Dim so the "you are here" point always wins the eye. */
const STATUS_STYLES: Record<
  RoadmapStatus,
  { chip: string; dot: string; pulse?: boolean }
> = {
  active: {
    chip: "border-ember/60 text-ember",
    dot: "bg-ember",
    pulse: true,
  },
  shipping: { chip: "border-bone/35 text-bone", dot: "bg-bone" },
  next: { chip: "border-sand/35 text-sand", dot: "bg-sand" },
  shipped: { chip: "border-bark text-dim", dot: "bg-dim" },
  locked: { chip: "border-bark/70 text-dim/80", dot: "bg-dim/60" },
};

export function StatusChip({
  status,
  label,
  className = "",
}: {
  status: RoadmapStatus;
  label: string;
  className?: string;
}) {
  const s = STATUS_STYLES[status];
  return (
    <span
      className={`inline-flex items-center gap-2 border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] ${s.chip} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {s.pulse ? (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.dot} opacity-70`}
          />
        ) : null}
        <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${s.dot}`} />
      </span>
      {label}
    </span>
  );
}

/* ─── Follow-the-build closing CTA ─────────────────────────────────────────
   Page-closer pointing at the blog (where Project Cheap Drone lives) and X
   (the running short-form log). */
export function FollowBuildCTA() {
  return (
    <section className="relative isolate overflow-hidden border-t border-bark/40 bg-pitch py-20 md:py-28">
      <div aria-hidden className="topo-overlay pointer-events-none absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="type-mono-label text-ember">Building in public</p>
        <h2 className="type-display-section mt-5 text-bone">Follow the build.</h2>
        <p className="font-editorial mx-auto mt-6 max-w-xl text-lg leading-[1.55] text-sand/80">
          I&rsquo;m documenting all of it — what&rsquo;s hard, what&rsquo;s easy,
          what breaks, and the honest cost of every part. Come watch someone
          figure out which end is up.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-4">
          <Link
            href={FOLLOW_LINKS.blog}
            className="inline-flex min-h-[52px] items-center justify-center bg-ember px-8 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone"
          >
            Read the field notes →
          </Link>
          <a
            href={FOLLOW_LINKS.x}
            target="_blank"
            rel="noopener noreferrer"
            className="type-mono-label inline-flex items-center min-h-11 text-sand transition-colors hover:text-ember"
          >
            Updates on X →
          </a>
        </div>
      </div>
    </section>
  );
}
