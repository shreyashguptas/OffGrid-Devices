import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

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
  console.error(
    error instanceof Error ? error.message : "Shopify verification failed.",
  );
  process.exit(1);
});
