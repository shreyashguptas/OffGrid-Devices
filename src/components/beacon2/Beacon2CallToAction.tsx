import { Beacon2CheckoutButton } from "@/components/Beacon2CheckoutButton";
import { Beacon2PriceTag } from "@/components/Beacon2PriceTag";
import { ProductClosingCallToAction } from "@/components/shared/ProductClosingCallToAction";
import { beacon2Content } from "@/content/products";

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
        <Beacon2CheckoutButton
          defaultLabel={beacon2Content.summary.buyLabel}
          loadingLabel={beacon2Content.summary.loadingLabel}
          surface="product-page"
          showArrow
          className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-6 py-4 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors duration-300 hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60 sm:px-10 sm:py-5"
        />
      }
      footer={
        <Beacon2PriceTag
          className="type-mono-label mt-6 inline-block text-sand"
          prefix=""
          suffix=" · live price from our Shopify · ships from the USA"
          placeholder="Loading live price · ships from the USA"
          style={{ letterSpacing: "0.14em" }}
        />
      }
    />
  );
}
