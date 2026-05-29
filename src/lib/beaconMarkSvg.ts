/** Canonical OffGrid Beacon Ring mark palette — shared by favicon, OG, viewport. */
export const BEACON_MARK_PITCH = "#1B1813";
export const BEACON_MARK_BONE = "#F1ECE0";
export const BEACON_MARK_EMBER = "#FF6A00";

const MARK_VIEWBOX = "0 0 200 200";

/** Beacon Ring: open "O" ring + lit apex node, monochrome accent. */
const MARK_GRAPHIC = (accent: string) =>
  `<path d='M124.5 55.4 A58 58 0 1 1 75.5 55.4' fill='none' stroke='${accent}' stroke-width='22' stroke-linecap='round'/><circle cx='100' cy='40' r='17' fill='${accent}'/>`;

/** Favicon data URL with pitch background — used in layout metadata. */
export function beaconFaviconDataUrl(
  background = BEACON_MARK_PITCH,
  accent = BEACON_MARK_EMBER,
): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${MARK_VIEWBOX}'><rect width='200' height='200' fill='${background}'/>${MARK_GRAPHIC(accent)}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
