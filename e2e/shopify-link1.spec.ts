import { test, expect } from "@playwright/test";

test.describe("Shopify Link 1 (live)", () => {
  test.beforeEach(() => {
    test.skip(
      !process.env.SHOPIFY_STORE_DOMAIN?.trim(),
      "SHOPIFY_STORE_DOMAIN not set — skipping live Shopify checks",
    );
  });

  test("GET /api/shopify/link-1 returns product payload", async ({
    request,
  }) => {
    const res = await request.get("/api/shopify/link-1");
    expect(res.ok(), await res.text()).toBeTruthy();
    const body = await res.json();
    expect(body.product).toBeDefined();
    expect(body.product.handle).toBeTruthy();
    expect(body.product.title).toBeTruthy();
  });

  test("POST /api/shopify/link-1/checkout returns checkout URL", async ({
    request,
  }) => {
    const res = await request.post("/api/shopify/link-1/checkout");
    expect(res.ok(), await res.text()).toBeTruthy();
    const body = await res.json();
    expect(body.checkoutUrl).toMatch(/^https?:\/\//);
    expect(body.source).toBe("shopify");
  });
});
