# CI/CD plan (active scope)

We intentionally implement **only** the following (plus supply-chain hygiene and a **hard** Shopify Beacon 2 gate on deploy):

1. **Phase 1 — CI hygiene** — Concurrency / cancel-in-progress; Node **22** aligned with `package.json` `engines`.
2. **Phase 3 — Tests** — Vitest for Shopify API routes (mocked); Playwright for home smoke + live Beacon 1 HTTP checks when env is present.
3. **Phase 5 — Supply chain** — `pnpm audit --audit-level=high` in CI; Dependabot weekly npm updates.
4. **Phase 7 — Deploy gate** — pushes to `main` run the `quality` job, then a `deploy` job auto-publishes to Cloudflare Workers **only if `quality` passes**. A broken Beacon 2 / checkout path (or any failing check) skips the deploy, so the previously-deployed version stays live. No branch protection / PR requirement — commit straight to `main`.

Operational detail lives in [ci.md](./ci.md).
