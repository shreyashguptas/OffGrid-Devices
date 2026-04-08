import { NextResponse } from "next/server";
import { createLink1CheckoutUrl, hasShopifyStorefrontConfig } from "@/lib/shopify";

export async function POST() {
  if (!hasShopifyStorefrontConfig()) {
    return NextResponse.json(
      { error: "Shopify Storefront API is not configured." },
      { status: 500 },
    );
  }

  try {
    const checkoutUrl = await createLink1CheckoutUrl();

    return NextResponse.json({ checkoutUrl, source: "shopify" });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create Shopify checkout.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
