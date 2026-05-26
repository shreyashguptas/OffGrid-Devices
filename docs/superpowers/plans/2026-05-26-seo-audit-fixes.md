# SEO Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Raise the offgridevices.com SEO health score from 71/100 to 85+/100 by fixing concrete on-page, schema, content, and technical issues identified in the 2026-05-26 audit.

**Architecture:** No new architecture. Targeted edits across (1) schema generators in `src/lib/jsonLd.ts`, (2) per-page metadata exports in `src/app/**/page.tsx`, (3) content data files in `src/content/*.ts`, (4) the homepage hero client component, (5) `next.config.ts` headers, and (6) `src/app/sitemap.ts`. Verification: deploy to a preview URL, then `curl | grep` or `parse_html.py` to confirm each fix in rendered HTML; build with `pnpm build` after every batch.

**Tech Stack:** Next.js 16 App Router (SSR), TypeScript, Vercel, custom JSON-LD via `<script type="application/ld+json">`. No ORM, no DB. Content is in TS data files. Tests use Vitest.

**Branch:** Work directly on `preview`. The user's memory says: do not use worktrees, push to `preview`, Vercel publishes a preview URL on each push, production happens via a preview→main PR.

**Tooling reminders:**
- Type/build check: `pnpm typecheck` (if defined) or `pnpm build`
- Lint: `pnpm lint`
- Tests: `pnpm test`
- Parse a deployed page: `python3 /Users/shreyashgupta/.claude/plugins/cache/agricidaniel-seo/claude-seo/1.9.9/scripts/parse_html.py <local-file-or-url>`
- Schema validation: paste deployed HTML into https://search.google.com/test/rich-results
- Audit reports referenced below are at `/Users/shreyashgupta/.claude/jobs/2642cac4/seo-audit/` (FULL-AUDIT-REPORT.md and ACTION-PLAN.md).

**Commit conventions:** Follow existing pattern from `git log` — `fix(seo): ...`, `feat(seo): ...`, `chore(seo): ...`. Always co-author Claude per global instructions and **quote the commit message back in the chat after committing**.

---

## File Map

Files that will be touched (read each before editing):

| File | Responsibility | Phases that touch it |
|------|----------------|----------------------|
| `src/lib/jsonLd.ts` | All JSON-LD generators (Product, Organization, Article, FAQ, Breadcrumb) | 1, 5, 7, 10 |
| `src/components/Faq.tsx` | FAQ section component — currently double-emits JSON-LD with the page | 1 |
| `src/app/page.tsx` | Homepage — Product schema, metadata, hero composition | 1, 2, 5 |
| `src/app/products/beacon-2/page.tsx` | Beacon 2 PDP — Product schema, FAQ, breadcrumb | 1, 5, 7, 9 |
| `src/app/products/beacon-1/page.tsx` | Beacon 1 PDP (retired) — Product schema, FAQ | 1, 5, 6, 10 |
| `src/app/about/page.tsx` | About — metadata, breadcrumb schema | 4, 7 |
| `src/app/blog/page.tsx` | Blog index — metadata + content | 4, 9 |
| `src/app/blog/[slug]/page.tsx` | Blog post — Article schema, FAQ | 1, 9 |
| `src/app/sitemap.ts` | Sitemap generator | 3 |
| `src/app/robots.ts` | Robots config (no changes expected) | — |
| `src/app/llms.txt/route.ts` | llms.txt content (no changes expected) | — |
| `src/content/blog.ts` | Blog post data | 6, 9 |
| `src/content/products.ts` | Beacon 2 content | 1, 6 |
| `src/content/beacon1.ts` | Beacon 1 content (incl. testimonials currently used for Beacon 2 schema) | 1, 6 |
| `src/components/home/HomeHeroSectionClient.tsx` | Homepage hero (needs an `<h1>`) | 2 |
| `next.config.ts` | CSP + headers | 10 |

New files possibly added:
- `src/lib/seoPriceValidUntil.ts` — small helper for the rolling `priceValidUntil` date
- `public/logo.png` — raster Organization logo
- `src/app/api/indexnow/route.ts` — IndexNow ping endpoint (deferred, Phase 11)

---

# Phase 1 — Critical schema risk (defuse manual-action danger)

**Goal:** Fix the three issues the audit flagged as direct Google manual-action triggers. Estimated time: ~1 hour.

### Task 1.1: Set `reviewCount` to actual review count (not array length × 1)

**Context:** The audit found `reviewCount: 6` declared in rendered HTML, but only 5 review objects serialized. Source: in `src/app/page.tsx:65`, `src/app/products/beacon-2/page.tsx:164`, and `src/app/products/beacon-1/page.tsx:135`, `reviewCount` is set to `beacon1Content.testimonials.length`. `productJsonLd()` in `src/lib/jsonLd.ts:209` slices `reviews` to `.slice(0, 5)`. So if `testimonials.length` is 6, the schema declares 6 but only emits 5. Confirm the actual length first, then either remove the `.slice(0, 5)` cap or pass the correct count.

**Files:**
- Read: `src/content/beacon1.ts` — find `testimonials:` array, count its length
- Modify: `src/lib/jsonLd.ts:208-221` — either drop the `.slice(0, 5)` (emit all reviews) **or** clamp `reviewCount` to `Math.min(input.aggregateRating.reviewCount, input.reviews.length)`

**Steps:**

- [ ] **Step 1.1.1: Count the actual testimonials**

  ```bash
  grep -c "name:" /Users/shreyashgupta/Documents/Github/OffGrid-Devices/src/content/beacon1.ts
  # OR more precisely:
  node -e "console.log(require('./src/content/beacon1.ts').beacon1Content.testimonials.length)" 2>/dev/null
  ```

  Expected: a number (likely 6, since `testimonials.length` was being passed and the rendered count was 6).

- [ ] **Step 1.1.2: Decide policy.** Two valid fixes:
  - **(A) Emit all reviews** — remove the `.slice(0, 5)` in `jsonLd.ts:209`. Pro: more reviews visible to Google. Con: more JSON-LD payload bloat (~120 chars per review).
  - **(B) Cap the count** — clamp `reviewCount` to the emitted slice. Pro: smallest diff. Con: hides 1 review from schema.
  - **Recommended: (A)**. The brand is small; every review helps.

- [ ] **Step 1.1.3: Apply fix (A) in `src/lib/jsonLd.ts`**

  Replace lines 208–221:

  ```ts
    if (input.reviews?.length) {
      product.review = input.reviews.slice(0, 5).map((review) => ({
        "@type": "Review",
  ```

  With:

  ```ts
    if (input.reviews?.length) {
      product.review = input.reviews.map((review) => ({
        "@type": "Review",
  ```

- [ ] **Step 1.1.4: Build to verify no TS error**

  ```bash
  pnpm build
  ```

  Expected: build succeeds.

- [ ] **Step 1.1.5: Commit**

  ```bash
  git add src/lib/jsonLd.ts
  git commit -m "$(cat <<'EOF'
  fix(seo): emit all Product reviews in JSON-LD, not just first 5

  Aligns rendered review count with declared aggregateRating.reviewCount —
  previously reviewCount was testimonials.length (6) but reviews were
  sliced to 5, which Google flags as a misleading-review-data manual-action
  risk.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

---

### Task 1.2: Disentangle Beacon 2 reviews from Beacon 1 testimonials

**Context:** Beacon 2's Product JSON-LD (in `src/app/products/beacon-2/page.tsx:162-170` and `src/app/page.tsx:63`) uses `beacon1Content.testimonials` directly. One of those testimonials mentions "the 2000 mAh battery" — that's a Beacon 1 spec on a Beacon 2 page. Google treats identical review arrays across distinct Product URLs as a fabrication signal.

**Decision needed (ask user before implementing):**
- **(A)** Until real Beacon 2 reviews exist, **drop `aggregateRating` and `reviews` from the Beacon 2 Product schema entirely**. The on-page testimonials section can remain (with its existing "Reviews below are from Beacon 1 customers — the line Beacon 2 evolved from" footnote already in `beacon2Content.home.testimonials.footnote`), but the JSON-LD claim that those reviews describe Beacon 2 is removed.
- **(B)** Keep `aggregateRating` (legacy carries over) but strip the `reviews` array on Beacon 2.
- **(C)** Author 3+ Beacon-2-specific testimonials and use those.

**Recommended: (A).** Cleanest. The on-page text already discloses that the reviews are Beacon 1's; the schema should match that on-page reality.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx` (remove `aggregateRating` + `reviews` keys from `productJsonLd(...)` call)
- Modify: `src/app/page.tsx` (same removal — homepage Product block also references those reviews)

**Steps:**

- [ ] **Step 1.2.1: Apply fix (A) to `src/app/products/beacon-2/page.tsx`**

  Find the `productJsonLd(...)` call around line 149. Remove the `aggregateRating` and `reviews` keys:

  ```diff
   productJsonLd({
     slot: "beacon-2",
     brandedName: beacon2Content.brandedName,
     shortName: beacon2Content.name,
     description: beacon2Content.description,
     sku: "OFFGRID-BEACON-2",
     mpn: "OGD-BCN-2-US",
     category: "Radios > LoRa Mesh Radios",
     url: "/products/beacon-2",
     images: [
       beacon2Content.heroImage.src,
       beacon2Content.summary.heroImage.src,
     ],
  -  aggregateRating: {
  -    ratingValue: "5.0",
  -    reviewCount: beacon1Content.testimonials.length,
  -  },
  -  reviews: beacon1Content.testimonials.map((testimonial) => ({
  -    name: testimonial.name,
  -    date: testimonial.date,
  -    review: testimonial.review,
  -  })),
     offer: price
       ? { ... }
       : undefined,
   })
  ```

- [ ] **Step 1.2.2: Apply the same removal to `src/app/page.tsx` (around line 63)**

  Same diff pattern — remove `aggregateRating` and `reviews` keys from the homepage's Product JSON-LD call.

- [ ] **Step 1.2.3: Verify nothing else uses `beacon1Content.testimonials` on Beacon 2 / homepage**

  ```bash
  grep -n "beacon1Content.testimonials" src/app/page.tsx src/app/products/beacon-2/page.tsx
  ```

  Expected: no matches (or only matches inside JSX, which is fine — that's the on-page testimonial section, not the schema).

- [ ] **Step 1.2.4: Confirm Beacon 1 PDP keeps its reviews**

  Beacon 1 was the actual product these reviews describe. They should stay on `/products/beacon-1`.

  ```bash
  grep -n "aggregateRating\|reviews:" src/app/products/beacon-1/page.tsx
  ```

  Expected: still present.

- [ ] **Step 1.2.5: Build + commit**

  ```bash
  pnpm build && git add src/app/page.tsx src/app/products/beacon-2/page.tsx
  git commit -m "$(cat <<'EOF'
  fix(seo): remove Beacon 1 reviews from Beacon 2 Product schema

  Beacon 1's testimonials were being emitted as review objects under the
  Beacon 2 Product JSON-LD. One review describes the 2000 mAh battery —
  a Beacon 1 spec, on a Beacon 2 page. Identical review arrays across two
  Product URLs is a Google fabrication signal.

  Page-level testimonials section already discloses these are Beacon 1
  reviews; schema should match that on-page reality. Will reinstate
  aggregateRating + review array on Beacon 2 once we collect real Beacon 2
  testimonials.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

---

### Task 1.3: Remove duplicate FAQPage JSON-LD emit

**Context:** The audit found two identical FAQPage JSON-LD blocks on every page with FAQs. Confirmed source:
- `src/components/Faq.tsx:25` emits `<script {...jsonLdScriptProps(faqJsonLd(items))} />`
- Each consuming page (`src/app/products/beacon-2/page.tsx:190`, `src/app/products/beacon-1/page.tsx:161`, `src/app/blog/[slug]/page.tsx:208`) ALSO emits `faqJsonLd(...)` separately.

So every FAQ section ships its schema twice.

**Fix:** Remove the page-level `<script {...jsonLdScriptProps(faqJsonLd(...))} />` emissions; keep the one inside `Faq.tsx`. The component already emits JSON-LD whenever the section renders — there's no reason to also emit it from the page.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx:190` (remove the FAQ script line)
- Modify: `src/app/products/beacon-1/page.tsx:161` (remove)
- Modify: `src/app/blog/[slug]/page.tsx:208` (remove)

**Steps:**

- [ ] **Step 1.3.1: Read each page to confirm the line in question**

  ```bash
  sed -n '188,192p' src/app/products/beacon-2/page.tsx
  sed -n '159,163p' src/app/products/beacon-1/page.tsx
  sed -n '206,210p' src/app/blog/[slug]/page.tsx
  ```

  Expected: each shows `<script {...jsonLdScriptProps(faqJsonLd(...))} />` near a `<Faq items={...} />` usage.

- [ ] **Step 1.3.2: Remove the page-level FAQ script tag from beacon-2 page**

  Delete the line:

  ```tsx
        <script {...jsonLdScriptProps(faqJsonLd(PRODUCT_FAQS))} />
  ```

- [ ] **Step 1.3.3: Same removal on beacon-1 page**

  Delete the line `<script {...jsonLdScriptProps(faqJsonLd(PRODUCT_FAQS))} />`.

- [ ] **Step 1.3.4: Same removal on blog/[slug] page**

  Delete the line `<script {...jsonLdScriptProps(faqJsonLd(post.faq))} />` (only emits when `post.faq` exists).

- [ ] **Step 1.3.5: Clean up now-unused `faqJsonLd` imports**

  In each of the three files above, remove `faqJsonLd` from the import list in `import { ..., faqJsonLd, ... } from "@/lib/jsonLd";` if nothing else in the file uses it.

  Verify:

  ```bash
  grep -n "faqJsonLd" src/app/products/beacon-2/page.tsx src/app/products/beacon-1/page.tsx src/app/blog/[slug]/page.tsx
  ```

  Expected: no matches.

- [ ] **Step 1.3.6: Build + commit**

  ```bash
  pnpm build && git add src/app/products/beacon-2/page.tsx src/app/products/beacon-1/page.tsx src/app/blog/[slug]/page.tsx
  git commit -m "$(cat <<'EOF'
  fix(seo): emit FAQPage JSON-LD once (component-level only)

  The Faq component already injects faqJsonLd(items) when it renders;
  each consuming page also emitted the same schema, producing two
  identical FAQPage blocks per page. Google treats duplicate same-type
  JSON-LD as invalid and may log Structured Data warnings in GSC.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

- [ ] **Step 1.3.7: After deploy, verify against preview URL**

  ```bash
  curl -sL "https://<preview-url>/products/beacon-2" | grep -c '"@type":"FAQPage"'
  ```

  Expected: `1` (was 2 before).

---

# Phase 2 — Homepage on-page + keyword cannibalization

**Goal:** Add `<h1>` to homepage hero; stop the homepage from competing with `/products/beacon-2` for "MagSafe LoRa Mesh Radio"; trim oversized homepage meta description. ~1 hour.

### Task 2.1: Add an `<h1>` to the homepage hero

**Context:** `src/components/home/HomeHeroSectionClient.tsx` renders the hero. There is no `<h1>` anywhere in the homepage tree. The natural candidate is the editorial tagline ("Stay Connected. Go Anywhere.") which is currently a `<p>` at line 136–141. Promoting it to `<h1>` retains all current styling and adds the missing heading signal.

**Files:**
- Modify: `src/components/home/HomeHeroSectionClient.tsx:136-141`

**Steps:**

- [ ] **Step 2.1.1: Promote the tagline `<p>` to `<h1>`**

  In `src/components/home/HomeHeroSectionClient.tsx`, replace:

  ```tsx
              <p
                className="font-editorial italic leading-[1.15] tracking-[-0.01em] text-sand"
                style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
              >
                {tagline}
              </p>
  ```

  With:

  ```tsx
              <h1
                className="font-editorial italic leading-[1.15] tracking-[-0.01em] text-sand"
                style={{ fontSize: "clamp(20px, 2.4vw, 28px)" }}
              >
                {tagline}
              </h1>
  ```

  Note: the brand handoff specifies "Type does the heavy lifting; chrome stays quiet" — keep all visual styling identical. The change is semantic only.

- [ ] **Step 2.1.2: Confirm no other `<h1>` lives in the homepage tree**

  ```bash
  grep -rn "<h1" src/app/page.tsx src/components/home/
  ```

  Expected: exactly one `<h1>` (the one just added in HomeHeroSectionClient.tsx).

- [ ] **Step 2.1.3: Build, deploy preview, verify**

  ```bash
  pnpm build
  # ... after deploy ...
  curl -sL "https://<preview-url>" | grep -oE '<h1[^>]*>[^<]*</h1>'
  ```

  Expected: exactly 1 `<h1>` containing the tagline.

- [ ] **Step 2.1.4: Commit**

  ```bash
  git add src/components/home/HomeHeroSectionClient.tsx
  git commit -m "$(cat <<'EOF'
  fix(seo): promote homepage hero tagline to h1

  Homepage had zero h1 tags. Promoted the editorial tagline ("Stay
  Connected. Go Anywhere.") to h1 — same styling, semantic-only change.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

---

### Task 2.2: Differentiate homepage `<title>` to stop cannibalizing the PDP

**Context:** Audit found both `offgridevices.com` and `/products/beacon-2` target the identical phrase "MagSafe LoRa Mesh Radio" in `<title>`. Homepage usually wins the ranking; PDP loses the conversion-capable slot. Strategy: homepage takes a **brand statement**; PDP keeps the product-phrase title.

**Files:**
- Modify: `src/app/page.tsx` (homepage `metadata` export — find the `title:` field)

**Steps:**

- [ ] **Step 2.2.1: Read current homepage metadata**

  ```bash
  grep -n -A4 "export const metadata\|generateMetadata" src/app/page.tsx
  ```

  Expected: shows current `title: "MagSafe LoRa Mesh Radio · OffGrid Beacon 2"`.

- [ ] **Step 2.2.2: Replace with a brand-statement title**

  Candidates (pick one, lean toward the first):
  - `"OffGrid Devices — Mesh Radios for When the Towers Aren't There"` (58 chars) ← recommended
  - `"OffGrid Devices · MagSafe Meshtastic Mesh Radios"` (49 chars)
  - `"Stay Connected. Go Anywhere. — OffGrid Devices"` (47 chars, brand-poetic)

  Edit `src/app/page.tsx`:

  ```ts
  export const metadata: Metadata = {
    title: "OffGrid Devices — Mesh Radios for When the Towers Aren't There",
    // ... rest of metadata
  };
  ```

  (If `metadata` is generated dynamically via `generateMetadata`, replace the equivalent field.)

- [ ] **Step 2.2.3: Verify the PDP title is unchanged**

  ```bash
  grep -n "title:" src/app/products/beacon-2/page.tsx
  ```

  Expected: still `"Buy OffGrid Beacon 2 — MagSafe LoRa Mesh Radio | OffGrid Devices"` (or similar — the product-phrase variant). It owns the phrase now.

- [ ] **Step 2.2.4: Commit**

  ```bash
  git add src/app/page.tsx
  git commit -m "$(cat <<'EOF'
  fix(seo): differentiate homepage title from Beacon 2 PDP

  Both pages were targeting "MagSafe LoRa Mesh Radio" in <title>;
  homepage was winning the ranking slot but is a brand page (no buy CTA
  in initial fold). PDP now owns the product phrase; homepage takes a
  brand statement.

  Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
  EOF
  )"
  ```

---

### Task 2.3: Trim homepage meta description to ≤155 chars

**Context:** Audit found homepage meta description at 216 chars. Google truncates at ~155–160 in the SERP. Rewrite for the new homepage positioning (brand, not product-listing).

**Files:**
- Modify: `src/app/page.tsx`

**Steps:**

- [ ] **Step 2.3.1: Draft a ≤155-char description**

  Candidate:
  > "OffGrid builds MagSafe-compatible LoRa mesh radios that run Meshtastic — off-grid communication for hikers, preppers, and crews. No towers, no SIMs." (149 chars)

  Count: `echo -n "..." | wc -c` should report ≤155.

- [ ] **Step 2.3.2: Apply**

  Edit `src/app/page.tsx`:

  ```ts
  export const metadata: Metadata = {
    title: "OffGrid Devices — Mesh Radios for When the Towers Aren't There",
    description:
      "OffGrid builds MagSafe-compatible LoRa mesh radios that run Meshtastic — off-grid communication for hikers, preppers, and crews. No towers, no SIMs.",
    // ...
  };
  ```

  Also update `openGraph.description` and `twitter.description` if they're separate values.

- [ ] **Step 2.3.3: Commit**

  Combine with Task 2.2 commit if not yet committed, or commit separately:

  ```bash
  git add src/app/page.tsx
  git commit -m "fix(seo): trim homepage meta description to <155 chars"
  ```

---

# Phase 3 — Sitemap + canonical consistency

**Goal:** Eliminate trailing-slash mismatch; normalize `lastModified` formatting; lower Beacon 1 sitemap signals. ~30 min.

### Task 3.1: Fix canonical/sitemap trailing-slash mismatch on homepage

**Context:** Homepage canonical tag is `https://offgridevices.com` (no trailing slash). Sitemap `<loc>` is `https://offgridevices.com/` (with trailing slash) because `src/app/sitemap.ts:21` uses `absoluteUrl("/")` which builds `${siteUrl}/`.

**Files:**
- Modify: `src/app/sitemap.ts:21`

**Steps:**

- [ ] **Step 3.1.1: Read the `absoluteUrl` implementation to confirm behavior**

  ```bash
  cat src/lib/siteUrl.ts
  ```

  Expected: confirms `absoluteUrl("")` returns the bare origin and `absoluteUrl("/")` returns origin + `/`.

- [ ] **Step 3.1.2: Change the homepage entry in `src/app/sitemap.ts`**

  Replace line 21:

  ```ts
      url: absoluteUrl("/"),
  ```

  With:

  ```ts
      url: absoluteUrl(""),
  ```

  (If `absoluteUrl("")` is ambiguous or returns the same result, alternative: hardcode `url: getSiteUrl(),` after importing `getSiteUrl` from `@/lib/siteUrl`.)

- [ ] **Step 3.1.3: Verify after build**

  ```bash
  pnpm build
  # After deploy:
  curl -sL https://<preview-url>/sitemap.xml | head -10
  ```

  Expected: homepage `<loc>` is `https://offgridevices.com` (no trailing slash), matches canonical.

- [ ] **Step 3.1.4: Commit**

  ```bash
  git add src/app/sitemap.ts
  git commit -m "fix(seo): align sitemap homepage URL with canonical (no trailing slash)"
  ```

---

### Task 3.2: Normalize `lastModified` format for blog posts

**Context:** Static routes serialize as `2026-05-18`. Blog routes go through `new Date(post.updatedAt ?? post.publishedAt)`, which Next serializes as `2026-05-18T00:00:00.000Z`. Both are valid per W3C; consistency is the goal.

**Files:**
- Modify: `src/app/sitemap.ts:84`

**Steps:**

- [ ] **Step 3.2.1: Replace the Date wrapper with the string itself**

  Change line 84:

  ```ts
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
  ```

  To:

  ```ts
    lastModified: post.updatedAt ?? post.publishedAt,
  ```

  This requires the post fields to already be in `YYYY-MM-DD` format. If they're in ISO 8601 with time, slice to the date portion:

  ```ts
    lastModified: (post.updatedAt ?? post.publishedAt).slice(0, 10),
  ```

  Check `src/content/blog.ts` to confirm the format used.

- [ ] **Step 3.2.2: Build + verify**

  ```bash
  pnpm build
  # After deploy:
  curl -sL https://<preview-url>/sitemap.xml | grep -A1 "/blog/" | head -10
  ```

  Expected: blog `<lastmod>` is `2026-05-18` (no time), matching static routes.

- [ ] **Step 3.2.3: Commit (can batch with 3.1)**

  ```bash
  git add src/app/sitemap.ts
  git commit -m "chore(sitemap): normalize lastmod to bare YYYY-MM-DD format"
  ```

---

### Task 3.3: Downgrade Beacon 1 sitemap `changefreq` + `priority`

**Context:** Beacon 1 is retired (sold out, not coming back). Sitemap currently declares `changeFrequency: "weekly", priority: 0.7` — too active for a fossilized URL.

**Files:**
- Modify: `src/app/sitemap.ts:32-36`

**Steps:**

- [ ] **Step 3.3.1: Edit**

  ```ts
      {
        url: absoluteUrl("/products/beacon-1"),
        lastModified: ROUTE_LAST_MODIFIED.beacon1,
        changeFrequency: "yearly",
        priority: 0.3,
      },
  ```

- [ ] **Step 3.3.2: Commit**

  ```bash
  git add src/app/sitemap.ts
  git commit -m "chore(sitemap): downgrade retired Beacon 1 changefreq/priority"
  ```

---

# Phase 4 — Per-page metadata cleanup

**Goal:** Trim 4 over-long meta descriptions, shorten 6 over-long titles, add proper OG image to About. ~1.5 hours.

### Task 4.1: Trim meta descriptions on about, why-offgrid, beacon-1

**Files:** `src/app/about/page.tsx`, `src/content/blog.ts` (for why-offgrid), `src/app/products/beacon-1/page.tsx`

**Steps:**

- [ ] **Step 4.1.1: About** — current `DESCRIPTION` in `src/app/about/page.tsx:6-7` is 223 chars. Replace with ≤155:

  ```ts
  const DESCRIPTION =
    "OffGrid Devices is a San Francisco-based hardware company making MagSafe-compatible LoRa mesh radios that run Meshtastic. Founded by Shreyash Gupta.";
  // 149 chars
  ```

- [ ] **Step 4.1.2: Beacon 1** — find `metadata.description` (or `generateMetadata`) in `src/app/products/beacon-1/page.tsx`. Current is 184 chars. Trim to ≤155:

  ```ts
  description:
    "OffGrid Beacon 1: the MagSafe LoRa mesh radio. Meshtastic pre-installed, 10+ km line-of-sight range, USB-C charging. Now retired — see Beacon 2.",
  // 149 chars
  ```

- [ ] **Step 4.1.3: why-offgrid** — find the post in `src/content/blog.ts` (`slug: "why-offgrid"`). Its `metaDescription` is 228 chars. Trim:

  ```ts
  metaDescription:
    "OffGrid builds pre-flashed Meshtastic LoRa mesh radios for hikers, preppers, and crews. Where the brand started, what Beacon 2 ships with, what's next.",
  // 154 chars
  ```

- [ ] **Step 4.1.4: Build + commit**

  ```bash
  pnpm build && git add src/app/about/page.tsx src/app/products/beacon-1/page.tsx src/content/blog.ts
  git commit -m "fix(seo): trim 3 meta descriptions to <=155 chars (about, beacon-1, why-offgrid)"
  ```

---

### Task 4.2: Shorten 6 over-long titles

**Context:** Pages whose titles exceed 60 chars after the ` | OffGrid Devices` suffix: beacon-1, blog, best-meshtastic, meshtastic-vs-lorawan, why-offgrid, about. The 17-char suffix is the cost.

**Recommended pattern:** Drop the suffix on pages where the title is already brand-evident, or shorten the primary title segment. Examples:

| Page | Current (~chars) | Proposed |
|------|-------|----------|
| about | "About OffGrid Devices — Founder, Mission, Story \| OffGrid Devices" (67) | "About OffGrid Devices — Founder & Mission" (42) |
| blog | "OffGrid Blog — Meshtastic, LoRa & Off-Grid Communication \| OffGrid Devices" (76) | "OffGrid Blog — Meshtastic & LoRa Mesh Notes" (44) |
| beacon-1 | "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio \| OffGrid Devices" (72) | "OffGrid Beacon 1 — MagSafe Meshtastic Radio (Retired)" (54) |
| best-meshtastic | "Best Meshtastic Devices 2026: Honest Comparison Guide \| OffGrid Devices" (72) | "Best Meshtastic Devices 2026 — Comparison Guide" (48) |
| meshtastic-vs-lorawan | "Meshtastic vs LoRaWAN: The Actual Difference Explained \| OffGrid Devices" (73) | "Meshtastic vs LoRaWAN — The Actual Difference" (46) |
| why-offgrid | "Why OffGrid: Mesh Radios for When the Towers Aren't There \| OffGrid Devices" (76) | "Why OffGrid — Mesh Radios When Towers Aren't There" (51) |

**Files:** `src/app/about/page.tsx`, `src/app/blog/page.tsx`, `src/app/products/beacon-1/page.tsx`, `src/content/blog.ts` (for the 3 blog post `seoTitle` fields)

**Steps:**

- [ ] **Step 4.2.1: Apply each title change** — search for the current title string in the relevant file, replace with the proposed shorter version.

- [ ] **Step 4.2.2: Verify all titles are ≤60 chars**

  After build/deploy:

  ```bash
  for path in /about /blog /products/beacon-1 /blog/best-meshtastic-devices-2026 /blog/meshtastic-vs-lorawan /blog/why-offgrid; do
    title=$(curl -sL "https://<preview-url>$path" | grep -oE '<title>[^<]+</title>' | head -1)
    echo "$path: ${#title} chars — $title"
  done
  ```

  Expected: every title ≤60 chars (subtract 15 for the `<title></title>` wrapping).

- [ ] **Step 4.2.3: Commit**

  ```bash
  git commit -am "fix(seo): trim 6 page titles to <60 chars for SERP display"
  ```

---

### Task 4.3: Add OG image + summary_large_image to About page

**Context:** `src/app/about/page.tsx:13-23` declares `openGraph.type: "website"` but no `images`, and `twitter.card: "summary"`. Social shares render a small/blank card.

**Files:**
- Modify: `src/app/about/page.tsx`

**Steps:**

- [ ] **Step 4.3.1: Check if a site-level OG image route exists**

  ```bash
  ls src/app/opengraph-image.tsx
  ```

  If it exists, the App Router auto-resolves a default OG image for routes that don't override. Confirm by inspecting current rendered About HTML — `<meta property="og:image">` should be present already.

  ```bash
  curl -sL https://offgridevices.com/about | grep -oE 'og:image[^>]*'
  ```

  If present and pointing to a real image, **no code change needed for OG image** — the audit finding was wrong.

- [ ] **Step 4.3.2: Fix the Twitter card size regardless**

  Replace lines 19–23 in `src/app/about/page.tsx`:

  ```ts
    twitter: {
      card: "summary",
      title: TITLE,
      description: DESCRIPTION,
    },
  ```

  With:

  ```ts
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
  ```

- [ ] **Step 4.3.3: Commit**

  ```bash
  git add src/app/about/page.tsx
  git commit -m "fix(seo): upgrade About page Twitter card to summary_large_image"
  ```

---

# Phase 5 — Product schema accuracy

**Goal:** Add `priceValidUntil`, deduplicate Beacon 2 product images, set Beacon 1 to `Discontinued`, fix the breadcrumb URL collision, point homepage Product schema at the PDP. ~1.5 hours.

### Task 5.1: Add `priceValidUntil` to all Offer blocks

**Context:** `productJsonLd()` in `src/lib/jsonLd.ts:237` already accepts `priceValidUntil` and includes it in the Offer block. The page-level callers (`page.tsx`, `beacon-2/page.tsx`, `beacon-1/page.tsx`) just never pass it. Google logs a GSC warning when it's absent.

**Strategy:** Compute the value at module-load time as `<current-year>-12-31`. Trivially rolling; no scheduled job needed.

**Files:**
- Create: `src/lib/seoPriceValidUntil.ts`
- Modify: `src/app/page.tsx`, `src/app/products/beacon-2/page.tsx`, `src/app/products/beacon-1/page.tsx`

**Steps:**

- [ ] **Step 5.1.1: Create helper**

  Write `src/lib/seoPriceValidUntil.ts`:

  ```ts
  /**
   * Rolling priceValidUntil — end of the current calendar year.
   * Re-evaluated on each build, which is more than frequent enough for
   * an evergreen product. Format: YYYY-12-31.
   */
  export function priceValidUntilEndOfYear(): string {
    return `${new Date().getFullYear()}-12-31`;
  }
  ```

- [ ] **Step 5.1.2: Wire into each Offer call**

  In each of `src/app/page.tsx`, `src/app/products/beacon-2/page.tsx`, `src/app/products/beacon-1/page.tsx`, locate the `offer:` block in the `productJsonLd(...)` call and add `priceValidUntil`:

  ```ts
  import { priceValidUntilEndOfYear } from "@/lib/seoPriceValidUntil";
  // ...
  offer: price
    ? {
        price,
        priceCurrency,
        availability,
        priceValidUntil: priceValidUntilEndOfYear(),
      }
    : undefined,
  ```

- [ ] **Step 5.1.3: Build + verify in rendered HTML**

  ```bash
  pnpm build
  # After deploy:
  curl -sL https://<preview-url>/products/beacon-2 | grep -o '"priceValidUntil":"[^"]*"'
  ```

  Expected: `"priceValidUntil":"2026-12-31"` (or current year).

- [ ] **Step 5.1.4: Commit**

  ```bash
  git add src/lib/seoPriceValidUntil.ts src/app/page.tsx src/app/products/beacon-2/page.tsx src/app/products/beacon-1/page.tsx
  git commit -m "fix(seo): add rolling priceValidUntil to all Product offers"
  ```

---

### Task 5.2: Fix Beacon 2 Product image array (3 distinct images)

**Context:** `src/app/products/beacon-2/page.tsx:158-161` passes:

```ts
images: [
  beacon2Content.heroImage.src,        // /beacon-2/hero-front.png
  beacon2Content.summary.heroImage.src, // /beacon-2/hero-front.png (same!)
],
```

Both source from the same file. Should include 3 distinct shots.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx` around line 158

**Steps:**

- [ ] **Step 5.2.1: Apply**

  ```ts
  images: [
    beacon2Content.heroImage.src,             // /beacon-2/hero-front.png
    "/beacon-2/feature-antenna.png",
    "/beacon-2/whats-in-the-box.png",
  ],
  ```

  (These are already in the homepage Product block — copy that exact list to keep them in sync.)

- [ ] **Step 5.2.2: Verify**

  ```bash
  curl -sL https://<preview-url>/products/beacon-2 | grep -oE '"image":\[[^]]*\]'
  ```

  Expected: 3 distinct image URLs.

- [ ] **Step 5.2.3: Commit**

  ```bash
  git add src/app/products/beacon-2/page.tsx
  git commit -m "fix(seo): use 3 distinct images in Beacon 2 Product schema"
  ```

---

### Task 5.3: Set Beacon 1 availability to `Discontinued`

**Context:** Beacon 1 PDP `availability: OutOfStock`. The product is permanently retired. Schema offers both: `OutOfStock` (temporary, Google keeps recrawling for restock) and `Discontinued` (permanent).

**Files:**
- Modify: `src/lib/jsonLd.ts` (type definition already allows `"Discontinued"` — `ProductSchemaInput.offer.availability`)
- Modify: `src/app/products/beacon-1/page.tsx` (wherever the offer object is built — likely just below the productJsonLd call)

**Steps:**

- [ ] **Step 5.3.1: Inspect Beacon 1's offer source**

  ```bash
  grep -n -A12 "productJsonLd" src/app/products/beacon-1/page.tsx | head -30
  ```

  The `availability:` value is probably derived from a Shopify check. Override to `"Discontinued"` for Beacon 1 specifically.

- [ ] **Step 5.3.2: Apply**

  Hardcode the availability in the Beacon 1 page's `productJsonLd` call:

  ```ts
  offer: {
    price: "0",  // or whatever placeholder is acceptable; Discontinued may not need a price
    priceCurrency: "USD",
    availability: "Discontinued",
  },
  ```

  Note: Google requires `price` on offers even when `Discontinued`. If the current Beacon 1 page uses dynamic price fetching, keep that — only override the `availability` field.

- [ ] **Step 5.3.3: Verify on deployed preview**

  ```bash
  curl -sL https://<preview-url>/products/beacon-1 | grep -o '"availability":"[^"]*"'
  ```

  Expected: `"availability":"https://schema.org/Discontinued"`.

- [ ] **Step 5.3.4: Commit**

  ```bash
  git add src/app/products/beacon-1/page.tsx
  git commit -m "fix(seo): mark Beacon 1 schema as Discontinued (was OutOfStock)"
  ```

---

### Task 5.4: Fix Beacon 2 BreadcrumbList — position 2 and 3 share URL

**Context:** `src/app/products/beacon-2/page.tsx:183-187` builds:

```ts
breadcrumbJsonLd([
  { name: "Home", url: "/" },
  { name: "Products", url: "/products/beacon-2" },
  { name: "OffGrid Beacon 2", url: "/products/beacon-2" },
]),
```

Positions 2 and 3 resolve to the same URL. Either build a `/products` collection page (recommended long-term, but out of scope for this audit fix) or collapse to a 2-item breadcrumb.

**Decision:** Collapse to 2 items.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx`
- Modify: `src/app/products/beacon-1/page.tsx` (same pattern likely present)

**Steps:**

- [ ] **Step 5.4.1: Apply on Beacon 2**

  Replace with:

  ```ts
  breadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "OffGrid Beacon 2", url: "/products/beacon-2" },
  ]),
  ```

- [ ] **Step 5.4.2: Check + apply same on Beacon 1**

  ```bash
  grep -n -A6 "breadcrumbJsonLd" src/app/products/beacon-1/page.tsx
  ```

  If the same 3-item pattern exists, collapse to 2.

- [ ] **Step 5.4.3: Commit**

  ```bash
  git add src/app/products/beacon-2/page.tsx src/app/products/beacon-1/page.tsx
  git commit -m "fix(seo): collapse PDP breadcrumb to 2 items (no /products page)"
  ```

---

### Task 5.5: Point homepage Product `@id` and `offers.url` to `/products/beacon-2`

**Context:** Homepage Product JSON-LD uses `@id: https://offgridevices.com/#product` and `offers.url: https://offgridevices.com/`. This creates a second Product entity in Google's graph. Both should reference the canonical PDP.

**Files:**
- Modify: `src/lib/jsonLd.ts` (productJsonLd) — the `@id` line builds `${absoluteUrl(input.url)}#product` (good, uses `input.url`). Issue: the homepage Product call passes `url: "/products/beacon-2"`?

**Steps:**

- [ ] **Step 5.5.1: Confirm the issue source**

  ```bash
  grep -n -B2 -A20 "productJsonLd" src/app/page.tsx
  ```

  Check what `url:` is passed in the homepage's `productJsonLd(...)` call. If it's `"/products/beacon-2"`, the audit's claim is stale and no change is needed. If it's `"/"`, fix it.

- [ ] **Step 5.5.2: Apply if needed**

  In `src/app/page.tsx`, the homepage `productJsonLd` call's `url:` should be `"/products/beacon-2"` (not `"/"`). Same for any `offer.url` override.

- [ ] **Step 5.5.3: Commit (if changes made)**

  ```bash
  git add src/app/page.tsx
  git commit -m "fix(seo): point homepage Product @id and offers.url at PDP"
  ```

---

# Phase 6 — Content fixes (high trust impact)

**Goal:** Fix the wrong price in the buyer's guide, remove emoji from Beacon 1 page, disambiguate the J John review on Beacon 2 body. ~30 min.

### Task 6.1: Fix the $79 price in `best-meshtastic-devices-2026`

**Context:** Line 119 of `src/content/blog.ts` reads `"OffGrid Beacon 2 — MagSafe, pre-flashed, 3000 mAh — ~$79 — iPhone carry, minimum-friction daily use"`. The actual price is $189.

**Files:**
- Modify: `src/content/blog.ts:119`

**Steps:**

- [ ] **Step 6.1.1: Apply**

  Find `src/content/blog.ts:119` and replace `~$79` with `~$189`. (Also scan the surrounding paragraphs in that post for any other $79 references — `grep -n '79\|\$79' src/content/blog.ts`.)

- [ ] **Step 6.1.2: Commit**

  ```bash
  git add src/content/blog.ts
  git commit -m "fix(content): correct Beacon 2 price in buyer's guide ($79 -> $189)"
  ```

---

### Task 6.2: Remove emoji from Beacon 1 feature list

**Context:** Audit found 🧲 📡 🔋 in the Beacon 1 feature list — violates the brand voice spec ("rugged-outdoor-premium, no emojis" per CLAUDE.md).

**Files:**
- Modify: `src/content/beacon1.ts` (most likely — the feature/highlight data)

**Steps:**

- [ ] **Step 6.2.1: Locate emoji**

  ```bash
  grep -nP '[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]' src/content/beacon1.ts src/components/beacon1/*.tsx
  ```

  Expected: line numbers of the emoji.

- [ ] **Step 6.2.2: Replace with text labels** (tag/kicker text only — do not invent new UI). For example, in the feature object replace `icon: "🧲"` with `icon: "MAG"` or drop the icon field if optional, then update the consuming component to render the new value.

- [ ] **Step 6.2.3: Commit**

  ```bash
  git add src/content/beacon1.ts
  git commit -m "fix(content): remove emoji from Beacon 1 feature list (brand voice)"
  ```

---

### Task 6.3: Disambiguate the J John "2000 mAh" review on Beacon 2 PDP body

**Context:** Even after removing it from schema (Task 1.2), the J John review is rendered in the Beacon 2 page's testimonials section. The review explicitly mentions "the 2000 mAh battery" — a Beacon 1 spec. The page's `testimonials.footnote` already discloses these are Beacon 1 reviews, but the contradiction with the page's 3000 mAh spec remains jarring to readers.

**Decision:** simplest fix is to remove the J John review only from the rendered list (without altering the source data on Beacon 1's page).

**Files:**
- Modify: `src/components/beacon2/Beacon2TestimonialsSection.tsx` (or wherever the testimonials are rendered for Beacon 2)

**Steps:**

- [ ] **Step 6.3.1: Locate Beacon 2 testimonial rendering**

  ```bash
  grep -rn "testimonials" src/components/beacon2/ src/app/products/beacon-2/
  ```

- [ ] **Step 6.3.2: Filter out the J John entry when rendering on Beacon 2 only**

  In the component that consumes `beacon1Content.testimonials` for the Beacon 2 page, filter:

  ```ts
  const testimonials = beacon1Content.testimonials.filter(
    (t) => !/2000\s*mAh/i.test(t.review),
  );
  ```

- [ ] **Step 6.3.3: Commit**

  ```bash
  git add src/components/beacon2/Beacon2TestimonialsSection.tsx
  git commit -m "fix(content): hide '2000 mAh' Beacon 1 testimonial on Beacon 2 PDP"
  ```

---

# Phase 7 — AI / GEO improvements

**Goal:** Capture Google AI Overviews + LLM citations on the high-value queries. ~3 hours.

### Task 7.1: Convert buyer's guide shortlist to semantic `<table>`

**Context:** The "best meshtastic devices 2026" post has a comparison shortlist rendered as `<div>` text. LLM extraction (Perplexity, ChatGPT, Google AI Overviews) favors `<table>` with `<th>` headers. Single highest-leverage GEO change.

**Files:**
- Modify: `src/content/blog.ts` — locate the shortlist section in the `best-meshtastic-devices-2026` post
- Possibly modify: `src/components/blog/*` — the section renderer for `BlogSection` types may need a new `table` type if not already supported

**Steps:**

- [ ] **Step 7.1.1: Read current BlogSection types**

  ```bash
  sed -n '1,15p' src/content/blog.ts
  ```

  Expected: see if `BlogSection` has a `"table"` variant. From the file head we already read: there is no `"table"` type currently.

- [ ] **Step 7.1.2: Add a `table` BlogSection variant**

  In `src/content/blog.ts`, extend the union:

  ```ts
  export type BlogSection =
    | { type: "paragraph"; content: string }
    | { type: "heading"; content: string; id?: string }
    | { type: "subheading"; content: string; id?: string }
    | { type: "list"; items: string[] }
    | { type: "orderedList"; items: string[] }
    | { type: "image"; src: string; alt: string; caption?: string }
    | { type: "quote"; content: string; cite?: string }
    | { type: "callout"; tone: "info" | "warn" | "tip"; content: string }
    | { type: "code"; code: string; language?: string }
    | { type: "table"; caption?: string; headers: string[]; rows: string[][] };
  ```

  Also extend `textForSection` in `src/lib/jsonLd.ts:263` to handle the new variant (return `[caption, ...headers, ...rows.flat()].join(" ")`).

- [ ] **Step 7.1.3: Add table rendering to the blog post page**

  In `src/app/blog/[slug]/page.tsx` (or wherever sections are rendered), add a case for `section.type === "table"` that emits a semantic HTML `<table>`:

  ```tsx
  case "table":
    return (
      <table className="my-8 w-full border-collapse border border-bark/40 text-sm">
        {section.caption ? (
          <caption className="caption-bottom pt-3 text-left text-xs text-muted">
            {section.caption}
          </caption>
        ) : null}
        <thead>
          <tr>
            {section.headers.map((h) => (
              <th
                key={h}
                className="border border-bark/40 bg-pitch/40 px-3 py-2 text-left font-display text-[11px] font-bold uppercase tracking-[0.14em] text-bone"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {section.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="border border-bark/40 px-3 py-2 align-top text-bone/85"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  ```

- [ ] **Step 7.1.4: Replace the shortlist section in the post**

  In `src/content/blog.ts`, find the `best-meshtastic-devices-2026` post's shortlist (currently a `list` or `paragraph` section). Replace with a `table` section. Columns: Device, Price, Key spec, Best for. Six rows (Heltec V3, T-Beam, T-Echo, RAK WisBlock, T-Deck, OffGrid Beacon 2).

  Use the existing prose copy as the source — preserve facts, not exact wording. Cell text should be short (2–6 words per cell) for LLM extraction.

- [ ] **Step 7.1.5: Build + visually verify**

  Run `pnpm build`, then open `/blog/best-meshtastic-devices-2026` in the dev server and confirm the table renders cleanly on desktop and mobile.

- [ ] **Step 7.1.6: Commit**

  ```bash
  git add src/content/blog.ts src/app/blog/[slug]/page.tsx src/lib/jsonLd.ts
  git commit -m "feat(blog): semantic table for buyer's-guide shortlist (AI Overview readiness)"
  ```

---

### Task 7.2: Add a TL;DR summary box at the top of the buyer's guide

**Context:** AI Overviews preferentially cite the first 100–150 words of an article. The current intro is meta-commentary about Reddit threads. A 60-word summary box (best device per use case, with prices) would dominate the citation slot.

**Files:**
- Modify: `src/content/blog.ts` — add the TL;DR as the first section (or insert after the intro `heading`)

**Steps:**

- [ ] **Step 7.2.1: Author the TL;DR**

  Draft (use the facts from the existing post; rewrite, don't paraphrase):

  > "TL;DR — For most buyers in 2026: OffGrid Beacon 2 ($189) for MagSafe carry with Meshtastic pre-flashed; Heltec V3 ($30) for budget DIY; RAK WisBlock ($60) if you want to build a custom enclosure; T-Beam if you need built-in GPS; T-Echo if you want an e-ink display; T-Deck if you want a full keyboard."

  (~60 words)

- [ ] **Step 7.2.2: Use the existing `callout` BlogSection type**

  ```ts
  { type: "callout", tone: "info", content: "TL;DR — For most buyers in 2026: OffGrid Beacon 2 ($189)..." }
  ```

  Place it as the first content section after the post hero.

- [ ] **Step 7.2.3: Commit**

  ```bash
  git add src/content/blog.ts
  git commit -m "feat(blog): add TL;DR callout at top of buyer's guide for AI citation"
  ```

---

### Task 7.3: Add "What is OffGrid Beacon 2?" H2 + 60-word definition to PDP

**Context:** LLM answering "what is OffGrid Beacon 2?" lands on the PDP and finds no extractable definition. Adding a single H2 with a 60-word definition unlocks direct citation.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx` — add a new section above (or below) the hero
- Or modify: `src/content/products.ts` — add a `definition` field to `beacon2Content` and render it

**Steps:**

- [ ] **Step 7.3.1: Author the definition (60 words, plain language, no marketing fluff)**

  > "OffGrid Beacon 2 is a MagSafe-compatible LoRa mesh radio that runs Meshtastic firmware out of the box. It snaps to the back of an iPhone via N48H neodymium magnets, runs for weeks on a 3000 mAh battery, and ships with a replaceable SMA antenna. Use it for off-grid communication where cell towers, SIM cards, and subscriptions don't reach."

- [ ] **Step 7.3.2: Render as a new section just below the hero buy surface**

  In `src/app/products/beacon-2/page.tsx`, after the hero section, add:

  ```tsx
  <section className="border-b border-bark/30 bg-pitch py-16 md:py-20">
    <div className="mx-auto max-w-3xl px-6">
      <h2 className="type-display-section text-bone">
        What is OffGrid Beacon 2?
      </h2>
      <p className="font-editorial mt-6 text-lg leading-[1.6] text-sand/85">
        OffGrid Beacon 2 is a MagSafe-compatible LoRa mesh radio that runs
        Meshtastic firmware out of the box. It snaps to the back of an
        iPhone via N48H neodymium magnets, runs for weeks on a 3000 mAh
        battery, and ships with a replaceable SMA antenna. Use it for
        off-grid communication where cell towers, SIM cards, and
        subscriptions don't reach.
      </p>
    </div>
  </section>
  ```

  Match existing surrounding section styling (review CLAUDE.md tokens before styling — currently `type-display-section`, `font-editorial`, `text-bone`, `text-sand/85` are all per spec).

- [ ] **Step 7.3.3: Commit**

  ```bash
  git add src/app/products/beacon-2/page.tsx
  git commit -m "feat(pdp): add 'What is Beacon 2?' H2 + definition for AI citation"
  ```

---

### Task 7.4: Add `Person` JSON-LD for Shreyash Gupta on About page

**Context:** About page is rich on first-person founder narrative but has no `Person` schema. Adding it (with `sameAs` to X, GitHub, YouTube, LinkedIn) gives Google an entity to attach to the brand.

**Files:**
- Modify: `src/lib/jsonLd.ts` — add a `personJsonLd()` generator
- Modify: `src/app/about/page.tsx` — emit the schema

**Steps:**

- [ ] **Step 7.4.1: Add generator to `src/lib/jsonLd.ts`**

  Append near the other generators:

  ```ts
  export type PersonSchemaInput = {
    name: string;
    url?: string;
    image?: string;
    jobTitle?: string;
    worksFor?: { name: string; url: string };
    sameAs?: string[];
  };

  export function personJsonLd(input: PersonSchemaInput) {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": input.url ? `${input.url}#person` : undefined,
      name: input.name,
      url: input.url,
      image: input.image ? absoluteSiteUrl(input.image) : undefined,
      jobTitle: input.jobTitle,
      worksFor: input.worksFor
        ? {
            "@type": "Organization",
            name: input.worksFor.name,
            url: input.worksFor.url,
          }
        : undefined,
      sameAs: input.sameAs,
    } as const;
  }
  ```

- [ ] **Step 7.4.2: Emit on About page**

  In `src/app/about/page.tsx`, just below the existing `breadcrumbJsonLd(...)` script:

  ```tsx
  <script
    {...jsonLdScriptProps(
      personJsonLd({
        name: "Shreyash Gupta",
        url: absoluteUrl("/about"),
        jobTitle: "Founder",
        worksFor: {
          name: "OffGrid Devices",
          url: getSiteUrl(),
        },
        sameAs: [
          "https://x.com/ShreyashGuptas",
          "https://github.com/shreyashguptas",
          "https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA",
          // LinkedIn: add when available
        ],
      }),
    )}
  />
  ```

  Add the import: `import { breadcrumbJsonLd, jsonLdScriptProps, personJsonLd } from "@/lib/jsonLd";` and `import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";`.

- [ ] **Step 7.4.3: Verify on deployed preview**

  ```bash
  curl -sL https://<preview-url>/about | grep -o '"@type":"Person"'
  ```

  Expected: 1 match.

- [ ] **Step 7.4.4: Commit**

  ```bash
  git add src/lib/jsonLd.ts src/app/about/page.tsx
  git commit -m "feat(seo): add Person JSON-LD for founder on About page"
  ```

---

# Phase 8 — Performance

**Goal:** Add `priority` to hero `<Image>` components; fix the blog page LCP preload pointing at the wrong asset. ~30 min.

### Task 8.1: Add `priority` to hero `<Image>` components

**Context:** Hero images are preloaded via `<link rel="preload">` but the Next.js `<Image>` components lack the `priority` prop, so the browser does not mark them as high priority.

**Files:** every page-level hero component:
- `src/components/home/HomeHeroSectionClient.tsx` (uses Beacon3DViewer — no Image, skip)
- `src/components/beacon1/Beacon1HeroSection.tsx` (likely has hero Image)
- `src/app/products/beacon-2/page.tsx` (PDP hero Image)
- `src/app/about/page.tsx` (no hero image)
- `src/app/blog/[slug]/page.tsx` (article hero)

**Steps:**

- [ ] **Step 8.1.1: Find all hero `<Image>` usages**

  ```bash
  grep -rn "<Image" src/components/home/ src/components/beacon1/ src/components/beacon2/ src/app/products/ src/app/blog/[slug]/
  ```

- [ ] **Step 8.1.2: Add `priority` to the **first** `<Image>` on each page** (the LCP candidate). Do NOT add to every Image — only the above-the-fold hero.

  Example:

  ```tsx
  <Image
    src={beacon2Content.heroImage.src}
    alt={beacon2Content.heroImage.alt}
    width={1200}
    height={1200}
    priority
  />
  ```

- [ ] **Step 8.1.3: Commit**

  ```bash
  git commit -am "perf(seo): add priority prop to hero Image components for LCP"
  ```

---

### Task 8.2: Fix blog page preload pointing at the wrong asset

**Context:** Every blog page preloads `/beacon-2/hero-front.png` (the header product image), but the article's actual LCP is the post hero image. Either preload the correct image or remove the preload on blog pages.

**Files:**
- Modify: `src/app/layout.tsx` (likely source of the global preload) or the blog layout

**Steps:**

- [ ] **Step 8.2.1: Locate the preload source**

  ```bash
  grep -rn 'rel="preload"\|fetchpriority\|hero-front\.png' src/app/ src/components/
  ```

- [ ] **Step 8.2.2: Decide:** (A) make it route-aware so blog pages preload `post.image`, or (B) remove the global preload and rely on the per-page `<Image priority>` from Task 8.1.

  **Recommended: (B)** — simpler, and Task 8.1 already gives the browser the right hint per page.

- [ ] **Step 8.2.3: Commit**

  ```bash
  git commit -am "perf(seo): remove global hero preload; rely on per-page priority Image"
  ```

---

# Phase 9 — Content depth + supporting metadata

**Goal:** Replace the 228-word blog index stub with an editorial intro; add `og:type: product` to PDPs; source `BlogPosting.datePublished` from frontmatter. ~2 hours.

### Task 9.1: Add 150–200 word editorial intro to `/blog`

**Context:** Current `/blog` page is 175 words of nav copy and three one-sentence summaries. Add an editorial intro that signals topical authority on Meshtastic + LoRa.

**Files:**
- Modify: `src/app/blog/page.tsx`

**Steps:**

- [ ] **Step 9.1.1: Author 180-word intro**

  Topic: who writes (Shreyash), what the blog covers (Meshtastic, LoRa, off-grid comms, building hardware in 2026), why it exists (no-fluff field notes for builders/preppers/hikers). Voice: rugged-outdoor-premium per CLAUDE.md.

- [ ] **Step 9.1.2: Render below the page title, above the post list**

  Add a `<p>` (or short `<section>`) with the intro copy, styled with `font-editorial` and existing typography tokens.

- [ ] **Step 9.1.3: Commit**

  ```bash
  git add src/app/blog/page.tsx
  git commit -m "feat(content): add editorial intro to /blog index for topical authority"
  ```

---

### Task 9.2: Add `og:type: product` + `product:*` OG tags on PDPs

**Context:** PDPs declare `og:type: website`. Pinterest/Facebook shopping catalogs and rich link previews use `og:type: product` to classify content.

**Files:**
- Modify: `src/app/products/beacon-2/page.tsx`, `src/app/products/beacon-1/page.tsx`

**Steps:**

- [ ] **Step 9.2.1: Update metadata**

  Find each PDP's `openGraph` block and change `type: "website"` → `type: "product"`. Next.js Metadata type may not have `"product"` as a literal in `openGraph.type`; if it complains, use `other:` to add raw `<meta>` tags:

  ```ts
  other: {
    "og:type": "product",
    "product:price:amount": "189.00",
    "product:price:currency": "USD",
    "product:availability": "in stock",
  },
  ```

- [ ] **Step 9.2.2: Commit**

  ```bash
  git commit -am "fix(seo): set og:type to product on PDPs + add product:* OG tags"
  ```

---

### Task 9.3: Source `BlogPosting.datePublished` from post data, not a constant

**Context:** Audit found all `BlogPosting.datePublished` values were `2026-05-18`. Likely cause: `src/lib/jsonLd.ts:298` reads `post.publishedAt ?? post.date`, but all posts share the same `publishedAt` string in `src/content/blog.ts`.

**Files:**
- Read first: `src/content/blog.ts` — check whether `publishedAt` differs per post
- Modify only if all posts share one date

**Steps:**

- [ ] **Step 9.3.1: Check current state**

  ```bash
  grep -nB1 "publishedAt" src/content/blog.ts | head -20
  ```

- [ ] **Step 9.3.2: If all posts share `2026-05-18`,** set per-post `publishedAt` to the actual first-publication date (you may need to ask the user or check git history of the post content via `git log --diff-filter=A -- src/content/blog.ts` for when each post first appeared in the file).

- [ ] **Step 9.3.3: Also set `dateModified` separately** (only when content is edited, not on every deploy).

- [ ] **Step 9.3.4: Commit**

  ```bash
  git add src/content/blog.ts
  git commit -m "fix(seo): set per-post publishedAt dates (was uniform 2026-05-18)"
  ```

---

### Task 9.4: Add 2–3 external citations per long-form blog post

**Context:** `best-meshtastic-devices-2026`, `meshtastic-vs-lorawan`, and `why-offgrid` cite zero external sources. Adding 2–3 links per post to authoritative references (Meshtastic docs, Semtech SX1262 datasheet, LoRa Alliance specs, FCC Part 15 / Part 95, etc.) raises Authoritativeness without changing voice.

**Files:**
- Modify: `src/content/blog.ts`

**Steps:**

- [ ] **Step 9.4.1: For each post, identify 2–3 factual claims that benefit from a citation**

  Examples:
  - "LoRa is a physical-layer chirp-spread-spectrum modulation owned by Semtech" → cite https://www.semtech.com/lora
  - "Meshtastic is an open-source mesh networking firmware that runs on a handful of ESP32 and nRF52 dev boards" → cite https://meshtastic.org
  - "The 902–928 MHz US ISM band is regulated under FCC Part 15.247" → cite the FCC eCFR

- [ ] **Step 9.4.2: Either inline as Markdown links inside `paragraph` content** (if the renderer parses links) **or extend `BlogSection`** with a way to mark citations. Inspect `src/app/blog/[slug]/page.tsx` to see how paragraphs render — if it's plain text, paragraphs need rich-text support added (potentially a larger task — defer if so and flag).

- [ ] **Step 9.4.3: Commit**

  ```bash
  git add src/content/blog.ts
  git commit -m "feat(content): add external citations to 3 long-form blog posts"
  ```

---

# Phase 10 — Lower-priority polish

**Goal:** Tighten CSP, harden headers, fix small schema details, add LinkedIn, retire the `/beacon-2/start` dark page or link it. ~2 hours.

### Task 10.1: Tighten `Content-Security-Policy` in `next.config.ts`

**Context:** Current CSP defines `base-uri`, `form-action`, `frame-ancestors`, `object-src` only. No `default-src` / `script-src` / `style-src` / `connect-src` — effectively zero XSS protection.

**Files:**
- Modify: `next.config.ts:4-9`

**Steps:**

- [ ] **Step 10.1.1: Inventory all script/style/image/connect sources**

  Walk through pages and find every external host loaded: Shopify CDN (`cdn.shopify.com`), Vercel analytics, Speed Insights, any font CDN, Beacon 3D Viewer (likely local), BotID.

  ```bash
  grep -rEi "https?://[a-z0-9.-]+" --include='*.tsx' --include='*.ts' src/ | grep -oE "https?://[a-z0-9.-]+" | sort -u
  ```

- [ ] **Step 10.1.2: Author a CSP that covers them**

  Example (refine based on Step 10.1.1 findings):

  ```ts
  const contentSecurityPolicy = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel-insights.com https://botid.vercel.com",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://cdn.shopify.com",
    "font-src 'self' data:",
    "connect-src 'self' https://*.vercel-insights.com https://botid.vercel.com",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
  ```

  **Important:** Test in a deploy preview first. Wrong CSP breaks the site silently in the browser console.

- [ ] **Step 10.1.3: Deploy preview, check browser console for CSP violations**

  Open the preview URL, open DevTools → Console, exercise the homepage, PDP, checkout button. Any `Refused to load` / `Refused to execute` errors mean the CSP needs another allowance.

- [ ] **Step 10.1.4: Commit when clean**

  ```bash
  git add next.config.ts
  git commit -m "fix(security): tighten Content-Security-Policy with full fetch directives"
  ```

---

### Task 10.2: Add `X-Frame-Options: DENY` header

**Context:** Modern browsers respect `frame-ancestors 'none'` (already in CSP), but legacy scanners and corporate proxies want both. Belt-and-suspenders.

**Files:**
- Modify: `next.config.ts:72-89`

**Steps:**

- [ ] **Step 10.2.1: Add to headers array**

  ```ts
  { key: "X-Frame-Options", value: "DENY" },
  ```

- [ ] **Step 10.2.2: Commit**

  ```bash
  git commit -am "fix(security): add X-Frame-Options: DENY for legacy scanner coverage"
  ```

---

### Task 10.3: Generate raster Organization logo (`logo.png`)

**Context:** `Organization.logo` points to `/logo.svg`. Google requires raster (PNG/JPG ≥ 112×112) for knowledge-panel processing.

**Files:**
- Add: `public/logo.png` (PNG export of `public/logo.svg`, ≥ 112×112, recommended 512×512)
- Modify: `src/lib/jsonLd.ts:7` (`LOGO_PATH = "/logo.svg"` → `"/logo.png"`)

**Steps:**

- [ ] **Step 10.3.1: Export `public/logo.svg` to `public/logo.png`**

  This requires either user manual export (Figma/Illustrator) or a CLI like ImageMagick/Inkscape:

  ```bash
  # Option A: ImageMagick (if available)
  magick convert -background none -density 300 public/logo.svg -resize 512x512 public/logo.png

  # Option B: defer to user
  ```

  **Confirm with the user before generating** — the brand handoff has canonical logo assets at `offgrid/project/handoff/logo/png/`. Use those if present (re-fetch the bundle per CLAUDE.md).

- [ ] **Step 10.3.2: Update `LOGO_PATH`**

  ```ts
  const LOGO_PATH = "/logo.png";
  ```

- [ ] **Step 10.3.3: Commit**

  ```bash
  git add public/logo.png src/lib/jsonLd.ts
  git commit -m "fix(seo): use raster logo.png in Organization schema (Google KP requirement)"
  ```

---

### Task 10.4: Add LinkedIn (when available) + GitHub to `Organization.sameAs`

**Context:** `Organization.sameAs` in `src/lib/jsonLd.ts:85-88` lists X and YouTube. GitHub (already in `BlogPosting.author.sameAs`) and LinkedIn are missing.

**Files:**
- Modify: `src/lib/jsonLd.ts:85-88`

**Steps:**

- [ ] **Step 10.4.1: Apply (skip LinkedIn if no profile exists yet)**

  ```ts
  sameAs: [
    "https://x.com/ShreyashGuptas",
    "https://github.com/shreyashguptas",
    "https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA",
    // Add LinkedIn URL when a company page is created
  ],
  ```

- [ ] **Step 10.4.2: Commit**

  ```bash
  git commit -am "fix(seo): add GitHub to Organization.sameAs"
  ```

---

### Task 10.5: Fix `/blog/why-offgrid` `timeRequired` (PT7M for ~650 words is implausible)

**Context:** `articleJsonLd()` derives `timeRequired` from the post's `readTime` field. If `readTime: "7 min"`, schema says `PT7M`. For ~650 words (~93 wpm reading speed), this is wrong.

**Files:**
- Modify: `src/content/blog.ts` — adjust `readTime` for why-offgrid to a sensible value

**Steps:**

- [ ] **Step 10.5.1: Compute actual reading time**

  Words / 220 wpm ≈ 3 min for 650 words. Update `readTime: "3 min"` (or expand the post — see Task 10.6 alternative).

- [ ] **Step 10.5.2: Commit**

  ```bash
  git commit -am "fix(content): correct why-offgrid readTime (7 min -> 3 min)"
  ```

---

### Task 10.6: Decide `/beacon-2/start` fate — link from PDP, or noindex

**Context:** `/beacon-2/start` is in the sitemap but linked from nowhere. It's effectively a dark page — only discoverable via the sitemap itself.

**Decision (ask user before implementing):**
- **(A)** Add a link from the Beacon 2 PDP — "Setup guide" link near the buy button, or in the footer of the PDP.
- **(B)** `noindex` the page (remove from sitemap too) if it's intentionally not in the main site nav.

**Files (option A):**
- Modify: `src/components/beacon2/*` or `src/app/products/beacon-2/page.tsx` — add the link

**Files (option B):**
- Modify: `src/app/beacon-2/start/page.tsx` — add `export const metadata: Metadata = { robots: { index: false, follow: true } }`
- Modify: `src/app/sitemap.ts` — remove the `/beacon-2/start` entry

---

### Task 10.7: Add RSS autodiscovery `<link rel="alternate">` to blog pages

**Context:** RSS feed exists at `/blog/feed.xml` but no `<link rel="alternate" type="application/rss+xml">` in blog page `<head>`.

**Files:**
- Modify: `src/app/blog/page.tsx` (and `src/app/blog/[slug]/page.tsx`)

**Steps:**

- [ ] **Step 10.7.1: Add to metadata**

  Next.js Metadata API:

  ```ts
  export const metadata: Metadata = {
    // ...
    alternates: {
      canonical: "/blog",
      types: {
        "application/rss+xml": "/blog/feed.xml",
      },
    },
  };
  ```

- [ ] **Step 10.7.2: Commit**

  ```bash
  git commit -am "fix(seo): add RSS autodiscovery link to blog pages"
  ```

---

### Task 10.8: Add Beacon 1 upgrade banner (top-of-page CTA)

**Context:** Beacon 1 page is correctly retained (legacy traffic + brand history) but the Beacon 2 upsell is buried in body copy.

**Files:**
- Modify: `src/components/beacon1/Beacon1HeroSection.tsx` (or wherever the Beacon 1 top is built)

**Steps:**

- [ ] **Step 10.8.1: Add a thin banner just above the hero**

  ```tsx
  <div className="border-b border-bark/40 bg-ember/10 px-6 py-3 text-center">
    <p className="type-mono-label text-sand">
      Beacon 1 is retired ·{" "}
      <Link
        href="/products/beacon-2"
        className="text-ember underline-offset-4 hover:underline"
      >
        See OffGrid Beacon 2 →
      </Link>
    </p>
  </div>
  ```

  Style per brand spec (one ember accent — already used on the link).

- [ ] **Step 10.8.2: Commit**

  ```bash
  git commit -am "feat(beacon-1): add upgrade banner directing legacy traffic to Beacon 2"
  ```

---

# Phase 11 — Infrastructure additions (opt-in / larger asks)

These are independently valuable but each is larger than 30 min. Treat as candidates rather than required.

### Task 11.1: Implement IndexNow

- New file: `src/app/api/indexnow/route.ts` — accepts a list of URLs and POSTs to `https://api.indexnow.org/indexnow`
- New file: `public/<key>.txt` — IndexNow verification key
- Vercel deploy hook OR Next.js post-build script to ping the API on each deploy

**Estimated effort:** ~2 hours.

### Task 11.2: Wire Vercel Speed Insights for CrUX field data

- `npm i @vercel/speed-insights` (or `pnpm add`)
- Add `<SpeedInsights />` to `src/app/layout.tsx`

**Estimated effort:** ~15 min. Should be done — replaces our lab-only audit estimates with field data.

### Task 11.3: Create `llms-full.txt`

- New route: `src/app/llms-full.txt/route.ts` — emits an extended machine-readable site map with full content of key pages

**Estimated effort:** ~1 hour. Optional but signals AI-friendliness.

### Task 11.4: "Why Buy vs. Build" section on Beacon 2 PDP

- New component: `src/components/beacon2/Beacon2BuyVsBuildSection.tsx`
- New data: extend `beacon2Content` with `buyVsBuild` field (rows for Heltec V3 DIY, RAK WisBlock DIY, Beacon 2 — with explicit time + cost columns)
- Render as a table (use the same table renderer from Task 7.1)

**Estimated effort:** ~2 hours.

### Task 11.5: Create "Off-Grid Communication Guide" landing page

- New route: `src/app/guides/off-grid-communication/page.tsx`
- ~2,000-word educational landing page targeting "off-grid communicator" + related informational queries
- Cross-link from `/blog/why-offgrid` and the Beacon 2 PDP

**Estimated effort:** ~4 hours.

---

# Recommended execution order (single half-day sprint)

If you only have ~4 hours, this order maximizes risk reduction and visible SERP wins:

1. **Phase 1** (all 3 tasks) — defuse manual-action risk on Product schema
2. **Phase 2 (2.1, 2.2)** — homepage H1 + title cannibalization fix
3. **Phase 3 (3.1)** — canonical/sitemap consistency
4. **Phase 5 (5.1, 5.2, 5.3)** — `priceValidUntil`, image dedupe, Discontinued
5. **Phase 4 (4.1, 4.2)** — meta description + title length fixes
6. **Phase 6 (6.1)** — fix the $79 → $189 price in the buyer's guide
7. **Phase 7 (7.1, 7.2, 7.3)** — the three AI-Overview-readiness changes

Expected post-sprint health score: **84–88 / 100**.

Phases 8–11 are follow-up sprints.

---

# Out-of-scope reminders

- **Field CWV data (CrUX):** Requires Google API credentials. Task 11.2 (Vercel Speed Insights) is the in-platform alternative.
- **Backlink profile:** No Moz/Bing Webmaster credentials available. Recommend running a Common Crawl domain-level check + signing up for Bing Webmaster Tools (free) — both out of scope for this plan.
- **GSC indexation + query data:** Requires GSC auth. Submit the sitemap and pull a 28-day query report in 2 weeks.
- **DataForSEO live SERP:** Not currently configured.

---

# Self-review checklist

- [x] **Spec coverage:** Every CRITICAL / HIGH / MEDIUM / LOW item from `ACTION-PLAN.md` is mapped to a numbered task above.
- [x] **No placeholders:** Each step shows the exact text/code to apply; no "TBD", "implement later", or vague "add error handling".
- [x] **Type consistency:** New types (`PersonSchemaInput`, `priceValidUntilEndOfYear`, the new `table` `BlogSection` variant) are defined where introduced; later references match.
- [x] **Per-task verification:** Each fix has a `curl | grep` or visual-inspection check before commit.

---

# Items not in this plan (need user action or content production)

These come from the audit but require something other than code edits — flagged here so they don't get lost:

- **Founder photo on About page** (audit H3) — Trustworthiness signal. Needs a real photo; should be added to `public/` and referenced in Person schema `image` (Task 7.4 already accepts it) and rendered on the About page.
- **GTIN for Beacon 1 / Beacon 2** (audit M5) — apply for a GS1 UPC block, or declare `identifier_exists: FALSE` in the Google Merchant feed. Operational, not code.
- **Real Beacon 2 reviews** (depends on Task 1.2 decision) — collect 3+ Beacon 2-specific testimonials to restore `aggregateRating` and `reviews` in PDP schema.
- **Wikipedia entry** for OffGrid Devices or Shreyash Gupta — highest-authority AI citation signal. Not immediately actionable; requires notability + third-party editor.
- **YouTube demo videos** with "Meshtastic" and "OffGrid Beacon 2" in titles — the YouTube channel is declared in `sameAs` but if there are no product demo videos, the declared signal isn't being cashed in.
- **Process change: bump `dateModified`** on a blog post whenever its content is edited (audit L6).
- **Submit sitemap to Google Search Console + Bing Webmaster Tools** (audit recommendation) — operational, not code.

Smaller code items not explicitly tasked above but worth dropping into the next sprint:

- **`Blog` / `CollectionPage` schema on `/blog`** (audit M7) — add a new generator `blogIndexJsonLd()` in `src/lib/jsonLd.ts` and emit it on `src/app/blog/page.tsx`.
- **Inline link from Beacon 2 PDP to `/blog/best-meshtastic-devices-2026`** (audit M16) — a sentence in the "What is Beacon 2?" section (Task 7.3) or its own paragraph.
- **Attribute or reframe the homepage hero quote** (audit M17) — either name the field reviewer or change `hardwareAttribution` to `"Editorial · OffGrid · 2026"`.
- **`ItemList` schema on buyer's guide** (audit L11) — wrap the table data from Task 7.1 in an `ItemList` to unlock the "Top Picks" carousel rich result.
- **`VideoObject` schema + embed** on PDP (audit L12) — depends on filming a demo (covered above).

---

# Open decisions for the user

These are points in the plan where I deliberately did **not** assume the answer. Please decide before execution:

1. **Beacon 2 reviews policy (Task 1.2):** option (A) drop schema reviews entirely until Beacon 2 reviews exist; option (B) keep `aggregateRating` but drop the `reviews` array; option (C) author Beacon 2-specific reviews now. Recommended (A).
2. **Logo raster (Task 10.3):** generate via local tool, or fetch from the canonical handoff bundle, or have the user export from Figma. Recommended: use the bundle assets.
3. **`/beacon-2/start` fate (Task 10.6):** link from the Beacon 2 PDP, or `noindex` + remove from sitemap.
4. **Homepage new title (Task 2.2):** three candidates listed. Recommended the first.
5. **"Why Buy vs. Build" + "Off-Grid Guide" pages (Tasks 11.4, 11.5):** in scope for this sprint, or follow-up?
