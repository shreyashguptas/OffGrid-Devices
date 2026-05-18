"use client";

import {
  ShopifyPriceTag,
  type ShopifyPriceTagProps,
} from "./ShopifyPriceTag";

type Beacon2PriceTagProps = Omit<
  ShopifyPriceTagProps,
  "productEndpoint" | "cacheKey"
>;

export function Beacon2PriceTag(props: Beacon2PriceTagProps) {
  return (
    <ShopifyPriceTag
      {...props}
      productEndpoint="/api/shopify/beacon-2"
      cacheKey="offgrid:beacon2-product"
    />
  );
}
