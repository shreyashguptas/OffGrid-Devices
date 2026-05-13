import type { Metadata } from "next";
import { StartCareSection } from "@/components/start/StartCareSection";
import { StartContactSection } from "@/components/start/StartContactSection";
import { StartDefaultsSection } from "@/components/start/StartDefaultsSection";
import { StartFaqSection } from "@/components/start/StartFaqSection";
import { StartFirmwareSection } from "@/components/start/StartFirmwareSection";
import { StartHeroSection } from "@/components/start/StartHeroSection";
import { StartPageFooter } from "@/components/start/StartPageFooter";
import { StartRegionNoticeSection } from "@/components/start/StartRegionNoticeSection";
import { StartSafetySection } from "@/components/start/StartSafetySection";
import { StartSetupSection } from "@/components/start/StartSetupSection";
import { StartTocSection } from "@/components/start/StartTocSection";
import { StartWarrantySection } from "@/components/start/StartWarrantySection";

const TITLE = "Beacon 2 — Setup & reference";
const DESCRIPTION =
  "Setup, troubleshooting, safety, and warranty information for the OffGrid Beacon 2 LoRa mesh radio. Pair via Meshtastic, set your region, and get on the mesh in under ten minutes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/start" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/start",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function StartPage() {
  return (
    <>
      <StartHeroSection />
      <StartTocSection />
      <StartRegionNoticeSection />
      <StartSetupSection />
      <StartDefaultsSection />
      <StartCareSection />
      <StartFaqSection />
      <StartFirmwareSection />
      <StartSafetySection />
      <StartWarrantySection />
      <StartContactSection />
      <StartPageFooter />
    </>
  );
}
