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
 * OffGrid Beacon mark — Option A (Bare) by default, Option B (Brackets) for
 * animated states. Four orange nodes (top broadcaster + L/R/bottom relays),
 * diamond mesh edges with crossbars, and two concentric broadcast rings above
 * the top node. All orange ember, no bone/white dots.
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
      viewBox="24 20 152 152"
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
          <path d="M 30 76 L 30 52 L 54 52" />
          <path d="M 146 52 L 170 52 L 170 76" />
          <path d="M 170 168 L 170 192 L 146 192" />
          <path d="M 54 192 L 30 192 L 30 168" />
        </g>
      ) : null}

      <g stroke={accent} fill="none" strokeLinecap="round">
        <circle cx="100" cy="64" r="22" strokeWidth="4" opacity="0.18" />
        <circle cx="100" cy="64" r="34" strokeWidth="4" opacity="0.10" />
      </g>
      <g stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.85">
        <line x1="100" y1="64" x2="146" y2="110" />
        <line x1="146" y1="110" x2="100" y2="156" />
        <line x1="100" y1="156" x2="54" y2="110" />
        <line x1="54" y1="110" x2="100" y2="64" />
        <line x1="100" y1="64" x2="100" y2="156" opacity="0.55" />
        <line x1="54" y1="110" x2="146" y2="110" opacity="0.55" />
      </g>
      <circle cx="100" cy="64" r="13" fill={accent} />
      <circle cx="146" cy="110" r="9" fill={accent} />
      <circle cx="100" cy="156" r="9" fill={accent} />
      <circle cx="54" cy="110" r="9" fill={accent} />
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
        <WaypointMark size={size * 1.6} accent={accent} bone={bone} />
      ) : null}
      <span>OffGrid</span>
    </span>
  );
}
