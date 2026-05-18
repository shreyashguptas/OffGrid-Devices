import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "./route";

vi.mock("@/lib/shopify", () => ({
  hasShopifyStorefrontConfig: vi.fn(),
  createBeacon2CheckoutUrl: vi.fn(),
}));

import * as shopify from "@/lib/shopify";

describe("POST /api/shopify/beacon-2/checkout", () => {
  beforeEach(() => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReset();
    vi.mocked(shopify.createBeacon2CheckoutUrl).mockReset();
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
    vi.mocked(shopify.createBeacon2CheckoutUrl).mockResolvedValue(
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
    vi.mocked(shopify.createBeacon2CheckoutUrl).mockRejectedValue(
      new Error("sold out"),
    );

    const res = await POST();
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toMatch(/failed to create/i);
  });

  it("rate limits repeated checkout creation attempts", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(true);
    vi.mocked(shopify.createBeacon2CheckoutUrl).mockResolvedValue(
      "https://example.myshopify.com/checkouts/cn/abc",
    );

    const request = new Request("https://offgridevices.com/api/shopify/beacon-2/checkout", {
      method: "POST",
      headers: { "x-forwarded-for": "203.0.113.20" },
    });

    for (let i = 0; i < 10; i += 1) {
      const res = await POST(request);
      expect(res.status).toBe(200);
    }

    const limited = await POST(request);
    const body = await limited.json();

    expect(limited.status).toBe(429);
    expect(body.error).toMatch(/too many/i);
    expect(limited.headers.get("retry-after")).toBeTruthy();
  });
});
