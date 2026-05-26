"use client";

import { useSyncExternalStore } from "react";
import posthog from "posthog-js";

// posthog-js stores opt-out state in cookies + localStorage but doesn't
// emit change events. We keep a tiny listener set and notify it whenever
// the button is clicked, so useSyncExternalStore picks up the change.
const listeners = new Set<() => void>();
function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
function notify() {
  listeners.forEach((listener) => listener());
}

function getSnapshot(): "in" | "out" | "unavailable" {
  try {
    return posthog.has_opted_out_capturing() ? "out" : "in";
  } catch {
    return "unavailable";
  }
}
// Server snapshot pins to "unavailable" so the button is never in SSR
// output — avoids hydration mismatch when the client reads cookies.
const getServerSnapshot = () => "unavailable" as const;

export function PostHogOptOut() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  if (state === "unavailable") return null;

  const optedOut = state === "out";

  function toggle() {
    try {
      if (optedOut) {
        posthog.opt_in_capturing();
      } else {
        posthog.opt_out_capturing();
      }
    } catch {
      // posthog-js not initialized — nothing to toggle.
    }
    notify();
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="type-mono-label mt-4 inline-flex items-center border border-bone/30 px-4 py-3 text-bone hover:border-ember hover:text-ember"
    >
      {optedOut ? "Opt back into analytics" : "Opt out of analytics on this browser"}
    </button>
  );
}
