import type { Metadata } from "next";
import { Faq } from "@/components/Faq";
import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import { Link1FeaturesSection } from "@/components/link1/Link1FeaturesSection";
import { Link1GallerySection } from "@/components/link1/Link1GallerySection";
import { Link1HeroSection } from "@/components/link1/Link1HeroSection";
import { Link1SpecsSection } from "@/components/link1/Link1SpecsSection";
import { Link1TestimonialsGridSection } from "@/components/link1/Link1TestimonialsGridSection";
import { link1Content } from "@/content/link1";
import {
  breadcrumbJsonLd,
  jsonLdScriptProps,
  productJsonLd,
} from "@/lib/jsonLd";

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
  alternates: { canonical: "/products/link-1" },
  openGraph: {
    type: "website",
    url: "/products/link-1",
    title: "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio",
    description:
      "MagSafe-compatible LoRa mesh radio, Meshtastic pre-installed. Built for off-grid communication wherever towers aren't.",
    images: [
      {
        url: link1Content.summary.heroImage.src,
        width: 1536,
        height: 1024,
        alt: link1Content.summary.heroImage.alt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OffGrid Beacon 1 — MagSafe Meshtastic LoRa Mesh Radio",
    description:
      "MagSafe LoRa mesh radio with Meshtastic pre-installed. Off-grid communication that stays on your phone.",
    images: [link1Content.summary.heroImage.src],
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

export default function Link1Product() {
  return (
    <>
      <script {...jsonLdScriptProps(productJsonLd())} />
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Products", url: "/products/link-1" },
            { name: "OffGrid Beacon 1", url: "/products/link-1" },
          ]),
        )}
      />
      <Link1HeroSection />
      <Link1FeaturesSection />
      <Link1GallerySection />
      <Link1SpecsSection />
      <Link1TestimonialsGridSection />
      <Faq
        items={PRODUCT_FAQS}
        eyebrow="FAQ"
        title="Common questions about Beacon 1"
        description="Answers to the questions we hear most often from new Beacon 1 owners."
      />
      <Link1CallToAction
        eyebrow={link1Content.productPage.cta.eyebrow}
        title={link1Content.productPage.cta.title}
        description={link1Content.productPage.cta.description}
        secondaryHref={link1Content.productPage.cta.secondaryHref}
        secondaryLabel={link1Content.productPage.cta.secondaryLabel}
        backgroundClassName="bg-surface-elevated"
      />
    </>
  );
}
