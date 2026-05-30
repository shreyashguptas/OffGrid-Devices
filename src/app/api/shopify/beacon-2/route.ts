import { NextResponse } from "next/server";
import {
  getBeacon2ProductWithCache,
  hasShopifyStorefrontConfig,
} from "@/lib/shopify";
import { enforceRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export async function GET(request?: Request) {
  const rateLimit = await enforceRateLimit(request, "shopify-beacon-2-product");

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests." },
      {
        status: 429,
        headers: {
          ...rateLimitHeaders(rateLimit),
          "Retry-After": String(
            Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1000)),
          ),
        },
      },
    );
  }

  if (!hasShopifyStorefrontConfig()) {
    return NextResponse.json(
      { error: "Shopify Storefront API is not configured." },
      { status: 500 },
    );
  }

  try {
    const product = await getBeacon2ProductWithCache();

    if (!product) {
      return NextResponse.json(
        { error: "Beacon 2 product was not found in Shopify." },
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
          ...rateLimitHeaders(rateLimit),
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch Shopify product.", error);

    return NextResponse.json(
      {
        error: "Failed to fetch Shopify product.",
      },
      { status: 500 },
    );
  }
}
