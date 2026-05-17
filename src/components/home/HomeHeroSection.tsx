"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Link2CheckoutButton } from "@/components/Link2CheckoutButton";
import { useShopifyProduct } from "@/components/ShopifyCheckoutButton";
import { formatPrice } from "@/components/ShopifyPriceTag";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { link2Content } from "@/content/products";

// three.js + WebGL are client-only; defer the entire viewer to the client
// so SSR never has to evaluate it.
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
    <section className="relative flex min-h-svh flex-col overflow-hidden border-b border-bark bg-pitch">
      {/* Warm landscape gradient — quiet so the 3D device is the loudest
          thing on the surface. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 70% at 70% 35%, #3a2a1c 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 20% 110%, #221912 0%, transparent 60%), linear-gradient(180deg, #1c1611 0%, #1B1813 100%)",
        }}
      />

      {/* Topo line texture */}
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-35" />

      {/* Single warm sun glow behind the device. Repositioned per breakpoint
          so it always sits behind where the model is on screen. */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[55%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-64 md:w-64 lg:left-auto lg:right-[18%] lg:top-[38%] lg:translate-x-0 lg:translate-y-0 lg:h-72 lg:w-72"
        style={{
          background:
            "radial-gradient(circle, rgba(232,116,60,0.5), rgba(232,116,60,0.16) 55%, transparent 78%)",
          filter: "blur(8px)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pt-24 pb-12 sm:px-6 md:px-8 md:pt-28 md:pb-16 lg:px-10 lg:pt-32 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid items-center gap-10 md:gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
        >
          {/* Left column — minimal text + one clean buy button */}
          <div className="max-w-xl">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 border border-sand/25 px-3.5 py-2"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                color: "var(--app-sand)",
              }}
            >
              <span>EST. 2026 · MADE IN THE USA</span>
              <UsFlag />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="mt-7 text-bone uppercase md:mt-8"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                // Floor (40px) fits "Stay Connected" on a 360px-wide phone
                // without mid-word wraps. Ceiling (104px) keeps the headline
                // confident on ultra-wide displays.
                fontSize: "clamp(40px, 8.5vw, 104px)",
                lineHeight: 0.9,
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
              className="mt-6 max-w-md text-sand md:mt-7"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: "clamp(17px, 1.5vw, 24px)",
                lineHeight: 1.4,
              }}
            >
              MagSafe mesh radio. No towers. No SIMs.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 md:mt-10">
              <Link2CheckoutButton
                defaultLabel={buyLabel}
                loadingLabel={link2Content.summary.loadingLabel}
                className="inline-flex min-h-[56px] items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
                showArrow={false}
              />
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="mt-5 text-sand/55 md:mt-6"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {/* Helper text adapts to the input modality — see globals.css */}
              <span className="show-on-hover">
                Hover to follow · drag to rotate · scroll to zoom.
              </span>
              <span className="show-on-touch">
                Drag to rotate · pinch to zoom.
              </span>
            </motion.p>
          </div>

          {/* Right column — interactive 3D device. Square frame on mobile
              and tablet so the device feels like the centerpiece without
              eating the whole screen; fixed-height column on desktop. */}
          <motion.div
            variants={fadeInUp}
            role="img"
            aria-label="OffGrid Beacon 2 mesh radio — drag or hover to rotate"
            className="relative mx-auto aspect-square w-full max-w-[560px] sm:max-w-[640px] lg:mx-0 lg:aspect-auto lg:h-[680px] lg:max-w-none xl:h-[760px]"
          >
            <Beacon3DViewer />
          </motion.div>
        </motion.div>
      </div>
    </section>
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
        border: "1px solid rgba(217, 201, 168, 0.3)",
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
