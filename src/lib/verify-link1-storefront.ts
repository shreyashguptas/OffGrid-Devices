import {
  createLink1CheckoutUrl,
  getLink1Product,
  hasShopifyStorefrontConfig,
} from "./shopify-storefront-core";

/**
 * Live check against Shopify: configured storefront, product handle resolves,
 * variant is purchasable, and checkout URL is returned. Used by deploy/build
 * gates — keep in sync with Link 1 API behavior.
 */
export async function verifyLink1Storefront(): Promise<void> {
  if (!hasShopifyStorefrontConfig()) {
    throw new Error(
      "Shopify Storefront API is not configured (missing domain, handle, or token).",
    );
  }

  const product = await getLink1Product();
  if (!product) {
    throw new Error(
      "Link 1 product was not found in Shopify (check SHOPIFY_LINK_1_HANDLE).",
    );
  }

  if (!product.variant || !product.variant.availableForSale) {
    throw new Error("Link 1 product has no buyable variant.");
  }

  const checkoutUrl = await createLink1CheckoutUrl();
  if (!checkoutUrl || !checkoutUrl.startsWith("http")) {
    throw new Error("Shopify did not return a valid checkout URL.");
  }
}
