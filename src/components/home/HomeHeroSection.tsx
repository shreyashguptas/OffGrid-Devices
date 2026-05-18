import { HomeHeroSectionClient } from "@/components/home/HomeHeroSectionClient";
import { formatPrice } from "@/lib/price";
import type { ShopifyStorefrontProduct } from "@/lib/shopify-storefront-core";

export function HomeHeroSection({
  product,
}: {
  product: ShopifyStorefrontProduct | null;
}) {
  const livePrice = formatPrice(product?.variant?.price ?? null);
  const buyLabel = livePrice ? `Carry one — ${livePrice}` : "Carry one";

  return <HomeHeroSectionClient buyLabel={buyLabel} />;
}
