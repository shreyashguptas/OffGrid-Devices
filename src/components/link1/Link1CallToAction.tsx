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
  backgroundClassName = "bg-pitch",
}: Link1CallToActionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-bark py-32 md:py-44",
        backgroundClassName,
        className,
      )}
    >
      {/* Closing mountain silhouette */}
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
        <p
          className="text-ember"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          {eyebrow}
        </p>

        <h2
          className="mx-auto mt-6 max-w-3xl text-bone uppercase"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(48px, 9vw, 120px)",
            lineHeight: 0.88,
            letterSpacing: "-0.04em",
          }}
        >
          Carry it. <span className="text-ember">Use it.</span>
        </h2>

        <p
          className="mx-auto mt-8 max-w-xl text-sand"
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 1.6vw, 24px)",
            lineHeight: 1.4,
          }}
        >
          {description || title}
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link1CheckoutButton
            defaultLabel={link1Content.summary.buyLabel}
            loadingLabel={link1Content.summary.loadingLabel}
            showArrow
            className="inline-flex items-center justify-center gap-3 bg-ember px-10 py-5 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors duration-300 hover:bg-bone disabled:opacity-60 disabled:cursor-not-allowed"
          />
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center border border-bone px-10 py-5 text-bone transition-colors duration-300 hover:border-ember hover:text-ember"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
