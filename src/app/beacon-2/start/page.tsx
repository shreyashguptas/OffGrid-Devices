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
import { startContent } from "@/content/start";
import {
  breadcrumbJsonLd,
  howToJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";

const TITLE = "Beacon 2 — Setup & reference";
const DESCRIPTION =
  "Setup, troubleshooting, safety, and warranty info for the OffGrid Beacon 2 LoRa mesh radio. Pair via Meshtastic, set your region, and get on the mesh fast.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/beacon-2/start" },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    url: "/beacon-2/start",
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
      {/* Breadcrumb ties the setup guide back to the product + home so search
          engines (and AI answer engines) understand its place in the site. */}
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "OffGrid Beacon 2", url: "/products/beacon-2" },
            { name: "Setup & reference", url: "/beacon-2/start" },
          ]),
        )}
      />
      {/* HowTo JSON-LD, derived from the same setup steps rendered below, makes
          this guide eligible for the How-To rich result and gives AI answer
          engines an explicit ordered procedure to cite for "how to set up
          Beacon 2" queries. */}
      <script
        {...jsonLdScriptProps(
          howToJsonLd({
            name: "How to set up the OffGrid Beacon 2 LoRa mesh radio",
            description: startContent.setup.note,
            url: "/beacon-2/start#setup",
            steps: startContent.setup.steps.map((step) => ({
              name: step.title.replace(/\.$/, ""),
              text: [step.body.join(" "), step.warning, step.note]
                .filter(Boolean)
                .join(" "),
              url: "/beacon-2/start#setup",
            })),
          }),
        )}
      />
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
