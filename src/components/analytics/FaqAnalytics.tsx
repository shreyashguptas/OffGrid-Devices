"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";
import { trackFaqOpen } from "@/lib/analytics";

// Wraps an FAQ's <details> list and emits faq_open whenever a question
// transitions to the open state. Listens for the native toggle event so
// the wrapped FAQ stays a server component (preserving JSON-LD output).
export function FaqAnalytics({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    function onToggle(event: Event) {
      const target = event.target as HTMLDetailsElement | null;
      if (!target || target.tagName !== "DETAILS" || !target.open) return;
      const summary =
        target.querySelector("summary")?.textContent?.trim() ?? "(unknown)";
      trackFaqOpen(summary, pathname ?? "/");
    }

    // toggle does not bubble; capture phase lets one listener cover every
    // <details> inside the FAQ list without re-binding per item.
    root.addEventListener("toggle", onToggle, true);
    return () => root.removeEventListener("toggle", onToggle, true);
  }, [pathname]);

  return (
    <div ref={ref} className="contents">
      {children}
    </div>
  );
}
