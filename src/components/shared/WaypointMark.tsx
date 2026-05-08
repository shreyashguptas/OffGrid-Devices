import type { CSSProperties } from "react";

type WaypointMarkProps = {
  size?: number;
  accent?: string;
  bone?: string;
  className?: string;
  style?: CSSProperties;
  withFrame?: "bare" | "brackets";
};

/**
 * Beacon Waypoint mark (Option A — Bare) with optional bracket frame
 * for animated states. Diamond mesh + lit nodes; the brand mark
 * the chat transcript landed on.
 */
export function WaypointMark({
  size = 40,
  accent = "var(--app-ember)",
  bone = "var(--app-bone)",
  className,
  style,
  withFrame = "bare",
}: WaypointMarkProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={{ display: "block", ...style }}
      aria-hidden="true"
    >
      {withFrame === "brackets" ? (
        <g
          stroke={bone}
          strokeWidth="6"
          fill="none"
          strokeLinecap="square"
          opacity="0.85"
        >
          <path d="M 32 56 L 32 32 L 56 32" />
          <path d="M 144 32 L 168 32 L 168 56" />
          <path d="M 168 144 L 168 168 L 144 168" />
          <path d="M 56 168 L 32 168 L 32 144" />
        </g>
      ) : null}

      <g
        stroke={accent}
        strokeWidth="9"
        fill="none"
        strokeLinejoin="miter"
        strokeLinecap="butt"
      >
        <path d="M 100 50 L 150 100 L 100 150 L 50 100 Z" />
        <line x1="100" y1="50" x2="100" y2="150" />
        <line x1="50" y1="100" x2="150" y2="100" />
      </g>
      <circle cx="100" cy="50" r="11" fill={accent} />
      <circle cx="150" cy="100" r="8" fill={bone} />
      <circle cx="100" cy="150" r="8" fill={bone} />
      <circle cx="50" cy="100" r="8" fill={bone} />
      <circle cx="100" cy="100" r="9" fill={accent} />
    </svg>
  );
}

type WordmarkProps = {
  size?: number;
  className?: string;
  withMark?: boolean;
  accent?: string;
  bone?: string;
};

/**
 * OffGrid wordmark in Beacon's Archivo Black, paired with the Waypoint mark.
 */
export function BeaconWordmark({
  size = 22,
  className,
  withMark = true,
  accent = "var(--app-ember)",
  bone = "var(--app-bone)",
}: WordmarkProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.45,
        color: bone,
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: size,
        letterSpacing: "0.02em",
        lineHeight: 1,
        textTransform: "uppercase",
      }}
    >
      {withMark ? (
        <WaypointMark size={size * 1.4} accent={accent} bone={bone} />
      ) : null}
      <span>OffGrid</span>
    </span>
  );
}
