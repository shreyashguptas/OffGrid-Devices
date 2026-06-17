"use client";

import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { useLightbox } from "@/components/shared/LightboxContext";

/**
 * Drop-in replacement for `next/image` that opens the tapped image in the
 * site-wide lightbox (see `LightboxProvider`). It forwards every `next/image`
 * prop unchanged — `fill`, `width`/`height`, `sizes`, `priority`, etc. — and
 * only adds the click target, keyboard support, and a zoom cursor, so existing
 * layouts keep working with just an import swap.
 *
 * Use this for standalone content photos (build-log shots, product galleries,
 * blog images). Leave plain `next/image` for images that are themselves links,
 * tiny avatars, or decorative chrome.
 */
export function ZoomableImage({ className, ...props }: ImageProps) {
  const openLightbox = useLightbox();

  const { src, alt } = props;
  // `next/image` accepts a string path or a StaticImport object; the lightbox
  // renders a plain element, so resolve down to the underlying URL string.
  const resolvedSrc =
    typeof src === "string"
      ? src
      : typeof src === "object" && src !== null
        ? "default" in src
          ? src.default.src
          : src.src
        : "";

  const open = () => {
    if (resolvedSrc) openLightbox({ src: resolvedSrc, alt: alt ?? "" });
  };

  return (
    <Image
      {...props}
      className={cn("cursor-zoom-in", className)}
      role="button"
      tabIndex={0}
      aria-label={alt ? `Expand image: ${alt}` : "Expand image"}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      }}
    />
  );
}
