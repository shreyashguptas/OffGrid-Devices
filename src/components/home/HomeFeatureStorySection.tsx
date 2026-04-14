"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { SectionIntro } from "@/components/shared/SectionIntro";
import {
  cardVariant,
  fadeInLeft,
  fadeInRight,
  staggerContainer,
} from "@/components/shared/motion";
import { link1Content } from "@/content/link1";

export function HomeFeatureStorySection() {
  const [activeFeature, setActiveFeature] = useState(0);
  const currentFeature = link1Content.featureHighlights[activeFeature];

  useEffect(() => {
    const interval = window.setInterval(() => {
      startTransition(() => {
        setActiveFeature(
          (current) => (current + 1) % link1Content.featureHighlights.length,
        );
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      id="features"
      className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={link1Content.home.story.badge}
          title={
            <>
              {link1Content.home.story.title}
              <br />
              <span className="text-muted">{link1Content.home.story.subtitle}</span>
            </>
          }
          description={link1Content.home.story.description}
          className="mb-12"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mb-8 grid gap-4 sm:grid-cols-3"
        >
          {link1Content.heroSignals.map((signal) => (
            <motion.div
              key={signal.label}
              variants={cardVariant}
              className="section-card rounded-[1.75rem] p-5"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                {signal.label}
              </p>
              <p className="mt-2 font-display text-2xl font-semibold text-foreground">
                {signal.value}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInLeft}
            className="section-card rounded-[2rem] p-5 md:p-6"
          >
            <div className="overflow-hidden rounded-[1.75rem] bg-background">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.title}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45 }}
                  className="relative aspect-[4/5] sm:aspect-[5/4]"
                >
                  <Image
                    src={currentFeature.image}
                    alt={currentFeature.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentFeature.title}-copy`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="mt-6"
              >
                <p className="text-xs uppercase tracking-[0.28em] text-muted">
                  {currentFeature.kicker}
                </p>
                <h3 className="mt-3 font-display text-3xl font-semibold leading-tight md:text-4xl">
                  {currentFeature.title}
                </h3>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-light">
                  {currentFeature.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {currentFeature.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-border-card bg-surface-elevated px-3 py-1.5 text-sm text-muted"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInRight}
            className="section-card rounded-[2rem] p-6 md:p-8"
          >
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-muted">
                  {link1Content.home.story.quickViewLabel}
                </p>
                <p className="mt-2 max-w-md text-base leading-relaxed text-muted-light">
                  {link1Content.home.story.quickViewDescription}
                </p>
              </div>
              <div className="rounded-full border border-border-card bg-surface-elevated px-4 py-2 text-sm font-mono text-muted">
                {String(activeFeature + 1).padStart(2, "0")} /{" "}
                {String(link1Content.featureHighlights.length).padStart(2, "0")}
              </div>
            </div>

            <div className="space-y-3">
              {link1Content.featureHighlights.map((feature, index) => {
                const isActive = index === activeFeature;

                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() =>
                      startTransition(() => {
                        setActiveFeature(index);
                      })
                    }
                    className={`w-full rounded-[1.5rem] border px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "border-accent/30 bg-accent/10 shadow-sm shadow-accent/10"
                        : "border-border-subtle bg-surface hover:bg-surface-elevated"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg ${
                            isActive
                              ? "border-accent/25 bg-accent/10"
                              : "border-border-card bg-surface-elevated"
                          }`}
                        >
                          {feature.icon}
                        </div>
                        <div>
                          <p className="font-display text-lg font-semibold text-foreground">
                            {feature.tab}
                          </p>
                          <p className="text-sm text-muted-light">
                            {feature.caption}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          isActive ? "bg-accent" : "bg-border-card"
                        }`}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
