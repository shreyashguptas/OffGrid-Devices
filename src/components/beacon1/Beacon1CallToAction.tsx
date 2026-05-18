import { Beacon1CheckoutButton } from "@/components/Beacon1CheckoutButton";
import { ProductClosingCallToAction } from "@/components/shared/ProductClosingCallToAction";
import { beacon1Content } from "@/content/beacon1";

type Beacon1CallToActionProps = {
  eyebrow: string;
  title: string;
  description: string;
  secondaryHref: string;
  secondaryLabel: string;
  className?: string;
  backgroundClassName?: string;
};

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
        <Beacon1CheckoutButton
          defaultLabel={beacon1Content.summary.buyLabel}
          loadingLabel={beacon1Content.summary.loadingLabel}
          showArrow
          className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-6 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:px-10 sm:py-5"
        />
      }
    />
  );
}
