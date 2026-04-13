"use client";

import { useEffect, useState } from "react";

type ProductState = {
  availableForSale: boolean;
  variant: {
    availableForSale: boolean;
  } | null;
} | null;

type Link1CheckoutButtonProps = {
  className: string;
  defaultLabel: string;
  soldOutLabel?: string;
  loadingLabel?: string;
  showArrow?: boolean;
};

let link1ProductPromise: Promise<ProductState> | null = null;
const PRODUCT_CACHE_KEY = "offgrid:link1-product";
const PRODUCT_CACHE_TTL_MS = 60_000;

type CachedProductState = {
  hit: boolean;
  product: ProductState;
};

function readCachedProduct(): CachedProductState {
  try {
    const raw = sessionStorage.getItem(PRODUCT_CACHE_KEY);
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
      sessionStorage.removeItem(PRODUCT_CACHE_KEY);
      return { hit: false, product: null };
    }
    return { hit: true, product: parsed.product ?? null };
  } catch {
    return { hit: false, product: null };
  }
}

function writeCachedProduct(product: ProductState) {
  try {
    sessionStorage.setItem(
      PRODUCT_CACHE_KEY,
      JSON.stringify({ product, expiresAt: Date.now() + PRODUCT_CACHE_TTL_MS }),
    );
  } catch {
    // ignore cache failures (private mode / quota)
  }
}

async function fetchLink1Product() {
  const cachedProduct = readCachedProduct();
  if (cachedProduct.hit) {
    return cachedProduct.product;
  }

  if (!link1ProductPromise) {
    link1ProductPromise = fetch("/api/shopify/link-1")
      .then(async (response) => {
        if (!response.ok) {
          return null;
        }

        const data = (await response.json()) as {
          product?: ProductState;
        };

        const product = data.product ?? null;
        writeCachedProduct(product);
        return product;
      })
      .catch(() => null)
      .finally(() => {
        link1ProductPromise = null;
      });
  }

  return link1ProductPromise;
}

function useLink1Product() {
  const [product, setProduct] = useState<ProductState>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadProduct() {
      try {
        const productData = await fetchLink1Product();

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
  }, []);

  return { product, isUnavailable };
}

export function Link1CheckoutButton({
  className,
  defaultLabel,
  soldOutLabel = "Sold Out",
  loadingLabel = "Opening Checkout...",
  showArrow = false,
}: Link1CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasCheckoutError, setHasCheckoutError] = useState(false);
  const { product, isUnavailable } = useLink1Product();

  const isSoldOut =
    product !== null &&
    (!product.availableForSale ||
      !product.variant ||
      !product.variant.availableForSale);
  const isDisabled = isLoading || isSoldOut || isUnavailable || hasCheckoutError;
  const label = isLoading
    ? loadingLabel
    : isSoldOut
      ? soldOutLabel
      : isUnavailable || hasCheckoutError
        ? "Checkout Unavailable"
        : defaultLabel;

  async function handleClick() {
    if (isDisabled) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/shopify/link-1/checkout", {
        method: "POST",
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

      window.location.assign(data.checkoutUrl);
    } catch {
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
