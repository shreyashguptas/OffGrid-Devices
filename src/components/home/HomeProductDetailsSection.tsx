"use client";

import { motion } from "framer-motion";
import { fadeInLeft } from "@/components/shared/motion";
import { ZoomParallax } from "@/components/ui/zoom-parallax";

const PARALLAX_IMAGES = [
  { src: "/beacon-2/parallax/hero-front.jpg", alt: "Beacon 2 standing on Ember — front face, antenna up" },
  { src: "/beacon-2/parallax/side-profile.jpg", alt: "Beacon 2 side profile with the replaceable SMA antenna fitted" },
  { src: "/beacon-2/parallax/on-iphone.jpg", alt: "Beacon 2 snapped to the back of an iPhone with its MagSafe magnet ring" },
  { src: "/beacon-2/parallax/magnet-face.jpg", alt: "Back of Beacon 2 showing the magnet face and corner screws" },
  { src: "/beacon-2/parallax/beside-app.jpg", alt: "Beacon 2 beside an iPhone running the Meshtastic app, connected over Bluetooth" },
  { src: "/beacon-2/parallax/charging.jpg", alt: "Beacon 2 charging over USB-C with the charge light lit" },
  { src: "/beacon-2/parallax/in-hand.jpg", alt: "Beacon 2 held in hand, showing its pocketable size" },
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
          <div className="type-eyebrow text-ember">I · The Object</div>

          <h2 className="type-display-section mt-5 max-w-3xl text-bone">
            Built like a hand tool.
          </h2>

          <p className="type-editorial-lead font-editorial mt-7 max-w-xl text-sand">
            3D-printed in sun-tolerant filament, magnet-mounted to the phone you
            already carry, with a replaceable SMA antenna and a 3000 mAh cell.
            Built to live in a pocket and shrug off the trip.
          </p>
        </motion.div>
      </div>

      <ZoomParallax images={PARALLAX_IMAGES} />
    </section>
  );
}
