"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import React from "react";

export type TestimonialV2Item = {
  text: string;
  name: string;
  role: string;
  /** Local path (e.g. /reviewers/…) or remote URL for avatar */
  avatarSrc?: string | null;
};

type TestimonialsV2SectionProps = {
  items: TestimonialV2Item[];
  badge?: string;
  title: string;
  description?: string;
  /** Optional node below description (e.g. star rating row) */
  headerExtra?: React.ReactNode;
};

function splitIntoThreeColumns(
  list: TestimonialV2Item[]
): [TestimonialV2Item[], TestimonialV2Item[], TestimonialV2Item[]] {
  const a: TestimonialV2Item[] = [];
  const b: TestimonialV2Item[] = [];
  const c: TestimonialV2Item[] = [];
  list.forEach((item, i) => {
    if (i % 3 === 0) a.push(item);
    else if (i % 3 === 1) b.push(item);
    else c.push(item);
  });
  return [a, b, c];
}

function initialsFromName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function TestimonialCard({ item }: { item: TestimonialV2Item }) {
  const showImage = Boolean(item.avatarSrc);

  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      whileFocus={{
        scale: 1.03,
        y: -8,
        transition: { type: "spring", stiffness: 400, damping: 17 },
      }}
      className="p-8 md:p-10 rounded-3xl border border-border-subtle glass shadow-lg shadow-black/5 max-w-xs w-full transition-all duration-300 cursor-default select-none group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    >
      <blockquote className="m-0 p-0">
        <div className="flex items-center gap-1 text-accent mb-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
        </div>
        <p className="text-foreground/90 leading-relaxed font-normal m-0">
          &ldquo;{item.text}&rdquo;
        </p>
        <footer className="flex items-center gap-3 mt-6">
          {showImage ? (
            <Image
              width={40}
              height={40}
              src={item.avatarSrc as string}
              alt={`${item.name} avatar`}
              className="h-10 w-10 rounded-full object-cover ring-2 ring-border-subtle group-hover:ring-accent/30 transition-all duration-300 ease-in-out"
            />
          ) : (
            <span
              className="h-10 w-10 rounded-full ring-2 ring-border-subtle group-hover:ring-accent/30 flex items-center justify-center text-xs font-semibold bg-accent/10 text-accent shrink-0 transition-all duration-300"
              aria-hidden
            >
              {initialsFromName(item.name)}
            </span>
          )}
          <div className="flex flex-col min-w-0 text-left">
            <cite className="font-display font-semibold not-italic tracking-tight leading-5 text-foreground truncate">
              {item.name}
            </cite>
            <span className="text-sm leading-5 tracking-tight text-muted mt-0.5">
              {item.role}
            </span>
          </div>
        </footer>
      </blockquote>
    </motion.div>
  );
}

function TestimonialsColumn(props: {
  className?: string;
  testimonials: TestimonialV2Item[];
  duration?: number;
  reduceMotion: boolean;
}) {
  const { testimonials, duration = 15, reduceMotion, className } = props;

  if (testimonials.length === 0) {
    return null;
  }

  if (reduceMotion) {
    return (
      <div className={className}>
        <ul className="flex flex-col gap-6 pb-6 list-none m-0 p-0">
          {testimonials.map((item) => (
            <li key={`${item.name}-${item.role}`} className="list-none">
              <TestimonialCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className={className}>
      <motion.ul
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent list-none m-0 p-0"
      >
        {[0, 1].map((dup) => (
          <React.Fragment key={dup}>
            {testimonials.map((item) => (
              <motion.li
                key={`${dup}-${item.name}-${item.role}`}
                aria-hidden={dup === 1 ? true : undefined}
                tabIndex={dup === 1 ? -1 : undefined}
                className="list-none block"
              >
                <TestimonialCard item={item} />
              </motion.li>
            ))}
          </React.Fragment>
        ))}
      </motion.ul>
    </div>
  );
}

export function TestimonialsV2Section({
  items,
  badge = "Testimonials",
  title,
  description,
  headerExtra,
}: TestimonialsV2SectionProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const [firstColumn, secondColumn, thirdColumn] = splitIntoThreeColumns(items);

  return (
    <section
      aria-labelledby="testimonials-v2-heading"
      className="relative py-24 md:py-32 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, rotate: -2 }}
        whileInView={{ opacity: 1, y: 0, rotate: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
          opacity: { duration: 0.8 },
        }}
        className="max-w-7xl px-6 z-10 mx-auto"
      >
        <div className="flex flex-col items-center justify-center max-w-[540px] mx-auto mb-16">
          <div className="flex justify-center">
            <div className="border border-border-subtle py-1 px-4 rounded-full text-xs font-semibold tracking-wide uppercase text-muted bg-fill-glass-elevated/80">
              {badge}
            </div>
          </div>

          <h2
            id="testimonials-v2-heading"
            className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mt-6 text-center text-foreground"
          >
            {title}
          </h2>
          {description ? (
            <p className="text-center mt-5 text-muted text-lg leading-relaxed max-w-sm">
              {description}
            </p>
          ) : null}
          {headerExtra ? (
            <div className="mt-6 flex flex-col items-center gap-2">
              {headerExtra}
            </div>
          ) : null}
        </div>

        <div
          className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[740px] overflow-hidden"
          role="region"
          aria-label="Scrolling customer reviews"
        >
          <TestimonialsColumn
            testimonials={firstColumn}
            duration={15}
            reduceMotion={reduceMotion}
          />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
            reduceMotion={reduceMotion}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
            reduceMotion={reduceMotion}
          />
        </div>
      </motion.div>
    </section>
  );
}
