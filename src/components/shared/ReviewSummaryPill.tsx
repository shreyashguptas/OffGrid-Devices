"use client";

import Image from "next/image";
import type { ReviewerAvatar } from "@/content/link1";
import { cn } from "@/lib/utils";

type ReviewSummaryPillProps = {
  avatars: ReviewerAvatar[];
  text: string;
  customerCountLabel: string;
  className?: string;
};

export function ReviewSummaryPill({
  avatars,
  text,
  customerCountLabel,
  className,
}: ReviewSummaryPillProps) {
  return (
    <div
      className={cn(
        "surface-shadow flex items-center rounded-full border border-border bg-surface px-1.5 py-1.5 sm:px-2 sm:py-2",
        className,
      )}
    >
      <div className="flex -space-x-2">
        {avatars.map((avatar) =>
          avatar.image ? (
            <Image
              key={avatar.name}
              src={avatar.image}
              alt={avatar.name}
              width={28}
              height={28}
              className="size-7 rounded-full object-cover ring-2 ring-surface"
            />
          ) : (
            <div
              key={avatar.name}
              className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-[11px] font-semibold text-muted-light ring-2 ring-surface"
              aria-hidden
            >
              {avatar.initials}
            </div>
          ),
        )}
      </div>
      <p className="px-2.5 text-sm text-muted sm:px-3">
        {text.split(customerCountLabel)[0]}
        <strong className="font-medium text-foreground">
          {customerCountLabel}
        </strong>
        {text.split(customerCountLabel)[1]}
      </p>
    </div>
  );
}
