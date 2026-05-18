"use client";

import { motion } from "framer-motion";
import { fadeInLeft } from "@/components/shared/motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const PARALLAX_IMAGES = [
  { src: "/beacon-2/parallax/01-hero.jpg", alt: "Beacon 2 — front profile on a dark microcement plinth" },
  { src: "/beacon-2/parallax/02-magnets.jpg", alt: "Magnets that hold on — rear of Beacon 2" },
  { src: "/beacon-2/parallax/06-stand.jpg", alt: "Display-stand packaging that doubles as a kickstand" },
  { src: "/beacon-2/parallax/03-antenna.jpg", alt: "Replaceable SMA antenna — swap antennas safely" },
  { src: "/beacon-2/parallax/04-battery.jpg", alt: "3000 mAh — weeks on the mesh" },
  { src: "/beacon-2/parallax/05-clip-front.jpg", alt: "Included belt clip — front view" },
  { src: "/beacon-2/parallax/07-box.jpg", alt: "What's in the box — Beacon 2, belt clip, charging cable, whistle" },
];

export function HomeProductDetailsSection() {
  return (
    <section className="relative border-b border-bark bg-pitch">
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-12 md:pt-32 md:pb-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInLeft}
        >
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
            I · The Object
          </div>

          <h2
            className="mt-5 max-w-3xl text-bone uppercase"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
            }}
          >
            Built like a hand tool.
          </h2>

          <p
            className="mt-7 max-w-xl text-sand"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: 21,
              lineHeight: 1.5,
            }}
          >
            3D-printed in sun-tolerant filament, magnet-mounted to the phone you
            already carry, with a replaceable SMA antenna and a 3000 mAh cell.
            Built to live in a pocket and shrug off the trip.
          </p>

          <div
            className="mt-10 flex items-center gap-3 text-sand/70"
            style={{
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
            }}
            aria-hidden
          >
            <span className="h-px w-12 bg-sand/30" />
            <span>Scroll to inspect</span>
          </div>
        </motion.div>
      </div>

      <ZoomParallax images={PARALLAX_IMAGES} />
    </section>
  );
}
