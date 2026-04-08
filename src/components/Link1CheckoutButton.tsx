"use client";

import { useEffect, useState } from "react";

type ProductState = {
  availableForSale: boolean;
  variant: {
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
  } | null;
} | null;

type Link1CheckoutButtonProps = {
  className: string;
  defaultLabel: string;
  soldOutLabel?: string;
  loadingLabel?: string;
  showArrow?: boolean;
};

export function Link1CheckoutButton({
  className,
  defaultLabel,
  soldOutLabel = "Sold Out",
  loadingLabel = "Opening Checkout...",
  showArrow = false,
}: Link1CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState<ProductState>(null);
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadProduct() {
      try {
        const response = await fetch("/api/shopify/link-1", {
          cache: "no-store",
        });

        if (!response.ok) {
          if (!isCancelled) {
            setIsUnavailable(true);
          }
          return;
        }

        const data = (await response.json()) as {
          product?: ProductState;
        };

        if (!isCancelled) {
          setProduct(data.product ?? null);
          setIsUnavailable(!data.product);
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

  const isSoldOut =
    product !== null &&
    (!product.availableForSale ||
      !product.variant ||
      !product.variant.availableForSale);
  const isDisabled = isLoading || isSoldOut || isUnavailable;
  const label = isLoading
    ? loadingLabel
    : isSoldOut
      ? soldOutLabel
      : isUnavailable
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
      setIsUnavailable(true);
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
