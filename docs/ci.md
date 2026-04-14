# CI, tests, and deploy gates

This repo runs **lint**, **unit tests**, **dependency audit**, a **live Shopify Link 1 check**, **production build**, and **Playwright** on pushes and PRs to `main` / `master` (see [.github/workflows/ci.yml](../.github/workflows/ci.yml)).

If the Vercel dashboard has a **custom Build Command**, it overrides [vercel.json](../vercel.json). Clear it (or set it to `pnpm run verify:shopify && pnpm run build`) so the Shopify gate always runs on deploy.

## Scope (what we enforce)

- **Phase 1 — CI hygiene**: concurrency (cancel stale runs), Node **22** aligned with `engines` in `package.json`.
- **Phase 3 — Tests**: Vitest for API routes (mocked Shopify); Playwright for smoke + optional live Shopify API via HTTP.
- **Phase 5 — Supply chain**: `pnpm audit --audit-level=high` in CI; [Dependabot](../.github/dependabot.yml) for weekly npm updates (grouped dev deps).
- **Phase 7 — Deploy gates**: Vercel uses [vercel.json](../vercel.json) `buildCommand`: `**pnpm run verify:shopify && pnpm run build`**. If the live Shopify check fails, **the deployment build fails** and nothing new goes live.

## Shopify secrets (GitHub + Vercel)

Configure the same variables in **GitHub Actions repository secrets** and **Vercel project environment variables** (Production at minimum).

To copy a local `.env.local` into Vercel after `vercel login` and `vercel link`: run `pnpm vercel:env-push` (see [scripts/push-env-to-vercel.sh](../scripts/push-env-to-vercel.sh)). It uploads to **Production** by default; set `VERCEL_ENV_TARGETS=production,preview` to include Preview.


| Variable                                                                | Purpose                                        |
| ----------------------------------------------------------------------- | ---------------------------------------------- |
| `SHOPIFY_STORE_DOMAIN`                                                  | Store domain (e.g. `your-store.myshopify.com`) |
| `SHOPIFY_LINK_1_HANDLE`                                                 | Product handle for Link 1                      |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` or `SHOPIFY_STOREFRONT_PUBLIC_TOKEN` | Storefront API access                          |


Optional: `SHOPIFY_STOREFRONT_API_VERSION` (defaults in app code if unset).

## Branch protection (recommended)

In GitHub: **Settings → Branches → Branch protection** for `main`:

- Require the workflow job **quality** (shown as **CI / quality** on pull requests) to pass before merge.

That way broken code does not land on `main`; combined with Vercel’s build command, **broken Shopify Link 1 cannot deploy** when env is set.

## Fork pull requests

Fork PRs do not receive your repository secrets. The workflow **skips** the live `verify:shopify` step with a notice. **Vercel production** still runs `verify:shopify` on deploy when Production env vars are set.

## Emergency override (avoid if possible)

Setting `SKIP_SHOPIFY_VERIFY=1` skips the verify script only when you explicitly set it (e.g. local debugging). **Do not set this on Vercel Production** if you want the hard deploy gate.

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
