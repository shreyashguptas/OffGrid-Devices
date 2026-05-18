export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export function formatPrice(price: ShopifyMoney | null): string | null {
  if (!price) {
    return null;
  }

  const amount = Number.parseFloat(price.amount);
  if (!Number.isFinite(amount)) {
    return null;
  }

  try {
    const fractionDigits = Number.isInteger(amount) ? 0 : 2;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: price.currencyCode,
      minimumFractionDigits: fractionDigits,
      maximumFractionDigits: fractionDigits,
    }).format(amount);
  } catch {
    return `${amount}`;
  }
}
