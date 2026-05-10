"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type StartCopyValueProps = {
  label: string;
  value: string;
  className?: string;
};

export function StartCopyValue({ label, value, className }: StartCopyValueProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard API blocked (e.g. permissions). Fail silently — value is still visible.
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-border-card bg-surface px-4 py-3",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
          {label}
        </p>
        <p className="mt-1 break-all font-mono text-sm text-foreground md:text-base">
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border-card bg-fill-glass-elevated px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-fill-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent print:hidden"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
