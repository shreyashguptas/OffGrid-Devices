"use client";

import { motion } from "framer-motion";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { link2Content } from "@/content/products";

const SPECS = link2Content.specs;

export function HomeSpecsSection() {
  return (
    <section
      id="specs"
      className="relative border-b border-bark bg-pitch py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className="text-ember"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          III · The Numbers
        </div>
        <h2
          className="mt-5 text-bone uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(40px, 6vw, 80px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
          }}
        >
          Everything, no asterisks.
        </h2>
        <p
          className="mt-6 max-w-2xl text-sand"
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: 20,
            lineHeight: 1.5,
          }}
        >
          {link2Content.home.specsDescription}
        </p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-2 gap-y-10 gap-x-8 md:grid-cols-3 lg:grid-cols-4"
        >
          {SPECS.map((spec) => (
            <motion.div key={spec.label} variants={cardVariant}>
              <div
                className="text-sand/55"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }}
              >
                {spec.label}
              </div>
              <div
                className="mt-2 text-bone"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 15,
                  fontWeight: 500,
                }}
              >
                {spec.value}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
