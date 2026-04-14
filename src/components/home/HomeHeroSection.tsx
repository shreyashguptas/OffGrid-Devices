"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { ReviewSummaryPill } from "@/components/shared/ReviewSummaryPill";
import {
  fadeInUp,
  staggerContainer,
} from "@/components/shared/motion";
import { InfiniteGridBackground } from "@/components/ui/the-infinite-grid";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { link1Content } from "@/content/link1";

export function HomeHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border-subtle bg-background pt-6 pb-8 md:pt-8 md:pb-12">
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
              <motion.p
                variants={fadeInUp}
                className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
              >
                {link1Content.summary.name}
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                className="mt-4 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl"
              >
                {link1Content.home.heroTitle}
                <br />
                <span className="text-muted">{link1Content.home.heroSubtitle}</span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="mt-6 flex justify-center">
                <ReviewSummaryPill
                  avatars={link1Content.reviewSummary.reviewerAvatars}
                  text={link1Content.reviewSummary.pillText}
                  customerCountLabel={link1Content.reviewSummary.customerCountLabel}
                />
              </motion.div>
            </motion.div>
          }
          footerComponent={
            <Link1CheckoutButton
              defaultLabel={link1Content.summary.shortBuyLabel}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            />
          }
        >
          <div className="hero-media-frame relative h-full w-full">
            <Image
              src={link1Content.summary.heroImage.src}
              alt={link1Content.summary.heroImage.alt}
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
  );
}
