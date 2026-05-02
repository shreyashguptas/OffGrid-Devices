import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createLink1CheckoutUrl } from "./shopify-storefront-core";

function shopifyResponse(data: unknown) {
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function productData() {
  return {
    product: {
      title: "Link 1",
      handle: "link-1",
      availableForSale: true,
      featuredImage: null,
      selectedOrFirstAvailableVariant: {
        id: "gid://shopify/ProductVariant/1",
        availableForSale: true,
      },
    },
  };
}

function cartData(checkoutUrl: string) {
  return {
    cartCreate: {
      cart: { checkoutUrl },
      userErrors: [],
    },
  };
}

describe("createLink1CheckoutUrl", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN", "test-token");
    vi.stubEnv("SHOPIFY_LINK_1_HANDLE", "link-1");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns Shopify checkout URLs from allowed hosts", async () => {
    fetchMock
      .mockResolvedValueOnce(shopifyResponse(productData()))
      .mockResolvedValueOnce(
        shopifyResponse(cartData("https://example.myshopify.com/checkouts/cn/abc")),
      );

    const checkoutUrl = await createLink1CheckoutUrl();

    expect(checkoutUrl).toBe(
      "https://example.myshopify.com/checkouts/cn/abc?channel=headless-storefronts",
    );
  });

  it("rejects unexpected checkout URL hosts", async () => {
    fetchMock
      .mockResolvedValueOnce(shopifyResponse(productData()))
      .mockResolvedValueOnce(
        shopifyResponse(cartData("https://evil.example/checkouts/cn/abc")),
      );

    await expect(createLink1CheckoutUrl()).rejects.toThrow(
      /unexpected checkout url/i,
    );
  });
});
