"use client";

import { motion } from "framer-motion";
import { WaypointMark } from "@/components/shared/WaypointMark";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { beacon2Content } from "@/content/products";

const QUOTE = beacon2Content.home.hardwareQuote;
const ATTRIBUTION = beacon2Content.home.hardwareAttribution;

export function HomeHardwareSection() {
  return (
    <section
      id="gallery"
      className="relative border-b border-bark bg-pitch py-28 md:py-40"
    >
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-40" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-[auto_1fr] md:gap-16"
      >
        <motion.div variants={fadeInUp} className="shrink-0 self-start">
          <WaypointMark size={140} />
        </motion.div>

        <motion.div variants={fadeInUp}>
          <p className="font-editorial text-[clamp(28px,3.5vw,44px)] leading-[1.18] tracking-[-0.01em] text-bone">
            “{QUOTE}”
          </p>
          <div className="type-eyebrow mt-9 text-[13px] text-sand">
            {ATTRIBUTION}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
