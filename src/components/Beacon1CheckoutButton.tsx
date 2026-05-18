"use client";

import {
  ShopifyCheckoutButton,
  type ShopifyCheckoutButtonProps,
} from "./ShopifyCheckoutButton";

type Beacon1CheckoutButtonProps = Omit<
  ShopifyCheckoutButtonProps,
  "productEndpoint" | "checkoutEndpoint" | "cacheKey"
>;

export function Beacon1CheckoutButton(props: Beacon1CheckoutButtonProps) {
  return (
    <ShopifyCheckoutButton
      {...props}
      productEndpoint="/api/shopify/beacon-1"
      checkoutEndpoint="/api/shopify/beacon-1/checkout"
      cacheKey="offgrid:beacon1-product"
    />
  );
}
