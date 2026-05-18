import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createBeacon1CheckoutUrl } from "./shopify-storefront-core";

function shopifyResponse(data: unknown) {
  return new Response(JSON.stringify({ data }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

function productData() {
  return {
    product: {
      title: "Beacon 1",
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

describe("createBeacon1CheckoutUrl", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("SHOPIFY_STORE_DOMAIN", "example.myshopify.com");
    vi.stubEnv("SHOPIFY_STOREFRONT_PRIVATE_TOKEN", "test-token");
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

    const checkoutUrl = await createBeacon1CheckoutUrl();
    const productRequest = JSON.parse(
      fetchMock.mock.calls[0]?.[1]?.body as string,
    ) as { variables?: { handle?: string } };

    expect(checkoutUrl).toBe(
      "https://example.myshopify.com/checkouts/cn/abc?channel=headless-storefronts",
    );
    expect(productRequest.variables?.handle).toBe("link-1");
  });

  it("rejects unexpected checkout URL hosts", async () => {
    fetchMock
      .mockResolvedValueOnce(shopifyResponse(productData()))
      .mockResolvedValueOnce(
        shopifyResponse(cartData("https://evil.example/checkouts/cn/abc")),
      );

    await expect(createBeacon1CheckoutUrl()).rejects.toThrow(
      /unexpected checkout url/i,
    );
  });
});
