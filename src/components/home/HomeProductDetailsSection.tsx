"use client";

import { motion } from "framer-motion";
import { fadeInLeft, fadeInRight } from "@/components/shared/motion";
import { link1Content } from "@/content/link1";

const HARDWARE_ROWS: ReadonlyArray<readonly [string, string]> = [
  ["SHELL", "Transparent polycarbonate"],
  ["CORE", "RAK WisBlock System"],
  ["RADIO", "LoRa SX1262 · 915 MHz"],
  ["MOUNT", "MagSafe · N52 magnet ring"],
  ["POWER", "Rechargeable Li-Po · USB-C"],
  ["RANGE", "10+ km line-of-sight"],
];

export function HomeProductDetailsSection() {
  return (
    <section className="relative overflow-hidden border-b border-bark bg-pitch py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInLeft}
        >
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
            I · The Object
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
            Built like a hand tool.
          </h2>

          <p
            className="mt-7 max-w-md text-sand"
            style={{
              fontFamily: "var(--font-editorial)",
              fontStyle: "italic",
              fontSize: 21,
              lineHeight: 1.5,
            }}
          >
            A transparent shell over the board, battery, and antenna. MagSafe-mounted
            to the phone you already carry. Built to live in a pocket and shrug off
            the trip.
          </p>

          <div
            className="mt-10 grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 text-[14px] text-bone"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {HARDWARE_ROWS.map(([label, value]) => (
              <div key={label} className="contents">
                <span className="text-sand/70">{label}</span>
                <span>{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeInRight}
          className="relative"
        >
          <ExplodedDevice />
        </motion.div>
      </div>
    </section>
  );
}

function ExplodedDevice() {
  const accent = "var(--app-ember)";
  const sand = "var(--app-sand)";
  const bark = "var(--app-bark)";

  return (
    <div className="relative aspect-[1/1.05] w-full">
      <svg
        viewBox="0 0 500 520"
        width="100%"
        height="100%"
        className="block"
        aria-hidden
      >
        <defs>
          <radialGradient id="bcShellLink1" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#2a2218" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0f0c08" stopOpacity="0.95" />
          </radialGradient>
        </defs>

        {/* Top shell */}
        <ellipse
          cx="250"
          cy="80"
          rx="135"
          ry="22"
          fill="url(#bcShellLink1)"
          stroke={sand}
          strokeOpacity="0.3"
        />
        <ellipse
          cx="250"
          cy="80"
          rx="120"
          ry="18"
          fill="none"
          stroke={sand}
          strokeOpacity="0.2"
        />
        <text
          x="250"
          y="55"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={sand}
          opacity="0.6"
          letterSpacing="2"
        >
          SHELL · TRANSPARENT PC
        </text>

        {/* Battery */}
        <ellipse
          cx="250"
          cy="180"
          rx="125"
          ry="20"
          fill="#1a140d"
          stroke={sand}
          strokeOpacity="0.25"
        />
        <text
          x="250"
          y="155"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={sand}
          opacity="0.6"
          letterSpacing="2"
        >
          CELL · RECHARGEABLE LI-PO
        </text>

        {/* Board */}
        <ellipse
          cx="250"
          cy="280"
          rx="115"
          ry="18"
          fill="#1a140d"
          stroke={sand}
          strokeOpacity="0.3"
        />
        <rect
          x="170"
          y="268"
          width="160"
          height="24"
          rx="3"
          fill="#0f0c08"
          stroke={sand}
          strokeOpacity="0.25"
        />
        <rect x="186" y="272" width="22" height="16" fill={bark} />
        <rect x="216" y="272" width="40" height="16" fill={bark} />
        <rect x="262" y="272" width="60" height="16" fill={bark} />
        <text
          x="250"
          y="255"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={sand}
          opacity="0.6"
          letterSpacing="2"
        >
          RAK WISBLOCK · CORE
        </text>

        {/* MagSafe ring */}
        <ellipse
          cx="250"
          cy="380"
          rx="125"
          ry="20"
          fill="none"
          stroke={accent}
          strokeWidth="1.5"
        />
        <ellipse
          cx="250"
          cy="380"
          rx="105"
          ry="16"
          fill="none"
          stroke={accent}
          strokeWidth="1"
          opacity="0.6"
        />
        <text
          x="250"
          y="355"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={accent}
          letterSpacing="2"
        >
          N52 MAGNET RING
        </text>

        {/* Bottom shell */}
        <ellipse
          cx="250"
          cy="470"
          rx="135"
          ry="22"
          fill="url(#bcShellLink1)"
          stroke={sand}
          strokeOpacity="0.3"
        />
        <text
          x="250"
          y="445"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="9"
          fill={sand}
          opacity="0.6"
          letterSpacing="2"
        >
          BACKPLATE · MAGSAFE
        </text>

        {/* Center axis */}
        <line
          x1="250"
          y1="40"
          x2="250"
          y2="500"
          stroke={sand}
          strokeOpacity="0.2"
          strokeDasharray="2 5"
        />

        {/* Right-side annotation labels */}
        <g
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill={sand}
          opacity="0.7"
        >
          <line
            x1="395"
            y1="80"
            x2="445"
            y2="80"
            stroke={sand}
            strokeOpacity="0.3"
          />
          <text x="450" y="84">12 mm</text>
          <line
            x1="395"
            y1="280"
            x2="445"
            y2="280"
            stroke={sand}
            strokeOpacity="0.3"
          />
          <text x="450" y="284">RAK · core</text>
          <line
            x1="395"
            y1="470"
            x2="445"
            y2="470"
            stroke={sand}
            strokeOpacity="0.3"
          />
          <text x="450" y="474">MagSafe</text>
        </g>
      </svg>
    </div>
  );
}
