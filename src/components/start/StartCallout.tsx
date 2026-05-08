import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StartCalloutKind = "warning" | "info";

type StartCalloutProps = {
  kind: StartCalloutKind;
  eyebrow?: string;
  title?: string;
  icon?: string;
  children: ReactNode;
  className?: string;
};

const KIND_STYLES: Record<
  StartCalloutKind,
  { container: string; eyebrow: string; title: string; iconWrap: string }
> = {
  warning: {
    container:
      "border-red-500/30 bg-red-500/[0.06] ring-1 ring-inset ring-red-500/10",
    eyebrow: "text-red-700 dark:text-red-500",
    title: "text-red-800 dark:text-red-400",
    iconWrap: "border-red-500/30 bg-red-500/10 text-red-700",
  },
  info: {
    container:
      "border-accent/25 bg-accent/[0.06] ring-1 ring-inset ring-accent/10",
    eyebrow: "text-accent-dark",
    title: "text-accent-dark",
    iconWrap: "border-accent/25 bg-accent/10 text-accent-dark",
  },
};

export function StartCallout({
  kind,
  eyebrow,
  title,
  icon,
  children,
  className,
}: StartCalloutProps) {
  const styles = KIND_STYLES[kind];
  return (
    <aside
      role={kind === "warning" ? "alert" : "note"}
      className={cn(
        "rounded-[1.5rem] border p-6 md:p-7",
        styles.container,
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {icon ? (
          <span
            aria-hidden="true"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg",
              styles.iconWrap,
            )}
          >
            {icon}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? (
            <p
              className={cn(
                "text-xs font-semibold uppercase tracking-[0.22em]",
                styles.eyebrow,
              )}
            >
              {eyebrow}
            </p>
          ) : null}
          {title ? (
            <h3
              className={cn(
                "mt-1 font-display text-xl font-semibold tracking-tight md:text-2xl",
                styles.title,
              )}
            >
              {title}
            </h3>
          ) : null}
          <div className="mt-3 space-y-3 text-base leading-relaxed text-foreground/85">
            {children}
          </div>
        </div>
      </div>
    </aside>
  );
}
