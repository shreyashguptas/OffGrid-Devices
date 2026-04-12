import { NextResponse } from "next/server";
import {
  getLink1ProductWithCache,
  hasShopifyStorefrontConfig,
} from "@/lib/shopify";

export async function GET() {
  if (!hasShopifyStorefrontConfig()) {
    return NextResponse.json(
      { error: "Shopify Storefront API is not configured." },
      { status: 500 },
    );
  }

  try {
    const product = await getLink1ProductWithCache();

    if (!product) {
      return NextResponse.json(
        { error: "Link 1 product was not found in Shopify." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        product,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120",
        },
      },
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch Shopify product.";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 500 },
    );
  }
}
