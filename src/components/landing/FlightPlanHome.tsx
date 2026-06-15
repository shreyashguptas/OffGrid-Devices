import Image from "next/image";
import Link from "next/link";
import { HeroMeshBackground } from "@/components/landing/HeroMeshBackground";
import {
  timelineAhead,
  timelineRecent,
  type PhaseUpdate,
  type PhaseUpdateKind,
  type RoadmapPhase,
} from "@/content/roadmap";
import { FollowBuildCTA, StatusChip } from "@/components/landing/BuildLogShared";

/**
 * Variant D — "Flight Plan" (the chosen direction, refined to a build log).
 *
 * Two refinements over the first pass:
 *  1. Newest-first. The line reads like a changelog — the active "now" phase
 *     sits at the very top, then history descends beneath it (most recent →
 *     oldest). The road ahead is shown lower down and deliberately quieter, so
 *     the future is visible without stealing the top of the page.
 *  2. A minimal hero. The mesh stays, the headline stays, but the busy little
 *     status table is gone. The "now" status is a single, legible line — the
 *     one Ember moment on the surface — and a quiet jump link into the log.
 *
 * Image-led and low on text on purpose: each real entry is a media tile + a
 * single caption, an easy format to follow and to drop new photos into.
 */
export function FlightPlanHome() {
  return (
    <main className="bg-pitch">
      <FlightPlanHero />
      <FlightPlanLog />
      <FollowBuildCTA />
    </main>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────
   Minimal. Mesh background + headline + ONE readable "live now" status +
   a quiet jump into the log. No status table, no competing buttons. */
function FlightPlanHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-bark/30 bg-pitch pt-32 pb-20 md:flex md:min-h-[560px] md:items-center md:pt-40 md:pb-24">
      <HeroMeshBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pitch/90 via-pitch/55 to-pitch/15"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <p className="type-mono-label text-ember">OffGrid · Building in public</p>
        {/*
          DELIBERATE, USER-REQUESTED BRAND DEVIATION: this hero carries TWO
          accents (the Ember text-selection highlight on "Cheap Drone" + a
          broadcast-red "live" treatment), which breaks the "one Ember per
          surface" rule on purpose. Requested explicitly — do not "fix" it.
        */}
        <h1 className="type-display-hero mt-5 text-bone">
          Project{" "}
          {/* permanent text-selection highlight: same colors as ::selection */}
          <span className="-mx-0.5 box-decoration-clone bg-ember px-2 text-[var(--app-selection-fg)]">
            Cheap Drone
          </span>{" "}
          is{" "}
          {/* "live" broadcast indicator: red word + pulsing red dot */}
          <span className="text-[#FF3B30]">
            live
            <span className="relative ml-2 inline-flex h-2 w-2 align-middle">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3B30] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3B30]" />
            </span>
          </span>
          <span className="text-bone">.</span>
        </h1>
        <p className="type-editorial-lead font-editorial mt-6 max-w-xl text-sand/85">
          The cheapest flying drone we can build — documented in the open, one
          phase at a time.
        </p>

        {/* the single Ember moment: a legible "where we are right now" line */}
        <div className="mt-9 inline-flex max-w-full flex-wrap items-center gap-x-4 gap-y-2 border border-ember/35 bg-pitch/55 px-5 py-4 backdrop-blur-sm">
          <LiveBadge />
          <span className="text-[15px] leading-snug text-bone md:text-base">
            Phase 0 — learning to fly in a simulator
          </span>
        </div>

        <div className="mt-9">
          <Link
            href="#log"
            className="type-mono-label inline-flex items-center min-h-11 text-sand transition-colors hover:text-ember"
          >
            View the flight plan ↓
          </Link>
        </div>
      </div>
    </section>
  );
}

/* A hero-only "LIVE" badge. Mirrors StatusChip's shape + ping-pulse pattern,
   but recolored to broadcast red (#FF3B30) — part of the deliberate,
   user-requested two-accent deviation. NOT the shared StatusChip (the timeline
   keeps using that), so this red treatment stays scoped to the hero. */
function LiveBadge() {
  return (
    <span className="inline-flex items-center gap-2 border border-[#FF3B30]/60 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#FF3B30]">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3B30] opacity-70" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF3B30]" />
      </span>
      LIVE
    </span>
  );
}

/* ─── The log ──────────────────────────────────────────────────────────────
   Newest at the top: the active phase, then history descending. The road
   ahead follows as a quieter, forward-looking teaser block. */
function FlightPlanLog() {
  return (
    <section id="log" className="bg-pitch-deep py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <p className="type-mono-label text-ember">Flight plan</p>
        <h2 className="type-display-section mt-4 text-bone">The build log.</h2>
        <p className="font-editorial mt-6 max-w-xl text-lg leading-[1.55] text-sand/80">
          Newest at the top. Scroll down through everything that&rsquo;s already
          happened — and the road still ahead.
        </p>

        {/* recent — now, then history descending */}
        <ol className="relative mt-14">
          <span
            aria-hidden
            className="absolute left-[11px] top-3 bottom-3 w-px bg-bark md:left-[13px]"
          />
          {timelineRecent.map((phase, i) => (
            <LogEntry key={phase.id} phase={phase} index={i} />
          ))}
        </ol>

        {/* the road ahead — lower, quieter, forward order */}
        <div className="mt-16 border-t border-bark/40 pt-12">
          <p className="type-mono-label text-sand/55">The road ahead</p>
          <p className="font-editorial mt-3 max-w-md text-base leading-[1.55] text-sand/70">
            What&rsquo;s next, and the slow reveal after it — including the point
            where the mesh work meets the drone.
          </p>

          <ol className="relative mt-9">
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px border-l border-dashed border-bark md:left-[13px]"
            />
            {timelineAhead.map((phase) => (
              <AheadEntry key={phase.id} phase={phase} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* A full log entry: image tile + caption. Used for the recent (now + history)
   line, where every phase has — or will have — a real photo. */
function LogEntry({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const isActive = phase.status === "active";
  const isShipped = phase.status === "shipped";

  return (
    <li className="relative grid grid-cols-[24px_1fr] gap-x-5 pb-14 last:pb-0 md:grid-cols-[28px_1fr] md:gap-x-7">
      {/* rail node */}
      <div className="flex justify-center">
        <span className="relative z-10 mt-2 flex h-[15px] w-[15px] items-center justify-center">
          {isActive ? (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
          ) : null}
          <span
            className={`relative h-[15px] w-[15px] rounded-full border-2 ${
              isActive
                ? "border-ember bg-ember"
                : isShipped
                  ? "border-bark bg-pitch-deep"
                  : "border-sand/60 bg-pitch-deep"
            }`}
          />
        </span>
      </div>

      {/* content — image + text side by side on wide screens; image stacks on
         top (image-first) on narrow screens. The wide text column leaves room
         to add longer write-ups per phase later. */}
      <div className={isShipped ? "opacity-85" : ""}>
        <div className="grid gap-5 md:grid-cols-2 md:items-start md:gap-10">
          <PhaseMedia phase={phase} priority={index < 2} active={isActive} />

          <div>
            {phase.date ? (
              <p className="font-mono text-[13px] tracking-[0.06em] text-sand/70">
                {phase.date}
              </p>
            ) : null}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-sand/55">
                {phase.marker}
              </span>
              <StatusChip status={phase.status} label={phase.statusLabel} />
            </div>
            <h3
              className={`mt-4 font-display font-bold uppercase tracking-[-0.01em] ${
                isActive
                  ? "text-2xl text-bone md:text-[26px]"
                  : "text-xl text-bone/95"
              }`}
            >
              {phase.title}
            </h3>
            {phase.tagline ? (
              <p className="font-editorial mt-2 text-lg leading-[1.5] text-sand/80">
                {phase.tagline}
              </p>
            ) : null}
            {phase.href ? (
              <Link
                href={phase.href}
                className="type-mono-label mt-4 inline-flex items-center min-h-11 text-sand transition-colors hover:text-ember"
              >
                {phase.hrefLabel ?? "More"} →
              </Link>
            ) : null}
          </div>
        </div>

        {/* running build log for this phase — the things done / broke / learned */}
        <PhaseUpdates updates={phase.updates} />
      </div>
    </li>
  );
}

/* The per-phase running build log: a newest-first list of small dated updates,
   each tagged by kind (did / broke / learned / shipped). Hangs off a hairline
   rule so it reads as "belonging to" the phase above it. */
const UPDATE_KIND: Record<PhaseUpdateKind, { label: string; cls: string }> = {
  did: { label: "Did", cls: "border-sand/30 text-sand/75" },
  learned: { label: "Learned", cls: "border-bone/35 text-bone/90" },
  broke: { label: "Broke", cls: "border-[#FF3B30]/45 text-[#FF6B5C]" },
  shipped: { label: "Shipped", cls: "border-ember/45 text-ember" },
};

function PhaseUpdates({ updates }: { updates?: RoadmapPhase["updates"] }) {
  if (!updates?.length) return null;
  return (
    <ul className="mt-8 space-y-8 border-l border-bark/45 pl-5 md:pl-6">
      {updates.map((u, i) => (
        <UpdateItem key={`${u.date}-${i}`} update={u} />
      ))}
    </ul>
  );
}

/* A single rich build-log update: date + kind tag, then any of an optional
   headline, paragraphs of text, image(s), and an embedded tweet — all inline,
   because the home-page log IS the record (it doesn't link out to a blog). */
function UpdateItem({ update }: { update: PhaseUpdate }) {
  const k = UPDATE_KIND[update.kind];
  const manyImages = (update.images?.length ?? 0) > 1;
  return (
    <li>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="font-mono text-[11px] tracking-[0.06em] text-sand/55">
          {update.date}
        </span>
        <span
          className={`border px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-[0.14em] ${k.cls}`}
        >
          {k.label}
        </span>
      </div>

      {update.title ? (
        <h4 className="mt-2 font-display text-[15px] font-bold uppercase tracking-[-0.01em] text-bone md:text-base">
          {update.title}
        </h4>
      ) : null}

      {update.body?.length ? (
        <div className="mt-2 space-y-3">
          {update.body.map((para, idx) => (
            <p
              key={idx}
              className="font-editorial max-w-2xl text-base leading-[1.6] text-sand/80"
            >
              {para}
            </p>
          ))}
        </div>
      ) : null}

      {update.images?.length ? (
        <div
          className={`mt-4 ${
            manyImages ? "grid max-w-2xl gap-3 sm:grid-cols-2" : "max-w-xl"
          }`}
        >
          {update.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/9] w-full overflow-hidden border border-bark/45"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 28rem, 90vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {update.tweetUrl ? <TweetEmbed url={update.tweetUrl} /> : null}
    </li>
  );
}

/* Placeholder tweet embed — a tidy card that links out. A real inline render
   (avatar, text, media) can be wired later with Vercel's `react-tweet`, which
   renders server-side without the X widget script. */
function TweetEmbed({ url }: { url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-flex max-w-md items-center gap-3 border border-border-card bg-pitch/40 px-4 py-3 transition-colors hover:border-ember/40"
    >
      <span className="font-display text-sm font-bold text-bone">𝕏</span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sand/70">
        Embedded post →
      </span>
    </a>
  );
}

/* A compact, text-only entry for the road ahead — no image tile (these phases
   are teased, not built). The convergence beat gets the diamond node + tag. */
function AheadEntry({ phase }: { phase: RoadmapPhase }) {
  const isConvergence = phase.convergence === true;

  return (
    <li className="relative grid grid-cols-[24px_1fr] gap-x-5 pb-8 last:pb-0 md:grid-cols-[28px_1fr] md:gap-x-7">
      <div className="flex justify-center">
        <span className="relative z-10 mt-1.5 flex h-3 w-3 items-center justify-center">
          <span
            className={
              isConvergence
                ? "h-3 w-3 rotate-45 border-2 border-ember bg-pitch-deep"
                : "h-2.5 w-2.5 rounded-full border border-bark bg-pitch-deep"
            }
          />
        </span>
      </div>

      <div className="opacity-90">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-sand/55">
            {phase.marker}
          </span>
          <StatusChip status={phase.status} label={phase.statusLabel} />
          {isConvergence ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
              ◆ Mesh ✕ Drone
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-[-0.01em] text-bone/90">
          {phase.title}
        </h3>
        {phase.tagline ? (
          <p className="font-editorial mt-1.5 max-w-lg text-base leading-[1.5] text-sand/70">
            {phase.tagline}
          </p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * The media tile for one phase. Renders the photo when present, otherwise a
 * branded placeholder that names the slot — a clear "drop a photo here" cue
 * as the build produces real images.
 */
function PhaseMedia({
  phase,
  priority,
  active,
}: {
  phase: RoadmapPhase;
  priority: boolean;
  active: boolean;
}) {
  const frame = active ? "border-ember/40" : "border-bark/45";

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden border ${frame}`}
    >
      {phase.image ? (
        <Image
          src={phase.image.src}
          alt={phase.image.alt}
          fill
          unoptimized
          sizes="(min-width: 768px) 42rem, 90vw"
          className="object-cover"
          priority={priority}
        />
      ) : (
        <div className="section-stage relative flex h-full w-full items-center justify-center">
          <div aria-hidden className="topo-overlay absolute inset-0" />
          <div className="relative flex flex-col items-center gap-2 text-center">
            <ApertureGlyph className={active ? "text-ember" : "text-sand/40"} />
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-sand/55">
              {phase.marker} · field image
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
              Coming as it&rsquo;s built
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function ApertureGlyph({ className = "" }: { className?: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 L12 12 L19 16" />
      <path d="M12 12 L4 9" />
      <path d="M12 12 L16 20" />
    </svg>
  );
}
