"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Beacon2CheckoutButton } from "@/components/Beacon2CheckoutButton";
import { MeshtasticMark } from "@/components/shared/icons/MeshtasticMark";
import { UsFlag } from "@/components/shared/icons/UsFlag";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { beacon2Content } from "@/content/products";

const Beacon3DViewer = dynamic(
  () =>
    import("@/components/home/Beacon3DViewer").then((m) => m.Beacon3DViewer),
  { ssr: false },
);

export function HomeHeroSectionClient({ buyLabel }: { buyLabel: string }) {
  return (
    <section className="relative overflow-hidden border-b border-bark bg-pitch">
      {/* Background gradient — warm tone behind the model column,
          neutral on the left where text lives. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 80% 40%, var(--app-color-bark) 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 15% 110%, var(--app-color-pitch-low) 0%, transparent 60%), linear-gradient(180deg, var(--app-color-pitch-low) 0%, var(--app-color-pitch) 100%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 topo-overlay opacity-30" />

      {/* Content grid.
          Mobile/tablet: vertical stack — text on top, model square below.
          Desktop (lg+): true 2-column grid, both columns vertically centered,
          hero takes full viewport height. No absolute positioning, no overlap. */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-24 sm:px-6 md:gap-14 md:px-8 md:pb-20 md:pt-28 lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-32">
        {/* Text column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex min-w-0 max-w-xl flex-col"
        >
          <motion.div
            variants={fadeInUp}
            className="type-mono-label-sm inline-flex w-fit max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 border border-sand/25 px-3 py-2 text-muted sm:px-3.5"
          >
            <span>EST. 2026 · DESIGNED + ASSEMBLED IN THE USA</span>
            <UsFlag />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="type-display-hero mt-7 text-bone md:mt-9"
          >
            {beacon2Content.home.heroTitle.replace(/\.$/, "")}
            <br />
            <span className="text-ember">
              {beacon2Content.home.heroSubtitle.replace(/\.$/, "")}.
            </span>
          </motion.h1>

          <motion.h2
            variants={fadeInUp}
            className="type-mono-label mt-5 max-w-md text-ember md:mt-6"
            style={{ fontSize: "clamp(10px, 2.4vw, 12px)" }}
          >
            MagSafe LoRa mesh radio · Meshtastic pre-flashed
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="type-editorial-lead mt-5 max-w-md text-sand md:mt-7"
          >
            MagSafe mesh radio. No towers. No SIMs.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-7 md:mt-10">
            <Beacon2CheckoutButton
              defaultLabel={buyLabel}
              loadingLabel={beacon2Content.summary.loadingLabel}
              className="inline-flex min-h-[56px] w-full items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              showArrow={false}
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="type-mono-label mt-4 inline-flex items-center gap-2 text-sand md:mt-5"
            style={{ fontSize: "clamp(10px, 2.4vw, 12px)" }}
          >
            <span>Comes pre-installed with</span>
            <MeshtasticMark />
            <span>Meshtastic</span>
          </motion.div>
        </motion.div>

        {/* 3D model column — constrained to a square so the canvas knows its
            bounds and the model centers itself (the viewer's aspect-aware
            rest offset zeroes out at 1:1). */}
        <div
          className="relative mx-auto aspect-square w-full min-w-0 sm:max-w-[480px] md:max-w-[560px] lg:mx-0 lg:ml-auto lg:max-w-none"
          aria-label="OffGrid Beacon 2 mesh radio — drag or hover to rotate"
        >
          <div
            aria-hidden
            className="ember-radial-glow pointer-events-none absolute inset-[10%]"
          />
          <Beacon3DViewer className="h-full w-full" />
        </div>
      </div>
    </section>
  );
}
