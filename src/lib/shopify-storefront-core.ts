import { unstable_cache } from "next/cache";

type ShopifyGraphQLError = {
  message: string;
  extensions?: {
    code?: string;
  };
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: ShopifyGraphQLError[];
};

type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyStorefrontProduct = {
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  variant: {
    id: string;
    availableForSale: boolean;
    price: ShopifyMoney | null;
  } | null;
};

type ProductQueryData = {
  product: {
    title: string;
    handle: string;
    availableForSale: boolean;
    featuredImage: {
      url: string;
      altText: string | null;
    } | null;
    selectedOrFirstAvailableVariant: {
      id: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      } | null;
    } | null;
  } | null;
};

type CartCreateData = {
  cartCreate: {
    cart: {
      checkoutUrl: string;
    } | null;
    userErrors: Array<{
      field: string[] | null;
      message: string;
    }>;
  };
};

function getShopifyHost(domain: string) {
  const raw = domain.trim();
  const withProtocol = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(raw)
    ? raw
    : `https://${raw}`;
  const url = new URL(withProtocol);

  return url.hostname.toLowerCase();
}

function isAllowedCheckoutHost(checkoutHost: string, configuredDomain: string) {
  const configuredHost = getShopifyHost(configuredDomain);
  const normalizedCheckoutHost = checkoutHost.toLowerCase();

  return (
    normalizedCheckoutHost === configuredHost ||
    normalizedCheckoutHost.endsWith(".myshopify.com")
  );
}

function getShopifyEnv() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const publicToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN?.trim();
  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2026-04";
  const link1Handle = process.env.SHOPIFY_LINK_1_HANDLE?.trim();
  const link2Handle = process.env.SHOPIFY_LINK_2_HANDLE?.trim();

  return {
    domain,
    privateToken,
    publicToken,
    apiVersion,
    link1Handle,
    link2Handle,
    isConfigured: Boolean(domain),
    hasLink1: Boolean(domain && link1Handle),
    hasLink2: Boolean(domain && link2Handle),
  };
}

function hasToken() {
  const { privateToken, publicToken } = getShopifyEnv();
  return Boolean(privateToken || publicToken);
}

export function hasShopifyStorefrontConfig() {
  return getShopifyEnv().hasLink1 && hasToken();
}

export function hasLink2StorefrontConfig() {
  return getShopifyEnv().hasLink2 && hasToken();
}

async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const { domain, privateToken, publicToken, apiVersion, isConfigured } =
    getShopifyEnv();

  if (!isConfigured || !domain) {
    throw new Error("Shopify Storefront API is not fully configured.");
  }

  const configuredTokens = [privateToken, publicToken].filter(
    (token): token is string => Boolean(token),
  );
  const attemptedTokens = configuredTokens.filter(
    (token, index) => index === configuredTokens.indexOf(token),
  );

  let lastError: Error | null = null;
  const shopifyHost = getShopifyHost(domain);

  for (const token of attemptedTokens) {
    const response = await fetch(`https://${shopifyHost}/api/${apiVersion}/graphql.json`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    if (!response.ok) {
      lastError = new Error(`Shopify request failed with status ${response.status}.`);
      continue;
    }

    const json = (await response.json()) as ShopifyResponse<T>;

    if (json.errors?.length) {
      const message = json.errors.map((error) => error.message).join(" ");
      const isUnauthorized = json.errors.some(
        (error) => error.extensions?.code === "UNAUTHORIZED",
      );

      if (isUnauthorized) {
        lastError = new Error(message);
        continue;
      }

      throw new Error(message);
    }

    if (!json.data) {
      lastError = new Error("Shopify response did not include data.");
      continue;
    }

    return json.data;
  }

  throw lastError ?? new Error("Shopify request failed.");
}

async function getProductByHandle(
  handle: string,
): Promise<ShopifyStorefrontProduct | null> {
  const data = await shopifyFetch<ProductQueryData>(
    `#graphql
      query StorefrontProduct($handle: String!) {
        product(handle: $handle) {
          title
          handle
          availableForSale
          featuredImage {
            url
            altText
          }
          selectedOrFirstAvailableVariant {
            id
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    `,
    { handle },
  );

  if (!data.product) {
    return null;
  }

  return {
    title: data.product.title,
    handle: data.product.handle,
    availableForSale: data.product.availableForSale,
    featuredImage: data.product.featuredImage,
    variant: data.product.selectedOrFirstAvailableVariant,
  };
}

async function createCheckoutUrlForVariant(
  variantId: string,
  productLabel: string,
): Promise<string> {
  const { domain } = getShopifyEnv();
  if (!domain) {
    throw new Error("Shopify Storefront API is not fully configured.");
  }

  const data = await shopifyFetch<CartCreateData>(
    `#graphql
      mutation CreateStorefrontCart($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `,
    {
      input: {
        lines: [
          {
            quantity: 1,
            merchandiseId: variantId,
          },
        ],
      },
    },
  );

  const userErrors = data.cartCreate.userErrors;
  if (userErrors.length > 0) {
    throw new Error(userErrors.map((error) => error.message).join(" "));
  }

  const checkoutUrl = data.cartCreate.cart?.checkoutUrl;
  if (!checkoutUrl) {
    throw new Error(`Shopify did not return a ${productLabel} checkout URL.`);
  }

  const url = new URL(checkoutUrl);
  if (url.protocol !== "https:" || !isAllowedCheckoutHost(url.hostname, domain)) {
    throw new Error("Shopify returned an unexpected checkout URL.");
  }

  url.searchParams.set("channel", "headless-storefronts");

  return url.toString();
}

export async function getLink1Product(): Promise<ShopifyStorefrontProduct | null> {
  const { link1Handle, hasLink1 } = getShopifyEnv();

  if (!hasLink1 || !link1Handle) {
    return null;
  }

  return getProductByHandle(link1Handle);
}

export async function getLink2Product(): Promise<ShopifyStorefrontProduct | null> {
  const { link2Handle, hasLink2 } = getShopifyEnv();

  if (!hasLink2 || !link2Handle) {
    return null;
  }

  return getProductByHandle(link2Handle);
}

const getLink1ProductCached = unstable_cache(
  async () => getLink1Product(),
  ["shopify-link-1-product"],
  {
    revalidate: 30,
    tags: ["shopify-link-1-product"],
  },
);

const getLink2ProductCached = unstable_cache(
  async () => getLink2Product(),
  ["shopify-link-2-product"],
  {
    revalidate: 30,
    tags: ["shopify-link-2-product"],
  },
);

export async function getLink1ProductWithCache() {
  return getLink1ProductCached();
}

export async function getLink2ProductWithCache() {
  return getLink2ProductCached();
}

export async function createLink1CheckoutUrl() {
  const product = await getLink1Product();

  if (!product) {
    throw new Error("Beacon 1 product could not be found in Shopify.");
  }

  if (!product.variant || !product.variant.availableForSale) {
    throw new Error("Beacon 1 is not currently available for sale.");
  }

  return createCheckoutUrlForVariant(product.variant.id, "Beacon 1");
}

export async function createLink2CheckoutUrl() {
  const product = await getLink2Product();

  if (!product) {
    throw new Error("Beacon 2 product could not be found in Shopify.");
  }

  if (!product.variant || !product.variant.availableForSale) {
    throw new Error("Beacon 2 is not currently available for sale.");
  }

  return createCheckoutUrlForVariant(product.variant.id, "Beacon 2");
}
