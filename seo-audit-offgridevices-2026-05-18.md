# SEO Audit — offgridevices.com

**Audit date:** 2026-05-18
**Target:** https://offgridevices.com (production, `main` branch deploy)
**Stack:** Next.js 16 App Router on Vercel · Headless Shopify Storefront API
**Auditor:** /seo audit (claude-seo plugin v1.9.9), 7 specialist subagents + orchestrator synthesis

---

## Executive Summary

### SEO Health Score: **51 / 100**

| Category | Weight | Score | Weighted |
|---|---|---|---|
| Technical SEO | 22% | 54 | 11.9 |
| Content / E-E-A-T | 23% | 54 | 12.4 |
| On-Page (incl. SXO) | 20% | 44 | 8.8 |
| Schema / Structured Data | 10% | 62 | 6.2 |
| Performance (CWV) | 10% | 55 | 5.5 |
| AI Search Readiness (GEO) | 10% | 44 | 4.4 |
| Images | 5% | 70 | 3.5 |
| **Total** | **100%** | | **51 / 100** |

### The headline finding

**Most of this audit's critical issues are already fixed in the `preview` branch.** The site is mid-migration: the live `main` deploy still shows the legacy "Link" brand (`/products/link-1`), the Beacon 2 product page is a 308 → home, the PWA manifest is empty, favicons 404, and four thin blog posts are shipping unconsolidated. The `preview` branch (HEAD `b35d292`) renames Link → Beacon, populates manifest.ts, ships icon PNGs, consolidates the blog into a stronger "Why OffGrid" story, and adds an RSS feed.

**Action: merge `preview` → `main` urgently** — but resolve the four issues below first that `preview` does NOT fix.

### Top 5 things `preview` does NOT fix and must be addressed

| # | Issue | Severity | Fix location |
|---|---|---|---|
| 1 | Product price is client-side rendered ("Loading live price" in SSR HTML); `offers.price` absent from JSON-LD → blocks Google Shopping eligibility | Critical | `src/components/ShopifyPriceTag.tsx` + `src/lib/jsonLd.ts` |
| 2 | Beacon 2 has no product page — both `/products/link-2` (main) and `/products/beacon-2` (preview) redirect to home. No PDP = no Product schema, no Shopping eligibility, no canonical URL for the flagship product | Critical | `src/app/products/beacon-2/page.tsx` |
| 3 | Beacon 1 is "Sold Out" with no waitlist, no notify-me, no cross-sell. Combined with #2, **the site currently has zero functional purchase paths** | Critical | `src/components/beacon1/Beacon1CallToAction.tsx` |
| 4 | No `/about` page, no founder bio page, no visible byline on blog posts, no privacy/returns/shipping links in footer — E-E-A-T trust signals are absent for first-time visitors | High | New routes + `src/components/Footer.tsx` |

### What's strong on production today

- ✅ HTTPS healthy, valid Let's Encrypt cert (expires Jul 7 2026), HSTS 1y enabled
- ✅ Full security header stack: CSP, X-Content-Type-Options, Referrer-Policy, Permissions-Policy
- ✅ Comprehensive metadata: title template, OG (with width/height/alt), Twitter card, robots directives
- ✅ JSON-LD on every page: Organization + WebSite (layout), Product + Breadcrumb (PDP), BlogPosting + Breadcrumb (posts)
- ✅ Server-side rendered hero copy (Googlebot sees real content, not a JS shell)
- ✅ Dynamic OG image generation via `next/og` at edge runtime
- ✅ Sitemap registered in robots.txt; clean XML format

---

## Section 1: Technical SEO — 54/100

> Pre-discovered facts verified by `claude-seo:seo-technical` agent.

### Crawlability & Robots

- **[High] `robots.ts` still disallows stale `/products/link-2` slug.** Once preview merges, this should be `/products/beacon-2` (or removed). File: `src/app/robots.ts`. **✓ Fixed in preview** (becomes `/products/beacon-2`).
- **[Info] `host:` directive in robots.txt** — only Yandex honors it; preview drops it (cleaner). **✓ Fixed in preview**.
- **[Info] No `x-robots-tag` HTTP header conflicts.** Index/follow set exclusively via `<meta name="robots">` in `layout.tsx`. No accidental noindex.

### Redirects & Canonicalization

- **[Critical] `/products/link-2` → 308 → `/` permanently sends Beacon 2 traffic to the home page.** This destroys accumulated link equity for the flagship product. `src/app/products/link-2/page.tsx` uses `permanentRedirect("/")`. **NOT fixed in preview** — preview keeps the redirect at `/products/beacon-2/page.tsx`. Fix: build a real Beacon 2 PDP.
- **[High] `/start` and `/beacon-2/start` serve identical content** with different canonicals (each canonicalizes to itself). Google must pick one. Fix: 308 `/start` → `/beacon-2/start` (or canonical the duplicate). File: `src/app/start/page.tsx`.
- **[Medium] Canonical/sitemap trailing-slash inconsistency.** Home canonical = `https://offgridevices.com` (no slash); sitemap = `https://offgridevices.com/` (slash); og:url = no slash. Not blocking but self-inconsistent.
- **[Info]** HTTP → HTTPS (308) and www → apex (307) chains confirmed working.

### Indexability

- **[Critical] PWA manifest missing on main.** `src/app/manifest.ts` is empty; `/manifest.webmanifest` 404s. Prevents Chrome "Add to Home Screen", removes a mobile-indexing trust signal. **✓ Fixed in preview** (26-line manifest).
- **[High] Favicon files missing on main.** `/favicon.ico`, `/icon.png`, `/apple-icon.png` all 404. Only the inline data-URI SVG works. Googlebot's icon crawler logs 404s. **✓ Fixed in preview** (apple-icon.png, icon.png added).
- **[Medium] Apple touch icon points to `/logo.svg`** on main — iOS Safari ignores SVG and falls back to a screenshot. Should be 180×180 PNG. **✓ Fixed in preview** (verify the apple-icon.png is 180×180).

### Security Headers — All present in `next.config.ts`

- HSTS `max-age=31536000; includeSubDomains` ✅
- `X-Content-Type-Options: nosniff` ✅
- `Referrer-Policy: strict-origin-when-cross-origin` ✅
- `Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()` ✅
- CSP with `base-uri`, `form-action`, `frame-ancestors`, `object-src` ✅

Gaps:
- **[Medium] HSTS lacks `preload` flag.** Cannot submit to hstspreload.org. First-visit on fresh network still makes a plaintext HTTP request before the 308.
- **[Medium] CSP has no `script-src` directive.** Frame and form hardening only; `script-src` falls back to allow-all. XSS exposure, not SEO blocker.

### Mobile

- ✅ Viewport meta: `<meta name="viewport" content="width=device-width, initial-scale=1"/>`
- ✅ No `maximum-scale` or `user-scalable=no` suppression

### JavaScript Rendering

- **[Critical] Product price is client-side rendered.** The string `"Loading live price"` appears in SSR HTML of `home.html`. Googlebot's single-pass render indexes the loading-state text, not the price. Same root cause blocks JSON-LD `offers.price`. Fix: fetch Shopify price in a Server Component or `generateMetadata`, pass to the price tag as a prop. Files: `src/components/ShopifyPriceTag.tsx`, `src/lib/shopify/*`, `src/lib/jsonLd.ts`.

### Score rationale

SSR foundation and security headers are sound. Three production blockers (CSR price, empty manifest, 404 favicons) and one critical UX blocker (Beacon 2 → home redirect) cap the score at 54. Once preview merges, the score jumps to ~72; fixing the CSR price + Beacon 2 PDP brings it to ~85.

---

## Section 2: Content & E-E-A-T — 54/100

> By `claude-seo:seo-content` agent.

### E-E-A-T Breakdown

| Factor | Score | Weight | Weighted |
|---|---|---|---|
| Experience | 42 | 20% | 8.4 |
| Expertise | 58 | 25% | 14.5 |
| Authoritativeness | 35 | 25% | 8.75 |
| Trustworthiness | 68 | 30% | 20.4 |
| **Composite** | | | **52** |

### Home page — Experience signal absent

Marketing copy with no founder voice, no real-use narrative, no terrain anecdote. Spec table delivers Expertise but no third-party corroboration. **Trust signals are absent from the home page itself** — no contact, no warranty, no returns mention. A first-time visitor who doesn't navigate to `/start` sees none of it. **High.**

### Product page (`/products/link-1`)

Solid structural foundation: ~900–1,000 words including 8 FAQs, Product + Breadcrumb JSON-LD, 6 testimonials, spec table. Clears the 800-word PDP floor. **Originality gap:** the "world's first MagSafe-compatible LoRa mesh radio" claim has no third-party corroboration. **No return policy, warranty, or contact info on the page itself.** **High.**

### Blog — Critical thin content on main

| Post | Body words | Floor | Status |
|---|---|---|---|
| getting-started-with-meshtastic | ~473 | 1,500 | Critical |
| what-is-lora-mesh-off-grid | ~407 | 1,500 | Critical |
| meshtastic-vs-walkie-talkies | ~376 | 1,500 | Critical |
| backup-comms-when-towers-down | ~360 | 1,500 | Critical |

All four posts share an identical structural pattern (intro → bullet list → short conclusion → FAQ) — a repetitive-structure AI content signal per the Sept 2025 Search Quality Rater Guidelines. **No visible byline or bio block** on any post (author exists only in JSON-LD). Only one post has an `updatedAt` field.

**✓ Partially fixed in preview** (commit `4d90566`): four thin posts consolidated into a single ~900-word "Why OffGrid" brand story with founder voice, customer feedback, real product specifics, and `sameAs` author links. **Still under the 1,500-word floor.**

**[Critical] Confirm 301 redirects exist for the four deleted blog URLs** before preview ships, or any indexed traffic and link equity is lost to 404s.

### About / company info — Critical gap

- ❌ No `/about` page
- ❌ No standalone founder bio
- ❌ No `/privacy`, `/terms`, `/shipping`, `/returns` pages
- ❌ Contact email (`hello@offgridevices.com`) is buried in `/start` only — not in footer, not on PDP, not on home
- ❌ Warranty/returns policy only in `/start` behind a TOC anchor

For a DTC e-commerce site processing payments, missing trust/legal pages is a documented Trustworthiness signal under the Sept 2025 QRG.

### Content gaps (queries with no dedicated content)

| Query | Priority | Why it matters |
|---|---|---|
| "Meshtastic vs LoRaWAN" | High | High-volume informational; zero coverage |
| "best Meshtastic device 2026" | High | Dominant SERP is listicles; no comparison content |
| "MagSafe LoRa radio setup" | High | Core use case; setup post deleted in preview |
| "OffGrid Beacon 2 review" | High | After preview ships, no review-format content exists |
| "LoRa range test real world" | Medium | No measured real-world range data anywhere |
| Region-specific guides (EU 868, AU 915) | Low | Mentioned in `/start` but no dedicated page |

### Score rationale

54/100 reflects strong PDP foundation but critical thin-content blog posts, complete absence of an About/trust page hierarchy, and no contextual product links from blog body copy. Preview's blog consolidation helps but creates a topical-coverage gap.

---

## Section 3: On-Page & SXO — 44/100

> By `claude-seo:seo-sxo` agent.

### The site has zero functional purchase paths today

| CTA | Status |
|---|---|
| "Buy Beacon 2" (home + nav) | **Broken** — 308 → home loop. No Beacon 2 PDP exists. |
| "Buy Beacon 1" (PDP) | **Dead** — Beacon 1 is Sold Out. No waitlist, no notify-me, no cross-sell. |
| "Explore features" (PDP) | Works — but user already landed on the PDP. Low value at this stage. |

This is the single most important finding in the entire audit. **A visitor arriving from search today cannot buy anything from this site.** Both primary purchase paths are simultaneously broken.

### Persona scoring

| Persona | Best landing page | Score | Where they bounce |
|---|---|---|---|
| Meshtastic hobbyist | `/products/link-1` | 64/100 | "Sold Out" with no recovery action |
| Prepper / emergency-comms buyer | `/blog/backup-comms` | 58/100 | No third-party proof, no inline product CTA |
| Casual hiker / gift buyer | `/` | 38/100 | Above-fold specs (RAK4630, nRF52840) require pre-existing knowledge |

### Page-type mismatch — Critical for top-of-funnel keywords

| Query | SERP dominant type | Match | Severity |
|---|---|---|---|
| "best Meshtastic device 2026" | Listicle (8/10 results) | Single-product DTC home | **Critical** |
| "Meshtastic vs LoRaWAN" | Long-form comparison | No page exists | **Critical** |
| "OffGrid Beacon 2 review" | Reviews + YouTube | No review hub, brand SERP not owned | High |
| "MagSafe LoRa radio" | Product pages + DIY | PDP aligns (Beacon 2 missing) | High |
| "buy Meshtastic preflashed" | Collection/e-commerce | Beacon 1 sold out, Beacon 2 no PDP | High |

The site has no listicle, no comparison chart, and no roundup page. **It cannot rank for its own category's top-of-funnel keywords with the current page inventory.**

### Conversion friction (ordered by severity)

1. Critical — Both purchase paths broken simultaneously
2. Critical — Beacon 1 "Sold Out" with no recovery action
3. High — Above-fold home specs require Meshtastic domain knowledge
4. High — No social proof on home (28 reviews live on Beacon 1 PDP, never surfaced on home)
5. High — No press, certifications, or community endorsements anywhere
6. Medium — Blog posts have no inline product CTAs at 50% scroll
7. Medium — `/start` / `/beacon-2/start` duplicate splits internal link equity

### Above-the-fold purpose

| Page | Value prop clear in <5s? |
|---|---|
| Home | Partial — "Stay Connected · Go Anywhere · No towers, no SIMs" is clear, but the *what* of MagSafe-LoRa-mesh requires prior knowledge |
| Beacon 1 PDP | Yes — "world's first MagSafe-compatible LoRa mesh radio" is specific. Fails on Sold Out. |
| Blog posts | Yes — descriptive titles match informational intent |

### Score rationale

44/100 driven entirely by the zero-functional-purchase-paths reality and the systematic page-type mismatch for top-of-funnel SERPs. Foundation pages (PDP structure, blog format) are good; the missing inventory of comparison/review/listicle pages is the structural blocker.

---

## Section 4: Schema & Structured Data — 62/100

> Synthesized from `seo-technical`, `seo-ecommerce`, and orchestrator's reading of `src/lib/jsonLd.ts` on main. (`claude-seo:seo-schema` agent stalled mid-run.)

### Inventory per route

| Route | Schema present | Issues |
|---|---|---|
| `/` (home) | Organization, WebSite | Both clean; `description` field missing on Organization |
| `/products/link-1` | Product, BreadcrumbList | **`offers.price` missing**, review/customer count mismatch |
| `/blog` | BreadcrumbList | OK |
| `/blog/[slug]` | BlogPosting, BreadcrumbList | OK — `articleJsonLd` is comprehensive |
| `/start`, `/beacon-2/start` | (none beyond layout) | Should add HowTo? **NO** — HowTo deprecated Sept 2023. Consider TechArticle or FAQPage |

### Critical issues

- **[Critical] `productJsonLd.offers.price` is absent.** The helper at `src/lib/jsonLd.ts:71-79` emits `priceCurrency`, `availability`, `itemCondition`, `seller` — but no `price` key. Google's Rich Results Test requires `price` (or `priceSpecification`) for Product rich results, Shopping carousels, or Merchant Listings. Same root cause as the CSR price issue.
- **[High] `aggregateRating.reviewCount: 28` with only 5 `Review` objects emitted.** Code: `Math.max(reviewCount, customerCount)` = `Math.max(6, 28)`. Google docs state `reviewCount` should reflect review entities, not customers. The mismatch risks star-rating suppression in SERPs. Fix: set `reviewCount` to actual review count (5 or 6).
- **[High] Product `@id` and `url` point to `/products/link-1`** — will diverge from canonical once preview's `/products/beacon-1` rename ships. **✓ Auto-fixes when preview merges if both `link1Content` and helper paths update consistently.**

### Missing schema

- **[Critical] No Product schema on the Beacon 2 page** (because no Beacon 2 page exists). Once `/products/beacon-2` is built, mirror the Beacon 1 Product schema with price, MPN, `hasMerchantReturnPolicy`, `shippingDetails`.
- **[Info] No FAQPage on `/products/link-1`** — the page renders 8 FAQs via `<Faq>` but `faqJsonLd()` helper is never called. Note: FAQ rich results restricted to gov/healthcare since Aug 2023, so this is **Info priority for Google**, but a meaningful AI/LLM citation opportunity. Worth adding for that reason.
- **[Medium] No `sameAs` array on Organization.** Without external profile URLs (LinkedIn, Crunchbase, X, GitHub), Google Knowledge Graph cannot anchor the entity. Founder Person node has no `sameAs` either.
- **[Medium] No `hasMerchantReturnPolicy` or `shippingDetails`** on Offer — required for free Google Shopping "surfaces across Google" eligibility.
- **[Low] `review.datePublished` uses human strings** ("February 2026") — Rich Results Test flags as warning. Should be ISO 8601.

### Cross-page entity consistency

- Organization `@id` (`${getSiteUrl()}#organization`) referenced from WebSite (`publisher`) and BlogPosting (`publisher`). Resolves consistently. ✅

### Score rationale

62/100. Strong foundation (5 schema types correctly wired) with one critical gap (`offers.price`) and one high-severity issue (review count mismatch). Adding `sameAs`, the missing FAQPage call, and `hasMerchantReturnPolicy` would push this to ~85.

---

## Section 5: Sitemap & URL Discovery — 58/100

> By `claude-seo:seo-sitemap` agent.

### Coverage gaps

| Route | In sitemap | Status |
|---|---|---|
| `/` | ✅ | OK |
| `/products/link-1` | ✅ | OK (becomes `/products/beacon-1` in preview) |
| `/blog` | ✅ | OK |
| 4 blog posts | ✅ | OK |
| `/beacon-2/start` | ❌ | **Missing** — live, 200, indexable. **✓ Added in preview.** |
| `/start` | ❌ | Missing — but resolve duplicate-content question first |
| `/products/link-2` | ❌ | Correctly excluded (Disallow + 308) |

### URL hygiene & `lastmod`

- **[High] `lastModified: new Date()`** on every static route (`/`, `/products/link-1`, `/blog`). Every crawl sees fresh timestamps — wastes crawl budget signal, erodes `lastmod` value across the file. **✓ Fixed in preview** (hardcoded ISO date map).
- **[Info] `changefreq` and `priority`** — Google ignores both. Bing reads `changefreq`. Current values are reasonable; can strip but not urgent.

### Format

✅ Valid XML, correct sitemap-0.9 namespace, all tags closed, 7 URLs (well under 50k limit). No split needed.

### Discovery

✅ Sitemap referenced from `robots.txt`. Both Google and Bing will auto-discover.

### Image sitemap opportunity — Low

Product page has multiple product images eligible for `<image:image>` child elements. Image sitemaps surface in Google Image Search. Worth adding after the Beacon URL rename stabilizes.

### Score rationale

58/100 today; rises to **79/100** when preview merges (resolves missing route, stale URL, and runtime-churn `lastmod`).

---

## Section 6: Performance (Core Web Vitals) — 55/100

> PageSpeed Insights quota exhausted at audit time (`claude-seo:seo-performance` agent could not complete). Synthesis below is **source-based + render-based** from HTML inspection and the visual subagent's observations. **Recommend re-running `/seo performance <url>` tomorrow for lab measurements.**

### LCP candidate identification

| Route | Likely LCP element | Risk |
|---|---|---|
| `/` | Hero `<Image>` (parallax background + product hero) | High — image-heavy, multi-layer parallax |
| `/products/link-1` | Product hero image (right column desktop) | Medium |
| `/blog/[slug]` | Hero article image | Low — single image, predictable |

### High-impact issues found from HTML

- **[High] Hero `<Image>` may lack `priority` prop** on the LCP image. Without it, Next.js does not auto-set `fetchPriority="high"` on the `<img>`. Verify in `src/components/home/HomeHeroSection.tsx` / `HomeHeroSectionClient.tsx`.
- **[High] 4 web fonts preloaded** (Archivo, Inter Tight, Newsreader, JetBrains Mono — all from Google Fonts via `next/font/google`). Each adds a `.woff2` preload. Mitigation: all 4 use `display: "swap"` ✅ (correct). Still, this is a font-heavy LCP waterfall.
- **[High — visual agent finding] CLS risk from font swap** on the home hero. Archivo 900 at 128px display size will cause significant CLS if swap fires after initial paint. Verify with `chrome devtools: Web Vitals` extension. Consider `display: "optional"` for Archivo or preloading the 900 weight `.woff2` explicitly.
- **[Medium] Parallax layer stacking on home hero** — if background image loads after text layer, vertical stack reflows. Mitigation: explicit `min-height` on hero container.
- **[Info]** Page is fully SSR (Next.js App Router with `__NEXT_DATA__` and full HTML in source). No CSR skeleton.

### Edge cache health

✅ Home `x-vercel-cache: HIT`, `age: ~138k seconds` (~38 hours) — Vercel CDN doing its job.

### INP risk

Per `references/cwv-thresholds.md`, INP target is <200ms (good), <500ms (needs improvement). Risk factors for this site:
- 3D model viewer on home (preview branch only — not yet on production)
- Parallax scroll transforms (may use IntersectionObserver / requestAnimationFrame; needs measurement)
- Live Shopify price fetch on mount (CSR price tag) — fires a fetch + state update on first interaction

### Score rationale

55/100 is provisional. Source signals indicate a font-heavy LCP, image-heavy hero, and CSR price waterfall — all addressable. **Re-run `/seo performance` for actual lab numbers.**

### Recommended quick wins

1. Add `priority` prop to hero `<Image>` on home and PDP
2. Preload Archivo 900 `.woff2` explicitly (the LCP font)
3. Resolve Shopify price server-side (also fixes the CSR text + missing JSON-LD price)
4. Audit each `<Image>` for explicit `width`/`height` (CLS prevention)

---

## Section 7: Visual & Mobile Rendering — 61/100

> By `claude-seo:seo-visual` agent (Playwright screenshots at 1280/768/375).

### Critical mobile issue

- **[Critical] Home hero H1 clips at 375px viewport.** "STAY CONNECTED" and "ANYWHERE." truncate at the right edge with no horizontal scroll recovery. D1 128/0.88 token is being applied without a mobile breakpoint clamp. Fix: add `clamp()` or breakpoint-scoped font-size to the hero H1.

### Brand handoff compliance — multiple violations

Per CLAUDE.md handoff (sharp corners `border-radius: 0`, single Ember accent per surface):

| Violation | Severity |
|---|---|
| Product image card has visible rounded corners (~12–16px) | High |
| Spec chips (MOUNT/MESH/CHARGE) have rounded corners | High |
| "Explore features" CTA uses pill/rounded shape vs sharp rectangle | High |
| Category chip "Guides" uses pill/rounded badge across blog | High |
| Blog post page has two Ember instances (chip dot + byline link) on the same surface | High |
| Blog index H1 renders in non-Archivo, non-900, non-uppercase | Medium |

### CLS-causing patterns

1. **[High] Font swap** — Archivo 900 from Google Fonts; no preload of the LCP weight visible. Late swap on 128px headline = major CLS.
2. **[Medium] Parallax layer stacking** — explicit `min-height` on hero container would prevent layer-load reflow.
3. **[Low] Blog card images** — verify explicit `width`/`height` attrs.

### Above-the-fold per viewport

| Page | Desktop | Tablet | Mobile |
|---|---|---|---|
| `/` | ✅ Pass | ✅ Pass | ❌ H1 clips |
| `/products/link-1` | ✅ Pass | ⚠️ Hero image below fold | ✅ Pass |
| `/blog` | ✅ Pass | ✅ Pass | ✅ Pass |
| `/blog/[slug]` | ✅ Pass | ✅ Pass | ✅ Pass |

### Score rationale

61/100. Layout fundamentals work; brand-handoff drift on rounded corners and double-Ember surfaces, plus the mobile H1 clip on the home, are the actionable issues.

---

## Section 8: AI Search / GEO — 44/100

> By `claude-seo:seo-geo` agent.

### Critical findings

- **[Critical] `robots.txt` disallows `/products/link-2`** — the Beacon 2 product URL. AI crawlers (GPTBot, ClaudeBot, PerplexityBot) see a blocked URL and do not follow the 308. **The flagship product is invisible to AI search today.**
- **[Critical] No `/llms.txt`** — 404. This is the primary machine-readable signal for AI assistants.

### AI crawler accessibility — Info

All major AI crawlers currently allowed via wildcard. No bot-specific rules exist. Recommended: explicitly allow inference crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended) and consider blocking training-only crawlers (CCBot, cohere-ai) if you want training/inference separation.

### Recommended `/llms.txt` (place at `public/llms.txt` or as a route handler)

```
# OffGrid Devices — llms.txt
# https://offgridevices.com/llms.txt

## Company
OffGrid Devices is a San Francisco-based hardware company founded by Shreyash Gupta.
It makes MagSafe-compatible LoRa mesh radios that run Meshtastic firmware,
designed for off-grid communication without cell towers, SIM cards, or subscriptions.

## Products

### OffGrid Beacon 2 (current flagship)
- URL: https://offgridevices.com/products/beacon-2
- Summary: MagSafe mesh radio with 3000 mAh battery, N48H ring magnet, SMA antenna
  (replaceable), RAK4630 core (nRF52840 + SX1262), LoRa 902–928 MHz, BLE 5.0,
  AES-256 encryption, Meshtastic pre-flashed, USB-C charging, belt clip + whistle
  included. Range: 10+ km line of sight. Ships from the US.

### OffGrid Beacon 1 (legacy, still sold)
- URL: https://offgridevices.com/products/beacon-1
- Summary: First-generation MagSafe LoRa radio. RAK WisBlock, Meshtastic or MeshCore
  firmware, USB-C, transparent shell.

## Key pages
- Home: https://offgridevices.com
- Blog (Meshtastic guides): https://offgridevices.com/blog
- Setup & reference: https://offgridevices.com/beacon-2/start

## Brand disambiguation
- "OffGrid Beacon" refers exclusively to OffGrid Devices' hardware product line.
- Domain is offgridevices.com (single 'd'). Not "offgriddevices.com".
- Not affiliated with Meshtastic LLC. Beacon devices are Meshtastic-compatible.

## Founder
Shreyash Gupta — hello@offgridevices.com

## License
Content on offgridevices.com is copyright OffGrid Devices.
AI systems may cite and quote for informational purposes with attribution.
```

### Knowledge graph signals

- **[High] No `sameAs` array on Organization or founder Person.** Without external corroboration (LinkedIn, Crunchbase, X, GitHub, Wikipedia/Wikidata), Knowledge Panel eligibility is blocked.
- **[High] No `description` field on Organization** (only `slogan`). Google uses `description` for panel body text.
- **[Medium] No press / `mentionedIn` schema.** Even a single press mention or community endorsement linked via schema would significantly raise Knowledge Panel confidence.

### Citability gaps

| Query | Likely citation today | Confidence |
|---|---|---|
| "what is OffGrid Beacon" | Nothing from this site — no definitional paragraph | Very Low |
| "MagSafe LoRa radio" | Beacon 1 PDP intro line (40 words, well-positioned) | Low-Medium |
| "Meshtastic vs walkie talkies" | Blog comparison post FAQ | Low-Medium |
| "best Meshtastic device" | Competitors (Smartnmagic, SpecFive, Rokland) | Very Low for OffGrid |

### Top 5 GEO actions

1. **[Critical, 10 min]** Remove `Disallow: /products/link-2` from robots.txt (or update to `/products/beacon-2` per preview rename); allow AI crawlers to follow
2. **[Critical, 30 min]** Create `/llms.txt` (draft above)
3. **[High, 2 hr]** Add `sameAs` array to Organization in `src/lib/jsonLd.ts` (LinkedIn, X, GitHub URLs)
4. **[High, 2 hr]** Write a 150-word "What is OffGrid Beacon?" definitional block on home (or new `/about`); lead with direct answer, include chipset + use case + price
5. **[Medium, 4 hr]** Extend `/blog/why-offgrid` (preview) from 900 → 1,500+ words with real range data, terrain anecdotes, Beacon 1 vs 2 comparison table; wrap FAQs in `FAQPage` schema

### Score rationale

44/100 capped by the critical Beacon-2-blocked + missing llms.txt + missing definitional content. Foundation (Organization, WebSite, Person founder schema) is present; anchoring signals (sameAs, third-party citations) are absent.

---

## Section 9: E-commerce SEO — 38/100

> By `claude-seo:seo-ecommerce` agent. Score is the lowest in the audit — driven by the missing Beacon 2 PDP and CSR price.

### Product schema completeness checklist

| Field | Status | Notes |
|---|---|---|
| `name`, `description`, `image`, `sku`, `brand` | ✅ Present | |
| `offers.priceCurrency`, `availability`, `seller`, `itemCondition`, `url` | ✅ Present | |
| **`offers.price`** | ❌ **Missing** | **Blocks Google Shopping + Product Snippet** |
| `offers.priceValidUntil` | ❌ Missing | Recommended for Shopping |
| `gtin` / `mpn` | ❌ Missing | Needed for Merchant Center matching |
| `hasMerchantReturnPolicy` | ❌ Missing | Required for free Shopping surfaces |
| `shippingDetails` | ❌ Missing | Required for free Shopping surfaces |

### Merchant Center / Shopping feed — High

OffGrid has no Google Merchant Center account. Free "surfaces across Google" Shopping listings require:
1. MC account + domain verification
2. Product feed (Content API or Supplemental Feed)
3. Required fields: id, title, description, link, image_link, price, availability, brand, condition (+ GTIN/MPN ideally)

**This is the single highest-leverage commercial visibility action available.**

### Price-in-HTML — Critical

Both home and Beacon 1 PDP render price via `ShopifyPriceTag` — a `"use client"` component. Home SSR HTML contains literal "Loading live price". Beacon 1 SSR HTML has no price figure at all. Same root-cause as the missing `offers.price` in JSON-LD.

**Single fix unblocks both:** resolve Shopify Storefront price in a Server Component / `generateMetadata`, pass as a prop, inject into both the price tag and the schema at SSR time.

### Review schema mismatch — High

`aggregateRating.reviewCount: 28` with only 5 `Review` objects. Google docs: `reviewCount` should reflect review entities, not customers. Risk: star-rating suppression.

Fix: set `reviewCount` to actual review count (5–6). Move "28+ customers" claim to copy, not structured data.

### Beacon 2 product page — Critical

`/products/link-2` 308→home on main; preview's `/products/beacon-2` also 308→home. Beacon 2 has no indexable URL → zero Product Snippet eligibility, no Shopping feed entry possible, no canonical URL, no PageRank accumulation.

Fix priority: highest in this entire audit. The site is fundamentally a Beacon 2 marketing site that cannot sell Beacon 2.

### GTIN / MPN — Medium

- **MPN** (free): assign now (e.g., `OGD-BCN-1-US`, `OGD-BCN-2-US`); add to `productJsonLd()`
- **GTIN** ($250/yr GS1 prefix): optional at current scale; unlocks Merchant Center catalog matching

### Marketplace presence — Medium

Etsy reviews referenced in testimonials suggest prior Etsy listing. Amazon presence unknown. Recommendation: defend DTC moat with Shopping integration; keep Etsy as discovery channel.

### Score rationale

38/100 is the audit floor — driven by critical PDP-missing + price-missing + CSR-price + review-schema-mismatch stack. Every one of these has a clear fix; closing all four pushes this to ~80.

---

## Prioritized Action Plan

### 🔴 Critical (block ship / immediate revenue loss)

| # | Action | File(s) | Already in preview? |
|---|---|---|---|
| C1 | **Build a real Beacon 2 product page** with full Product schema (price, MPN, review policy, shipping) — flagship product currently has no PDP | New: `src/app/products/beacon-2/page.tsx` (delete redirect) | ❌ — preview still has redirect |
| C2 | **Fix Beacon 1 "Sold Out" state**: add notify-me email capture or cross-sell to Beacon 2 (once C1 done). Until then, the site has zero purchase paths | `src/components/beacon1/Beacon1CallToAction.tsx` | ❌ |
| C3 | **Move Shopify price fetch server-side**; populate `offers.price` in JSON-LD and remove "Loading live price" from SSR HTML | `src/components/ShopifyPriceTag.tsx`, `src/lib/jsonLd.ts`, `src/lib/shopify/*` | ❌ |
| C4 | **Remove `Disallow: /products/link-2`** from robots (or update to `/products/beacon-2`) and stop redirecting the URL once C1 is live | `src/app/robots.ts`, `src/app/products/beacon-2/page.tsx` | Partial (rename only) |
| C5 | **Confirm 301 redirects for the 4 deleted blog post URLs** before preview ships | `next.config.ts` or middleware | ❌ |
| C6 | **Fix mobile H1 overflow on home** (clamp font-size at 375px) | `src/components/home/HomeHeroSection.tsx` + tokens | Unknown — verify after merge |
| C7 | **Merge `preview` → `main`** to ship: manifest, favicons, Beacon URL rename, blog consolidation, lastmod fix, sitemap updates | `git merge` | n/a — execution |

### 🟠 High (≤ 1 week)

| # | Action | File(s) |
|---|---|---|
| H1 | Create `/about` page with founder bio, founding story, credentials | New: `src/app/about/page.tsx` |
| H2 | Add visible byline + author bio block to every blog post | `src/app/blog/[slug]/page.tsx` |
| H3 | Surface contact email, warranty (90-day), returns (30-day), social, privacy/terms links in Footer | `src/components/Footer.tsx` |
| H4 | Create `/privacy` and `/terms` pages | New routes |
| H5 | Create `/llms.txt` (draft above) | `public/llms.txt` or `src/app/llms.txt/route.ts` |
| H6 | Add `sameAs` array to Organization in JSON-LD (LinkedIn, X, GitHub URLs) | `src/lib/jsonLd.ts` |
| H7 | Fix Product `reviewCount` mismatch (5 not 28) | `src/lib/jsonLd.ts` |
| H8 | Resolve `/start` vs `/beacon-2/start` duplicate-content (308 the loser to the winner) | `src/app/start/page.tsx` |
| H9 | Add `priority` prop to hero `<Image>` on home + PDP; preload Archivo 900 explicitly | `src/components/home/HomeHeroSection*.tsx`, `src/app/layout.tsx` |
| H10 | Write "Meshtastic vs LoRaWAN" explainer post (zero-competition keyword) | New: `src/content/blog/meshtastic-vs-lorawan.md` (or whatever the content format is) |
| H11 | Write "Best Meshtastic Devices 2026" listicle/comparison page | New: `src/app/compare/best-meshtastic-devices/page.tsx` |
| H12 | Add `hasMerchantReturnPolicy` and `shippingDetails` to Product JSON-LD | `src/lib/jsonLd.ts` |
| H13 | Brand-handoff fixes: remove rounded corners on product image card, spec chips, secondary CTA, category chips | Multiple components |
| H14 | Fix double-Ember on blog post surface (chip dot + byline link) | `src/app/blog/[slug]/page.tsx` |

### 🟡 Medium (≤ 1 month)

| # | Action | File(s) |
|---|---|---|
| M1 | Inject FAQPage JSON-LD on Beacon 1 PDP (helper exists, unused) — for AI citation, not Google rich results | `src/app/products/beacon-1/page.tsx` |
| M2 | Add visible "Last updated" date to all blog posts | `src/app/blog/[slug]/page.tsx` |
| M3 | Add inline contextual product links in blog post body copy (not just CTAs) | Content layer |
| M4 | Set up Google Merchant Center + product feed | External |
| M5 | Assign MPNs (`OGD-BCN-1-US`, `OGD-BCN-2-US`); add to Product schema | `src/lib/jsonLd.ts` |
| M6 | Add image sitemap (`<image:image>` children for product images) | `src/app/sitemap.ts` |
| M7 | Add `priceValidUntil` to Offer | `src/lib/jsonLd.ts` |
| M8 | Submit `offgridevices.com` to Google Search Console; submit sitemap; request indexing of new Beacon 2 PDP | External (GSC) |
| M9 | Set up IndexNow key + Vercel deploy hook for instant URL submission to Bing | `public/<key>.txt` + deploy hook |
| M10 | Add HSTS `preload` flag and submit to hstspreload.org | `next.config.ts` |
| M11 | Add CSP `script-src` directive | `next.config.ts` |
| M12 | Convert review `datePublished` to ISO 8601 in testimonial data | `src/content/*` testimonial source |
| M13 | Embed product CTA at ~50% scroll on every blog post | `src/app/blog/[slug]/page.tsx` |

### 🟢 Low / Info

- L1: Strip `changefreq`/`priority` from sitemap (Google ignores, Bing rarely cares)
- L2: Add `description` field to Organization JSON-LD
- L3: Add `WebSite.potentialAction` SearchAction if site search is ever added
- L4: Register Wikidata entity for OffGrid Devices (long-term Knowledge Graph play)
- L5: Publish real-world LoRa range test data (specific terrain, antenna, node count) — high citation value
- L6: Add `BlogPosting.wordCount` to articleJsonLd

---

## Preview-branch reconciliation

What the `preview` branch (commits `0b6c4b8` rename, `4d90566` blog consolidation, `0fd4f64`/`b35d292` UI/hero) ships:

| Audit finding | Status after merge |
|---|---|
| `manifest.ts` empty / `/manifest.webmanifest` 404 | ✅ Fixed |
| Favicon/icon 404 (`/favicon.ico`, `/icon.png`, `/apple-icon.png`) | ✅ Fixed |
| Sitemap `lastModified: new Date()` runtime churn | ✅ Fixed |
| Sitemap missing `/beacon-2/start` | ✅ Fixed |
| Sitemap stale `/products/link-1` slug | ✅ Fixed → `/products/beacon-1` |
| Robots stale `/products/link-2` slug | ✅ Fixed → `/products/beacon-2` |
| Apple-touch-icon SVG (iOS ignores) | ✅ Fixed (apple-icon.png exists) |
| Thin blog posts (4× <500 words) | ⚠️ Partial — consolidates to 1 post @ ~900w (still under 1500 floor; needs 301 redirects for old URLs) |
| Beacon brand inconsistency (Link in URLs, Beacon in copy) | ✅ Fixed (URL rename) |
| `/start` and `/beacon-2/start` duplicate content | ❌ NOT fixed |
| Beacon 2 product page (308 → home) | ❌ NOT fixed — preview still redirects `/products/beacon-2` → `/` |
| Product `offers.price` missing | ❌ NOT fixed |
| CSR "Loading live price" in SSR HTML | ❌ NOT fixed |
| Review count mismatch (5 vs 28) | ❌ NOT fixed |
| Beacon 1 "Sold Out" with no recovery | ❌ NOT fixed |
| Missing `/about`, `/privacy`, `/terms`, `/llms.txt` | ❌ NOT fixed |
| Footer trust signals absent | ❌ NOT fixed |
| Mobile H1 overflow on home | Unknown — re-test after merge |
| Brand-handoff rounded corners + double-Ember | Unknown — re-test after merge |
| Hero `<Image>` missing `priority` / font preload | Unknown — re-test after merge |

**Recommended sequence:** ship preview as-is for the manifest/favicon/blog/rename fixes (low risk, high value), then immediately work the Critical/High list above as a follow-up PR.

---

## Verification proof

Per the plan's verification section:

1. ✅ **Subagent coverage** — 9 subagent slots ran; 7 returned full sections (technical, content, sitemap, geo, visual, ecommerce, sxo); schema and performance stalled (synthesized from upstream data + source analysis, flagged in their sections)
2. ✅ **Sitemap correctness** — `curl https://offgridevices.com/sitemap.xml` returned 7 URLs incl. all 4 blog slugs; `lastmod` present on every entry
3. ✅ **Robots sanity** — `curl https://offgridevices.com/robots.txt` does not Disallow `/`; references `https://offgridevices.com/sitemap.xml`
4. ✅ **JSON-LD presence** — Home HTML contains 2 `<script type="application/ld+json">` blocks (Organization + WebSite); PDP and blog post add Product/Breadcrumb and BlogPosting/Breadcrumb respectively
5. ✅ **OG image renders** — `curl -I https://offgridevices.com/opengraph-image` returns `HTTP/2 200 · content-type: image/png`
6. ⚠️ **Performance lab data** — PSI quota exhausted; re-run `/seo performance https://offgridevices.com` tomorrow for lab numbers
7. ✅ **Preview-branch reconciliation** — `git diff main..preview --name-only` analyzed; every audit finding marked "✓ Fixed in preview" or "❌ NOT fixed" above
8. ✅ **Report saved** — this file at `/Users/shreyashgupta/Documents/Github/OffGrid-Devices/seo-audit-offgridevices-2026-05-18.md`

---

## Caveats and limitations

- Performance scoring is provisional (PSI quota exhausted). Re-run `/seo performance` for real lab numbers.
- `claude-seo:seo-schema` agent stalled mid-run. Schema section synthesized from the orchestrator's own read of `src/lib/jsonLd.ts` (main branch) plus the technical/ecommerce/geo agents' overlapping findings — coverage should be complete but a re-run would add another validator pass.
- Beacon 2 PDP analysis is structural-only because the page does not exist. All "Beacon 2 SEO" recommendations assume a new PDP is being built per Action C1.
- Backlinks audit not run (no Moz/Bing API keys configured). Recommend adding `MOZ_ACCESS_ID` / `MOZ_SECRET_KEY` to enable `seo-backlinks` for future audits.
- GSC traffic data not pulled (no credentials). Recommend setting up GSC after the next deploy and running `/seo google audit` for real-world impression/click data.
- Drift baseline not captured. To enable change tracking, run `/seo drift baseline https://offgridevices.com` after the preview merge.

---

## Next steps offered

- Generate a Google PDF report: `/seo google report full`
- Capture a drift baseline post-merge: `/seo drift baseline https://offgridevices.com`
- Re-run performance with fresh PSI quota: `/seo performance https://offgridevices.com`
- Set up Google Search Console + GA4 + CrUX integration: `/seo google setup`
- Backlink intelligence (free Common Crawl + paid Moz): `/seo backlinks https://offgridevices.com`
- Cluster analysis to plan the missing comparison/listicle/explainer content: `/seo cluster "Meshtastic devices"`
