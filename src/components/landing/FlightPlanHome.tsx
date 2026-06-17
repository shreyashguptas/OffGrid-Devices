import Image from "next/image";
import Link from "next/link";
import { HeroMeshBackground } from "@/components/landing/HeroMeshBackground";
import {
  timelineAhead,
  timelineRecent,
  type PhaseUpdate,
  type RoadmapPhase,
} from "@/content/roadmap";
import { Tweet } from "react-tweet";
import { FollowBuildCTA, StatusChip } from "@/components/landing/BuildLogShared";

/**
 * The home page — "Journal" direction.
 *
 * A deliberately quiet masthead over the mesh, then the build log reads
 * straight away as a high-contrast reading journal. Everything between the
 * headline and the log (the old subhead, the "live" status box, the "view the
 * flight plan" button, the "Flight plan" label, the "The build log." heading
 * and its explainer) has been stripped: the page is the headline + the log.
 *
 * Readability is the point. The log is a single reading column (narrow measure)
 * with larger editorial body type and a brighter timeline rail so it holds up
 * in both dark and light mode — the previous Bark rail was nearly invisible on
 * the near-black log surface.
 */
export function FlightPlanHome() {
  return (
    <main className="bg-pitch">
      <JournalHero />
      <JournalLog />
      <FollowBuildCTA />
    </main>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────────
   A compact masthead: mesh background + eyebrow + the one headline. No subhead,
   no status box, no buttons. The headline itself carries the "live" signal. */
function JournalHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-bark/30 bg-pitch pt-32 pb-16 md:pt-40 md:pb-20">
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
      </div>
    </section>
  );
}

/* ─── The log ──────────────────────────────────────────────────────────────
   Newest at the top, no preamble. A single reading column with a brighter rail.
   The active phase leads, history descends, then the quieter road ahead. */
function JournalLog() {
  return (
    <section id="log" className="bg-pitch-deep py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        {/* recent — now, then history descending */}
        <ol className="relative">
          <span
            aria-hidden
            className="absolute left-[11px] top-3 bottom-3 w-px bg-sand/25 md:left-[13px]"
          />
          {timelineRecent.map((phase, i) => (
            <LogEntry key={phase.id} phase={phase} index={i} />
          ))}
        </ol>

        {/* the road ahead — lower, quieter, forward order */}
        <div className="mt-16 border-t border-sand/15 pt-12">
          <p className="type-mono-label text-sand/60">The road ahead</p>
          <p className="font-body mt-3 max-w-xl text-xl leading-[1.5] text-sand/75 md:text-2xl">
            What&rsquo;s next, and the slow reveal after it — including the point
            where the mesh work meets the drone.
          </p>

          <ol className="relative mt-9">
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px border-l border-dashed border-sand/25 md:left-[13px]"
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

/* A full log entry, journal style: a single reading column — marker + date,
   then one title (no subtitle), an optional link, optional media, then the
   running build log for the phase beneath it. The title is the whole header;
   what we're actually doing lives in the dated updates underneath. */
function LogEntry({ phase, index }: { phase: RoadmapPhase; index: number }) {
  const isActive = phase.status === "active";
  const isShipped = phase.status === "shipped";

  return (
    <li className="relative grid grid-cols-[24px_1fr] gap-x-5 pb-16 last:pb-0 md:grid-cols-[28px_1fr] md:gap-x-7">
      {/* rail node */}
      <div className="flex justify-center">
        <span className="relative z-10 mt-2 flex h-[15px] w-[15px] items-center justify-center">
          {isActive ? (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember opacity-60" />
          ) : null}
          <span
            className={`relative h-[15px] w-[15px] rounded-full border-2 ${
              isActive ? "border-ember bg-ember" : "border-sand/55 bg-pitch-deep"
            }`}
          />
        </span>
      </div>

      <div className={isShipped ? "opacity-90" : ""}>
        {/* one quiet meta line — phase marker + date. No status chip: the one
           live phase is signalled by its Ember rail node, and the date carries
           the rest. Keeps every entry down to a clean title. */}
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-sand/55 md:text-sm">
            {phase.marker}
          </span>
          {phase.date ? (
            <span className="font-mono text-sm font-semibold tracking-[0.05em] text-sand/90 md:text-[15px]">
              {phase.date}
            </span>
          ) : null}
        </div>
        {/* The title is the whole header — no subtitle. It can run to a full
           sentence; the detail lives in the dated updates below. */}
        <h3
          className={`mt-3 font-display font-bold uppercase leading-[1.05] tracking-[-0.01em] text-bone ${
            isActive ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
          }`}
        >
          {phase.title}
        </h3>
        {phase.href ? (
          <Link
            href={phase.href}
            className="type-mono-label mt-4 inline-flex items-center min-h-11 text-sand transition-colors hover:text-ember"
          >
            {phase.hrefLabel ?? "More"} →
          </Link>
        ) : null}

        {/* media only when there's a real photo — no empty placeholder void */}
        {phase.image ? (
          <div className="mt-6">
            <PhaseMedia phase={phase} priority={index < 2} active={isActive} />
          </div>
        ) : null}

        {/* running build log for this phase — the things done / broke / learned */}
        <PhaseUpdates updates={phase.updates} />
      </div>
    </li>
  );
}

/* The per-phase running build log: a newest-first list of small dated updates.
   Hangs off a hairline rule so it reads as "belonging to" the phase above it. */
function PhaseUpdates({ updates }: { updates?: RoadmapPhase["updates"] }) {
  if (!updates?.length) return null;
  return (
    <ul className="mt-9 space-y-9 border-l border-sand/20 pl-5 md:pl-6">
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
  const manyImages = (update.images?.length ?? 0) > 1;
  return (
    <li>
      <span className="font-mono text-[13px] font-semibold tracking-[0.06em] text-sand/80">
        {update.date}
      </span>

      {update.title ? (
        <h4 className="mt-3 font-display text-xl font-bold uppercase tracking-[-0.01em] text-bone md:text-2xl">
          {update.title}
        </h4>
      ) : null}

      {update.body?.length ? (
        <div className="mt-3 space-y-4">
          {update.body.map((para, idx) => (
            <p
              key={idx}
              className="font-body max-w-prose text-xl leading-[1.6] text-sand/90 md:text-2xl md:leading-[1.6]"
            >
              {para}
            </p>
          ))}
        </div>
      ) : null}

      {update.images?.length ? (
        <div className={`mt-5 ${manyImages ? "grid gap-3 sm:grid-cols-2" : ""}`}>
          {update.images.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-[16/9] w-full overflow-hidden border border-border-card"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                unoptimized
                sizes="(min-width: 768px) 42rem, 90vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      ) : null}

      {update.links?.length ? (
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {update.links.map((l) => (
            <li key={l.url}>
              <a
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-sand/75 transition-colors hover:text-ember"
              >
                {l.label} →
              </a>
            </li>
          ))}
        </ul>
      ) : null}

      {update.tweetUrl ? <TweetEmbed url={update.tweetUrl} /> : null}
    </li>
  );
}

/* The tweet ID is the trailing number in an x.com / twitter.com status URL. */
function tweetIdFromUrl(url: string): string | null {
  const m = url.match(/(?:twitter|x)\.com\/[^/]+\/status(?:es)?\/(\d+)/i);
  return m?.[1] ?? null;
}

/* Inline tweet embed. `react-tweet` renders the tweet during our normal server
   render, pulling its data from X's public syndication CDN with a plain fetch
   — no Vercel infra, no client-side X widget script, and no Node APIs, so it's
   safe on Cloudflare Workers. It themes off the same `data-theme` attribute the
   site sets on <html>, so it matches light/dark automatically. If the URL isn't
   a recognizable tweet we fall back to a quiet link; if the tweet itself can't
   be loaded, react-tweet renders its own "not found" card linking to X. */
function TweetEmbed({ url }: { url: string }) {
  const id = tweetIdFromUrl(url);
  if (!id) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex max-w-md items-center gap-3 border border-border-card bg-pitch/40 px-4 py-3 transition-colors hover:border-ember/40"
      >
        <span className="font-display text-sm font-bold text-bone">𝕏</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-sand/75">
          View post on X →
        </span>
      </a>
    );
  }
  return (
    <div className="mt-5 w-full max-w-[32rem]">
      <Tweet id={id} />
    </div>
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
                : "h-2.5 w-2.5 rounded-full border border-sand/45 bg-pitch-deep"
            }
          />
        </span>
      </div>

      <div className="opacity-95">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-[13px] font-medium uppercase tracking-[0.18em] text-sand/60 md:text-sm">
            {phase.marker}
          </span>
          <StatusChip status={phase.status} label={phase.statusLabel} />
          {isConvergence ? (
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ember">
              ◆ Mesh ✕ Drone
            </span>
          ) : null}
        </div>
        <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-[-0.01em] text-bone/90 md:text-3xl">
          {phase.title}
        </h3>
        {phase.tagline ? (
          <p className="font-body mt-2 max-w-xl text-xl leading-[1.5] text-sand/75">
            {phase.tagline}
          </p>
        ) : null}
      </div>
    </li>
  );
}

/**
 * The media tile for one phase — only rendered when the phase has a real photo.
 * Phases without one render nothing (the caller guards on `phase.image`), so the
 * log never shows an empty "coming soon" placeholder box.
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
  if (!phase.image) return null;
  const frame = active ? "border-ember/40" : "border-border-card";

  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden border ${frame}`}
    >
      <Image
        src={phase.image.src}
        alt={phase.image.alt}
        fill
        unoptimized
        sizes="(min-width: 768px) 42rem, 90vw"
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
