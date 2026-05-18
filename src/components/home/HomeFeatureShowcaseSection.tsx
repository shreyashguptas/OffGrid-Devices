"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { link2Content } from "@/content/products";

type ModeId = "magnets" | "antenna" | "battery";

type Mode = {
  id: ModeId;
  index: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  alt: string;
  specs: ReadonlyArray<readonly [string, string]>;
};

const NOTES = link2Content.home.fieldNotes;

const MODES: ReadonlyArray<Mode> = [
  {
    id: "magnets",
    index: "01",
    kicker: "Magnets",
    title: NOTES[0].title,
    body: NOTES[0].body,
    image: NOTES[0].image,
    alt: NOTES[0].alt,
    specs: [
      ["GRADE", "N48H neodymium"],
      ["MOUNT", "MagSafe-compatible"],
    ],
  },
  {
    id: "antenna",
    index: "02",
    kicker: "Antenna",
    title: NOTES[1].title,
    body: NOTES[1].body,
    image: NOTES[1].image,
    alt: NOTES[1].alt,
    specs: [
      ["CONNECTOR", "SMA · external"],
      ["BAND", "902–928 MHz · US915"],
    ],
  },
  {
    id: "battery",
    index: "03",
    kicker: "Battery",
    title: NOTES[2].title,
    body: NOTES[2].body,
    image: NOTES[2].image,
    alt: NOTES[2].alt,
    specs: [
      ["CAPACITY", "3000 mAh"],
      ["CHARGE", "USB-C"],
    ],
  },
];

const imageVariants = {
  initial: { opacity: 0, scale: 1.08, filter: "blur(12px)" },
  animate: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    filter: "blur(10px)",
    transition: { duration: 0.22, ease: [0.4, 0, 0.6, 1] as const },
  },
};

const detailContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const detailItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(4px)",
    transition: { duration: 0.18 },
  },
};

export function HomeFeatureShowcaseSection() {
  const [activeId, setActiveId] = useState<ModeId>(MODES[0].id);
  const active = MODES.find((m) => m.id === activeId) ?? MODES[0];

  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-bark py-24 md:py-32"
      style={{ background: "var(--app-pitch-low)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 topo-overlay opacity-25"
      />

      <div className="relative mx-auto max-w-7xl px-6">
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
            One device. Three reasons it stays in your pack.
          </h2>
          <p
            className="mt-6 max-w-xl text-sand"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(18px, 1.8vw, 24px)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            Tap a mode to see what each part of Beacon 2 was built to do.
          </p>
        </div>

        {/* Stage + Details */}
        <div className="mt-14 grid grid-cols-1 items-center gap-12 md:mt-20 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Stage */}
          <div className="relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center">
            {/* Ember radial glow — single accent */}
            <div
              aria-hidden
              className="absolute inset-[8%]"
              style={{
                background:
                  "radial-gradient(circle, rgba(232,116,60,0.30), rgba(232,116,60,0.08) 55%, transparent 80%)",
                filter: "blur(10px)",
              }}
            />
            {/* Outer rotating dashed scan ring — instrument chrome */}
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4%] rounded-full border border-dashed"
              style={{ borderColor: "rgba(217, 201, 168, 0.14)" }}
            />
            {/* Inner sand hairline ring */}
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full border"
              style={{ borderColor: "rgba(217, 201, 168, 0.10)" }}
            />
            {/* Compass tick marks — N/E/S/W on the inner ring */}
            <div aria-hidden className="absolute inset-[6%]">
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <span
                    className="absolute left-1/2 top-0 h-[6px] w-px -translate-x-1/2 bg-sand/35"
                  />
                </div>
              ))}
            </div>

            {/* Floating motion bob to give the product weight + life */}
            <motion.div
              animate={{ y: [-6, 6, -6] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 h-[76%] w-[76%]"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  variants={imageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="relative h-full w-full"
                >
                  <Image
                    src={active.image}
                    alt={active.alt}
                    fill
                    sizes="(max-width: 768px) 80vw, 40vw"
                    className="object-contain"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Status pill — mono, sharp corners */}
            <div
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              <div
                className="flex items-center gap-2 border bg-pitch px-3 py-1.5"
                style={{
                  borderColor: "rgba(217, 201, 168, 0.20)",
                  fontSize: 11,
                  letterSpacing: "0.20em",
                  color: "var(--app-sand)",
                  textTransform: "uppercase",
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="h-1.5 w-1.5 bg-ember"
                />
                <span>Active · {active.kicker}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="relative min-h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                variants={detailContainer}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col"
              >
                <motion.div
                  variants={detailItem}
                  className="flex items-center gap-4 text-sand"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                  }}
                >
                  <span className="text-ember">{active.index}</span>
                  <span aria-hidden className="h-px w-12 bg-sand/30" />
                  <span>{active.kicker}</span>
                </motion.div>

                <motion.h3
                  variants={detailItem}
                  className="mt-6 text-bone"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(28px, 4vw, 44px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  variants={detailItem}
                  className="mt-5 max-w-md text-[17px] leading-relaxed text-sand"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {active.body}
                </motion.p>

                <motion.div
                  variants={detailItem}
                  className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-sand/15 pt-8"
                >
                  {active.specs.map(([label, value]) => (
                    <div key={label}>
                      <div
                        className="text-sand/65"
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: 11,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        className="mt-2 text-bone"
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: 16,
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {value}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Switcher — sharp horizontal tabs with ember underline */}
        <div className="mt-16 flex justify-center md:mt-24">
          <div
            role="tablist"
            aria-label="Beacon features"
            className="flex"
            style={{
              borderTop: "1px solid var(--app-border-card)",
              borderBottom: "1px solid var(--app-border-card)",
            }}
          >
            {MODES.map((mode, idx) => {
              const isActive = mode.id === activeId;
              return (
                <button
                  key={mode.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(mode.id)}
                  className="relative min-w-[112px] px-5 py-4 transition-colors hover:text-bone sm:min-w-[160px] sm:px-8 sm:py-5"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: 12,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: isActive ? "var(--app-bone)" : "var(--app-sand)",
                    borderRight:
                      idx < MODES.length - 1
                        ? "1px solid var(--app-border-card)"
                        : "none",
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="showcase-underline"
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] bg-ember"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span
                      className="text-ember/70"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 10,
                        letterSpacing: "0.18em",
                      }}
                    >
                      {mode.index}
                    </span>
                    {mode.kicker}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
