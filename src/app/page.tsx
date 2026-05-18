import type { Metadata } from "next";
import { HomeFeatureShowcaseSection } from "@/components/home/HomeFeatureShowcaseSection";
import { HomeHardwareSection } from "@/components/home/HomeHardwareSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProductDetailsSection } from "@/components/home/HomeProductDetailsSection";
import { HomeSpecsSection } from "@/components/home/HomeSpecsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { Link2CallToAction } from "@/components/link2/Link2CallToAction";
import { link2Content } from "@/content/products";

export const metadata: Metadata = {
  title: {
    absolute:
      "OffGrid Devices — MagSafe LoRa Mesh Radio for Off-Grid Communication",
  },
  description:
    "OffGrid Beacon 2 is the MagSafe LoRa mesh radio with Meshtastic pre-flashed — 3000 mAh battery, replaceable antenna, N48H magnets. Stay connected off-grid for hiking, events, and emergencies — no cell tower required.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "OffGrid Devices — MagSafe LoRa Mesh Radio for Off-Grid Communication",
    description:
      "OffGrid Beacon 2: MagSafe-compatible LoRa mesh radio with Meshtastic pre-flashed, 3000 mAh, and a replaceable SMA antenna. Off-grid communication that stays on your phone.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeProductDetailsSection />
      <HomeFeatureShowcaseSection />
      <HomeHardwareSection />
      <HomeTestimonialsSection />
      <HomeSpecsSection />
      <Link2CallToAction
        eyebrow={link2Content.home.cta.eyebrow}
        title={link2Content.home.cta.title}
        description={link2Content.home.cta.description}
        secondaryHref={link2Content.home.cta.secondaryHref}
        secondaryLabel={link2Content.home.cta.secondaryLabel}
      />
    </>
  );
}
