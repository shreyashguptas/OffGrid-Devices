import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "./route";

vi.mock("@/lib/shopify", () => ({
  hasShopifyStorefrontConfig: vi.fn(),
  createLink1CheckoutUrl: vi.fn(),
}));

import * as shopify from "@/lib/shopify";

describe("POST /api/shopify/link-1/checkout", () => {
  beforeEach(() => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReset();
    vi.mocked(shopify.createLink1CheckoutUrl).mockReset();
  });

  it("returns 500 when storefront is not configured", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(false);

    const res = await POST();
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toMatch(/not configured/i);
  });

  it("returns 200 with checkout URL when creation succeeds", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(true);
    vi.mocked(shopify.createLink1CheckoutUrl).mockResolvedValue(
      "https://example.myshopify.com/checkouts/cn/abc",
    );

    const res = await POST();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.checkoutUrl).toContain("checkouts");
    expect(body.source).toBe("shopify");
  });

  it("returns 500 when checkout creation throws", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(true);
    vi.mocked(shopify.createLink1CheckoutUrl).mockRejectedValue(
      new Error("sold out"),
    );

    const res = await POST();
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toMatch(/sold out/i);
  });
});
