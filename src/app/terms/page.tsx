import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

const TITLE = "Terms of Service — OffGrid Devices";
const DESCRIPTION =
  "The terms that govern your use of offgridevices.com and any OffGrid product you purchase. Templated US e-commerce ToS — Etsy's own checkout terms apply at point of sale.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/terms",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function TermsPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Terms", url: "/terms" },
          ]),
        )}
      />
      <LegalPageShell
        eyebrow="LEGAL · TERMS"
        title="Terms of Service"
        lastUpdated="2026-05-18"
      >
        <p>
          These terms govern your use of offgridevices.com and any OffGrid
          product you purchase. By using the site or buying a product, you
          agree to these terms. This is a templated agreement intended as a
          starting point — it is not legal advice. For binding terms in your
          jurisdiction, consult a qualified attorney.
        </p>

        <h2>Who we are</h2>
        <p>
          OffGrid LLC (&ldquo;OffGrid&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) is a hardware company based in Maryland, USA. We
          sell MagSafe-compatible LoRa mesh radios designed to run Meshtastic
          firmware.
        </p>

        <h2>Site use</h2>
        <p>
          You may use offgridevices.com for personal and lawful purposes.
          You may not scrape, copy, redistribute, or attempt to disrupt the
          site or its underlying infrastructure. Automated access by AI
          training crawlers (CCBot, anthropic-ai, cohere-ai) is prohibited
          and blocked via robots.txt; inference and citation crawlers
          (GPTBot, ClaudeBot, PerplexityBot, etc.) are welcome.
        </p>

        <h2>Purchases</h2>
        <p>
          Orders are placed and processed through Etsy, our marketplace and
          payment provider. Etsy&rsquo;s own terms apply at the point of
          sale. Pricing is shown in USD and may change without notice; the
          price you pay is the price displayed at Etsy checkout. OffGrid ships
          from the United States only.
        </p>

        <h2>Product warranty</h2>
        <p>
          OffGrid Beacon products carry a{" "}
          <strong>90-day limited warranty</strong> covering defects in
          materials and workmanship under normal use. The warranty does not
          cover damage from drops, water ingress beyond intended IP rating,
          modification, or use outside the LoRa region the product was
          configured for. Warranty claims: email{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>{" "}
          with your order number and a description of the issue. See the{" "}
          <a href="/returns">returns and warranty page</a> for details.
        </p>

        <h2>Returns</h2>
        <p>
          Unused, unmodified OffGrid products may be returned within 30 days
          of delivery for a full refund minus return shipping. See the{" "}
          <a href="/returns">returns page</a> for the process.
        </p>

        <h2>Regulatory notice</h2>
        <p>
          OffGrid Beacon radios operate on the unlicensed 902&ndash;928 MHz
          ISM band when configured for the US region. Use of the device in
          other regions, or outside the LoRa duty-cycle and power limits
          permitted in your jurisdiction, is your responsibility. No ham or
          GMRS license is required for unlicensed-band Meshtastic use in
          the US.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          OffGrid Beacon is not certified life-safety equipment. Do not rely
          on a Beacon as your sole means of communication in an emergency.
          To the maximum extent permitted by law, OffGrid LLC is not liable
          for any indirect, incidental, or consequential damages arising
          from the use of the product or the site. Our total liability for
          any claim is limited to the amount you paid for the product
          giving rise to the claim.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All site content, photography, copy, and the Beacon mark are
          copyright OffGrid LLC. Meshtastic and MeshCore are trademarks of
          their respective projects.
        </p>

        <h2>Governing law</h2>
        <p>
          These terms are governed by the laws of the State of Maryland,
          USA. Any dispute will be resolved in the state or federal courts
          located in the State of Maryland, USA.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms. Material changes will be noted with a
          new &ldquo;Last updated&rdquo; date. Continued use of the site or
          product after a change constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          OffGrid LLC · Rockville, MD ·{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>
        </p>
      </LegalPageShell>
    </>
  );
}
