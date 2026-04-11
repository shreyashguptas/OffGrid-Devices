import "server-only";

export type { Link1StorefrontProduct } from "./shopify-storefront-core";
export {
  createLink1CheckoutUrl,
  getLink1Product,
  getLink1ProductWithCache,
  hasShopifyStorefrontConfig,
} from "./shopify-storefront-core";
