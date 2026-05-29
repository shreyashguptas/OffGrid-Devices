import posthog from "posthog-js";

export type Product = "beacon-2";
export type BuySurface =
  | "nav-desktop"
  | "nav-mobile"
  | "hero"
  | "product-page";

export type ContactChannel = "email" | "community";

type Properties = Record<string, string | number | boolean | null>;

// PostHog autocaptures every click anyway, so these manual events are the
// ones we want to query by name.
function fanout(event: string, properties: Properties = {}) {
  if (typeof window !== "undefined") {
    try {
      posthog.capture(event, properties);
    } catch {
      // posthog-js throws if init was skipped (missing token in local
      // dev). Swallow so analytics is never load-bearing.
    }
  }
}

export const trackBuyClick = (product: Product, surface: BuySurface) =>
  fanout("buy_click", { product, surface });

export const trackContactTap = (channel: ContactChannel) =>
  fanout("contact_tap", { channel });

export const trackBlogRead = (slug: string) => fanout("blog_view", { slug });

export const trackBlogScrollDepth = (
  slug: string,
  percent: 25 | 50 | 75 | 100,
) => fanout("blog_scroll_depth", { slug, percent });

export const trackFaqOpen = (question: string, page: string) =>
  fanout("faq_open", { question, page });

export type CheckoutStage = "opened" | "redirected" | "blocked" | "failed";

export type CheckoutEventProperties = {
  product: Product;
  surface: BuySurface;
  latency_ms?: number;
  reason?: string;
};

export function trackShopifyCheckout(
  stage: CheckoutStage,
  props: CheckoutEventProperties,
) {
  fanout(`shopify_checkout_${stage}`, props);
}

// Read PostHog's anonymous distinct ID so the server-side event captured
// from a Route Handler stitches to the same person profile as the client.
export function getPostHogDistinctId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    return posthog.get_distinct_id();
  } catch {
    return undefined;
  }
}
