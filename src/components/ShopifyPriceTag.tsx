"use client";

import type { CSSProperties } from "react";
import { useShopifyProduct } from "./ShopifyCheckoutButton";
import { formatPrice } from "@/lib/price";

export { formatPrice } from "@/lib/price";

export type ShopifyPriceTagProps = {
  productEndpoint: string;
  cacheKey: string;
  className?: string;
  style?: CSSProperties;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
};

// Display the current Shopify price next to a checkout button. Shares
// the in-flight promise + sessionStorage cache with ShopifyCheckoutButton,
// so the two components only ever produce a single network request per
// cache window.
export function ShopifyPriceTag({
  productEndpoint,
  cacheKey,
  className,
  style,
  placeholder,
  prefix,
  suffix,
}: ShopifyPriceTagProps) {
  const { product } = useShopifyProduct(productEndpoint, cacheKey);
  const formatted = formatPrice(product?.variant?.price ?? null);

  if (!formatted) {
    return placeholder ? (
      <span className={className} style={style}>
        {placeholder}
      </span>
    ) : null;
  }

  return (
    <span className={className} style={style}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
