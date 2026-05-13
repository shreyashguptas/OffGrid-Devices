"use client";

import { motion } from "framer-motion";
import { WaypointMark } from "@/components/shared/WaypointMark";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";

const QUOTE =
  "It feels less like a gadget and more like a piece of expedition gear. The kind of thing you stop noticing in your pocket — until the moment you need it.";

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
          <p
            className="text-bone"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              lineHeight: 1.18,
              letterSpacing: "-0.01em",
            }}
          >
            “{QUOTE}”
          </p>
          <div
            className="mt-9 text-sand"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
          >
            From a Beacon 1 owner · Mesh Trip · 2026
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
