import { get } from "@vercel/edge-config";

export type PromoBanner = {
  enabled: boolean;
  copy: string;
  href: string;
};

/**
 * Reads the `promo` key from the project's Edge Config store. Returns null when
 * the store is not connected (no EDGE_CONFIG env var) or when the read fails,
 * so callers can render a "no banner" state without try/catch.
 */
export async function getPromoBanner(): Promise<PromoBanner | null> {
  if (!process.env.EDGE_CONFIG) {
    return null;
  }
  try {
    const value = await get<PromoBanner>("promo");
    return value ?? null;
  } catch {
    return null;
  }
}
