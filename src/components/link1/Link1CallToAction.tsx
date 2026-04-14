import Link from "next/link";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { link1Content } from "@/content/link1";
import { cn } from "@/lib/utils";

type Link1CallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  className?: string;
  backgroundClassName?: string;
};

export function Link1CallToAction({
  eyebrow,
  title,
  description,
  secondaryHref,
  secondaryLabel,
  className,
  backgroundClassName = "bg-surface-elevated",
}: Link1CallToActionProps) {
  return (
    <section
      className={cn(
        "border-b border-border-subtle py-20 md:py-24",
        backgroundClassName,
        className,
      )}
    >
      <div className="mx-auto max-w-5xl px-6">
        <div className="section-card rounded-[2.5rem] px-8 py-12 text-center md:px-14 md:py-16">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-light">
            {description}
          </p>
          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link1CheckoutButton
              defaultLabel={link1Content.summary.buyLabel}
              loadingLabel={link1Content.summary.loadingLabel}
              showArrow
              className="inline-flex items-center justify-center gap-3 rounded-full bg-accent px-10 py-5 text-lg font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
            />
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface-elevated px-10 py-5 text-lg font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-background"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
