import { track } from "@vercel/analytics";

export type Product = "beacon-2";
export type BuySurface =
  | "nav-desktop"
  | "nav-mobile"
  | "hero"
  | "product-page";

export type ContactChannel = "email" | "community";

export const trackBuyClick = (product: Product, surface: BuySurface) =>
  track("buy_click", { product, surface });

export const trackContactTap = (channel: ContactChannel) =>
  track("contact_tap", { channel });

export const trackBlogRead = (slug: string) => track("blog_view", { slug });
