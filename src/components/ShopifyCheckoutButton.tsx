"use client";

import { useEffect, useState } from "react";
import {
  getPostHogDistinctId,
  trackBuyClick,
  trackShopifyCheckout,
  type BuySurface,
  type Product,
} from "@/lib/analytics";

type ProductState = {
  availableForSale: boolean;
  variant: {
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    } | null;
  } | null;
} | null;

export type ShopifyCheckoutButtonProps = {
  className: string;
  defaultLabel: string;
  productEndpoint: string;
  checkoutEndpoint: string;
  cacheKey: string;
  product: Product;
  surface: BuySurface;
  soldOutLabel?: string;
  loadingLabel?: string;
  unavailableLabel?: string;
  showArrow?: boolean;
};

// Match the server-side unstable_cache revalidate window (30s) so a
// price change in Shopify shows up everywhere within ~one cache cycle.
const PRODUCT_CACHE_TTL_MS = 30_000;
const inflightProductPromises = new Map<string, Promise<ProductState>>();

type CachedProductState = {
  hit: boolean;
  product: ProductState;
};

function readCachedProduct(cacheKey: string): CachedProductState {
  try {
    const raw = sessionStorage.getItem(cacheKey);
    if (!raw) {
      return { hit: false, product: null };
    }
    const parsed = JSON.parse(raw) as {
      expiresAt?: number;
      product?: ProductState;
    };
    if (
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt < Date.now() ||
      !("product" in parsed)
    ) {
      sessionStorage.removeItem(cacheKey);
      return { hit: false, product: null };
    }
    return { hit: true, product: parsed.product ?? null };
  } catch {
    return { hit: false, product: null };
  }
}

function writeCachedProduct(cacheKey: string, product: ProductState) {
  try {
    sessionStorage.setItem(
      cacheKey,
      JSON.stringify({ product, expiresAt: Date.now() + PRODUCT_CACHE_TTL_MS }),
    );
  } catch {
    // ignore cache failures (private mode / quota)
  }
}

async function fetchProduct(
  productEndpoint: string,
  cacheKey: string,
): Promise<ProductState> {
  const cachedProduct = readCachedProduct(cacheKey);
  if (cachedProduct.hit) {
    return cachedProduct.product;
  }

  const existing = inflightProductPromises.get(productEndpoint);
  if (existing) {
    return existing;
  }

  const promise = fetch(productEndpoint)
    .then(async (response) => {
      if (!response.ok) {
        return null;
      }

      const data = (await response.json()) as {
        product?: ProductState;
      };

      const product = data.product ?? null;
      writeCachedProduct(cacheKey, product);
      return product;
    })
    .catch(() => null)
    .finally(() => {
      inflightProductPromises.delete(productEndpoint);
    });

  inflightProductPromises.set(productEndpoint, promise);
  return promise;
}

export function useShopifyProduct(productEndpoint: string, cacheKey: string) {
  const [product, setProduct] = useState<ProductState>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadProduct() {
      try {
        const productData = await fetchProduct(productEndpoint, cacheKey);

        if (!isCancelled) {
          setProduct(productData);
          setIsUnavailable(!productData);
        }
      } catch {
        if (!isCancelled) {
          setIsUnavailable(true);
        }
      }
    }

    void loadProduct();

    return () => {
      isCancelled = true;
    };
  }, [productEndpoint, cacheKey]);

  return { product, isUnavailable };
}

export function ShopifyCheckoutButton({
  className,
  defaultLabel,
  productEndpoint,
  checkoutEndpoint,
  cacheKey,
  product: productId,
  surface,
  soldOutLabel = "Sold Out",
  loadingLabel = "Opening Checkout...",
  unavailableLabel = "Releasing Soon",
  showArrow = false,
}: ShopifyCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckoutError, setHasCheckoutError] = useState(false);
  const { product, isUnavailable } = useShopifyProduct(
    productEndpoint,
    cacheKey,
  );

  const isSoldOut =
    product !== null &&
    (!product.availableForSale ||
      !product.variant ||
      !product.variant.availableForSale);
  const isDisabled = isLoading || isSoldOut || isUnavailable || hasCheckoutError;

  function resolveLabel() {
    if (isLoading) {
      return loadingLabel;
    }
    if (isSoldOut) {
      return soldOutLabel;
    }
    if (isUnavailable || hasCheckoutError) {
      return unavailableLabel;
    }
    return defaultLabel;
  }

  const label = resolveLabel();

  async function handleClick() {
    if (isDisabled) {
      return;
    }

    trackBuyClick(productId, surface);

    // Open the tab synchronously inside the click handler so popup blockers
    // (especially Safari) don't reject the window.open() that would otherwise
    // happen after the await below.
    const checkoutWindow = window.open("about:blank", "_blank");
    if (checkoutWindow) {
      checkoutWindow.opener = null;
      trackShopifyCheckout("opened", { product: productId, surface });
    } else {
      // The browser blocked our popup. We'll still fall back to a same-tab
      // navigation after the fetch resolves, but we want a distinct event
      // so dashboards can attribute drop-offs to popup blockers.
      trackShopifyCheckout("blocked", { product: productId, surface });
    }

    setIsLoading(true);
    const startedAt = performance.now();

    try {
      const distinctId = getPostHogDistinctId();
      const response = await fetch(checkoutEndpoint, {
        method: "POST",
        headers: distinctId
          ? { "X-PostHog-Distinct-Id": distinctId }
          : undefined,
      });

      if (!response.ok) {
        throw new Error("Checkout request failed.");
      }

      const data = (await response.json()) as {
        checkoutUrl?: string;
      };

      if (!data.checkoutUrl) {
        throw new Error("Shopify did not return a checkout URL.");
      }

      const latency_ms = Math.round(performance.now() - startedAt);
      trackShopifyCheckout("redirected", {
        product: productId,
        surface,
        latency_ms,
      });

      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.location.href = data.checkoutUrl;
      } else {
        // popup blocked — fall back to same-tab navigation so the buyer
        // still reaches checkout.
        window.location.assign(data.checkoutUrl);
      }
      setIsLoading(false);
    } catch (error) {
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.close();
      }
      trackShopifyCheckout("failed", {
        product: productId,
        surface,
        reason: error instanceof Error ? error.message : "unknown",
      });
      setHasCheckoutError(true);
      setIsLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void handleClick()}
      disabled={isDisabled}
      className={className}
    >
      <span>{label}</span>
      {showArrow ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      ) : null}
    </button>
  );
}
