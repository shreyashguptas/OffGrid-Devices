/** Canonical OffGrid Beacon mark palette — shared by favicon, OG, viewport. */
export const BEACON_MARK_PITCH = "#1B1813";
export const BEACON_MARK_BONE = "#F1ECE0";
export const BEACON_MARK_EMBER = "#E8743C";

const MARK_VIEWBOX = "24 20 152 152";

const MARK_GRAPHIC = (accent: string) =>
  `<g stroke='${accent}' fill='none' stroke-linecap='round'><circle cx='100' cy='64' r='22' stroke-width='4' opacity='0.18'/><circle cx='100' cy='64' r='34' stroke-width='4' opacity='0.10'/></g><g stroke='${accent}' stroke-width='5' stroke-linecap='round' opacity='0.85'><line x1='100' y1='64' x2='146' y2='110'/><line x1='146' y1='110' x2='100' y2='156'/><line x1='100' y1='156' x2='54' y2='110'/><line x1='54' y1='110' x2='100' y2='64'/><line x1='100' y1='64' x2='100' y2='156' opacity='0.55'/><line x1='54' y1='110' x2='146' y2='110' opacity='0.55'/></g><circle cx='100' cy='64' r='13' fill='${accent}'/><circle cx='146' cy='110' r='9' fill='${accent}'/><circle cx='100' cy='156' r='9' fill='${accent}'/><circle cx='54' cy='110' r='9' fill='${accent}'/>`;

/** Favicon data URL with pitch background — used in layout metadata. */
export function beaconFaviconDataUrl(
  background = BEACON_MARK_PITCH,
  accent = BEACON_MARK_EMBER,
): string {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='${MARK_VIEWBOX}'><rect x='24' y='20' width='152' height='152' fill='${background}'/>${MARK_GRAPHIC(accent)}</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
