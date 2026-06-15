import { Beacon2BuyLink } from "@/components/Beacon2BuyLink";
import { ProductClosingCallToAction } from "@/components/shared/ProductClosingCallToAction";

type Beacon2CallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  className?: string;
  backgroundClassName?: string;
};

export function Beacon2CallToAction({
  eyebrow,
  title,
  description,
  secondaryHref,
  secondaryLabel,
  className,
  backgroundClassName,
}: Beacon2CallToActionProps) {
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
        <Beacon2BuyLink
          surface="product-page"
          className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-6 py-4 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:px-10 sm:py-5"
        />
      }
    />
  );
}
