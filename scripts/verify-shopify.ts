import { resolve } from "node:path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

// Only the production Vercel build keeps a hard gate. Everywhere else —
// Vercel previews, GitHub Actions, local builds — turns into a warning so
// transient Shopify product state doesn't block unrelated PRs or main
// pushes. The intent of this gate is "don't ship broken checkout to
// customers"; a sold-out variant isn't broken checkout, so even on
// production we warn instead of failing for sold-out errors.
const isProductionDeploy = process.env.VERCEL_ENV === "production";
const environmentLabel =
  process.env.VERCEL_ENV ??
  (process.env.GITHUB_ACTIONS === "true"
    ? `github-actions:${process.env.GITHUB_EVENT_NAME ?? "unknown"}`
    : "local");

type Step = {
  label: string;
  run: () => Promise<void>;
  // Beacon 1 is the legacy product; treat any failure as warn-only.
  // Beacon 2 is the live product; integration breakage is a hard fail.
  warnOnly: boolean;
};

async function main() {
  if (process.env.SKIP_SHOPIFY_VERIFY === "1") {
    console.warn(
      "SKIP_SHOPIFY_VERIFY=1 — skipping Shopify verification (emergency override only).",
    );
    return;
  }

  const { verifyLink1Storefront } = await import(
    "../src/lib/verify-link1-storefront"
  );
  const { verifyLink2Storefront } = await import(
    "../src/lib/verify-link2-storefront"
  );

  const steps: Step[] = [
    { label: "Beacon 2", run: verifyLink2Storefront, warnOnly: false },
    { label: "Beacon 1 (legacy)", run: verifyLink1Storefront, warnOnly: true },
  ];

  let hadHardFailure = false;

  for (const step of steps) {
    try {
      await step.run();
      console.log(`Shopify ${step.label} verification OK.`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Shopify verification failed.";
      const isSoldOut =
        error instanceof Error &&
        (error.name === "SoldOutError" || error.name === "Link2SoldOutError");

      if (step.warnOnly || isSoldOut || !isProductionDeploy) {
        console.warn(
          `⚠️  Shopify ${step.label} verify failed on env=${environmentLabel} — continuing. Reason: ${message}`,
        );
        continue;
      }

      console.error(`Shopify ${step.label} verify failed: ${message}`);
      hadHardFailure = true;
    }
  }

  if (hadHardFailure) {
    process.exit(1);
  }
}

main().catch((error) => {
  const message =
    error instanceof Error ? error.message : "Shopify verification failed.";
  console.error(message);
  process.exit(1);
});
