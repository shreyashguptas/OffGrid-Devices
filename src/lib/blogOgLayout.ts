/** Shared blog OG image palette and shell styles. */
export const BLOG_OG_GRADIENT =
  "linear-gradient(135deg, #0b1f1c 0%, #0f2a27 50%, #133731 100%)";

export const BLOG_OG_FG = "#f3f7f2";
export const BLOG_OG_MUTED = "#a8c1b9";
export const BLOG_OG_FOOTER = "#8fb0a6";
export const BLOG_OG_BADGE_BORDER = "#2f5b52";
export const BLOG_OG_BADGE_FG = "#c7d8d2";

export const blogOgShellStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  padding: "80px",
  background: BLOG_OG_GRADIENT,
  color: BLOG_OG_FG,
  fontFamily: "Archivo",
} as const;
