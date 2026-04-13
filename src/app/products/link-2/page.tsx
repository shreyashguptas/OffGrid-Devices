"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Link2Product() {
  return (
    <>
      <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="mx-auto max-w-3xl"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-orange-500">
                Coming soon
              </span>
              OffGrid Link 2
            </div>

            <h1 className="mt-8 font-display text-5xl font-bold tracking-tight md:text-7xl">
              Link 2
            </h1>
            <p className="mt-4 font-display text-3xl font-semibold text-muted md:text-4xl">
              Coming soon
            </p>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-light md:text-xl">
              The next hardware in the OffGrid Link line. A cleaner product page
              deserves a cleaner placeholder too.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="section-stage mx-auto mt-12 max-w-3xl rounded-[2.5rem] p-10"
          >
            <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-[2rem] bg-white shadow-sm">
              <Image
                src="/logo-512.png"
                alt="OffGrid Logo"
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6 px-6 md:grid-cols-3">
          {comingSoonCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="section-card rounded-[2rem] p-6"
            >
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                {card.kicker}
              </p>
              <h2 className="mt-3 font-display text-2xl font-semibold">
                {card.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-light">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="border-b border-border-subtle bg-background py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="section-card rounded-[2.5rem] px-8 py-12 md:px-14 md:py-16"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              In the meantime
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
              Link 1 is available now.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
              If you want the current OffGrid hardware, Link 1 is shipping now
              and already works with the mesh tools people use today.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/products/link-1"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              >
                View Link 1
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface-elevated px-8 py-4 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-background"
              >
                Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

const comingSoonCards = [
  {
    kicker: "What it means",
    title: "A cleaner placeholder",
    description:
      "Link 2 now sits inside the same neutral product system as the rest of the site instead of a separate glow-heavy page.",
  },
  {
    kicker: "What to expect",
    title: "More product detail later",
    description:
      "When Link 2 is ready, this page can expand into the same section-based product storytelling used for Link 1.",
  },
  {
    kicker: "Until then",
    title: "The current product stays front and center",
    description:
      "The page makes it clear that Link 2 is coming while still steering visitors toward the product that exists today.",
  },
];
