"use client";

import {
  ShopifyPriceTag,
  type ShopifyPriceTagProps,
} from "./ShopifyPriceTag";

type Link2PriceTagProps = Omit<
  ShopifyPriceTagProps,
  "productEndpoint" | "cacheKey"
>;

export function Link2PriceTag(props: Link2PriceTagProps) {
  return (
    <ShopifyPriceTag
      {...props}
      productEndpoint="/api/shopify/link-2"
      cacheKey="offgrid:link2-product"
    />
  );
}
