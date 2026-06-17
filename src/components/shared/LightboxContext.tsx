"use client";

import { createContext, useContext } from "react";

/** A single image the lightbox can display full-screen. */
export type LightboxImage = { src: string; alt: string };

/**
 * Opens the full-screen image viewer. Provided by `LightboxProvider`
 * (mounted once in the root layout) and consumed by every `ZoomableImage`.
 * Defaults to a no-op so a `ZoomableImage` rendered outside the provider
 * simply doesn't open anything instead of throwing.
 */
export const LightboxContext = createContext<(image: LightboxImage) => void>(
  () => {},
);

export function useLightbox() {
  return useContext(LightboxContext);
}
