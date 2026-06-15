import { ARCHIVO_FONT_BASE64 } from "./ogFontData";

/**
 * Archivo TTF as an ArrayBuffer for `next/og` ImageResponse.
 *
 * The font is inlined as base64 (see ogFontData.ts) and decoded in-memory.
 * The previous implementation read the file from `public/fonts/` with
 * `node:fs`, which works in `next build`/`next dev` (Node) but throws at
 * request time on Cloudflare Workers — there is no filesystem in the Worker
 * runtime, so every OG image route returned a 500. Decoding an inlined string
 * has no I/O and works identically at build time and on the edge.
 */
let cached: ArrayBuffer | null = null;

export async function loadArchivoFont(): Promise<ArrayBuffer> {
  if (cached) return cached;

  const binary = atob(ARCHIVO_FONT_BASE64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  cached = bytes.buffer;
  return cached;
}
