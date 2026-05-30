import { NextResponse } from "next/server";
import { createBeacon2CheckoutUrl, hasShopifyStorefrontConfig } from "@/lib/shopify";
import { getPostHogClient } from "@/lib/posthog-server";
import { enforceRateLimit, rateLimitHeaders } from "@/lib/rate-limit";

// The client forwards posthog.get_distinct_id() in this header so the
// server-side event stitches to the same person profile as the browser
// session. If the header is missing (ad-blocker, DNT), capture under an
// anonymous ID so dashboards still see the funnel step.
const POSTHOG_HEADER = "x-posthog-distinct-id";
const ANONYMOUS_DISTINCT_ID = "anonymous-server-checkout";

export async function POST(request?: Request) {
  const rateLimit = await enforceRateLimit(
    request,
    "shopify-beacon-2-checkout",
  );

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

  const distinctId =
    request?.headers.get(POSTHOG_HEADER) ?? ANONYMOUS_DISTINCT_ID;
  const posthog = getPostHogClient();

  try {
    const checkoutUrl = await createBeacon2CheckoutUrl();

    if (posthog) {
      posthog.capture({
        distinctId,
        event: "shopify_checkout_created",
        properties: {
          product: "beacon-2",
          source: "api",
        },
      });
      await posthog.shutdown();
    }

    return NextResponse.json(
      { checkoutUrl, source: "shopify" },
      { headers: rateLimitHeaders(rateLimit) },
    );
  } catch (error) {
    console.error("Failed to create Shopify checkout.", error);

    if (posthog) {
      posthog.capture({
        distinctId,
        event: "shopify_checkout_create_failed",
        properties: {
          product: "beacon-2",
          source: "api",
          reason: error instanceof Error ? error.message : "unknown",
        },
      });
      await posthog.shutdown();
    }

    return NextResponse.json(
      {
        error: "Failed to create Shopify checkout.",
      },
      { status: 500 },
    );
  }
}
