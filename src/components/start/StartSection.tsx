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
              <p className="type-eyebrow text-muted">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h2 className="type-display-section mt-3 text-foreground">
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
