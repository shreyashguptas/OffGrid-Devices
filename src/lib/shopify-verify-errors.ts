// Shared error type for Shopify verify steps.
//
// Missing config (domain / handle / token) means the deploy is guaranteed to
// break in any environment that uses these env vars. The verify orchestrator
// hard-fails on this even outside production so it surfaces on preview deploys
// instead of silently passing and then breaking the production build.
export class MissingShopifyConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingShopifyConfigError";
  }
}
