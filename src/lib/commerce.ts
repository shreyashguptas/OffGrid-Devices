const ETSY_SHOP_URL = "https://www.etsy.com/shop/offgriddevices";

const shopifyLink1CheckoutUrl =
  process.env.NEXT_PUBLIC_SHOPIFY_LINK_1_CHECKOUT_URL?.trim() || null;

export const commerceLinks = {
  etsyShop: ETSY_SHOP_URL,
  products: {
    link1: {
      checkoutUrl: shopifyLink1CheckoutUrl ?? ETSY_SHOP_URL,
      isUsingShopify: Boolean(shopifyLink1CheckoutUrl),
    },
  },
} as const;
