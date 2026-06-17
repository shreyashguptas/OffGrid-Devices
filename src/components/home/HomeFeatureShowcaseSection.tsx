"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { beacon2Content } from "@/content/products";
import { ZoomableImage } from "@/components/shared/ZoomableImage";
import { cn } from "@/lib/utils";

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

const MODE_META: ReadonlyArray<{
  id: ModeId;
  index: string;
  kicker: string;
  specs: ReadonlyArray<readonly [string, string]>;
}> = [
  {
    id: "magnets",
    index: "01",
    kicker: "Magnets",
    specs: [
      ["GRADE", "N48H neodymium"],
      ["MOUNT", "MagSafe-compatible"],
    ],
  },
  {
    id: "antenna",
    index: "02",
    kicker: "Antenna",
    specs: [
      ["CONNECTOR", "SMA · external"],
      ["BAND", "902–928 MHz · US915"],
    ],
  },
  {
    id: "battery",
    index: "03",
    kicker: "Battery",
    specs: [
      ["CAPACITY", "3000 mAh"],
      ["CHARGE", "USB-C"],
    ],
  },
];

const MODES: ReadonlyArray<Mode> = MODE_META.map((meta, i) => {
  const note = beacon2Content.home.fieldNotes[i];
  return {
    ...meta,
    title: note.title,
    body: note.body,
    image: note.image,
    alt: note.alt,
  };
});

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
      className="relative overflow-hidden border-b border-bark bg-pitch-low py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 topo-overlay opacity-25"
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="type-eyebrow text-ember">II · The Field</div>
          <h2 className="type-display-section mt-5 text-bone">
            One device. Three reasons it stays in your pack.
          </h2>
          <p className="type-editorial-lead mt-6 max-w-xl text-sand">
            Tap a mode to see what each part of Beacon 2 was built to do.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-12 md:mt-20 md:grid-cols-2 md:gap-16 lg:gap-24">
          <div className="relative mx-auto flex aspect-square w-full max-w-[480px] items-center justify-center">
            <div
              aria-hidden
              className="ember-radial-glow-subtle absolute inset-[8%]"
            />
            <motion.div
              aria-hidden
              animate={{ rotate: 360 }}
              transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              className="absolute inset-[-4%] rounded-full border border-dashed border-border-card"
            />
            <div
              aria-hidden
              className="absolute inset-[6%] rounded-full border border-border-subtle"
            />
            <div aria-hidden className="absolute inset-[6%]">
              {[0, 90, 180, 270].map((deg) => (
                <div
                  key={deg}
                  className="absolute inset-0"
                  style={{ transform: `rotate(${deg}deg)` }}
                >
                  <span className="absolute left-1/2 top-0 h-[6px] w-px -translate-x-1/2 bg-sand/35" />
                </div>
              ))}
            </div>

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
                  <ZoomableImage
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

            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
              <div className="type-mono-label flex items-center gap-2 border border-border-emphasis bg-pitch px-3 py-1.5 text-muted">
                <motion.span
                  animate={{ opacity: [1, 0.4, 1] }}
                  transition={{ duration: 2.2, repeat: Infinity }}
                  className="h-1.5 w-1.5 bg-ember"
                />
                <span>Active · {active.kicker}</span>
              </div>
            </div>
          </div>

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
                  className="type-mono-label flex items-center gap-4 text-sand"
                  style={{ letterSpacing: "0.20em" }}
                >
                  <span className="text-ember">{active.index}</span>
                  <span aria-hidden className="h-px w-12 bg-sand/30" />
                  <span>{active.kicker}</span>
                </motion.div>

                <motion.h3
                  variants={detailItem}
                  className="type-display-card mt-6 text-bone"
                >
                  {active.title}
                </motion.h3>

                <motion.p
                  variants={detailItem}
                  className="mt-5 max-w-md font-body text-[17px] leading-relaxed text-sand"
                >
                  {active.body}
                </motion.p>

                <motion.div
                  variants={detailItem}
                  className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-sand/15 pt-8 sm:grid-cols-2"
                >
                  {active.specs.map(([label, value]) => (
                    <div key={label}>
                      <div className="type-mono-label text-sand/65">
                        {label}
                      </div>
                      <div className="mt-2 font-display text-base font-bold tracking-tight text-bone">
                        {value}
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-16 flex justify-center md:mt-24">
          <div
            role="tablist"
            aria-label="Beacon features"
            className="flex w-full border-y border-border-card sm:w-auto"
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
                  className={cn(
                    "type-eyebrow relative min-w-0 flex-1 px-5 py-4 transition-colors hover:text-bone sm:min-w-[160px] sm:flex-none sm:px-8 sm:py-5",
                    isActive ? "text-foreground" : "text-muted",
                    idx < MODES.length - 1 && "border-r border-border-card",
                  )}
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
                      className="font-mono text-[10px] tracking-[0.18em] text-ember/70"
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
