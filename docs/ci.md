# CI, tests, and deploy gates

This repo runs **lint**, **unit tests**, **dependency audit**, a **live Shopify Beacon 2 check**, **production build**, and **Playwright** on pushes and PRs to `main` / `master` (see [.github/workflows/ci.yml](../.github/workflows/ci.yml)).

## Scope (what we enforce)

- **Phase 1 — CI hygiene**: concurrency (cancel stale runs), Node **22** aligned with `engines` in `package.json`.
- **Phase 3 — Tests**: Vitest for API routes (mocked Shopify); Playwright for smoke + optional live Shopify API via HTTP.
- **Phase 5 — Supply chain**: `pnpm audit --audit-level=high` in CI; [Dependabot](../.github/dependabot.yml) for weekly npm updates (grouped dev deps).
- **Phase 7 — Deploy gates**: the `quality` GitHub Actions job runs `verify:shopify` before `next build`, so a broken Beacon 2 / checkout path fails CI on `main` and blocks merge.

## Shopify secrets

Secrets live in two places:

- **GitHub Actions repository secrets** — used by the `quality` job's live `verify:shopify` step.
- **Cloudflare Workers runtime** — `wrangler.jsonc` `vars` for public values, `wrangler secret put <NAME>` for tokens.

| Variable                                                                | Purpose                                        |
| ----------------------------------------------------------------------- | ---------------------------------------------- |
| `SHOPIFY_STORE_DOMAIN`                                                  | Store domain (e.g. `your-store.myshopify.com`) |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` or `SHOPIFY_STOREFRONT_PUBLIC_TOKEN` | Storefront API access                          |

Optional: `SHOPIFY_STOREFRONT_API_VERSION` (defaults in app code if unset).

## PostHog

Configure these in `wrangler.jsonc` `vars` (already wired) and locally in `.env.local`. They are not required for CI to pass — missing them just skips analytics capture.

| Variable                              | Purpose                                                           |
| ------------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`   | PostHog project API key (`phc_*`). Public-by-design.              |
| `NEXT_PUBLIC_POSTHOG_HOST`            | Always `/ingest` — the proxy path defined in `next.config.ts`.    |
| `NEXT_PUBLIC_POSTHOG_UI_HOST`         | `https://us.posthog.com` so toolbar/recording links resolve.      |
| `POSTHOG_PROJECT_HOST`                | `https://us.i.posthog.com` for server-side `posthog-node`.        |

## Branch protection (recommended)

In GitHub: **Settings → Branches → Branch protection** for `main`:

- Require the workflow job **quality** (shown as **CI / quality** on pull requests) to pass before merge.

That way **broken Shopify Beacon 2 cannot land on `main`** when env is set.

## Fork pull requests

Fork PRs do not receive your repository secrets. The workflow **skips** the live `verify:shopify` step with a notice.

## Emergency override (avoid if possible)

Setting `SKIP_SHOPIFY_VERIFY=1` skips the verify script only when you explicitly set it (e.g. local debugging). Do not set it in CI if you want the hard merge gate.

## Local commands

```bash
pnpm lint
pnpm test
pnpm verify:shopify   # needs .env.local with Shopify vars
pnpm build
pnpm test:e2e:install # one-time local Playwright browser install
pnpm test:e2e         # builds are required; Playwright starts `pnpm start`
```

Playwright live Shopify specs skip automatically if `SHOPIFY_STORE_DOMAIN` is unset.

The dev server for e2e uses port **3123** by default (`E2E_PORT`) so it does not clash with `pnpm dev` on 3000.
