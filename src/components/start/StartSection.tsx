import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StartSectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  surface?: "default" | "elevated";
  className?: string;
};

export function StartSection({
  id,
  eyebrow,
  title,
  description,
  children,
  surface = "default",
  className,
}: StartSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "border-b border-border-subtle py-16 md:py-20",
        surface === "elevated" ? "bg-surface-elevated" : "bg-background",
        "scroll-mt-24",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        {eyebrow || title || description ? (
          <header className="mb-10 md:mb-12">
            {eyebrow ? (
              <p className="text-xs font-medium uppercase tracking-[0.28em] text-muted">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="mt-4 text-base leading-relaxed text-muted-light md:text-lg">
                {description}
              </p>
            ) : null}
          </header>
        ) : null}
        {children}
      </div>
    </section>
  );
}
