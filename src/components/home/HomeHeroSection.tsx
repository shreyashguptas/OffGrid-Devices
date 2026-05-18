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
    <section className="relative flex min-h-svh flex-col overflow-hidden border-b border-bark bg-pitch">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 70% at 70% 35%, #3a2a1c 0%, transparent 55%), radial-gradient(ellipse 90% 100% at 20% 110%, #221912 0%, transparent 60%), linear-gradient(180deg, #1c1611 0%, #1B1813 100%)",
        }}
      />

      <div aria-hidden className="absolute inset-0 topo-overlay opacity-35" />

      {/* Sun glow follows the device's on-screen position: lower-center
          on mobile (device sits in the bottom half), upper-right on
          desktop (device sits on the right). */}
      <div
        aria-hidden
        className="absolute left-1/2 top-[72%] h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full md:h-64 md:w-64 lg:left-auto lg:right-[18%] lg:top-[38%] lg:translate-x-0 lg:translate-y-0 lg:h-72 lg:w-72"
        style={{
          background:
            "radial-gradient(circle, rgba(232,116,60,0.5), rgba(232,116,60,0.16) 55%, transparent 78%)",
          filter: "blur(8px)",
        }}
      />

      {/* Text — flows naturally above the viewer on mobile, becomes an
          overlay layer on desktop. pointer-events kept off the wrapper
          so drags on text pass through to the canvas; CTA opts back in. */}
      <div className="pointer-events-none relative z-10 mx-auto flex w-full max-w-7xl flex-col px-5 pt-24 pb-6 sm:px-6 md:px-8 md:pt-28 md:pb-8 lg:flex-1 lg:justify-center lg:px-10 lg:pt-32 lg:pb-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-xl"
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 border border-sand/25 px-3 py-1.5 sm:gap-2.5 sm:px-3.5 sm:py-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(9px, 2.5vw, 11px)",
              letterSpacing: "0.18em",
              color: "var(--app-sand)",
            }}
          >
            <span>EST. 2026 · DESIGNED AND ASSEMBLED IN THE USA</span>
            <UsFlag />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 text-bone uppercase md:mt-8"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 900,
              fontSize: "clamp(36px, 7vw, 72px)",
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
            className="mt-5 max-w-md text-sand md:mt-7"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: "clamp(16px, 1.5vw, 24px)",
              lineHeight: 1.4,
            }}
          >
            MagSafe mesh radio. No towers. No SIMs.
          </motion.p>

          <motion.div variants={fadeInUp} className="pointer-events-auto mt-7 md:mt-10">
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
      </div>

      {/* 3D viewer.
          Mobile: lives in the bottom region of the section as a flex
          child — text sits above, viewer sits below, both clearly
          visible above the fold on a typical phone.
          Desktop: becomes an absolute overlay so the device can grow
          past the right-column boundary when the user zooms in. */}
      <div
        className="relative z-[5] flex-1 min-h-[52svh] lg:absolute lg:inset-0 lg:min-h-0 lg:flex-none"
        role="img"
        aria-label="OffGrid Beacon 2 mesh radio — drag or hover to rotate"
      >
        <Beacon3DViewer />
      </div>
    </section>
  );
}

function MeshtasticMark() {
  // Official Meshtastic mark (from meshtastic/design — Mesh_Logo_Black.svg).
  // Rendered in currentColor so it inherits the surrounding mono text color
  // (Sand) — keeps Ember as the single accent on this surface.
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
