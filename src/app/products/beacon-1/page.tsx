import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Beacon1CallToAction } from "@/components/beacon1/Beacon1CallToAction";
import { Beacon1FeaturesSection } from "@/components/beacon1/Beacon1FeaturesSection";
import { Beacon1GallerySection } from "@/components/beacon1/Beacon1GallerySection";
import { Beacon1HeroSection } from "@/components/beacon1/Beacon1HeroSection";
import { Beacon1SpecsSection } from "@/components/beacon1/Beacon1SpecsSection";
import { Beacon1TestimonialsGridSection } from "@/components/beacon1/Beacon1TestimonialsGridSection";
import { beacon1Content } from "@/content/beacon1";
import {
  breadcrumbJsonLd,
  faqJsonLd,
  jsonLdScriptProps,
  productJsonLd,
} from "@/lib/jsonLd";
import { getBeacon1ProductWithCache } from "@/lib/shopify";

export const metadata: Metadata = {
  title: "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio",
  description:
    "OffGrid Beacon 1: the MagSafe-compatible LoRa mesh radio. Meshtastic pre-installed, up to 10+ km line-of-sight range, USB-C charging, and a transparent shell. Ships ready for the mesh.",
  keywords: [
    "OffGrid Beacon 1",
    "MagSafe Meshtastic",
    "LoRa mesh radio",
    "Meshtastic device",
    "pre-configured Meshtastic",
    "RAK WisBlock radio",
    "off-grid communication",
    "MagSafe LoRa",
    "Meshtastic for iPhone",
    "MeshCore radio",
  ],
  alternates: { canonical: "/products/beacon-1" },
  openGraph: {
    type: "website",
    url: "/products/beacon-1",
    title: "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio",
    description:
      "MagSafe-compatible LoRa mesh radio, Meshtastic pre-installed. Built for off-grid communication wherever towers aren't.",
    images: [
      {
        url: beacon1Content.summary.heroImage.src,
        width: 1536,
        height: 1024,
        alt: beacon1Content.summary.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio",
    description:
      "MagSafe LoRa mesh radio with Meshtastic pre-installed. Off-grid communication that stays on your phone.",
    images: [beacon1Content.summary.heroImage.src],
  },
};

const PRODUCT_FAQS = [
  {
    question: "Is Meshtastic already installed on OffGrid Beacon 1?",
    answer:
      "Yes. Beacon 1 ships with Meshtastic firmware pre-installed and configured. You do not need to flash firmware or connect to a computer. Pair with the Meshtastic app over Bluetooth and you are on the mesh.",
  },
  {
    question: "Does Beacon 1 work with iPhone and MagSafe cases?",
    answer:
      "Yes. Beacon 1 attaches magnetically to MagSafe-compatible iPhones and the most popular MagSafe cases. It pairs with the official Meshtastic app on iOS over Bluetooth 5.0.",
  },
  {
    question: "Does Beacon 1 work with Android?",
    answer:
      "Yes. Beacon 1 works with Android phones using a MagSafe-compatible case or adapter ring and pairs with the Meshtastic app on Android over Bluetooth 5.0.",
  },
  {
    question: "What is the range of OffGrid Beacon 1?",
    answer:
      "Up to 10+ km line-of-sight on LoRa at 915 MHz. Real-world range in forests, cities, or hills is shorter, but Meshtastic's mesh routing extends coverage as more nodes join your network.",
  },
  {
    question: "How long does the battery last?",
    answer:
      "Beacon 1 uses a rechargeable lithium-polymer battery with USB-C fast charging. Typical standby in Meshtastic mode runs close to two weeks on a single charge depending on traffic and settings.",
  },
  {
    question: "Do I need a license to use Beacon 1?",
    answer:
      "No. Beacon 1 operates on the unlicensed 915 MHz ISM band in the US when the correct Meshtastic region is selected. No ham or GMRS license is required.",
  },
  {
    question: "Can Beacon 1 run MeshCore instead of Meshtastic?",
    answer:
      "Yes. The underlying RAK WisBlock hardware supports both Meshtastic and MeshCore firmware, so you can run the workflow you already prefer.",
  },
  {
    question: "What comes in the box?",
    answer:
      "Every Beacon 1 ships with the radio pre-flashed with Meshtastic, a USB-C charging cable, and quick-start instructions. MagSafe attachment is built into the enclosure.",
  },
];

async function loadBeacon1Product() {
  try {
    return await getBeacon1ProductWithCache();
  } catch (error) {
    console.error("Failed to fetch Beacon 1 product for product page.", error);
    return null;
  }
}

export default async function Beacon1Product() {
  const beacon1Product = await loadBeacon1Product();
  const price = beacon1Product?.variant?.price?.amount;
  const priceCurrency = beacon1Product?.variant?.price?.currencyCode ?? "USD";
  const availability =
    beacon1Product?.availableForSale && beacon1Product.variant?.availableForSale
      ? "InStock"
      : "OutOfStock";

  return (
    <>
      <script
        {...jsonLdScriptProps(
          productJsonLd({
            slot: "beacon-1",
            brandedName: beacon1Content.summary.brandedName,
            shortName: beacon1Content.summary.name,
            description:
              "MagSafe-compatible LoRa mesh radio with Meshtastic-ready firmware. Snap-on off-grid communication that stays with the phone you already carry.",
            sku: "OFFGRID-BEACON-1",
            mpn: "OGD-BCN-1-US",
            category: "Radios > LoRa Mesh Radios",
            url: "/products/beacon-1",
            images: [
              beacon1Content.summary.heroImage.src,
              beacon1Content.summary.productImage.src,
            ],
            aggregateRating: {
              ratingValue: "5.0",
              reviewCount: beacon1Content.testimonials.length,
            },
            reviews: beacon1Content.testimonials.map((testimonial) => ({
              name: testimonial.name,
              date: testimonial.date,
              review: testimonial.review,
            })),
            offer: price
              ? {
                  price,
                  priceCurrency,
                  availability,
                }
              : undefined,
          }),
        )}
      />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/beacon-1" },
            { name: "OffGrid Beacon 1", url: "/products/beacon-1" },
          ]),
        )}
      />
      <script {...jsonLdScriptProps(faqJsonLd(PRODUCT_FAQS))} />
      <Beacon1HeroSection />
      <Beacon1FeaturesSection />
      <Beacon1GallerySection />
      <Beacon1SpecsSection />
      <Beacon1TestimonialsGridSection />
      <Faq
        items={PRODUCT_FAQS}
        eyebrow="FAQ"
        title="Common questions about Beacon 1"
        description="Answers to the questions we hear most often from new Beacon 1 owners."
      />
      <Beacon1CallToAction
        eyebrow={beacon1Content.productPage.cta.eyebrow}
        title={beacon1Content.productPage.cta.title}
        description={beacon1Content.productPage.cta.description}
        secondaryHref={beacon1Content.productPage.cta.secondaryHref}
        secondaryLabel={beacon1Content.productPage.cta.secondaryLabel}
        backgroundClassName="bg-surface-elevated"
      />
    </>
  );
}
