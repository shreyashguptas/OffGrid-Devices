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
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-30" />

      {/* Hero content — single-column stack at every breakpoint.
          The 3D model is the visual anchor (user-prioritised over copy), so
          on desktop the order reverses so the model fills the first fold
          before the copy. DOM order stays text → model for natural reading
          order without CSS. Mobile/tablet keeps the conventional
          headline-first order, which the user has confirmed reads well on
          phones. */}
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 pb-16 pt-24 sm:px-6 md:gap-14 md:px-8 md:pb-20 md:pt-28 lg:flex-col-reverse lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
        {/* Text block — capped width so headlines wrap at a comfortable
            measure regardless of viewport. */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex min-w-0 max-w-3xl flex-col"
        >
          <motion.div
            variants={fadeInUp}
            className="type-mono-label-sm inline-flex w-fit max-w-full items-center gap-x-2.5 whitespace-nowrap border border-sand/25 px-3 py-2 text-muted sm:px-3.5"
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
              surface="hero"
              className="inline-flex min-h-[56px] w-full cursor-pointer items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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

        {/* 3D model row — full container width up to a 1000px cap, kept
            square so the viewer's aspect-aware rest offset zeroes out at 1:1
            (FIT_RATIO sizes the model by canvas height in Beacon3DViewer). */}
        <div
          className="relative mx-auto aspect-square w-full min-w-0 max-w-[1000px]"
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
