# CI/CD plan (active scope)

We intentionally implement **only** the following (plus supply-chain hygiene and a **hard** Shopify Beacon 2 gate on deploy):

1. **Phase 1 — CI hygiene** — Concurrency / cancel-in-progress; Node **22** aligned with `package.json` `engines`.
2. **Phase 3 — Tests** — Vitest for Shopify API routes (mocked); Playwright for home smoke + live Beacon 1 HTTP checks when env is present.
3. **Phase 5 — Supply chain** — `pnpm audit --audit-level=high` in CI; Dependabot weekly npm updates.
4. **Phase 7 — Deploy gates** — GitHub branch protection recommended; the GitHub Actions `quality` job runs `verify:shopify` before `next build` so a broken Beacon 2 / checkout path **fails CI on `main`** and blocks merge.

Operational detail lives in [ci.md](./ci.md).
