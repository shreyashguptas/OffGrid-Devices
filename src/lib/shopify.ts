import "server-only";

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

type Link1StorefrontProduct = {
  title: string;
  handle: string;
  availableForSale: boolean;
  featuredImage: {
    url: string;
    altText: string | null;
  } | null;
  variant: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: {
      amount: string;
      currencyCode: string;
    };
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
      title: string;
      availableForSale: boolean;
      price: {
        amount: string;
        currencyCode: string;
      };
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

function getShopifyEnv() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.trim();
  const privateToken = process.env.SHOPIFY_STOREFRONT_PRIVATE_TOKEN?.trim();
  const publicToken = process.env.SHOPIFY_STOREFRONT_PUBLIC_TOKEN?.trim();
  const apiVersion =
    process.env.SHOPIFY_STOREFRONT_API_VERSION?.trim() || "2026-04";
  const link1Handle = process.env.SHOPIFY_LINK_1_HANDLE?.trim();

  return {
    domain,
    privateToken,
    publicToken,
    apiVersion,
    link1Handle,
    isConfigured: Boolean(domain && link1Handle),
  };
}

export function hasShopifyStorefrontConfig() {
  const { isConfigured, privateToken, publicToken } = getShopifyEnv();

  return isConfigured && Boolean(privateToken || publicToken);
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

  for (const token of attemptedTokens) {
    const response = await fetch(`https://${domain}/api/${apiVersion}/graphql.json`, {
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

export async function getLink1Product(): Promise<Link1StorefrontProduct | null> {
  const { link1Handle, isConfigured } = getShopifyEnv();

  if (!isConfigured || !link1Handle) {
    return null;
  }

  const data = await shopifyFetch<ProductQueryData>(
    `#graphql
      query Link1Product($handle: String!) {
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
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
    `,
    { handle: link1Handle },
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

export async function createLink1CheckoutUrl() {
  const product = await getLink1Product();

  if (!product) {
    throw new Error("Link 1 product could not be found in Shopify.");
  }

  if (!product.variant || !product.variant.availableForSale) {
    throw new Error("Link 1 is not currently available for sale.");
  }

  const data = await shopifyFetch<CartCreateData>(
    `#graphql
      mutation CreateLink1Cart($input: CartInput!) {
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
            merchandiseId: product.variant.id,
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
    throw new Error("Shopify did not return a checkout URL.");
  }

  const url = new URL(checkoutUrl);
  url.searchParams.set("channel", "headless-storefronts");

  return url.toString();
}
