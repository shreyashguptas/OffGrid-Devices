"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const SCROLL_RESTORE_KEY = "offgrid:bfcache-scroll-y";

type BfCacheShellProps = {
  children: ReactNode;
};

export function BfCacheShell({ children }: BfCacheShellProps) {
  const [shellKey, setShellKey] = useState(0);
  const pendingScrollRef = useRef<number | null>(null);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) {
        return;
      }

      const y = window.scrollY;
      pendingScrollRef.current = y;
      try {
        sessionStorage.setItem(SCROLL_RESTORE_KEY, String(y));
      } catch {
        // ignore quota / private mode
      }

      setShellKey((k) => k + 1);
    };

    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  useLayoutEffect(() => {
    if (shellKey === 0) {
      return;
    }

    let y = pendingScrollRef.current;
    pendingScrollRef.current = null;

    if (y === null || Number.isNaN(y)) {
      try {
        const stored = sessionStorage.getItem(SCROLL_RESTORE_KEY);
        if (stored !== null) {
          y = Number.parseFloat(stored);
        }
      } catch {
        // ignore
      }
    }

    if (y !== null && !Number.isNaN(y)) {
      window.scrollTo(0, y);
    }

    let raf1 = 0;
    let raf2 = 0;
    raf1 = requestAnimationFrame(() => {
      if (y !== null && !Number.isNaN(y)) {
        window.scrollTo(0, y);
      }
      raf2 = requestAnimationFrame(() => {
        if (y !== null && !Number.isNaN(y)) {
          window.scrollTo(0, y);
        }
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
    };
  }, [shellKey]);

  return <div key={shellKey}>{children}</div>;
}
