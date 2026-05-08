"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { fadeInUp, staggerContainer } from "@/components/shared/motion";
import { link1Content } from "@/content/link1";

const FIELD_CARD_ROWS: ReadonlyArray<readonly [string, string]> = [
  ["MOUNT", "MagSafe · N52 ring"],
  ["RADIO", "LoRa · 915 MHz"],
  ["RANGE", "10+ km line-of-sight"],
  ["CHARGE", "USB-C · all-day"],
  ["FIRMWARE", "Meshtastic · MeshCore"],
  ["BUILD", "Transparent shell"],
];

export function HomeHeroSection() {
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
                fontSize: "clamp(56px, 11vw, 144px)",
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
              }}
            >
              {link1Content.home.heroTitle.replace(/\.$/, "")}
              <br />
              <span className="text-ember">
                {link1Content.home.heroSubtitle.replace(/\.$/, "")}.
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
              {link1Content.summary.brandedName} is the MagSafe LoRa mesh radio
              for the trail, the boat, the pass, the tower. No towers. No SIMs.
              No subscriptions.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="mt-10 flex flex-wrap items-center gap-5"
            >
              <Link1CheckoutButton
                defaultLabel={`Carry one — ${link1Content.summary.shortBuyLabel}`}
                loadingLabel={link1Content.summary.loadingLabel}
                className="bg-ember px-8 py-5 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors duration-300 hover:bg-bone disabled:opacity-60 disabled:cursor-not-allowed"
                showArrow={false}
              />
              <a
                href="#features"
                className="inline-flex items-center gap-2 border-b border-bone pb-1 text-bone hover:text-ember hover:border-ember transition-colors"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "0.18em",
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
              Field Card · Link 1
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
              “Snaps onto the phone you already carry — and the mesh comes with
              it.”
            </p>

            {/* Subtle product accent */}
            <Image
              src={link1Content.summary.heroImage.src}
              alt={link1Content.summary.heroImage.alt}
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
              className={`flex min-w-0 flex-col items-center px-5 py-10 text-center md:px-6 ${
                // vertical rail between every column on desktop;
                // on mobile, rails between columns and a row-rail above the second row.
                index % 2 === 0 ? "" : "border-l border-bark"
              } ${index >= 2 ? "border-t border-bark md:border-t-0" : ""} ${
                index === 2 ? "md:border-l md:border-bark" : ""
              }`}
            >
              <div
                className="w-full truncate text-bone"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: stat.kind === "number"
                    ? "clamp(38px, 4.6vw, 64px)"
                    : "clamp(28px, 3vw, 40px)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {stat.metric}
              </div>
              <div
                className="mt-3 text-sand"
                style={{
                  fontFamily: "var(--font-editorial)",
                  fontStyle: "italic",
                  fontSize: 15,
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

type Stat = {
  metric: string;
  label: string;
  kind: "number" | "word";
};

const STATS: Stat[] = [
  { metric: "10+ km", label: "of off-grid range", kind: "number" },
  { metric: "64 g", label: "about a deck of cards", kind: "number" },
  { metric: "MagSafe", label: "snaps to your phone", kind: "word" },
  { metric: "USB-C", label: "fast-charge ready", kind: "word" },
];

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
