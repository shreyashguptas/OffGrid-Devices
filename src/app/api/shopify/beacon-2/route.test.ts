import { describe, expect, it, vi, beforeEach } from "vitest";
import { GET } from "./route";

vi.mock("@/lib/shopify", () => ({
  hasShopifyStorefrontConfig: vi.fn(),
  getBeacon2ProductWithCache: vi.fn(),
}));

import * as shopify from "@/lib/shopify";

describe("GET /api/shopify/beacon-2", () => {
  beforeEach(() => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReset();
    vi.mocked(shopify.getBeacon2ProductWithCache).mockReset();
  });

  it("returns 500 when storefront is not configured", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(false);

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(500);
    expect(body.error).toMatch(/not configured/i);
  });

  it("returns 404 when product is missing", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(true);
    vi.mocked(shopify.getBeacon2ProductWithCache).mockResolvedValue(null);

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(404);
    expect(body.error).toMatch(/not found/i);
  });

  it("returns 200 with product when found", async () => {
    vi.mocked(shopify.hasShopifyStorefrontConfig).mockReturnValue(true);
    vi.mocked(shopify.getBeacon2ProductWithCache).mockResolvedValue({
      title: "Beacon 2",
      handle: "beacon-2",
      availableForSale: true,
      featuredImage: null,
      variant: {
        id: "gid://shopify/ProductVariant/2",
        availableForSale: true,
        price: { amount: "189.00", currencyCode: "USD" },
      },
    });

    const res = await GET();
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.product?.title).toBe("Beacon 2");
    expect(res.headers.get("cache-control")).toContain("s-maxage=30");
  });
});
