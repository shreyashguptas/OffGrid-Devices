"use client";

import {
  ShopifyCheckoutButton,
  type ShopifyCheckoutButtonProps,
} from "./ShopifyCheckoutButton";

type Link2CheckoutButtonProps = Omit<
  ShopifyCheckoutButtonProps,
  "productEndpoint" | "checkoutEndpoint" | "cacheKey"
>;

export function Link2CheckoutButton(props: Link2CheckoutButtonProps) {
  return (
    <ShopifyCheckoutButton
      {...props}
      productEndpoint="/api/shopify/link-2"
      checkoutEndpoint="/api/shopify/link-2/checkout"
      cacheKey="offgrid:link2-product"
    />
  );
}
