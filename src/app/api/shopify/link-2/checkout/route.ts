import { NextResponse } from "next/server";
import { createLink2CheckoutUrl, hasLink2StorefrontConfig } from "@/lib/shopify";
import {
  checkRateLimit,
  getRateLimitKey,
  rateLimitHeaders,
} from "@/lib/rate-limit";

const CHECKOUT_RATE_LIMIT = {
  limit: 10,
  windowMs: 60_000,
};

export async function POST(request?: Request) {
  const rateLimit = checkRateLimit({
    key: getRateLimitKey(request, "shopify-link-2-checkout"),
    ...CHECKOUT_RATE_LIMIT,
  });

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

  if (!hasLink2StorefrontConfig()) {
    return NextResponse.json(
      { error: "Shopify Storefront API is not configured." },
      { status: 500 },
    );
  }

  try {
    const checkoutUrl = await createLink2CheckoutUrl();

    return NextResponse.json(
      { checkoutUrl, source: "shopify" },
      { headers: rateLimitHeaders(rateLimit) },
    );
  } catch (error) {
    console.error("Failed to create Shopify checkout.", error);

    return NextResponse.json(
      {
        error: "Failed to create Shopify checkout.",
      },
      { status: 500 },
    );
  }
}
