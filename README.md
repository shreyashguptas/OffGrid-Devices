# OffGrid Devices Web

Marketing site and storefront shell for OffGrid devices, built with Next.js App Router.

Current product coverage:

- `Beacon 1` sold-out SEO product page at `/products/beacon-1` (storytelling, reviews, no checkout)
- `Beacon 2` homepage product experience plus standalone PDP at `/products/beacon-2` with Shopify checkout
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
- `src/app/products/beacon-1/page.tsx` - Beacon 1 product page
- `src/app/products/beacon-2/page.tsx` - Beacon 2 standalone product page (buy + SEO)
- `src/app/blog/page.tsx` - blog listing
- `src/app/blog/[slug]/page.tsx` - blog detail page
- `src/app/capabilities/page.tsx` - manufacturing / capabilities-statement landing page
- `src/app/contact/page.tsx` - contact form (+ `src/app/api/contact/route.ts`)
- `src/content/` - shared product and blog content
- `src/components/home/` - homepage sections
- `src/components/beacon1/` - Beacon 1 product sections and CTA
- `src/components/beacon2/` - Beacon 2 CTA components

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
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` or `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`

Optional:

- `SHOPIFY_STOREFRONT_API_VERSION`

Without these values:

- API route unit tests still run
- live Shopify verification fails
- live Playwright Shopify checks skip

## Contact form environment variables

The contact form (`/contact` → `POST /api/contact`) saves submissions to Cloudflare D1
(`CONTACT_DB` binding, database `offgrid-contact`) and emails `hello@`. Email tries the
Cloudflare Email Sending binding first, then Resend. All optional for local dev — the form
renders and degrades gracefully without them (a D1 outage never fails the request; a clean
500 is returned only when no email transport is configured). Full table + setup steps in
[docs/ci.md](docs/ci.md#contact-form-apicontact).

- `RESEND_API_KEY` — Resend key for the notification email (secret)
- `CONTACT_TO_EMAIL` — notification inbox (default `hello@offgridevices.com`)
- `CONTACT_FROM_EMAIL` — verified sender on `offgridevices.com`
- `CONTACT_AUTOREPLY` — `"1"` to send the submitter a confirmation email
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile (skipped if unset)
- `CLOUDFLARE_ACCOUNT_ID` / `CLOUDFLARE_D1_DATABASE_ID` / `CLOUDFLARE_API_TOKEN` — D1 HTTP-API fallback only

## Shopify product handles

Product handles are **not environment variables** — they live in code, in
[`src/lib/shopify-products.ts`](src/lib/shopify-products.ts):

```ts
export const SHOPIFY_PRODUCT_HANDLES = {
  "beacon-1": "link-1",
  "beacon-2": "beacon-2-by-offgrid-magsafe-compatible-mesh-communicator",
} as const;
```

Handles are content (the same value in dev, preview, and production), not
configuration. Keeping them in code means no per-environment env updates and
no chance of a missing-var 500. Only the store domain and tokens — which
legitimately vary per environment — stay in env.

### Where to find a product handle in Shopify

The handle is the URL slug of the product. In Shopify admin:

1. Open the product (Products → click the product).
2. Look at the URL: `…/admin/products/<numeric-id>`. That's not the handle.
3. Scroll to **Search engine listing** at the bottom of the product page.
4. Click **Edit** — the **URL handle** field is your value (e.g.,
   `beacon-2-by-offgrid-magsafe-compatible-mesh-communicator`).

You can also visit the storefront URL `https://<store>.myshopify.com/products/<handle>`
to confirm.

### Adding a product

1. Add a new entry to `SHOPIFY_PRODUCT_HANDLES` in
   `src/lib/shopify-products.ts` (use the slot key `"beacon-N"` for the next N).
2. Add the matching `getBeaconNProduct` / `getBeaconNProductWithCache` /
   `createBeaconNCheckoutUrl` exports in `src/lib/shopify-storefront-core.ts`,
   following the beacon-1 / beacon-2 pattern (slot key passed to
   `getShopifyHandle`).
3. Re-export from `src/lib/shopify.ts`.
4. Scaffold the routes: `src/app/api/shopify/beacon-N/route.ts` and
   `…/checkout/route.ts` (copy from beacon-1).
5. Scaffold the page and components under `src/app/products/beacon-N/` and
   `src/components/beaconN/`.
6. Optional: add `src/lib/verify-beaconN-storefront.ts` for the
   `pnpm verify:shopify` gate.

No `.env.local` or `.env.example` changes are needed. Runtime env for the
Cloudflare worker lives in `wrangler.jsonc` (`vars`) and `wrangler secret
put` for tokens.

### Removing a product

Delete the registry entry plus its route, page, component, and
`verify-…-storefront.ts` files. No env cleanup.

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

Push to `main` → GitHub Actions runs the full `quality` suite (lint, unit tests, dependency audit, live Shopify check, build, Playwright) → if green, a `deploy` job auto-publishes to Cloudflare Workers (OpenNext). If any check fails, nothing deploys and the last good version stays live. No PR or branch protection — commit straight to `main`, push, and the pipeline gates the deploy. Cloudflare keeps the last 100 versions for one-click rollback.

- CI, deploy, and rollback details live in [docs/ci.md](docs/ci.md)
