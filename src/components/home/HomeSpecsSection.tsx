"use client";

import { motion } from "framer-motion";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { link1Content } from "@/content/link1";

type SpecRow = {
  label: string;
  value: string;
};

const EXTENDED_SPECS: SpecRow[] = [
  { label: "Range", value: "10+ km LoS" },
  { label: "Radio", value: "LoRa SX1262 · 915 MHz" },
  { label: "Battery", value: "Rechargeable Li-Po" },
  { label: "Charging", value: "USB-C · fast charge" },
  { label: "Bluetooth", value: "5.0 LE · iOS + Android" },
  { label: "Encryption", value: "AES-256 per channel" },
  { label: "Mounting", value: "MagSafe · N52 ring" },
  { label: "Body", value: "Transparent polycarbonate" },
  { label: "Core", value: "RAK WisBlock System" },
  { label: "Firmware", value: "Meshtastic · MeshCore" },
  { label: "Compliance", value: "FCC · IC" },
  { label: "Carry", value: "Pocket / phone-mounted" },
];

// Prefer the live content list if it has more entries; otherwise fall back.
const SPECS = link1Content.specs.length >= 12 ? link1Content.specs : EXTENDED_SPECS;

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
          {link1Content.home.specs.description}
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
