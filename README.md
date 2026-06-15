# OffGrid Devices Web

Marketing site and storefront shell for OffGrid devices, built with Next.js App Router.

Current product coverage:

- `Beacon 1` sold-out SEO product page at `/products/beacon-1` (storytelling, reviews, no buy link)
- `Beacon 2` product page at `/products/beacon-2` — purchases go through the Etsy listing
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

## Buying (Etsy)

There is no on-site checkout. The Beacon 2 "buy" buttons link out to a single Etsy
listing. The canonical URL lives in code as `BEACON2_ETSY_URL` in
[`src/components/Beacon2BuyLink.tsx`](src/components/Beacon2BuyLink.tsx); that component
is reused everywhere a buy button appears and fires the `trackBuyClick` PostHog event.
Beacon 1 is sold out and has no buy link.

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

Push to `main` → GitHub Actions runs the full `quality` suite (lint, unit tests, dependency audit, build, Playwright) → if green, a `deploy` job auto-publishes to Cloudflare Workers (OpenNext). If any check fails, nothing deploys and the last good version stays live. No PR or branch protection — commit straight to `main`, push, and the pipeline gates the deploy. Cloudflare keeps the last 100 versions for one-click rollback.

- CI, deploy, and rollback details live in [docs/ci.md](docs/ci.md)
