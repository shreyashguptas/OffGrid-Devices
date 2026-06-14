import posthog from "posthog-js";

export type Product = "beacon-2";
export type BuySurface =
  | "nav-desktop"
  | "nav-mobile"
  | "hero"
  | "product-page";

export type ContactChannel = "email" | "community";

type Properties = Record<string, string | number | boolean | null>;

function fanout(event: string, properties: Properties = {}) {
  if (typeof window !== "undefined") {
    try {
      posthog.capture(event, properties);
    } catch {
      // posthog-js throws if init was skipped (missing token in local dev).
    }
  }
}

export const trackBuyClick = (product: Product, surface: BuySurface) =>
  fanout("buy_click", { product, surface });

export const trackContactTap = (channel: ContactChannel) =>
  fanout("contact_tap", { channel });

export const trackContactSubmit = (inquiryType: string) =>
  fanout("contact_submitted", { inquiry_type: inquiryType });

export const trackBlogRead = (slug: string) => fanout("blog_view", { slug });

export const trackBlogScrollDepth = (
  slug: string,
  percent: 25 | 50 | 75 | 100,
) => fanout("blog_scroll_depth", { slug, percent });

export const trackFaqOpen = (question: string, page: string) =>
  fanout("faq_open", { question, page });
