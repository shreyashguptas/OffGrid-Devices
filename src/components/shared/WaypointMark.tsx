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
 * OffGrid Beacon Ring mark (handoff v1.2). The canonical mark is an open "O"
 * ring with a single lit apex node sitting in the gap at the top. The bare
 * version is used everywhere; the bracketed version adds survey-corner
 * brackets and is reserved for motion / instrument moments (boot, acquire,
 * transmit). Monochrome accent (Ember); `bone` only colours the brackets.
 */
export function WaypointMark({
  size = 40,
  accent = "var(--app-ember)",
  bone = "var(--app-fg)",
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
          <path d="M 20 44 L 20 20 L 44 20" />
          <path d="M 156 20 L 180 20 L 180 44" />
          <path d="M 180 156 L 180 180 L 156 180" />
          <path d="M 44 180 L 20 180 L 20 156" />
        </g>
      ) : null}

      {/* Open beacon ring */}
      <path
        d="M124.5 55.4 A58 58 0 1 1 75.5 55.4"
        fill="none"
        stroke={accent}
        strokeWidth="22"
        strokeLinecap="round"
      />
      {/* Lit apex node */}
      <circle cx="100" cy="40" r="17" fill={accent} />
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

export function BeaconWordmark({
  size = 22,
  className,
  withMark = true,
  accent = "var(--app-ember)",
  bone = "var(--app-fg)",
}: WordmarkProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.5,
        color: bone,
        fontFamily: "var(--font-display)",
        fontWeight: 900,
        fontSize: size,
        letterSpacing: "-0.03em",
        lineHeight: 1,
        textTransform: "uppercase",
      }}
    >
      {withMark ? (
        <WaypointMark size={size * 1.5} accent={accent} bone={bone} />
      ) : null}
      <span>OffGrid</span>
    </span>
  );
}
