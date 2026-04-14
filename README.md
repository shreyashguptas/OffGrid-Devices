# OffGrid Devices Web

Marketing site and storefront shell for OffGrid devices, built with Next.js App Router.

Current product coverage:

- `Link 1` product storytelling, reviews, and Shopify checkout
- `Link 2` placeholder page with `Coming soon` status
- blog content for setup and onboarding

## Requirements

- Node.js 22 or newer
- pnpm 10.x

This repo uses `pnpm` only. `npm install` is blocked on purpose.

## Getting started

```bash
corepack enable
pnpm install
pnpm dev
```

Open `http://localhost:3000`.

## Main app structure

- `src/app/page.tsx` - homepage composition
- `src/app/products/link-1/page.tsx` - Link 1 product page
- `src/app/products/link-2/page.tsx` - Link 2 placeholder page
- `src/app/blog/page.tsx` - blog listing
- `src/app/blog/[slug]/page.tsx` - blog detail page
- `src/content/` - shared product and blog content
- `src/components/home/` - homepage sections
- `src/components/link1/` - Link 1 product sections and CTA

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Start local dev server |
| `pnpm build` | Create production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run Vitest unit tests |
| `pnpm test:e2e:install` | Install Playwright Chromium locally |
| `pnpm test:e2e` | Run Playwright end-to-end tests |
| `pnpm verify:shopify` | Run live Shopify verification |

## Shopify environment variables

Local Shopify-backed flows need `.env.local` with:

- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_LINK_1_HANDLE`
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` or `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`

Optional:

- `SHOPIFY_STOREFRONT_API_VERSION`

Without these values:

- API route unit tests still run
- live Shopify verification fails
- live Playwright Shopify checks skip

## Testing notes

Run the normal local verification path:

```bash
pnpm lint
pnpm test
pnpm build
```

For browser tests on a clean machine, install Playwright browsers first:

```bash
pnpm test:e2e:install
pnpm test:e2e
```

The E2E server runs on port `3123` by default so it does not clash with `pnpm dev`.

## Deployment and CI

- CI and deploy gate details live in [docs/ci.md](docs/ci.md)
- Vercel env sync helper: `pnpm vercel:env-push`
