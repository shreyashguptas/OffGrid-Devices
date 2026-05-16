"use client";

import type { CSSProperties } from "react";
import { useShopifyProduct } from "./ShopifyCheckoutButton";

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

export function formatPrice(
  price: { amount: string; currencyCode: string } | null,
): string | null {
  if (!price) {
    return null;
  }
  const amount = Number.parseFloat(price.amount);
  if (!Number.isFinite(amount)) {
    return null;
  }

  // Intl formatting handles currency symbol + locale for any code Shopify
  // returns, and trailing-zero stripping for whole-dollar amounts.
  try {
    const fractionDigits = Number.isInteger(amount) ? 0 : 2;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currencyCode,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount);
  } catch {
    // Unknown currency code — fall back to a bare number.
    return `${amount}`;
  }
}
