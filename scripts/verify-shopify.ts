import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// On Vercel, VERCEL_ENV is "production" | "preview" | "development".
// Outside Vercel (local builds, CI) it's undefined — treat that as strict.
const vercelEnv = process.env.VERCEL_ENV;
const isPreviewDeploy = vercelEnv === "preview" || vercelEnv === "development";

async function main() {
  if (process.env.SKIP_SHOPIFY_VERIFY === "1") {
    console.warn(
      "SKIP_SHOPIFY_VERIFY=1 — skipping Shopify Link 1 verification (emergency override only).",
    );
    return;
  }

  const { verifyLink1Storefront } = await import(
    "../src/lib/verify-link1-storefront"
  );

  await verifyLink1Storefront();
  console.log("Shopify Link 1 verification OK.");
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Shopify verification failed.";

  // Production and local builds keep the hard gate so a real checkout
  // regression cannot ship. Preview deploys soft-fail so unrelated PRs
  // (docs, content, marketing copy) aren't blocked by transient Shopify
  // product / variant state.
  if (isPreviewDeploy) {
    console.warn(
      `⚠️  Shopify verify failed on VERCEL_ENV=${vercelEnv} — continuing build. Reason: ${message}`,
    );
    return;
  }

  console.error(message);
  process.exit(1);
});
