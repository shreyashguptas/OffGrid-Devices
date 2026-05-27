"use client";

import { useEffect, useRef } from "react";
import { trackBlogRead, trackBlogScrollDepth } from "@/lib/analytics";

const MILESTONES = [25, 50, 75, 100] as const;
type Milestone = (typeof MILESTONES)[number];

// Fires blog_view on mount, then blog_scroll_depth(25/50/75/100) as the
// reader scrolls past each milestone (each fires at most once per page
// load). Uses scroll position over the whole document, rAF-throttled so
// the listener stays cheap.
export function TrackBlogView({ slug }: { slug: string }) {
  const fired = useRef<Set<Milestone>>(new Set());

  useEffect(() => {
    trackBlogRead(slug);
  }, [slug]);

  useEffect(() => {
    let ticking = false;

    function check() {
      ticking = false;
      const scrollY = window.scrollY;
      const viewport = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const scrollable = Math.max(1, docHeight - viewport);
      const pct = Math.min(
        100,
        Math.round(((scrollY + viewport) / docHeight) * 100),
      );

      for (const milestone of MILESTONES) {
        if (pct >= milestone && !fired.current.has(milestone)) {
          fired.current.add(milestone);
          trackBlogScrollDepth(slug, milestone);
        }
      }
      // Short articles where the viewport already covers the page — record
      // 100% on mount so the funnel doesn't look broken.
      if (scrollable < 16 && !fired.current.has(100)) {
        fired.current.add(100);
        trackBlogScrollDepth(slug, 100);
      }
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    }

    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  return null;
}
