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

## Contact form (`/api/contact`)

The contact form writes every submission to **Cloudflare D1** (binding `CONTACT_DB`,
database `offgrid-contact`) and emails a notification to `hello@`. Email tries the
Cloudflare Email Sending binding first, then falls back to Resend. None of these are
required for CI or `next build` — missing config degrades gracefully (the form still
renders; the route returns a clean 500 only when *no* email transport is configured at
request time, and a D1 outage never fails the request).

Set tokens via `wrangler secret put <NAME>` (or the Cloudflare dashboard → Workers →
Settings → Variables); public values go in `wrangler.jsonc` `vars` / `.env.local`.

| Variable                          | Purpose                                                                                              |
| --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`                  | Resend API key — sends the notification email (fallback when the Cloudflare Email binding is absent). Secret. |
| `CONTACT_TO_EMAIL`                | Notification inbox. Defaults to `hello@offgridevices.com`.                                           |
| `CONTACT_FROM_EMAIL`              | Verified sender on `offgridevices.com` (e.g. `website@offgridevices.com`).                           |
| `CONTACT_AUTOREPLY`               | Set to `"1"` to also send the submitter a confirmation email (needs Resend).                         |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`  | Cloudflare Turnstile **site** key (public, client widget). Read at build time.                       |
| `TURNSTILE_SECRET_KEY`            | Cloudflare Turnstile **secret** (server verify). Secret. If unset, Turnstile is skipped; honeypot + rate limit still apply. Once set, the contact endpoint fails closed (requires a valid token). |
| `CONTACT_IP_SALT`                 | HMAC key for hashing submitter IPs before storing them in D1. Secret, recommended. **If unset, `ip_hash` is omitted entirely** — never stored with a guessable fallback salt. Use a long random value. |
| `CLOUDFLARE_ACCOUNT_ID`           | D1 HTTP-API fallback only (used when the `CONTACT_DB` binding is unavailable).                       |
| `CLOUDFLARE_D1_DATABASE_ID`       | D1 HTTP-API fallback only — `d11cf03a-362d-48fe-bbba-cc47b32a6f51`.                                   |
| `CLOUDFLARE_API_TOKEN`            | D1 HTTP-API fallback only (scope: D1 edit). Secret.                                                  |

### Cloudflare D1 (already provisioned)

Database `offgrid-contact` (id `d11cf03a-362d-48fe-bbba-cc47b32a6f51`) is created and bound
as `CONTACT_DB` in `wrangler.jsonc`. Schema lives in `migrations/0001_contact_submissions.sql`.
Apply migrations to a fresh database with:

```bash
wrangler d1 migrations apply offgrid-contact --remote
```

### Cloudflare Turnstile (manual, ~2 min)

The connected Cloudflare MCP doesn't manage Turnstile, so create the widget once in the
dashboard: **Turnstile → Add widget** → add `offgridevices.com` (and `localhost` for dev)
→ copy the **site key** into `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and the **secret** into
`TURNSTILE_SECRET_KEY`. Until then the form works without the challenge. The production
CSP already allowlists `challenges.cloudflare.com` (script-src / frame-src / connect-src),
so enabling the keys is all that's needed — the widget will load and the endpoint will
fail closed automatically.

### Rate limiting (already provisioned via `ratelimits` in `wrangler.jsonc`)

The public endpoints (`/api/contact`, `/api/shopify/beacon-2`, `.../checkout`) are rate
limited per client IP using Cloudflare's Rate Limiting binding — counters are shared
across Worker isolates within a Cloudflare location. The key is derived from
`cf-connecting-ip` (a forged `x-forwarded-for` cannot bypass it). No setup needed; the
`RL_CONTACT` / `RL_CHECKOUT` / `RL_PRODUCT` namespaces provision on deploy. Local `next
dev` (no binding) falls back to an in-memory counter.

### Cloudflare Email Sending (optional — to avoid Resend)

To send notifications via Cloudflare instead of Resend, onboard the domain to **Email
Service → Email Sending** (adds SPF on a `cf-bounce` subdomain + DKIM; does **not** touch
the root MX, so the iCloud-hosted inbox keeps working), then add the binding in
`wrangler.jsonc`: `"send_email": [{ "name": "CONTACT_EMAIL" }]`. Requires the Workers Paid plan.

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
