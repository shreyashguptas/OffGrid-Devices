"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { link1Content } from "@/content/link1";

type FieldNote = {
  tag: string;
  title: string;
  body: string;
  meta: string;
  image: string;
  alt: string;
};

const FIELD_NOTES: FieldNote[] = [
  {
    tag: "DAILY · MAGSAFE",
    title: "Snaps to the phone you already carry.",
    body: "Link 1 lives on the device you reach for every day, so the radio is with you when you actually need it — not in a pack you forgot.",
    meta: "MagSafe · N52 ring",
    image: link1Content.featureHighlights[0].image,
    alt: link1Content.featureHighlights[0].alt,
  },
  {
    tag: "OUTDOORS · LORA",
    title: "Keeps talking past the dead zone.",
    body: "When cell service drops out, LoRa keeps messages moving through the mesh without a tower — peer to peer, miles at a time.",
    meta: "10+ km LoS · 915 MHz",
    image: link1Content.featureHighlights[1].image,
    alt: link1Content.featureHighlights[1].alt,
  },
  {
    tag: "TRIPS · POWER",
    title: "Charge once, stay out longer.",
    body: "USB-C and a sensible internal battery mean Link 1 is easy to top off before a trip and easy to trust once you're out of range.",
    meta: "USB-C · adventure-ready",
    image: link1Content.featureHighlights[2].image,
    alt: link1Content.featureHighlights[2].alt,
  },
];

export function HomeFeatureStorySection() {
  return (
    <section
      id="features"
      className="relative border-b border-bark py-24 md:py-32"
      style={{ background: "var(--app-pitch-low)" }}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
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
              II · The Field
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
              Where it earns its keep.
            </h2>
          </div>
          <a
            href="/blog"
            className="text-sand hover:text-ember transition-colors"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            All field notes →
          </a>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {FIELD_NOTES.map((note) => (
            <motion.article
              key={note.title}
              variants={cardVariant}
              className="group relative overflow-hidden border border-sand/15 bg-bark-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-sand/15">
                <Image
                  src={note.image}
                  alt={note.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 image-overlay-scrim" />
                <div
                  className="absolute left-5 top-4 text-ember"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                  }}
                >
                  {note.tag}
                </div>
              </div>
              <div className="px-7 pb-8 pt-7">
                <h3
                  className="text-bone"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 26,
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {note.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-sand">
                  {note.body}
                </p>
                <div
                  className="mt-6 text-sand/65"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                  }}
                >
                  {note.meta}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
