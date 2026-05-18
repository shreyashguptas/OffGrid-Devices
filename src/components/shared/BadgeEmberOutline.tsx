import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeEmberOutlineProps = {
  children: ReactNode;
  className?: string;
};

export function BadgeEmberOutline({ children, className }: BadgeEmberOutlineProps) {
  return (
    <span
      className={cn(
        "border border-ember/40 bg-ember/15 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-ember",
        className,
      )}
    >
      {children}
    </span>
  );
}
