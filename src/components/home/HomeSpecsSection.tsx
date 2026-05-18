"use client";

import { motion } from "framer-motion";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { link2Content } from "@/content/products";

const SPECS = link2Content.specs;

// The four "hero" metrics surface first — the ones that win the buying
// decision. The remainder live in a clean spec sheet below.
const HERO_LABELS = ["Range", "Battery", "Encryption", "Radio"] as const;

type Hero = {
  label: string;
  big: string;   // dominant display value
  unit?: string; // small mono unit suffix
  detail: string;
};

const HERO_DETAILS: Record<(typeof HERO_LABELS)[number], Hero> = {
  Range: { label: "Range", big: "10+", unit: "km", detail: "Line of sight" },
  Battery: { label: "Battery", big: "3000", unit: "mAh", detail: "Li-Po · weeks of standby" },
  Encryption: { label: "Encryption", big: "AES", unit: "256", detail: "Per-channel" },
  Radio: { label: "Radio", big: "LoRa", unit: "SX1262", detail: "902–928 MHz · US915" },
};

export function HomeSpecsSection() {
  const heroSet = new Set<string>(HERO_LABELS);
  const rest = SPECS.filter((s) => !heroSet.has(s.label));

  return (
    <section
      id="specs"
      className="relative border-b border-bark bg-pitch py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="max-w-3xl">
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
            IV · The Numbers
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
              fontSize: "clamp(18px, 1.8vw, 22px)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            {link2Content.home.specsDescription}
          </p>
        </div>

        {/* Hero metrics — the four numbers that close the deal */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mt-14 grid grid-cols-2 border-t border-l border-sand/15 md:mt-20 md:grid-cols-4"
        >
          {HERO_LABELS.map((key) => {
            const m = HERO_DETAILS[key];
            return (
              <motion.div
                key={m.label}
                variants={cardVariant}
                className="relative flex flex-col gap-3 border-b border-r border-sand/15 px-6 py-8 md:px-8 md:py-10"
              >
                <div
                  className="text-sand/55"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                  }}
                >
                  {m.label}
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className="text-bone"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 900,
                      fontSize: "clamp(40px, 5.5vw, 64px)",
                      lineHeight: 0.92,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {m.big}
                  </span>
                  {m.unit && (
                    <span
                      className="text-ember"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 14,
                        letterSpacing: "0.10em",
                        textTransform: "uppercase",
                      }}
                    >
                      {m.unit}
                    </span>
                  )}
                </div>
                <div
                  className="mt-auto text-sand/75"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    lineHeight: 1.45,
                  }}
                >
                  {m.detail}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Spec sheet — the remaining specs as a hairline-divided two-column
            instrument printout. Scannable, dense without being noisy. */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-16 grid grid-cols-1 gap-x-12 md:mt-20 md:grid-cols-2"
        >
          {rest.map((spec) => (
            <motion.div
              key={spec.label}
              variants={cardVariant}
              className="flex items-baseline justify-between gap-6 border-b border-sand/12 py-5"
            >
              <div
                className="text-sand/65"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.20em",
                  textTransform: "uppercase",
                }}
              >
                {spec.label}
              </div>
              <div
                className="text-right text-bone"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 600,
                  fontSize: 15,
                  letterSpacing: "-0.01em",
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
