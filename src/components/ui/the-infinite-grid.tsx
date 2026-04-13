"use client";

import React, { useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  type MotionValue,
} from "framer-motion";

type InfiniteGridBackgroundProps = {
  className?: string;
};

/**
 * Animated grid + cursor-follow mask + gradient blobs.
 * Mount inside a `relative` section; uses the section (parent) for pointer tracking
 * so the mask updates when moving over stacked hero content.
 */
export function InfiniteGridBackground({
  className,
}: InfiniteGridBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const patternId = useId().replace(/:/g, "");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const [isLowMotionMode, setIsLowMotionMode] = React.useState(false);

  const speedX = 0.5;
  const speedY = 0.5;

  useAnimationFrame(() => {
    if (isLowMotionMode) {
      return;
    }
    const currentX = gridOffsetX.get();
    const currentY = gridOffsetY.get();
    gridOffsetX.set((currentX + speedX) % 40);
    gridOffsetY.set((currentY + speedY) % 40);
  });

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compactViewportQuery = window.matchMedia("(max-width: 768px)");
    const updateMode = () => {
      setIsLowMotionMode(
        reducedMotionQuery.matches || compactViewportQuery.matches,
      );
    };

    updateMode();
    reducedMotionQuery.addEventListener("change", updateMode);
    compactViewportQuery.addEventListener("change", updateMode);
    return () => {
      reducedMotionQuery.removeEventListener("change", updateMode);
      compactViewportQuery.removeEventListener("change", updateMode);
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const bounds = root?.parentElement;
    if (!bounds) return;

    let raf = 0;
    const handlePointerMove = (e: PointerEvent) => {
      if (isLowMotionMode || raf) {
        return;
      }
      raf = requestAnimationFrame(() => {
        const rect = bounds.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
        raf = 0;
      });
    };

    bounds.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      bounds.removeEventListener("pointermove", handlePointerMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isLowMotionMode, mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-0 z-0 opacity-[0.05]">
        <GridPattern
          patternId={`grid-pattern-faint-${patternId}`}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </div>
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern
          patternId={`grid-pattern-mask-${patternId}`}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </motion.div>

      <div className="absolute inset-0 z-0">
        <div className="absolute right-[-20%] top-[-20%] h-[40%] w-[40%] rounded-full bg-orange-400/24 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] h-[20%] w-[20%] rounded-full bg-primary/18 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-sky-400/24 blur-[120px]" />
      </div>
    </div>
  );
}

function GridPattern({
  patternId,
  offsetX,
  offsetY,
}: {
  patternId: string;
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
}) {
  return (
    <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <motion.pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={offsetX}
          y={offsetY}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-muted-foreground"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}
