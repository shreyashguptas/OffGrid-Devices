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
- `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` or `SHOPIFY_STOREFRONT_PUBLIC_TOKEN`

Optional:

- `SHOPIFY_STOREFRONT_API_VERSION`

Without these values:

- API route unit tests still run
- live Shopify verification fails
- live Playwright Shopify checks skip

## Shopify product handles

Product handles are **not environment variables** — they live in code, in
[`src/lib/shopify-products.ts`](src/lib/shopify-products.ts):

```ts
export const SHOPIFY_PRODUCT_HANDLES = {
  "link-1": "link-1",
  "link-2": "beacon-2-by-offgrid-magsafe-compatible-mesh-communicator",
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
   `src/lib/shopify-products.ts` (use the slot key `"link-N"` for the next N).
2. Add the matching `getLinkNProduct` / `getLinkNProductWithCache` /
   `createLinkNCheckoutUrl` exports in `src/lib/shopify-storefront-core.ts`,
   following the link-1 / link-2 pattern (slot key passed to
   `getShopifyHandle`).
3. Re-export from `src/lib/shopify.ts`.
4. Scaffold the routes: `src/app/api/shopify/link-N/route.ts` and
   `…/checkout/route.ts` (copy from link-1).
5. Scaffold the page and components under `src/app/products/link-N/` and
   `src/components/linkN/`.
6. Optional: add `src/lib/verify-linkN-storefront.ts` for the
   `pnpm verify:shopify` gate.

No `.env.local`, `.env.example`, or Vercel env changes are needed.

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

- CI and deploy gate details live in [docs/ci.md](docs/ci.md)
- Vercel env sync helper: `pnpm vercel:env-push`
