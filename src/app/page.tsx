import type { Metadata } from "next";
import { CompanyHeroSection } from "@/components/landing/CompanyHeroSection";
import { FieldNotesTeaserSection } from "@/components/landing/FieldNotesTeaserSection";
import { MissionTeaserSection } from "@/components/landing/MissionTeaserSection";
import { ProductLineupSection } from "@/components/landing/ProductLineupSection";
import { ServicesTeaserSection } from "@/components/landing/ServicesTeaserSection";

// The home page is a company-level landing page (Organization / lineup), not a
// product page. The full Beacon 2 story + Product JSON-LD live at
// /products/beacon-2; Organization + WebSite JSON-LD are global in layout.tsx.
// The brand-level title avoids keyword cannibalization with the PDP, which
// owns the commercial "MagSafe LoRa Mesh Radio" phrase.
const HOMEPAGE_TITLE =
  "OffGrid Devices — Mesh Radios When Towers Aren't There";
const HOMEPAGE_DESCRIPTION =
  "OffGrid builds MagSafe-compatible LoRa mesh radios that run Meshtastic — and runs a US small-batch hardware shop. No towers, no SIMs, no subscriptions.";

export const metadata: Metadata = {
  title: { absolute: HOMEPAGE_TITLE },
  description: HOMEPAGE_DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOMEPAGE_TITLE,
    description: HOMEPAGE_DESCRIPTION,
    url: "/",
    type: "website",
  },
};

export default function Home() {
  return (
    <>
      <CompanyHeroSection />
      <ProductLineupSection />
      <ServicesTeaserSection />
      <MissionTeaserSection />
      <FieldNotesTeaserSection />
    </>
  );
}
