"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

// Smoother animation variants with transitions included
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  },
};

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0);
  const currentFeature = featureHighlights[activeFeature];

  useEffect(() => {
    const interval = window.setInterval(() => {
      startTransition(() => {
        setActiveFeature((current) => (current + 1) % featureHighlights.length);
      });
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col pb-24 md:pb-32">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-radial from-accent/5 via-transparent to-transparent pointer-events-none" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(var(--app-grid-line) 1px, transparent 1px),
                              linear-gradient(90deg, var(--app-grid-line) 1px, transparent 1px)`,
            backgroundSize: "100px 100px",
          }}
        />

        <ContainerScroll
          titleComponent={
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.h1
                variants={fadeInUp}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-5"
              >
                Stay Connected.
                <br />
                <span className="gradient-text">Go Anywhere.</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-base md:text-lg text-muted-light max-w-md mx-auto mb-8 leading-snug"
              >
                The world&apos;s first MagSafe-compatible LoRa mesh device.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link1CheckoutButton
                  defaultLabel="Buy Now"
                  className="px-8 py-4 bg-accent text-on-accent font-semibold rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-xl hover:shadow-accent/30 hover:-translate-y-0.5"
                />
                <a
                  href="/products/link-1"
                  className="px-8 py-4 bg-fill-muted border border-border-emphasis rounded-full font-semibold text-foreground hover:bg-fill-hover hover:border-border-emphasis-hover transition-all duration-300"
                >
                  Learn More
                </a>
              </motion.div>

              {/* Social proof: avatars + rating + caption */}
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6"
              >
                <div className="flex -space-x-2 sm:shrink-0">
                  {reviewerAvatars.map((avatar) => (
                    <div
                      key={avatar.name}
                      className="w-10 h-10 rounded-full border-2 border-background overflow-hidden bg-surface-elevated flex items-center justify-center text-xs font-medium"
                    >
                      {avatar.image ? (
                        <Image
                          src={avatar.image}
                          alt={avatar.name}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        avatar.initials
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center gap-0.5 sm:items-start sm:text-left">
                  <div
                    className="flex items-center gap-1 text-accent"
                    aria-hidden="true"
                  >
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-muted leading-tight">
                    Loved by 28+ customers
                  </p>
                </div>
              </motion.div>
            </motion.div>
          }
        >
          <Image
            src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009"
            alt="OffGrid MagSafe LoRa Device in use outdoors"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full w-full object-center"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32">
        <div className="absolute inset-x-0 top-24 h-64 bg-accent/10 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Snaps On.
              <br />
              <span className="text-muted">Stays With You.</span>
            </h2>
            <p className="text-lg text-muted-light max-w-2xl mx-auto">
              Your mesh device belongs on the phone you already never leave
              behind.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInLeft}
              className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-border-card bg-fill-glass"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFeature.title}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={currentFeature.image}
                    alt={currentFeature.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/35" />
                </motion.div>
              </AnimatePresence>

              <div className="absolute left-6 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-overlay-badge px-4 py-2 backdrop-blur-xl">
                <span className="text-sm text-white">{currentFeature.icon}</span>
                <span className="text-xs uppercase tracking-[0.24em] text-white/75">
                  Feature Tour
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${currentFeature.title}-overlay`}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ duration: 0.45 }}
                  className="absolute inset-x-6 bottom-6 z-10"
                >
                  <div className="max-w-xl rounded-[1.75rem] border border-white/15 bg-overlay-card p-6 backdrop-blur-xl">
                    <p className="mb-3 text-xs uppercase tracking-[0.28em] text-accent-light">
                      {currentFeature.kicker}
                    </p>
                    <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight text-white">
                      {currentFeature.title}
                    </h3>
                    <p className="mt-3 max-w-md text-base text-white/80 leading-relaxed">
                      {currentFeature.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {currentFeature.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white/95"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInRight}
              className="flex flex-col gap-4"
            >
              <div className="rounded-[2rem] border border-border-card bg-fill-glass p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.22em] text-muted">
                      Quick view
                    </p>
                    <p className="mt-2 text-base text-muted-light">
                      The essentials, without the spec sheet. Tap a card, or let
                      it rotate on its own.
                    </p>
                  </div>
                  <div className="rounded-full border border-border-card px-4 py-2 text-sm font-mono text-muted-light">
                    {String(activeFeature + 1).padStart(2, "0")} /{" "}
                    {String(featureHighlights.length).padStart(2, "0")}
                  </div>
                </div>

                <div className="space-y-3">
                  {featureHighlights.map((feature, index) => {
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
                            ? "border-accent/40 bg-accent/10 shadow-lg shadow-accent/10"
                            : "border-border-subtle bg-fill-glass-2 hover:bg-fill-glass-elevated"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-11 w-11 items-center justify-center rounded-2xl border text-lg transition-colors ${
                                isActive
                                  ? "border-accent/30 bg-accent/[0.15]"
                                  : "border-border-card bg-fill-glass-elevated"
                              }`}
                            >
                              {feature.icon}
                            </div>
                            <div>
                              <p className="font-display text-lg font-semibold">
                                {feature.tab}
                              </p>
                              <p className="text-sm text-muted-light">
                                {feature.caption}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-muted">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                                isActive ? "bg-accent" : "bg-fill-muted"
                              }`}
                            />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {quickSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-[1.5rem] border border-border-card bg-fill-glass p-4"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">
                      {signal.label}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Transparent Design.
              <br />
              <span className="text-muted">Nothing to Hide.</span>
            </h2>
            <p className="text-lg text-muted-light max-w-2xl mx-auto">
              See the technology that keeps you connected. Our transparent back
              showcases the craftsmanship inside.
            </p>
          </motion.div>

          {/* Gallery grid */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 gap-8"
          >
            <motion.div variants={fadeInLeft} className="relative group">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009"
                  alt="OffGrid device outdoor use"
                  width={800}
                  height={1000}
                  className="w-full h-auto image-hover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-display font-semibold">Built for Adventure</p>
                <p className="text-sm text-muted-light">
                  Take it anywhere—trails, mountains, or urban exploration.
                </p>
              </div>
            </motion.div>

            <motion.div variants={fadeInRight} className="relative group">
              <div className="overflow-hidden rounded-3xl">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042"
                  alt="OffGrid device detail view"
                  width={800}
                  height={1000}
                  className="w-full h-auto image-hover"
                />
              </div>
              <div className="absolute bottom-6 left-6 right-6 p-6 glass rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-display font-semibold">Transparent Beauty</p>
                <p className="text-sm text-muted-light">
                  See the RAK board, battery, and antenna that power your
                  connection.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Specs Section */}
      <section id="specs" className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Engineered for
                <br />
                <span className="text-accent">Off-Grid Excellence</span>
              </h2>
              <p className="text-lg text-muted-light mb-12">
                Every component chosen for reliability, range, and real-world
                performance. Compatible with Meshtastic and MeshCore firmware.
              </p>

              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
                className="space-y-4"
              >
                {specs.map((spec) => (
                  <motion.div
                    key={spec.label}
                    variants={cardVariant}
                    className="flex items-center gap-4 p-4 rounded-2xl glass"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                      <span className="text-accent font-mono text-sm font-bold">
                        {spec.icon}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-muted">{spec.label}</p>
                      <p className="font-display font-semibold">{spec.value}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              className="relative"
            >
              <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full" />
              <Image
                src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                alt="OffGrid device specifications"
                width={600}
                height={800}
                className="relative rounded-3xl shadow-2xl shadow-black/50"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Don&apos;t Take Our Word.
              <br />
              <span className="text-muted">Take Theirs.</span>
            </h2>
            <div className="flex items-center justify-center gap-3 mt-6">
              <div className="flex items-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg text-muted-light font-medium">
                5.0 from 28+ customers
              </span>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariant}
                className="p-6 rounded-2xl glass hover:bg-fill-glass-elevated transition-all duration-300 flex flex-col"
              >
                <div className="flex items-center gap-1 text-accent mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <p className="text-foreground/90 leading-relaxed mb-6 flex-1">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
                {testimonial.image && (
                  <div className="w-full h-48 rounded-xl overflow-hidden border border-border-subtle mb-4">
                    <Image
                      src={testimonial.image}
                      alt={`Review photo from ${testimonial.name}`}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
                  <div>
                    <p className="font-display font-semibold text-sm">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted mt-0.5">
                      {testimonial.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                    Verified Buyer
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="p-12 md:p-16 rounded-[2.5rem] glass-strong relative overflow-hidden"
          >
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full" />

            <div className="relative z-10">
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Ready to Go Off-Grid?
              </h2>
              <p className="text-lg text-muted-light mb-10 max-w-xl mx-auto">
                Join the growing community of adventurers, preppers, and tech
                enthusiasts who never lose connection.
              </p>
              <Link1CheckoutButton
                defaultLabel="Buy Now"
                loadingLabel="Opening Checkout..."
                showArrow
                className="inline-flex items-center gap-3 px-10 py-5 bg-[#F1641E] text-white font-semibold text-lg rounded-full hover:bg-[#D9571A] transition-all duration-300 hover:shadow-xl hover:shadow-[#F1641E]/30 hover:-translate-y-1"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

// Data
const reviewerAvatars = [
  { name: "Jesus", image: "/reviewers/jesus.jpg", initials: null },
  { name: "Brazen", image: "/reviewers/brazen.webp", initials: null },
  { name: "Ryan", image: null, initials: "R" },
  { name: "John", image: null, initials: "J" },
  { name: "Bob", image: null, initials: "B" },
];
const featureHighlights = [
  {
    icon: "🧲",
    kicker: "Daily carry",
    title: "Snap it on and go",
    tab: "MagSafe carry",
    caption: "The device follows the phone.",
    description:
      "MagSafe turns the radio into something you carry automatically instead of something you remember later.",
    chips: ["MagSafe", "No loose gear"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    alt: "OffGrid MagSafe device mounted to a phone",
  },
  {
    icon: "📡",
    kicker: "Off-grid reach",
    title: "Keep talking past the dead zone",
    tab: "LoRa range",
    caption: "Built for places without bars.",
    description:
      "When cell service drops away, LoRa keeps messages moving through the mesh.",
    chips: ["Off-grid", "Peer to peer"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
    alt: "OffGrid device used outdoors",
  },
  {
    icon: "🔋",
    kicker: "Trip-ready power",
    title: "Charge once, stay out longer",
    tab: "Battery",
    caption: "Less babysitting, more moving.",
    description:
      "Rechargeable power and USB-C make the device easy to top off and easy to trust.",
    chips: ["USB-C", "Adventure ready"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "OffGrid device showing internal hardware and battery",
  },
  {
    icon: "👁️",
    kicker: "Built to be seen",
    title: "Let the hardware do the talking",
    tab: "Transparent shell",
    caption: "The product looks as technical as it is.",
    description:
      "The transparent back gives the device personality without asking for more copy.",
    chips: ["Visible internals", "Distinctive look"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "Transparent OffGrid device close-up",
  },
  {
    icon: "⚙️",
    kicker: "Flexible setup",
    title: "Run the firmware you already prefer",
    tab: "Dual firmware",
    caption: "Meshtastic or MeshCore.",
    description:
      "It fits into the ecosystem you already use instead of forcing a new workflow.",
    chips: ["Meshtastic", "MeshCore"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    alt: "OffGrid mesh device product view",
  },
  {
    icon: "🌐",
    kicker: "Network effect",
    title: "Every extra node makes the system stronger",
    tab: "Mesh network",
    caption: "Coverage grows with the group.",
    description:
      "Messages can hop across nearby devices, so the network gets tougher as more people join.",
    chips: ["Shared coverage", "Resilient"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
    alt: "OffGrid device used during an outdoor trip",
  },
];

const quickSignals = [
  { label: "Mount", value: "MagSafe" },
  { label: "Link", value: "LoRa mesh" },
  { label: "Charge", value: "USB-C" },
];

const specs = [
  { icon: "RAK", label: "Core Module", value: "RAK WisBlock System" },
  { icon: "BT", label: "Connectivity", value: "Bluetooth 5.0 + LoRa" },
  { icon: "mAh", label: "Battery", value: "Rechargeable Li-Po" },
  { icon: "km", label: "Range", value: "Up to 10+ km line of sight" },
  { icon: "USB", label: "Charging", value: "USB-C Fast Charging" },
  { icon: "3D", label: "Enclosure", value: "Custom 3D Printed + MagSafe" },
];

const testimonials = [
  {
    name: "Ryan",
    date: "February 2026",
    review:
      "Feels great in the hand.. strong attachment to the phone and would recommend.",
    image: "/reviews/ryan-review.webp",
  },
  {
    name: "Brazen",
    date: "March 2026",
    review:
      "This is my first step into Mesh networks, and this thing is perfect! The MagSafe works better than I'd hoped with the case on my Android, very sturdy and secure feel. The quality of the 3D print seems wonderful out of the box. Very responsive seller and very helpful.",
    image: null,
  },
  {
    name: "Christopher",
    date: "February 2026",
    review:
      "Great product, even included a personal handwritten note.",
    image: "/reviews/christopher-review.webp",
  },
  {
    name: "John",
    date: "March 2026",
    review:
      "Product works great as a drop-in case/battery solution for a node you've already purchased. Seller really cares about customer satisfaction and is very responsive. Magnets attach strong to my dbrand phone case. The 2000mAh battery lasts almost 2 weeks.",
    image: null,
  },
  {
    name: "Bob",
    date: "March 2026",
    review:
      "Nicely made product with a strong magnet. Would recommend or buy again. It should hold up better to a drop than those power bank versions from other companies especially with it being lightweight.",
    image: null,
  },
  {
    name: "Jesus",
    date: "January 2026",
    review:
      "Package arrived on time and in great condition. Shreyash is awesome, thank you.",
    image: null,
  },
];
