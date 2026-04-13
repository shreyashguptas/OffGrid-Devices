"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Link1Product() {
  return (
    <>
      <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-center lg:text-left"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light"
              >
                <span className="h-2 w-2 rounded-full bg-accent" />
                OffGrid Link 1
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
              >
                Link 1
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-4 text-xl text-muted-light md:text-2xl"
              >
                MagSafe LoRa mesh radio
              </motion.p>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-xl text-lg leading-relaxed text-muted-light lg:max-w-2xl"
              >
                The world&apos;s first MagSafe-compatible LoRa mesh radio from
                OffGrid. It snaps to your phone, carries cleanly, and stays
                ready for the places where phones still matter but towers do
                not.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start"
              >
                <Link1CheckoutButton
                  defaultLabel="Buy Link 1"
                  loadingLabel="Opening Checkout..."
                  className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
                />
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface px-8 py-4 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-surface-elevated"
                >
                  Explore features
                </a>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="mt-10 grid gap-4 sm:grid-cols-3"
              >
                {heroSignals.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-[1.5rem] border border-border-card bg-surface-elevated px-4 py-5 text-left"
                  >
                    <p className="text-xs uppercase tracking-[0.24em] text-muted">
                      {signal.label}
                    </p>
                    <p className="mt-2 font-display text-xl font-semibold text-foreground">
                      {signal.value}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={scaleIn}
              className="section-stage rounded-[2.5rem] p-5 md:p-8"
            >
              <div className="overflow-hidden rounded-[2rem] bg-white p-4 md:p-8">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                  alt="OffGrid Link 1 MagSafe LoRa radio"
                  width={900}
                  height={1100}
                  className="mx-auto h-auto w-full max-w-[680px]"
                  priority
                />
              </div>
            </motion.div>
          </div>
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
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Why Link 1
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Never forget it.
              <br />
              <span className="text-muted">Always connected.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              Link 1 is designed around one simple idea: the radio should stay
              with the phone you already reach for.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={cardVariant}
                className="section-card rounded-[2rem] p-8"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-2xl">
                  {feature.icon}
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
              Design details
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Transparent design.
              <br />
              <span className="text-muted">No extra styling required.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              The hardware is part of the product story. Link 1 keeps the build
              visible instead of burying it in decoration.
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
          <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInLeft}
            >
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
                Specifications
              </p>
              <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Engineered for range, reliability, and carry.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-light">
                Every component in Link 1 is chosen for real-world use. It works
                with the mesh tools people already trust and keeps the hardware
                package simple enough to carry daily.
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

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={scaleIn}
              className="space-y-6"
            >
              <div className="section-stage rounded-[2rem] p-6 md:p-8">
                <Image
                  src="https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037"
                  alt="OffGrid Link 1 hardware specifications"
                  width={900}
                  height={1100}
                  className="mx-auto rounded-[1.75rem]"
                />
              </div>

              <div className="section-card rounded-[2rem] p-6 md:p-8">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  Firmware support
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  Built for Meshtastic and MeshCore workflows.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-light">
                  Link 1 fits the setup people already use instead of forcing a
                  new process just to get on the mesh.
                </p>
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
              Customer feedback
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Don&apos;t take our word.
              <br />
              <span className="text-muted">Take theirs.</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-light">
              5.0 from 28+ customers
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={cardVariant}
                className="section-card flex flex-col rounded-[2rem] p-6"
              >
                <div className="mb-4 flex items-center gap-1 text-accent">
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
                <p className="mb-6 flex-1 leading-relaxed text-foreground/90">
                  &ldquo;{testimonial.review}&rdquo;
                </p>
                {testimonial.image ? (
                  <div className="mb-4 overflow-hidden rounded-[1.25rem] border border-border-subtle">
                    <Image
                      src={testimonial.image}
                      alt={`Review photo from ${testimonial.name}`}
                      width={400}
                      height={300}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                  <div>
                    <p className="font-display text-sm font-semibold">
                      {testimonial.name}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">{testimonial.date}</p>
                  </div>
                  <span className="text-xs text-muted">Verified buyer</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
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
              Off-grid ready
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
              Ready for Link 1?
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              Get OffGrid Link 1 and keep the radio with the device you already
              carry.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link1CheckoutButton
                defaultLabel="Buy Link 1"
                loadingLabel="Opening Checkout..."
                showArrow
                className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              />
              <Link
                href="/blog/getting-started-with-meshtastic"
                className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface-elevated px-10 py-5 text-lg font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-background"
              >
                Read setup guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

const heroSignals = [
  { label: "Mount", value: "MagSafe" },
  { label: "Mesh", value: "LoRa" },
  { label: "Charge", value: "USB-C" },
];

const features = [
  {
    icon: "🧲",
    title: "MagSafe compatible",
    description:
      "Attaches securely to MagSafe-compatible phones and cases so Link 1 stays with the device you already carry.",
  },
  {
    icon: "📡",
    title: "Long-range LoRa",
    description:
      "Communicate miles away without cell service using LoRa mesh networking built for low-power, off-grid use.",
  },
  {
    icon: "🔋",
    title: "All-day battery",
    description:
      "A rechargeable internal battery and USB-C charging make Link 1 simple to top off before the next trip.",
  },
  {
    icon: "👁️",
    title: "Transparent shell",
    description:
      "The enclosure shows the board, battery, and antenna instead of hiding the hardware behind unnecessary styling.",
  },
  {
    icon: "⚙️",
    title: "Dual firmware support",
    description:
      "Run Meshtastic or MeshCore depending on the workflow you already use and the network you want to join.",
  },
  {
    icon: "🌐",
    title: "Mesh networking",
    description:
      "Messages hop between devices, extending range and building a more resilient communication network as more nodes join.",
  },
];

const galleryCards = [
  {
    kicker: "Daily carry",
    title: "Built for the phone, not the backpack.",
    description:
      "Link 1 snaps to the device you already reach for, so you don't have to remember a separate radio before heading out.",
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
    alt: "OffGrid Link 1 outdoor use",
  },
  {
    kicker: "Visible internals",
    title: "The hardware stays part of the experience.",
    description:
      "The transparent shell makes the engineering visible and keeps the product looking as technical as it actually is.",
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
    alt: "OffGrid Link 1 detail view",
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
