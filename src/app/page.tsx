"use client";

import { AnimatePresence, motion } from "framer-motion";
import { startTransition, useEffect, useState } from "react";
import Image from "next/image";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { InfiniteGridBackground } from "@/components/ui/the-infinite-grid";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import {
  TestimonialsV2Section,
  type TestimonialV2Item,
} from "@/components/ui/testimonial-v2";

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
  hidden: { opacity: 0, scale: 0.97 },
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
      <section className="relative overflow-hidden border-b border-border-subtle bg-background pt-8 pb-8 md:pt-10 md:pb-12">
        <InfiniteGridBackground className="absolute inset-0 z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <ContainerScroll
            titleComponent={
              <motion.div
                initial="hidden"
                animate="visible"
                variants={staggerContainer}
                className="mx-auto max-w-4xl text-center"
              >
                <motion.div
                  variants={fadeInUp}
                  className="mx-auto inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light"
                >
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  OffGrid Link 1
                </motion.div>

                <motion.h1
                  variants={fadeInUp}
                  className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
                >
                  Stay Connected.
                  <br />
                  <span className="text-muted">Go Anywhere.</span>
                </motion.h1>

                <motion.p
                  variants={fadeInUp}
                  className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-light md:text-xl"
                >
                  OffGrid Link 1 is the MagSafe-compatible LoRa mesh radio built
                  to stay on the phone you already carry.
                </motion.p>

                <motion.div
                  variants={fadeInUp}
                  className="mt-10 flex flex-col justify-center gap-4 sm:flex-row"
                >
                  <Link1CheckoutButton
                    defaultLabel="Buy Link 1"
                    className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                  />
                  <a
                    href="/products/link-1"
                    className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface px-8 py-4 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-surface-elevated"
                  >
                    Learn more
                  </a>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  className="mt-8 flex justify-center"
                >
                  <div className="surface-shadow flex items-center rounded-full border border-border bg-surface px-1.5 py-1.5 sm:px-2 sm:py-2">
                    <div className="flex -space-x-2">
                      {reviewerAvatars.map((avatar) =>
                        avatar.image ? (
                          <Image
                            key={avatar.name}
                            src={avatar.image}
                            alt={avatar.name}
                            width={28}
                            height={28}
                            className="size-7 rounded-full ring-2 ring-surface object-cover"
                          />
                        ) : (
                          <div
                            key={avatar.name}
                            className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-[11px] font-semibold text-muted-light ring-2 ring-surface"
                            aria-hidden
                          >
                            {avatar.initials}
                          </div>
                        ),
                      )}
                    </div>
                    <p className="px-2.5 text-sm text-muted sm:px-3">
                      Loved by{" "}
                      <strong className="font-medium text-foreground">28+</strong>{" "}
                      customers.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            }
          >
            <div className="hero-media-frame relative h-full w-full">
              <Image
                src="/products/link1-hero-v1.png"
                alt="OffGrid Link 1 MagSafe LoRa radio hero image"
                height={1024}
                width={1536}
                className="mx-auto h-full w-full object-contain object-center"
                draggable={false}
                priority
              />
            </div>
          </ContainerScroll>
        </div>
      </section>

      <section
        id="features"
        className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Product story
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Snaps On.
              <br />
              <span className="text-muted">Stays With You.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              Link 1 belongs on the phone you already never leave behind, so
              your mesh radio is always in reach.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="mb-8 grid gap-4 sm:grid-cols-3"
          >
            {quickSignals.map((signal) => (
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
                    Quick view
                  </p>
                  <p className="mt-2 max-w-md text-base leading-relaxed text-muted-light">
                    The essentials, without the spec sheet. Tap a card, or let
                    it rotate on its own.
                  </p>
                </div>
                <div className="rounded-full border border-border-card bg-surface-elevated px-4 py-2 text-sm font-mono text-muted">
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

      <section className="border-b border-border-subtle bg-background py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Product details
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              A closer look at Link 1.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              This section is ready for your detail shots, in-hand photos, and
              hardware closeups. Drop images into the named paths and they will
              replace the placeholders automatically.
            </p>
          </motion.div>
        </div>

        <ZoomParallax images={parallaxImages} />
      </section>

      <section
        id="gallery"
        className="border-b border-border-subtle bg-background py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Hardware
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Transparent Design.
              <br />
              <span className="text-muted">Nothing to Hide.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              See the technology that keeps you connected. The enclosure shows
              the hardware instead of hiding it behind effects.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2"
          >
            {galleryCards.map((card, index) => (
              <motion.div
                key={card.title}
                variants={index === 0 ? fadeInLeft : fadeInRight}
                className="section-card overflow-hidden rounded-[2rem]"
              >
                <div className="bg-surface-elevated p-5 md:p-8">
                  <div className="overflow-hidden rounded-[1.5rem] bg-background">
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={900}
                      height={1100}
                      className="h-auto w-full image-hover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className="px-6 pb-8 pt-2 md:px-8">
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    {card.kicker}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-light">
                    {card.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section
        id="specs"
        className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              className="section-stage rounded-[2rem] p-6 md:p-8"
            >
              <Image
                src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                alt="OffGrid Link 1 specifications"
                width={800}
                height={1000}
                className="mx-auto rounded-[1.75rem]"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInRight}
            >
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
                Specifications
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Engineered for the real world.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-light">
                Every component in Link 1 is chosen for range, reliability, and
                everyday carry. The experience stays simple; the hardware does
                not.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="section-card rounded-[1.5rem] p-5"
                  >
                    <p className="text-sm text-muted">{spec.label}</p>
                    <p className="mt-2 font-display text-xl font-semibold text-foreground">
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-background">
        <TestimonialsV2Section
          badge="Reviews"
          title="Don't take our word. Take theirs."
          description="Real feedback from Link 1 owners: MagSafe carry, mesh range, and support that shows up."
          items={testimonialV2Items}
          headerExtra={
            <>
              <div className="flex items-center justify-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-lg font-medium text-muted-light">
                5.0 from 28+ customers
              </span>
            </>
          }
        />
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={scaleIn}
            className="section-card rounded-[2.5rem] px-8 py-12 text-center md:px-14 md:py-16"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Ready when you are
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Ready for OffGrid Link 1?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              Pick up OffGrid Link 1 and join the adventurers, preppers, and
              mesh enthusiasts who stay connected off-grid.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link1CheckoutButton
                defaultLabel="Buy Link 1"
                loadingLabel="Opening Checkout..."
                showArrow
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              />
              <a
                href="/blog"
                className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface-elevated px-10 py-5 text-lg font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-background"
              >
                Read the blog
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

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
    caption: "Link 1 follows the phone.",
    description:
      "MagSafe puts Link 1 on the phone you already carry, so the radio is with you when you actually need it.",
    chips: ["MagSafe", "No loose gear"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    alt: "OffGrid Link 1 MagSafe-mounted to a phone",
  },
  {
    icon: "📡",
    kicker: "Off-grid reach",
    title: "Keep talking past the dead zone",
    tab: "LoRa range",
    caption: "Built for places without bars.",
    description:
      "When cell service drops away, LoRa keeps messages moving through the mesh without relying on a tower.",
    chips: ["Off-grid", "Peer to peer"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
    alt: "OffGrid Link 1 used outdoors",
  },
  {
    icon: "🔋",
    kicker: "Trip-ready power",
    title: "Charge once, stay out longer",
    tab: "Battery",
    caption: "Less babysitting, more moving.",
    description:
      "Rechargeable power and USB-C make Link 1 easy to top off before a trip and easy to trust once you're out.",
    chips: ["USB-C", "Adventure ready"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "OffGrid Link 1 internal hardware and battery",
  },
  {
    icon: "👁️",
    kicker: "Built to be seen",
    title: "Let the hardware do the talking",
    tab: "Transparent shell",
    caption: "Link 1 looks as technical as it is.",
    description:
      "The transparent shell shows the hardware inside instead of hiding it behind extra styling.",
    chips: ["Visible internals", "Distinctive look"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "Transparent OffGrid Link 1 close-up",
  },
  {
    icon: "⚙️",
    kicker: "Flexible setup",
    title: "Run the firmware you already prefer",
    tab: "Dual firmware",
    caption: "Meshtastic or MeshCore.",
    description:
      "Link 1 fits the Meshtastic or MeshCore workflow you already use instead of forcing a new one.",
    chips: ["Meshtastic", "MeshCore"],
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    alt: "OffGrid Link 1 product view",
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
    alt: "OffGrid Link 1 used during an outdoor trip",
  },
];

const quickSignals = [
  { label: "Mount", value: "MagSafe" },
  { label: "Mesh", value: "LoRa" },
  { label: "Charge", value: "USB-C" },
];

const galleryCards = [
  {
    kicker: "Outdoor use",
    title: "Built for trips where phones still matter",
    description:
      "MagSafe keeps the radio with the device already in your hand, whether you're on a trail, at an event, or off the grid.",
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
    alt: "OffGrid Link 1 outdoor use",
  },
  {
    kicker: "Transparent shell",
    title: "The hardware is part of the look",
    description:
      "The enclosure shows the RAK board, battery, and antenna with no extra visual noise around it.",
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "OffGrid Link 1 detail view",
  },
];

const parallaxImages = [
  {
    src: "/products/parallax/link1-detail-hero.jpg",
    alt: "OffGrid Link 1 hero detail",
    label: "Hero detail",
  },
  {
    src: "/products/parallax/link1-product-story-hand.jpg",
    alt: "OffGrid Link 1 in hand",
    label: "In hand",
  },
  {
    src: "/products/parallax/link1-hardware-antenna.jpg",
    alt: "OffGrid Link 1 antenna detail",
    label: "Antenna detail",
  },
  {
    src: "/products/parallax/link1-specifications-front.jpg",
    alt: "OffGrid Link 1 front specifications image",
    label: "Front view",
  },
  {
    src: "/products/parallax/link1-hardware-board.jpg",
    alt: "OffGrid Link 1 board closeup",
    label: "Board closeup",
  },
  {
    src: "/products/parallax/link1-product-story-pocket.jpg",
    alt: "OffGrid Link 1 carry shot",
    label: "Carry shot",
  },
  {
    src: "/products/parallax/link1-specifications-side.jpg",
    alt: "OffGrid Link 1 side specifications image",
    label: "Side profile",
  },
];

const specs = [
  { label: "Core module", value: "RAK WisBlock System" },
  { label: "Connectivity", value: "Bluetooth 5.0 + LoRa" },
  { label: "Battery", value: "Rechargeable Li-Po" },
  { label: "Range", value: "Up to 10+ km line of sight" },
  { label: "Charging", value: "USB-C fast charging" },
  { label: "Firmware", value: "Meshtastic or MeshCore" },
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
    review: "Great product, even included a personal handwritten note.",
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

const testimonialV2Items: TestimonialV2Item[] = testimonials.map((t) => {
  const reviewer = reviewerAvatars.find(
    (r) => r.name.toLowerCase() === t.name.toLowerCase(),
  );

  return {
    text: t.review,
    name: t.name,
    role: `${t.date} · Verified buyer`,
    avatarSrc: reviewer?.image ?? t.image ?? null,
  };
});
