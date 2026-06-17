"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LightboxContext,
  type LightboxImage,
} from "@/components/shared/LightboxContext";

/**
 * Site-wide image lightbox.
 *
 * Mounted once in the root layout, wrapping the page. Any `ZoomableImage`
 * below it can call `useLightbox()` to open a tapped image full-screen. The
 * viewer closes on the close button, a tap on the empty backdrop, or the
 * Escape key, and locks body scroll while open so the page behind it stays
 * put on touch devices.
 *
 * Chrome stays deliberately quiet per the brand system: a deep-coal backdrop
 * (fixed dark in both light/dark themes via the `raw-*` tokens), zero
 * border-radius, hairline borders, and a single Ember accent on the close
 * affordance.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<LightboxImage | null>(null);

  const open = useCallback((image: LightboxImage) => setCurrent(image), []);
  const close = useCallback(() => setCurrent(null), []);

  useEffect(() => {
    if (!current) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);

    // Lock body scroll while the overlay is open.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [current, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {current ? <LightboxOverlay image={current} onClose={close} /> : null}
      </AnimatePresence>
    </LightboxContext.Provider>
  );
}

function LightboxOverlay({
  image,
  onClose,
}: {
  image: LightboxImage;
  onClose: () => void;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt ? `Expanded image: ${image.alt}` : "Expanded image"}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-raw-coal/95 p-4 backdrop-blur-sm sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close image"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-raw-bone/15 text-raw-bone transition-colors hover:border-raw-ember hover:text-raw-ember sm:right-6 sm:top-6"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <motion.img
        src={image.src}
        alt={image.alt}
        className="max-h-[88vh] max-w-full select-none object-contain"
        draggable={false}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.94 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onClick={(event) => event.stopPropagation()}
      />
    </motion.div>
  );
}
