# CI/CD plan (active scope)

We intentionally implement **only** the following (plus supply-chain hygiene and a **hard** Shopify Link 1 gate on deploy):

1. **Phase 1 — CI hygiene** — Concurrency / cancel-in-progress; Node **22** aligned with `package.json` `engines`.
2. **Phase 3 — Tests** — Vitest for Shopify API routes (mocked); Playwright for home smoke + live Link 1 HTTP checks when env is present.
3. **Phase 5 — Supply chain** — `pnpm audit --audit-level=high` in CI; Dependabot weekly npm updates.
4. **Phase 7 — Deploy gates** — **GitHub** repository ruleset (`pnpm repo:ruleset`) requires PRs + green job `quality` on `main`; **Vercel** `buildCommand` runs `verify:shopify` before `next build`; **Vercel Deployment Checks** (dashboard) delay production traffic until GitHub CI passes.

Operational detail lives in [ci.md](./ci.md).
