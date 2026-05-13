import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// Only the production Vercel build keeps a hard gate. Everywhere else —
// Vercel previews, GitHub Actions, local builds — turns into a warning so
// transient Shopify product state doesn't block unrelated PRs or main
// pushes. The intent of this gate is "don't ship broken checkout to
// customers"; a sold-out variant isn't broken checkout, so even on
// production we warn instead of failing for SoldOutError.
const isProductionDeploy = process.env.VERCEL_ENV === "production";
const environmentLabel =
  process.env.VERCEL_ENV ??
  (process.env.GITHUB_ACTIONS === "true"
    ? `github-actions:${process.env.GITHUB_EVENT_NAME ?? "unknown"}`
    : "local");

async function main() {
  if (process.env.SKIP_SHOPIFY_VERIFY === "1") {
    console.warn(
      "SKIP_SHOPIFY_VERIFY=1 — skipping Shopify Beacon 1 verification (emergency override only).",
    );
    return;
  }

  const { verifyLink1Storefront } = await import(
    "../src/lib/verify-link1-storefront"
  );

  await verifyLink1Storefront();
  console.log("Shopify Beacon 1 verification OK.");
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Shopify verification failed.";
  // Duck-typed so we don't have to statically import the error class
  // (which would pull Shopify modules in before dotenv runs).
  const isSoldOut = error instanceof Error && error.name === "SoldOutError";

  if (!isProductionDeploy || isSoldOut) {
    console.warn(
      `⚠️  Shopify verify failed on env=${environmentLabel} — continuing. Reason: ${message}`,
    );
    return;
  }

  console.error(message);
  process.exit(1);
});
