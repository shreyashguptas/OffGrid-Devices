"use client";

import { trackBuyClick, type BuySurface } from "@/lib/analytics";

const ETSY_LISTING_URL =
  "https://www.etsy.com/listing/4513375049/meshtastic-off-grid-communicator-beacon";

type Beacon2CheckoutButtonProps = {
  className: string;
  defaultLabel: string;
  surface: BuySurface;
  showArrow?: boolean;
  loadingLabel?: string;
};

export function Beacon2CheckoutButton({
  className,
  defaultLabel,
  surface,
  showArrow = false,
}: Beacon2CheckoutButtonProps) {
  return (
    <a
      href={ETSY_LISTING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackBuyClick("beacon-2", surface)}
    >
      <span>{defaultLabel}</span>
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
    </a>
  );
}
