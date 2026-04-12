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

type NavigatorWithConnection = Navigator & {
  connection?: {
    saveData?: boolean;
  };
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

  useEffect(() => {
    const connection = (navigator as NavigatorWithConnection).connection;
    if (connection?.saveData) {
      return;
    }
    const browserWindow = window as Window & {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const warmShopifyCache = () => {
      void fetch("/api/shopify/link-1", { method: "GET" }).catch(() => undefined);
    };

    if (typeof browserWindow.requestIdleCallback === "function") {
      const idleId = browserWindow.requestIdleCallback(warmShopifyCache, {
        timeout: 2000,
      });
      return () => {
        if (typeof browserWindow.cancelIdleCallback === "function") {
          browserWindow.cancelIdleCallback(idleId);
        }
      };
    }

    const timeoutId = browserWindow.setTimeout(warmShopifyCache, 500);
    return () => browserWindow.clearTimeout(timeoutId);
  }, []);

  return <div key={shellKey}>{children}</div>;
}
