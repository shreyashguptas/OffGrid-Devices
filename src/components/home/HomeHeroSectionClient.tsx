"use client";

import dynamic from "next/dynamic";
import { motion, type Variants } from "framer-motion";
import { Beacon2CheckoutButton } from "@/components/Beacon2CheckoutButton";
import { MeshtasticMark } from "@/components/shared/icons/MeshtasticMark";
import { UsFlag } from "@/components/shared/icons/UsFlag";
import { beacon2Content } from "@/content/products";

const Beacon3DViewer = dynamic(
  () =>
    import("@/components/home/Beacon3DViewer").then((m) => m.Beacon3DViewer),
  { ssr: false },
);

/* ───── Field Specimen hero ────────────────────────────────────────────
   Concept: the 3D Beacon sits at the geometric centre of the hero like a
   museum-cased instrument; sparse instrument-strip text orbits at the four
   corners and never competes with the product. Type does the heavy lifting
   at the edges; the model is the show.

   Layout: vertical flex (top band · model · bottom band), full svh tall so
   the model breathes. Model wrapper sizes via min(95vw, 1000px) — the
   product wins the page at every viewport, capping at 1000px square on
   wide screens. On viewports shorter than the hero composition the bottom
   band sits just below the fold, prompting a small reveal scroll. That's
   intentional: the model is the unambiguous protagonist.

   Motion: orchestrated mount sequence. Top labels descend in first (slight
   downward slide), the model fades + scales up over a slower 1.2s arc, then
   the bottom labels rise in. You watch the chrome assemble around the
   centrepiece. */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const cornerDown = (delay: number): Variants => ({
  hidden: { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  },
});

const cornerUp = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT, delay },
  },
});

const modelReveal: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.2, ease: EASE_OUT, delay: 0.15 },
  },
};

export function HomeHeroSectionClient({ buyLabel }: { buyLabel: string }) {
  const tagline = `${beacon2Content.home.heroTitle.replace(
    /\.$/,
    "",
  )}, ${beacon2Content.home.heroSubtitle.replace(/\.$/, "").toLowerCase()}.`;

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden border-b border-bark bg-pitch">
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-30" />

      {/* Top padding clears the fixed nav (75px on lg, 69px on mobile) with
          a comfortable visual gap at every viewport — the previous
          lg:pt-16 was actually obscuring the eyebrow behind the navbar. */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pb-10 pt-28 sm:px-6 md:px-8 md:pb-12 md:pt-28 lg:px-10 lg:pb-14 lg:pt-32">
        {/* ── Top band — product mark · provenance badge ───────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cornerDown(0)}
            className="flex items-baseline font-display font-black uppercase leading-none tracking-[-0.02em] text-bone"
            style={{ fontSize: "clamp(26px, 3vw, 36px)" }}
          >
            <span>Beacon</span>
            <span
              aria-hidden
              className="mx-3 font-light text-dim"
              style={{ fontSize: "0.7em" }}
            >
              ·
            </span>
            <span>02</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cornerDown(0.08)}
            className="type-mono-label-sm inline-flex w-fit max-w-full items-center gap-x-2.5 whitespace-nowrap border border-sand/25 px-3 py-2 text-muted sm:px-3.5"
          >
            <span>EST. 2026 · DESIGNED + ASSEMBLED IN USA</span>
            <UsFlag />
          </motion.div>
        </div>

        {/* ── Centre — the 3D Beacon. Floats in the middle of remaining
              vertical space, sizes fluidly to viewport. ───────────────── */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={modelReveal}
          className="relative my-8 flex min-h-0 flex-1 items-center justify-center md:my-10 lg:my-12"
        >
          <div
            className="relative mx-auto aspect-square w-full min-w-0 max-w-[min(95vw,1000px)]"
            aria-label="OffGrid Beacon 2 mesh radio — drag or hover to rotate"
          >
            <div
              aria-hidden
              className="ember-radial-glow pointer-events-none absolute inset-[10%]"
            />
            <Beacon3DViewer className="h-full w-full" />
          </div>
        </motion.div>

        {/* ── Bottom band — editorial tagline · primary CTA ────────────── */}
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cornerUp(0.4)}
            className="flex max-w-md flex-col gap-3"
          >
            <p
              className="font-editorial italic leading-[1.15] tracking-[-0.01em] text-sand"
              style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
            >
              {tagline}
            </p>
            <div
              className="type-mono-label inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sand/55"
              style={{ fontSize: "clamp(10px, 1vw, 11px)" }}
            >
              <span>MagSafe · No towers · Comes with</span>
              <MeshtasticMark />
              <span>Meshtastic</span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={cornerUp(0.5)}
            className="w-full sm:w-auto"
          >
            <Beacon2CheckoutButton
              defaultLabel={buyLabel}
              loadingLabel={beacon2Content.summary.loadingLabel}
              surface="hero"
              className="inline-flex min-h-[56px] w-full cursor-pointer items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              showArrow={false}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
