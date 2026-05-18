import { test, expect } from "@playwright/test";

test.describe("Shopify Beacon 1 (live)", () => {
  test.beforeEach(() => {
    test.skip(
      !process.env.SHOPIFY_STORE_DOMAIN?.trim(),
      "SHOPIFY_STORE_DOMAIN not set — skipping live Shopify checks",
    );
  });

  test("GET /api/shopify/beacon-1 returns product payload", async ({
    request,
  }) => {
    const res = await request.get("/api/shopify/beacon-1");
    expect(res.ok(), await res.text()).toBeTruthy();
    const body = await res.json();
    expect(body.product).toBeDefined();
    expect(body.product.handle).toBeTruthy();
    expect(body.product.title).toBeTruthy();
  });

  test("POST /api/shopify/beacon-1/checkout matches live variant state", async ({
    request,
  }) => {
    // Decide what "correct" looks like based on what Shopify is currently
    // serving. If the variant is buyable, checkout must return a URL; if
    // it's sold out, checkout must refuse with a server error rather than
    // pretend to succeed. Either branch verifies the integration is wired
    // up — only stuck-in-the-middle responses fail this test.
    const productRes = await request.get("/api/shopify/beacon-1");
    expect(productRes.ok(), await productRes.text()).toBeTruthy();
    const { product } = (await productRes.json()) as {
      product?: {
        availableForSale?: boolean;
        variant?: { availableForSale?: boolean } | null;
      };
    };
    const isBuyable = Boolean(
      product?.availableForSale && product?.variant?.availableForSale,
    );

    const res = await request.post("/api/shopify/beacon-1/checkout");

    if (isBuyable) {
      expect(res.ok(), await res.text()).toBeTruthy();
      const body = await res.json();
      expect(body.checkoutUrl).toMatch(/^https?:\/\//);
      expect(body.source).toBe("shopify");
    } else {
      expect(res.ok(), await res.text()).toBeFalsy();
      expect(res.status()).toBe(500);
      const body = (await res.json()) as { error?: string };
      expect(body.error).toBeTruthy();
    }
  });
});
