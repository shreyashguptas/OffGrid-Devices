"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionIntroProps = {
  badge: string;
  title: ReactNode;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionIntro({
  badge,
  title,
  description,
  centered = true,
  className,
}: SectionIntroProps) {
  return (
    <div
      className={cn(
        centered ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      )}
    >
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
        {badge}
      </p>
      <div className="type-display-section mt-4">
        {title}
      </div>
      {description ? (
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
          {description}
        </p>
      ) : null}
    </div>
  );
}
