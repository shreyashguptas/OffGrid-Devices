import type { Metadata } from "next";
import { Beacon2CallToAction } from "@/components/beacon2/Beacon2CallToAction";
import { Beacon2TestimonialsSection } from "@/components/beacon2/Beacon2TestimonialsSection";
import { Faq } from "@/components/Faq";
import { HomeFeatureShowcaseSection } from "@/components/home/HomeFeatureShowcaseSection";
import { HomeHardwareSection } from "@/components/home/HomeHardwareSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProductDetailsSection } from "@/components/home/HomeProductDetailsSection";
import { HomeSpecsSection } from "@/components/home/HomeSpecsSection";
import { beacon2Content } from "@/content/products";
import {
  breadcrumbJsonLd,
  jsonLdScriptProps,
  productJsonLd,
} from "@/lib/jsonLd";
import { loadProductForPage } from "@/lib/loadProductForPage";
import { priceValidUntilEndOfYear } from "@/lib/seoPriceValidUntil";
import { getBeacon2ProductWithCache } from "@/lib/shopify";

/**
 * Beacon 2 product page — the single, definitive Beacon 2 surface.
 *
 * This page now carries the full marketing story (3D model hero, the zoom
 * collage, the feature showcase, the editorial quote, the spec sheet, and
 * testimonials) merged with the commercial buy elements (live Shopify price +
 * checkout in the hero, FAQ, and a closing CTA). The company home (`/`) is an
 * Organization/lineup landing page and links here for both "Learn More" and
 * "Buy" — so the entire Beacon 2 narrative lives at one canonical URL.
 *
 * SEO/commerce roles this page owns:
 *   1. The canonical Product entity Google indexes (sole Product JSON-LD on the
 *      site — the home no longer emits one).
 *   2. A Google Merchant Center / Shopping destination URL with a real Product
 *      JSON-LD block (price, availability, MPN, etc.).
 *   3. The full spec sheet + focused FAQ for "buy / spec sheet" search intent.
 *
 * Architecture: Server Component. Shopify price + availability are fetched at
 * request time via the cached `getBeacon2ProductWithCache()` helper and baked
 * into both the JSON-LD Offer and the hero's checkout button label before HTML
 * ships, so Googlebot's single-pass render sees the real price. The 3D hero's
 * `Beacon2CheckoutButton` and the closing CTA are Client Components (cart
 * creation is interactive); everything SEO-critical is server-rendered. The
 * hero `<section>` carries `id="buy"` so `/products/beacon-2#buy` lands on it.
 */

const TITLE = "Buy OffGrid Beacon 2 — MagSafe LoRa Mesh Radio";
const DESCRIPTION =
  "Buy OffGrid Beacon 2: pre-flashed Meshtastic mesh radio with a 3000 mAh battery, replaceable SMA antenna, and N48H MagSafe magnets. Ships free from the US.";

export const metadata: Metadata = {
  // `title.absolute` skips the global ` | OffGrid Devices` template so the
  // rendered <title> (47 chars) stays under the ~60-char SERP truncation
  // limit. The PDP owns the commercial "MagSafe LoRa Mesh Radio" phrase
  // cleanly now that the homepage is a brand-statement landing page.
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
            // Three distinct images for Google Shopping image carousels.
            images: [
              beacon2Content.heroImage.src,
              "/beacon-2/feature-antenna.jpg",
              "/beacon-2/whats-in-the-box.jpg",
            ],
            // aggregateRating + reviews removed until Beacon-2-specific
            // testimonials exist (legacy reviews describe Beacon 1).
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

      {/* 3D hero — leads the page; holds the live-price checkout button.
          Carries id="buy" so /products/beacon-2#buy scrolls here. */}
      <HomeHeroSection product={product} />

      {/* I · The Object — zoom collage */}
      <HomeProductDetailsSection />

      {/* II · The Field — feature showcase tabs */}
      <HomeFeatureShowcaseSection />

      {/* Definitional passage — gives LLM search (Google AI Overviews,
          Perplexity, ChatGPT) a 60-word answerable block for queries like
          "what is OffGrid Beacon 2?". H2 + short paragraph is the format
          AI extractors favor. */}
      <section className="border-b border-bark/30 bg-pitch-deep py-16 md:py-20">
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

      {/* Editorial quote interlude */}
      <HomeHardwareSection />

      {/* III · The Numbers — full spec sheet */}
      <HomeSpecsSection />

      <Beacon2TestimonialsSection />

      {/* FAQ — Beacon-2-specific */}
      <Faq
        items={PRODUCT_FAQS}
        eyebrow="FAQ"
        title="Common questions about Beacon 2"
        description="Answers to the questions we hear most often before customers commit to Beacon 2."
      />

      <Beacon2CallToAction
        eyebrow={beacon2Content.home.cta.eyebrow}
        title={beacon2Content.home.cta.title}
        description={beacon2Content.home.cta.description}
        secondaryHref={beacon2Content.home.cta.secondaryHref}
        secondaryLabel={beacon2Content.home.cta.secondaryLabel}
      />
    </>
  );
}
