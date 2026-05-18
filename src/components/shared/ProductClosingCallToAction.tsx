import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ProductClosingCallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  primaryAction: ReactNode;
  footer?: ReactNode;
  className?: string;
  backgroundClassName?: string;
};

export function ProductClosingCallToAction({
  eyebrow,
  title,
  description,
  secondaryHref,
  secondaryLabel,
  primaryAction,
  footer,
  className,
  backgroundClassName = "bg-pitch",
}: ProductClosingCallToActionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-bark py-20 md:py-44",
        backgroundClassName,
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 1440 280"
        className="absolute bottom-0 left-0 block w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M0,280 L0,180 L160,120 L320,180 L520,80 L720,180 L920,100 L1120,180 L1320,120 L1440,180 L1440,280 Z"
          fill="var(--app-bark)"
          opacity="0.5"
        />
      </svg>

      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <p className="type-eyebrow text-ember">{eyebrow}</p>

        <h2
          className="mx-auto mt-6 max-w-3xl font-display text-bone uppercase"
          style={{
            fontWeight: 900,
            fontSize: "clamp(36px, 9vw, 120px)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
          }}
        >
          Carry it. <span className="text-ember">Use it.</span>
        </h2>

        <p
          className="type-editorial-lead mx-auto mt-8 max-w-xl text-sand"
          style={{ fontSize: "clamp(18px, 1.6vw, 24px)" }}
        >
          {description || title}
        </p>

        <div className="mt-10 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
          {primaryAction}
          <Link
            href={secondaryHref}
            className="type-eyebrow inline-flex min-h-[56px] items-center justify-center border border-bone px-6 py-4 text-bone transition-colors duration-300 hover:border-ember hover:text-ember sm:px-10 sm:py-5"
            style={{ fontSize: 13, letterSpacing: "0.18em" }}
          >
            {secondaryLabel}
          </Link>
        </div>

        {footer}
      </div>
    </section>
  );
}
