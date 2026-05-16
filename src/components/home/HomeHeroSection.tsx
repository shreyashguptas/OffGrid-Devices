"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link2CheckoutButton } from "@/components/Link2CheckoutButton";
import { useShopifyProduct } from "@/components/ShopifyCheckoutButton";
import { formatPrice } from "@/components/ShopifyPriceTag";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { link2Content } from "@/content/products";

const FIELD_CARD_ROWS = link2Content.home.fieldCard.rows;
const STATS = link2Content.home.stats;

export function HomeHeroSection() {
  const { product } = useShopifyProduct(
    "/api/shopify/link-2",
    "offgrid:link2-product",
  );
  const livePrice = formatPrice(product?.variant?.price ?? null);
  const buyLabel = livePrice ? `Carry one — ${livePrice}` : "Carry one";

  return (
    <section className="relative overflow-hidden border-b border-bark bg-pitch">
      {/* Photographic warm gradient — landscape mood */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 80% 30%, #4a3826 0%, transparent 50%), radial-gradient(ellipse 90% 100% at 20% 110%, #2a1f15 0%, transparent 60%), linear-gradient(180deg, #221c14 0%, #1B1813 100%)",
        }}
      />

      {/* Topo line texture */}
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-50" />

      {/* Mountain silhouettes */}
      <svg
        aria-hidden
        viewBox="0 0 1440 700"
        className="absolute bottom-0 left-0 block h-[58%] w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,700 L0,420 L160,310 L260,360 L420,200 L580,330 L720,240 L880,380 L1040,260 L1200,340 L1320,280 L1440,360 L1440,700 Z"
          fill="#0f0c08"
          opacity="0.85"
        />
        <path
          d="M0,700 L0,520 L100,460 L240,500 L380,400 L520,470 L680,420 L820,490 L980,440 L1180,500 L1320,460 L1440,500 L1440,700 Z"
          fill="#0a0805"
        />
      </svg>

      {/* Sun/glow */}
      <div
        aria-hidden
        className="absolute right-[14%] top-[24%] h-32 w-32 md:h-40 md:w-40 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(232,116,60,0.85), rgba(232,116,60,0.25) 60%, transparent 80%)",
          filter: "blur(2px)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-end gap-14 lg:grid-cols-[1.35fr_1fr]"
        >
          <div>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 border border-sand/25 px-3.5 py-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "var(--app-sand)",
              }}
            >
              <span>EST. 2026 · MADE IN THE USA</span>
              <UsFlag />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-6 text-bone uppercase"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                // Brand handoff D1 = 128 / 0.88. Hard-cap at 128 instead of 144.
                fontSize: "clamp(56px, 11vw, 128px)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              {link2Content.home.heroTitle.replace(/\.$/, "")}
              <br />
              <span className="text-ember">
                {link2Content.home.heroSubtitle.replace(/\.$/, "")}.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-xl text-sand"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 1.6vw, 24px)",
                lineHeight: 1.4,
              }}
            >
              {link2Content.home.heroIntro}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4"
            >
              <Link2CheckoutButton
                defaultLabel={buyLabel}
                loadingLabel={link2Content.summary.loadingLabel}
                className="bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:opacity-60 disabled:cursor-not-allowed"
                showArrow={false}
              />
              <a
                href="#features"
                className="inline-flex items-center gap-2 border-b border-bone pb-1 text-bone hover:text-ember hover:border-ember transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 13,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }}
              >
                Read field notes →
              </a>
            </motion.div>
          </div>

          {/* Field card */}
          <motion.div
            variants={fadeInUp}
            className="relative ml-auto w-full max-w-md self-end border border-sand/25 bg-bark-soft/85 p-7 backdrop-blur-sm"
            style={{ fontFamily: "var(--font-mono)", color: "var(--app-sand)" }}
          >
            <div
              className="text-ember"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
              }}
            >
              {link2Content.home.fieldCard.label}
            </div>
            <div className="my-3 h-px bg-sand/25" />
            <div
              className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-2.5 text-[12px]"
              style={{ letterSpacing: "0.04em" }}
            >
              {FIELD_CARD_ROWS.map(([label, value]) => (
                <div key={label} className="contents">
                  <span className="opacity-60">{label}</span>
                  <span className="text-bone">{value}</span>
                </div>
              ))}
            </div>
            <div className="my-4 h-px bg-sand/25" />
            <p
              className="text-bone/90"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.5,
              }}
            >
              {link2Content.home.fieldCard.quote}
            </p>

            {/* Subtle product accent */}
            <Image
              src={link2Content.summary.heroImage.src}
              alt={link2Content.summary.heroImage.alt}
              width={320}
              height={213}
              className="mt-6 w-full opacity-95"
              priority
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Marquee stats — sits inside hero zone, like the design */}
      <div className="relative z-10 border-t border-bark">
        <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, index) => (
            <div
              key={stat.metric}
              className={`flex min-w-0 flex-col items-center justify-start px-4 py-14 text-center md:px-8 md:py-16 ${
                index % 2 === 0 ? "" : "border-l border-bark"
              } ${index >= 2 ? "border-t border-bark md:border-t-0" : ""} ${
                index === 2 ? "md:border-l md:border-bark" : ""
              }`}
            >
              <div
                className="text-bone whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  // Sized so the longest metric ("3000 mAh") fits on a
                  // single line within a 1280/4 column at all breakpoints.
                  fontSize: "clamp(34px, 4.4vw, 56px)",
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  textTransform: "uppercase",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatMetric(stat.metric)}
              </div>
              <div
                className="mt-4 text-sand"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  fontSize: 17,
                  lineHeight: 1.35,
                  letterSpacing: "-0.01em",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Keep a value + unit together on one line so "10+ km" and "3000 mAh"
// never split across a wrap. We replace the *last* space in the metric
// with a non-breaking space; single-token metrics like "MagSafe" or
// "USB-C" pass through unchanged.
function formatMetric(metric: string): string {
  const lastSpace = metric.lastIndexOf(" ");
  if (lastSpace === -1) {
    return metric;
  }
  return `${metric.slice(0, lastSpace)} ${metric.slice(lastSpace + 1)}`;
}

function UsFlag() {
  return (
    <svg
      viewBox="0 0 30 22"
      width={20}
      height={14}
      aria-hidden
      style={{
        display: "block",
        flexShrink: 0,
        border: "1px solid rgba(217, 201, 168, 0.3)",
      }}
    >
      {/* 13 alternating red/white stripes */}
      {Array.from({ length: 13 }, (_, index) => (
        <rect
          key={index}
          x="0"
          y={index * (22 / 13)}
          width="30"
          height={22 / 13}
          fill={index % 2 === 0 ? "#B22234" : "#FFFFFF"}
        />
      ))}
      {/* Canton */}
      <rect x="0" y="0" width="13" height={22 * (7 / 13)} fill="#3C3B6E" />
      {/* Star dots — abstracted at this size */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1.4 + col * 2.5}
            cy={1.4 + row * 2.5}
            r="0.55"
            fill="#FFFFFF"
          />
        )),
      )}
    </svg>
  );
}
