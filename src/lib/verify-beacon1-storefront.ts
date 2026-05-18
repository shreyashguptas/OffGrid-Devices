import {
  createBeacon1CheckoutUrl,
  getBeacon1Product,
  hasShopifyStorefrontConfig,
} from "./shopify-storefront-core";
import { MissingShopifyConfigError } from "./shopify-verify-errors";

// Distinguish "Shopify integration is broken" from "product happens to be
// sold out right now". Thrown internally; scripts/verify-shopify.ts
// discriminates on `error.name === "SoldOutError"` rather than instanceof.
class SoldOutError extends Error {
  constructor(message = "Beacon 1 variant exists but is not currently available for sale.") {
    super(message);
    this.name = "SoldOutError";
  }
}

/**
 * Live check against Shopify: configured storefront, product handle resolves,
 * variant is purchasable, and checkout URL is returned. Used by deploy/build
 * gates — keep in sync with Beacon 1 API behavior.
 */
export async function verifyBeacon1Storefront(): Promise<void> {
  if (!hasShopifyStorefrontConfig()) {
    throw new MissingShopifyConfigError(
      "Shopify Storefront API is not configured (missing domain or token).",
    );
  }

  const product = await getBeacon1Product();
  if (!product) {
    throw new Error(
      "Beacon 1 product was not found in Shopify (check the beacon-1 slot handle in src/lib/shopify-products.ts).",
    );
  }

  if (!product.variant) {
    throw new Error("Beacon 1 product has no variant configured in Shopify.");
  }

  if (!product.variant.availableForSale) {
    throw new SoldOutError();
  }

  const checkoutUrl = await createBeacon1CheckoutUrl();
  if (!checkoutUrl || !checkoutUrl.startsWith("http")) {
    throw new Error("Shopify did not return a valid checkout URL.");
  }
}
