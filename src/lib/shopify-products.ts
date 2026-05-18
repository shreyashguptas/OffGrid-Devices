// Registry of Shopify product handles for each "link slot" on the site.
//
// Handles live in code (not env) because they are content, not configuration:
// they are the same value in dev, preview, and production. Keeping them here
// makes the storefront integration self-contained — adding a new product
// scaffold is one line in this map plus the routes/components for the slot.
//
// The store domain and tokens still come from env (those legitimately vary
// per environment); only the product slug lives in code.
export const SHOPIFY_PRODUCT_HANDLES = {
  "link-1": "link-1",
  "link-2": "beacon-2-by-offgrid-magsafe-compatible-mesh-communicator",
} as const;

export type ShopifyProductSlot = keyof typeof SHOPIFY_PRODUCT_HANDLES;

export function getShopifyHandle(slot: ShopifyProductSlot): string {
  return SHOPIFY_PRODUCT_HANDLES[slot];
}
