import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type AccordionDetailsProps = {
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
  id?: string;
};

export function AccordionDetails({
  summary,
  children,
  className,
  summaryClassName,
  contentClassName,
  id,
}: AccordionDetailsProps) {
  return (
    <details
      id={id}
      className={cn(
        "group section-card transition-colors open:bg-surface-elevated",
        className,
      )}
    >
      <summary
        className={cn(
          "flex cursor-pointer list-none items-start justify-between gap-6",
          summaryClassName,
        )}
      >
        {summary}
        <PlusMinusIcon />
      </summary>
      <div className={contentClassName}>{children}</div>
    </details>
  );
}

function PlusMinusIcon() {
  return (
    <span
      aria-hidden="true"
      className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-card text-muted transition-transform duration-300 group-open:rotate-45"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}
