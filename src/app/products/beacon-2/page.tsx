import type { Metadata } from "next";
import Image from "next/image";
import { Beacon2CheckoutButton } from "@/components/Beacon2CheckoutButton";
import { Beacon2TestimonialsSection } from "@/components/beacon2/Beacon2TestimonialsSection";
import { Faq } from "@/components/Faq";
import { beacon2Content } from "@/content/products";
import {
  breadcrumbJsonLd,
  jsonLdScriptProps,
  productJsonLd,
} from "@/lib/jsonLd";
import { loadProductForPage } from "@/lib/loadProductForPage";
import { formatPrice } from "@/lib/price";
import { priceValidUntilEndOfYear } from "@/lib/seoPriceValidUntil";
import { getBeacon2ProductWithCache } from "@/lib/shopify";

/**
 * Beacon 2 product page — lean "buy here" surface.
 *
 * The marketing story for Beacon 2 lives on the homepage (`/`). This PDP is
 * intentionally compact: it exists so that
 *   1. The product has a canonical URL Google can index as a Product entity
 *      (rather than the homepage, which is correctly an Organization/WebSite)
 *   2. Google Merchant Center / Shopping has a feedable destination URL with
 *      a real Product JSON-LD block including price, availability, MPN,
 *      return policy, and shipping details
 *   3. Visitors who land from an SEO query like "buy OffGrid Beacon 2" or
 *      "Beacon 2 spec sheet" get straight to a purchase with full specs
 *      and a focused FAQ, without scrolling past the home marketing copy
 *
 * Architecture: pure Server Component. Shopify price + availability are
 * fetched at request time via the cached `getBeacon2ProductWithCache()`
 * helper, baked into both the visible price tag and the JSON-LD Offer
 * before HTML ships. This means Googlebot's single-pass render sees the
 * real price in the initial HTML — no client-side "Loading live price"
 * placeholder, no missing `offers.price` field in structured data.
 *
 * The `Beacon2CheckoutButton` remains a Client Component because cart
 * creation is necessarily interactive (POST to checkout endpoint, redirect
 * to Shopify-hosted checkout). That's fine — the SEO-critical content
 * (price, availability, FAQ, schema) is all server-rendered.
 */

const TITLE = "Buy OffGrid Beacon 2 — MagSafe LoRa Mesh Radio";
const DESCRIPTION =
  "Buy OffGrid Beacon 2: pre-flashed Meshtastic mesh radio with a 3000 mAh battery, replaceable SMA antenna, and N48H MagSafe magnets. Ships free from the US.";

export const metadata: Metadata = {
  // `title.absolute` skips the global ` | OffGrid Devices` template so the
  // rendered <title> (47 chars) stays under the ~60-char SERP truncation
  // limit. The PDP owns the commercial "MagSafe LoRa Mesh Radio" phrase
  // cleanly now that the homepage has been moved to a brand-statement title.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "OffGrid Beacon 2",
    "MagSafe LoRa radio",
    "Meshtastic pre-flashed",
    "buy Meshtastic device",
    "MagSafe Meshtastic",
    "LoRa mesh radio US",
    "RAK4630",
    "off-grid communication device",
    "emergency communication",
    "MeshCore radio",
  ],
  alternates: { canonical: "/products/beacon-2" },
  openGraph: {
    type: "website",
    url: "/products/beacon-2",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: beacon2Content.heroImage.src,
        width: 1536,
        height: 1024,
        alt: beacon2Content.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [beacon2Content.heroImage.src],
  },
};

const PRODUCT_FAQS = [
  {
    question: "What's in the box with OffGrid Beacon 2?",
    answer:
      "Beacon 2 ships with the radio (Meshtastic pre-flashed), a replaceable SMA antenna, a belt clip, a USB-C charging cable, an emergency whistle, and display-stand packaging that doubles as a desk kickstand.",
  },
  {
    question: "How is Beacon 2 different from Beacon 1?",
    answer:
      "Beacon 2 adds a larger 3000 mAh battery (multi-week standby), N48H magnets that grip and hold (the slipping issue from Beacon 1 is solved), a replaceable external SMA antenna with an on/off switch, sun-tolerant filament, a charge-light cutout, a reset button, a belt clip, and an emergency whistle.",
  },
  {
    question: "Is Meshtastic already installed?",
    answer:
      "Yes. Beacon 2 ships with current Meshtastic firmware pre-flashed and the US region pre-configured. Pair with the Meshtastic app over Bluetooth 5.0 and you are on the mesh in under ten minutes.",
  },
  {
    question: "What is the range of Beacon 2?",
    answer:
      "Up to 10+ km line of sight on LoRa at 902–928 MHz with the stock antenna. Real-world range in forests, cities, or hills is shorter, but Meshtastic's mesh routing extends coverage as more nodes join your network. A higher-gain antenna (SMA, screw-on) extends range further when stationary.",
  },
  {
    question: "Does Beacon 2 work with iPhone and Android?",
    answer:
      "Yes. Beacon 2 attaches magnetically to MagSafe iPhones and the most popular MagSafe cases. Android phones work with a MagSafe-compatible case or adapter ring. Pairing is via the official Meshtastic app over Bluetooth 5.0.",
  },
  {
    question: "Do I need a license?",
    answer:
      "No. Beacon 2 operates on the unlicensed 915 MHz ISM band in the United States when the correct Meshtastic region is selected (set at the factory). No ham or GMRS license is required.",
  },
  {
    question: "Can I run MeshCore instead of Meshtastic?",
    answer:
      "Yes. The underlying RAK4630 hardware (nRF52840 + SX1262) supports both Meshtastic and MeshCore firmware, so you can run the workflow you already prefer.",
  },
  {
    question: "How long does shipping take?",
    answer:
      "OffGrid Beacon 2 ships free from the United States with a 1–3 day handling window and 2–7 day USPS or UPS transit. International shipping is not currently offered.",
  },
];

export default async function Beacon2Product() {
  const product = await loadProductForPage(
    "Beacon 2 product for product page",
    getBeacon2ProductWithCache,
  );
  const price = product?.variant?.price?.amount;
  const priceCurrency = product?.variant?.price?.currencyCode ?? "USD";
  const availability =
    product?.availableForSale && product.variant?.availableForSale
      ? "InStock"
      : "OutOfStock";
  const priceLabel = price
    ? formatPrice({ amount: price, currencyCode: priceCurrency })
    : null;

  return (
    <>
      <script
        {...jsonLdScriptProps(
          productJsonLd({
            slot: "beacon-2",
            brandedName: beacon2Content.brandedName,
            shortName: beacon2Content.name,
            description: beacon2Content.description,
            sku: "OFFGRID-BEACON-2",
            mpn: "OGD-BCN-2-US",
            category: "Radios > LoRa Mesh Radios",
            url: "/products/beacon-2",
            // Three distinct images for Google Shopping image carousels —
            // the previous array listed `hero-front.png` twice.
            images: [
              beacon2Content.heroImage.src,
              "/beacon-2/feature-antenna.jpg",
              "/beacon-2/whats-in-the-box.jpg",
            ],
            // aggregateRating + reviews removed until Beacon-2-specific
            // testimonials exist. See homepage Product schema for rationale.
            offer: price
              ? {
                  price,
                  priceCurrency,
                  availability,
                  priceValidUntil: priceValidUntilEndOfYear(),
                }
              : undefined,
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(
          // Collapsed to 2 items because no /products collection page exists
          // — positions 2 ("Products") and 3 ("OffGrid Beacon 2") would
          // resolve to the same URL otherwise.
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "OffGrid Beacon 2", url: "/products/beacon-2" },
          ]),
        )}
      />
      {/* FAQPage JSON-LD is emitted by the <Faq> component itself, not
          duplicated here. */}

      {/* Hero — focused buy surface */}
      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 md:grid-cols-2 md:items-center md:gap-16">
          <div className="order-2 md:order-1">
            <p className="type-mono-label text-ember">
              OFFGRID · BEACON 2 · BUY
            </p>
            <h1 className="type-display-section mt-4 text-bone">
              {beacon2Content.brandedName}
            </h1>
            <p className="font-editorial mt-6 max-w-xl text-lg leading-[1.55] text-sand/85 md:text-xl">
              {beacon2Content.description}
            </p>

            <div className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              {priceLabel ? (
                <>
                  <span className="font-display text-4xl font-bold tracking-tight text-bone md:text-5xl">
                    {priceLabel}
                  </span>
                  <span className="type-mono-label text-sand/75">
                    {availability === "InStock"
                      ? "IN STOCK · SHIPS FREE FROM USA"
                      : "SOLD OUT"}
                  </span>
                </>
              ) : (
                <span className="type-mono-label text-sand/75">
                  PRICING TEMPORARILY UNAVAILABLE
                </span>
              )}
            </div>

            <div className="mt-8">
              <Beacon2CheckoutButton
                className="inline-flex items-center justify-center bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors hover:bg-ember/90 disabled:cursor-not-allowed disabled:opacity-60"
                defaultLabel={beacon2Content.summary.buyLabel}
                loadingLabel={beacon2Content.summary.loadingLabel}
                surface="product-page"
              />
            </div>

            <ul className="type-mono-label mt-8 grid grid-cols-2 gap-3 text-sand/85">
              <li>NO TOWERS</li>
              <li>NO SIMS</li>
              <li>NO SUBSCRIPTIONS</li>
              <li>MESHTASTIC PRE-FLASHED</li>
            </ul>
          </div>

          <div className="order-1 md:order-2">
            <div className="bg-pitch-deep p-6 md:p-8">
              <Image
                src={beacon2Content.heroImage.src}
                alt={beacon2Content.heroImage.alt}
                width={1024}
                height={1024}
                priority
                sizes="(min-width: 768px) 50vw, 90vw"
                className="h-auto w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Definitional passage — gives LLM search (Google AI Overviews,
          Perplexity, ChatGPT) a 60-word answerable block for queries like
          "what is OffGrid Beacon 2?". H2 + short paragraph is the format
          AI extractors favor. */}
      <section className="border-b border-bark/30 bg-pitch py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="type-mono-label text-ember">WHAT IS BEACON 2?</p>
          <h2 className="type-display-section mt-4 text-bone">
            What is OffGrid Beacon 2?
          </h2>
          <p className="font-editorial mt-6 text-lg leading-[1.65] text-sand/85 md:text-xl">
            OffGrid Beacon 2 is a MagSafe-compatible LoRa mesh radio that
            runs Meshtastic firmware out of the box. It snaps to the back
            of an iPhone via N48H neodymium magnets, runs for weeks on a
            3000 mAh battery, and ships with a replaceable SMA antenna.
            Use it for off-grid communication where cell towers, SIM cards,
            and subscriptions don&rsquo;t reach &mdash; hiking, events,
            backcountry, emergency backup.
          </p>
        </div>
      </section>

      {/* Spec table — compact, complete */}
      <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="type-mono-label text-ember">SPEC SHEET · BEACON 2</p>
          <h2 className="type-display-section mt-4 text-bone">
            Every spec, no fine print.
          </h2>
          <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.55] text-sand/80">
            Every component in Beacon 2 is chosen for range, reliability, and
            everyday carry. The experience stays simple; the hardware does not.
          </p>

          <dl className="mt-12 grid gap-x-12 gap-y-5 border-t border-bark/40 pt-8 md:grid-cols-2">
            {beacon2Content.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-1 gap-1 border-b border-bark/30 pb-4 sm:grid-cols-[120px_1fr] sm:items-baseline sm:gap-4"
              >
                <dt className="type-mono-label text-sand/65">{spec.label}</dt>
                <dd className="font-editorial text-base leading-snug text-bone">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Beacon2TestimonialsSection />

      {/* FAQ — Beacon-2-specific */}
      <Faq
        items={PRODUCT_FAQS}
        eyebrow="FAQ"
        title="Common questions about Beacon 2"
        description="Answers to the questions we hear most often before customers commit to Beacon 2."
      />
    </>
  );
}
