import Link from "next/link";
import { ProductClosingCallToAction } from "@/components/shared/ProductClosingCallToAction";

type Beacon1CallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  className?: string;
  backgroundClassName?: string;
};

/**
 * Beacon 1 closing CTA — retirement-aware variant.
 *
 * Since Beacon 1 is permanently sold out, the primary action cross-sells to
 * Beacon 2 instead of offering a checkout button. Eyebrow/title/description
 * are still threaded through from `beacon1Content` so the page's storytelling
 * voice stays consistent up to the closing block; the action itself pivots.
 */
export function Beacon1CallToAction({
  eyebrow,
  title,
  description,
  secondaryHref,
  secondaryLabel,
  className,
  backgroundClassName,
}: Beacon1CallToActionProps) {
  return (
    <ProductClosingCallToAction
      eyebrow={eyebrow}
      title={title}
      description={description}
      secondaryHref={secondaryHref}
      secondaryLabel={secondaryLabel}
      className={className}
      backgroundClassName={backgroundClassName}
      primaryAction={
        <Link
          href="/products/beacon-2"
          className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-6 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors duration-300 hover:bg-bone sm:px-10 sm:py-5"
        >
          Shop OffGrid Beacon 2 →
        </Link>
      }
    />
  );
}
