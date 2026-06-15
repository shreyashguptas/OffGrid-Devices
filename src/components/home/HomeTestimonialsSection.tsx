"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { RatingStars } from "@/components/shared/RatingStars";
import { cardVariant, staggerContainer } from "@/components/shared/motion";
import { beacon1Content } from "@/content/beacon1";
import { beacon2Content } from "@/content/products";

export function HomeTestimonialsSection() {
  const items = beacon1Content.testimonials.map((testimonial) => {
    const reviewer = beacon1Content.reviewSummary.reviewerAvatars.find(
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
            <div className="type-eyebrow text-ember">
              III · {beacon2Content.home.testimonials.eyebrow}
            </div>
            <h2 className="type-display-section mt-5 text-bone">
              {beacon2Content.home.testimonials.title}
            </h2>
            <p className="type-editorial-lead font-editorial mt-6 max-w-2xl text-sand">
              {beacon2Content.home.testimonials.subtitle}
            </p>
            <p className="font-mono mt-4 max-w-2xl text-[12px] tracking-[0.08em] text-sand/70">
              {beacon2Content.home.testimonials.footnote}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars className="inline-flex items-center gap-1 text-ember" size={18} />
            <span className="type-mono-label text-[12px] tracking-[0.14em] text-sand">
              {beacon1Content.reviewSummary.ratingLabel}
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
              <blockquote className="font-editorial text-[17px] leading-[1.45] text-bone sm:text-[19px]">
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
                    <span className="flex h-full w-full items-center justify-center font-display text-sm font-extrabold tracking-[0.02em] text-ember">
                      {item.initials}
                    </span>
                  )}
                </div>
                <div>
                  <div className="tracking-mono font-display text-[13px] font-bold uppercase text-bone">
                    {item.name}
                  </div>
                  <div className="tracking-mono font-mono text-[11px] uppercase text-sand/65">
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
