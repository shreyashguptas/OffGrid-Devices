"use client";

import {
  ShopifyCheckoutButton,
  type ShopifyCheckoutButtonProps,
} from "./ShopifyCheckoutButton";

type Beacon2CheckoutButtonProps = Omit<
  ShopifyCheckoutButtonProps,
  "productEndpoint" | "checkoutEndpoint" | "cacheKey"
>;

export function Beacon2CheckoutButton(props: Beacon2CheckoutButtonProps) {
  return (
    <ShopifyCheckoutButton
      {...props}
      productEndpoint="/api/shopify/beacon-2"
      checkoutEndpoint="/api/shopify/beacon-2/checkout"
      cacheKey="offgrid:beacon2-product"
    />
  );
}
