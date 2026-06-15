"use client";
import { beacon2Content } from "@/content/products";
import { trackBuyClick, type BuySurface } from "@/lib/analytics";

export const BEACON2_ETSY_URL =
  "https://www.etsy.com/listing/4513375049/meshtastic-off-grid-communicator-beacon";

export function Beacon2BuyLink({
  surface,
  label,
  className = "",
}: {
  surface: BuySurface;
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={BEACON2_ETSY_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBuyClick("beacon-2", surface)}
      className={className}
    >
      {label ?? beacon2Content.summary.buyLabel}
    </a>
  );
}
