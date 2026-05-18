import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { createBeacon2CheckoutUrl, hasShopifyStorefrontConfig } from "@/lib/shopify";
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
  const verdict = await checkBotId({
    developmentOptions: { bypass: "HUMAN" },
  });
  if (verdict.isBot) {
    return NextResponse.json({ error: "Forbidden." }, { status: 403 });
  }

  const rateLimit = checkRateLimit({
    key: getRateLimitKey(request, "shopify-beacon-2-checkout"),
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

  if (!hasShopifyStorefrontConfig()) {
    return NextResponse.json(
      { error: "Shopify Storefront API is not configured." },
      { status: 500 },
    );
  }

  try {
    const checkoutUrl = await createBeacon2CheckoutUrl();

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
