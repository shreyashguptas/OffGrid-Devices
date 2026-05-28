import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// Transient Shopify product state (sold out, network blip) should warn
// outside production so unrelated PRs / main pushes aren't blocked. The
// intent of this gate is "don't ship broken checkout to customers"; a
// sold-out variant isn't broken checkout, so even on production we warn
// for sold-out errors.
//
// MissingShopifyConfigError is the exception — missing env vars are a
// deploy-config bug that will definitely break production, so we hard-fail
// on it in every environment (including previews). That way the next time
// an env var is forgotten, the PR's preview deploy catches it instead of
// silently passing and breaking the next production build.
const isProductionDeploy =
  process.env.GITHUB_REF === "refs/heads/main" ||
  process.env.GITHUB_REF === "refs/heads/master";
const environmentLabel =
  process.env.GITHUB_ACTIONS === "true"
    ? `github-actions:${process.env.GITHUB_EVENT_NAME ?? "unknown"}`
    : "local";

async function main() {
  if (process.env.SKIP_SHOPIFY_VERIFY === "1") {
    console.warn(
      "SKIP_SHOPIFY_VERIFY=1 — skipping Shopify verification (emergency override only).",
    );
    return;
  }

  const { verifyBeacon2Storefront } = await import(
    "../src/lib/verify-beacon2-storefront"
  );

  try {
    await verifyBeacon2Storefront();
    console.log("Shopify Beacon 2 verification OK.");
    return;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Shopify verification failed.";
    const isSoldOut =
      error instanceof Error &&
      (error.name === "SoldOutError" || error.name === "Beacon2SoldOutError");
    const isMissingConfig =
      error instanceof Error && error.name === "MissingShopifyConfigError";

    if (!isMissingConfig && (isSoldOut || !isProductionDeploy)) {
      console.warn(
        `⚠️  Shopify Beacon 2 verify failed on env=${environmentLabel} — continuing. Reason: ${message}`,
      );
      return;
    }

    console.error(
      `Shopify Beacon 2 verify failed on env=${environmentLabel}: ${message}`,
    );
    process.exit(1);
  }
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Shopify verification failed.";
  console.error(message);
  process.exit(1);
});
