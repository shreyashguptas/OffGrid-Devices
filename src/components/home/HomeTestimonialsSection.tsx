"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { link1Content } from "@/content/link1";
import { link2Content } from "@/content/products";

export function HomeTestimonialsSection() {
  const items = link1Content.testimonials.map((testimonial) => {
    const reviewer = link1Content.reviewSummary.reviewerAvatars.find(
      (avatar) => avatar.name.toLowerCase() === testimonial.name.toLowerCase(),
    );

    return {
      text: testimonial.review,
      name: testimonial.name,
      date: testimonial.date,
      avatarSrc: reviewer?.image ?? testimonial.image ?? null,
      initials: reviewer?.initials ?? testimonial.name.charAt(0),
    };
  });

  return (
    <section className="relative border-b border-bark bg-pitch-low py-24 md:py-32">
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
              III · {link2Content.home.testimonials.eyebrow}
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
              {link2Content.home.testimonials.title}
            </h2>
            <p
              className="mt-6 max-w-2xl text-sand"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: 22,
                lineHeight: 1.4,
              }}
            >
              {link2Content.home.testimonials.subtitle}
            </p>
            <p
              className="mt-4 max-w-2xl text-sand/70"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.08em",
              }}
            >
              {link2Content.home.testimonials.footnote}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-ember">
              {Array.from({ length: 5 }, (_, index) => (
                <svg
                  key={index}
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span
              className="text-sand"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
              }}
            >
              {link1Content.reviewSummary.ratingLabel}
            </span>
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {items.map((item) => (
            <motion.figure
              key={`${item.name}-${item.date}`}
              variants={cardVariant}
              className="flex h-full flex-col border border-sand/15 bg-bark-soft p-7"
            >
              <blockquote
                className="text-bone"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontSize: 19,
                  lineHeight: 1.45,
                }}
              >
                “{item.text}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-sand/15 pt-5">
                <div className="relative h-10 w-10 overflow-hidden border border-sand/30 bg-pitch-deep">
                  {item.avatarSrc ? (
                    <Image
                      src={item.avatarSrc}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <span
                      className="flex h-full w-full items-center justify-center text-ember"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: 14,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.initials}
                    </span>
                  )}
                </div>
                <div>
                  <div
                    className="text-bone"
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: 13,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.name}
                  </div>
                  <div
                    className="text-sand/65"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {item.date} · Verified
                  </div>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
