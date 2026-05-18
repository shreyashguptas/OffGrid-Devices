"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Link2CheckoutButton } from "@/components/Link2CheckoutButton";
import { useShopifyProduct } from "@/components/ShopifyCheckoutButton";
import { formatPrice } from "@/components/ShopifyPriceTag";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { link2Content } from "@/content/products";

const Beacon3DViewer = dynamic(
  () =>
    import("@/components/home/Beacon3DViewer").then((m) => m.Beacon3DViewer),
  { ssr: false },
);

export function HomeHeroSection() {
  const { product } = useShopifyProduct(
    "/api/shopify/link-2",
    "offgrid:link2-product",
  );
  const livePrice = formatPrice(product?.variant?.price ?? null);
  const buyLabel = livePrice ? `Carry one — ${livePrice}` : "Carry one";

  return (
    <section className="relative overflow-hidden border-b border-bark bg-pitch">
      {/* Background gradient — warm tone behind the model column,
          neutral on the left where text lives. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 80% 40%, var(--app-color-bark) 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 15% 110%, var(--app-color-pitch-low) 0%, transparent 60%), linear-gradient(180deg, var(--app-color-pitch-low) 0%, var(--app-color-pitch) 100%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 topo-overlay opacity-30" />

      {/* Content grid.
          Mobile/tablet: vertical stack — text on top, model square below.
          Desktop (lg+): true 2-column grid, both columns vertically centered,
          hero takes full viewport height. No absolute positioning, no overlap. */}
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-24 sm:px-6 md:gap-14 md:px-8 md:pb-20 md:pt-28 lg:min-h-svh lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-32">
        {/* Text column */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex min-w-0 max-w-xl flex-col"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex w-fit max-w-full flex-wrap items-center gap-x-2.5 gap-y-1 border border-sand/25 px-3 py-2 sm:px-3.5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(9px, 2.2vw, 11px)",
              letterSpacing: "0.16em",
              color: "var(--app-muted)",
            }}
          >
            <span>EST. 2026 · DESIGNED + ASSEMBLED IN THE USA</span>
            <UsFlag />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-7 text-bone uppercase md:mt-9"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(34px, 8vw, 80px)",
              lineHeight: 0.92,
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
            className="mt-5 max-w-md text-sand md:mt-7"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(17px, 2vw, 22px)",
              lineHeight: 1.4,
              letterSpacing: "-0.01em",
            }}
          >
            MagSafe mesh radio. No towers. No SIMs.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-7 md:mt-10">
            <Link2CheckoutButton
              defaultLabel={buyLabel}
              loadingLabel={link2Content.summary.loadingLabel}
              className="inline-flex min-h-[56px] w-full items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              showArrow={false}
            />
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-4 inline-flex items-center gap-2 text-sand md:mt-5"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(10px, 2.4vw, 12px)",
              fontWeight: 500,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <span>Comes pre-installed with</span>
            <MeshtasticMark />
            <span>Meshtastic</span>
          </motion.div>
        </motion.div>

        {/* 3D model column — constrained to a square so the canvas knows its
            bounds and the model centers itself (the viewer's aspect-aware
            rest offset zeroes out at 1:1). */}
        <div
          className="relative mx-auto aspect-square w-full min-w-0 sm:max-w-[480px] md:max-w-[560px] lg:mx-0 lg:ml-auto lg:max-w-none"
          role="img"
          aria-label="OffGrid Beacon 2 mesh radio — drag or hover to rotate"
        >
          {/* Ember sun-glow lives inside the model column so it follows
              the model wherever the layout puts it. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[10%]"
            style={{
              background:
                "radial-gradient(circle, rgba(232,116,60,0.45), rgba(232,116,60,0.12) 50%, transparent 78%)",
              filter: "blur(12px)",
            }}
          />
          <Beacon3DViewer />
        </div>
      </div>
    </section>
  );
}

function MeshtasticMark() {
  return (
    <svg
      viewBox="0 0 100 55"
      width={26}
      height={14}
      aria-hidden
      fill="currentColor"
      style={{ display: "block", flexShrink: 0 }}
    >
      <g transform="matrix(0.802386,0,0,0.460028,-421.748,-122.127)">
        <g transform="matrix(0.579082,0,0,1.01004,460.975,-39.6867)">
          <path d="M250.908,330.267L193.126,415.005L180.938,406.694L244.802,313.037C246.174,311.024 248.453,309.819 250.889,309.816C253.326,309.814 255.606,311.015 256.982,313.026L320.994,406.536L308.821,414.869L250.908,330.267Z" />
        </g>
        <g transform="matrix(0.582378,0,0,1.01579,485.019,-211.182)">
          <path d="M87.642,581.398L154.757,482.977L142.638,474.713L75.523,573.134L87.642,581.398Z" />
        </g>
      </g>
    </svg>
  );
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
        border: "1px solid var(--app-border-emphasis)",
      }}
    >
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
      <rect x="0" y="0" width="13" height={22 * (7 / 13)} fill="#3C3B6E" />
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
