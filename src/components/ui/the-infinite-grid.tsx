"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  type MotionValue,
} from "framer-motion";

type InfiniteGridBackgroundProps = {
  className?: string;
};

export function InfiniteGridBackground({
  className,
}: InfiniteGridBackgroundProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const patternId = useId().replace(/:/g, "");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);
  const [isLowMotionMode, setIsLowMotionMode] = useState(false);

  useAnimationFrame(() => {
    if (isLowMotionMode) {
      return;
    }

    gridOffsetX.set((gridOffsetX.get() + 0.5) % 40);
    gridOffsetY.set((gridOffsetY.get() + 0.5) % 40);
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

    if (!bounds) {
      return;
    }

    let raf = 0;
    const rect = bounds.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);

    const handlePointerMove = (event: PointerEvent) => {
      if (isLowMotionMode || raf) {
        return;
      }

      raf = requestAnimationFrame(() => {
        const nextRect = bounds.getBoundingClientRect();
        mouseX.set(event.clientX - nextRect.left);
        mouseY.set(event.clientY - nextRect.top);
        raf = 0;
      });
    };

    bounds.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      bounds.removeEventListener("pointermove", handlePointerMove);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [isLowMotionMode, mouseX, mouseY]);

  const maskImage = useMotionTemplate`radial-gradient(300px circle at ${mouseX}px ${mouseY}px, black, transparent)`;

  return (
    <div
      ref={rootRef}
      className={cn("pointer-events-none overflow-hidden", className)}
      aria-hidden
    >
      <div className="absolute inset-0 z-0 opacity-[0.035]">
        <GridPattern
          patternId={`grid-pattern-faint-${patternId}`}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </div>

      <motion.div
        className="absolute inset-0 z-0 opacity-25"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern
          patternId={`grid-pattern-mask-${patternId}`}
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
        />
      </motion.div>

      <div className="absolute inset-0 z-0">
        <div className="absolute right-[-20%] top-[-20%] h-[40%] w-[40%] rounded-full bg-orange-300/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] h-[20%] w-[20%] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[40%] w-[40%] rounded-full bg-sky-300/10 blur-[120px]" />
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
