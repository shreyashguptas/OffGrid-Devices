"use client";

import { useScroll, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useState, type RefObject } from "react";

type EndOffset = "end-start" | "end-end";

export function useSectionScrollProgress<T extends HTMLElement>(
  ref: RefObject<T | null>,
  endOffset: EndOffset,
): MotionValue<number> {
  const { scrollY } = useScroll();
  const [range, setRange] = useState({ start: 0, end: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () => {
      const node = ref.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const pageTop = rect.top + window.scrollY;
      const start = pageTop;
      const end =
        endOffset === "end-end"
          ? pageTop + node.offsetHeight - window.innerHeight
          : pageTop + node.offsetHeight;

      setRange({
        start,
        end: Math.max(start + 1, end),
      });
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(element);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [endOffset, ref]);

  return useTransform(scrollY, [range.start, range.end], [0, 1]);
}
