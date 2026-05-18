import {
  createLink2CheckoutUrl,
  getLink2Product,
  hasShopifyStorefrontConfig,
} from "./shopify-storefront-core";
import { MissingShopifyConfigError } from "./shopify-verify-errors";

// Distinguish "Shopify integration is broken" from "product happens to be
// sold out right now". Thrown internally; scripts/verify-shopify.ts
// discriminates on `error.name === "Link2SoldOutError"` rather than instanceof.
class Link2SoldOutError extends Error {
  constructor(message = "Beacon 2 variant exists but is not currently available for sale.") {
    super(message);
    this.name = "Link2SoldOutError";
  }
}

/**
 * Live check against Shopify: configured storefront, product handle resolves,
 * variant is purchasable, and checkout URL is returned. Used by deploy/build
 * gates — keep in sync with Beacon 2 API behavior.
 */
export async function verifyLink2Storefront(): Promise<void> {
  if (!hasShopifyStorefrontConfig()) {
    throw new MissingShopifyConfigError(
      "Shopify Storefront API is not configured for Beacon 2 (missing domain or token).",
    );
  }

  const product = await getLink2Product();
  if (!product) {
    throw new Error(
      "Beacon 2 product was not found in Shopify (check the link-2 handle in src/lib/shopify-products.ts).",
    );
  }

  if (!product.variant) {
    throw new Error("Beacon 2 product has no variant configured in Shopify.");
  }

  if (!product.variant.availableForSale) {
    throw new Link2SoldOutError();
  }

  const checkoutUrl = await createLink2CheckoutUrl();
  if (!checkoutUrl || !checkoutUrl.startsWith("http")) {
    throw new Error("Shopify did not return a valid Beacon 2 checkout URL.");
  }
}
