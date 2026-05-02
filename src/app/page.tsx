import type { Metadata } from "next";
import { HomeFeatureStorySection } from "@/components/home/HomeFeatureStorySection";
import { HomeHardwareSection } from "@/components/home/HomeHardwareSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProductDetailsSection } from "@/components/home/HomeProductDetailsSection";
import { HomeSpecsSection } from "@/components/home/HomeSpecsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import { link1Content } from "@/content/link1";

export const metadata: Metadata = {
  title: {
    absolute:
      "OffGrid Devices — MagSafe LoRa Mesh Radio for Off-Grid Communication",
  },
  description:
    "OffGrid Link 1 is the MagSafe LoRa mesh radio with Meshtastic pre-installed. Stay connected off-grid for hiking, events, and emergencies — no cell tower required.",
  alternates: { canonical: "/" },
  openGraph: {
    title:
      "OffGrid Devices — MagSafe LoRa Mesh Radio for Off-Grid Communication",
    description:
      "OffGrid Link 1: MagSafe-compatible LoRa mesh radio, Meshtastic pre-installed. Off-grid communication that stays on your phone.",
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeProductDetailsSection />
      <HomeFeatureStorySection />
      <HomeHardwareSection />
      <HomeSpecsSection />
      <HomeTestimonialsSection />
      <Link1CallToAction
        eyebrow={link1Content.home.cta.eyebrow}
        title={link1Content.home.cta.title}
        description={link1Content.home.cta.description}
        secondaryHref={link1Content.home.cta.secondaryHref}
        secondaryLabel={link1Content.home.cta.secondaryLabel}
      />
    </>
  );
}
