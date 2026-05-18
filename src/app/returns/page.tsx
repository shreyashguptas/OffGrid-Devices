import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

const TITLE = "Returns & Warranty — OffGrid Devices";
const DESCRIPTION =
  "30-day return window and 90-day limited warranty on every OffGrid Beacon. Return process, warranty coverage, and contact details.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/returns" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/returns",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function ReturnsPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Returns", url: "/returns" },
          ]),
        )}
      />
      <LegalPageShell
        eyebrow="POLICIES · RETURNS & WARRANTY"
        title="Returns & Warranty"
        lastUpdated="2026-05-18"
      >
        <h2>Returns — 30 days, free</h2>
        <p>
          Every OffGrid Beacon has a{" "}
          <strong>30-day return window from the date of delivery</strong>.
          If the product isn&rsquo;t what you expected, return it in
          unmodified condition for a full refund.{" "}
          <strong>Return shipping is free</strong> (we email a prepaid USPS
          or UPS label). Refunds are processed back to the original payment
          method within 5 business days of us receiving the returned unit.
        </p>

        <h3>What counts as unmodified</h3>
        <ul>
          <li>
            The radio, antenna, belt clip, charging cable, whistle, and
            packaging are all present
          </li>
          <li>The unit has not been physically damaged or modified</li>
          <li>The firmware has not been reflashed with custom builds</li>
          <li>Original cosmetic condition (no scratches beyond normal use)</li>
        </ul>

        <h3>How to start a return</h3>
        <p>
          Email{" "}
          <a href="mailto:support@offgridevices.com">
            support@offgridevices.com
          </a>{" "}
          with your order number and a one-line note (no questionnaire). We
          reply within one business day with a prepaid return label and
          instructions.
        </p>

        <h2>Warranty — 90 days, limited</h2>
        <p>
          OffGrid Beacon products carry a{" "}
          <strong>
            90-day limited warranty from the date of delivery
          </strong>{" "}
          covering defects in materials and workmanship under normal use.
          During the warranty period, we will repair the unit, replace it,
          or refund you — whichever fits the situation best.
        </p>

        <h3>What the warranty covers</h3>
        <ul>
          <li>Manufacturing defects in the printed shell or magnet ring</li>
          <li>
            Failure of the RAK4630 module, antenna connector, or USB-C port
            under normal use
          </li>
          <li>Firmware issues we shipped from the factory</li>
        </ul>

        <h3>What the warranty does not cover</h3>
        <ul>
          <li>
            Physical damage from drops, crushes, or impacts beyond normal
            carrying use
          </li>
          <li>
            Water damage beyond the splash-resistant intent of the shell
            (Beacon is not waterproof)
          </li>
          <li>
            Damage from third-party antennas, cables, or attachments outside
            the included accessories
          </li>
          <li>
            Cosmetic wear (filament patina, magnet ring scuffs) from normal
            field use
          </li>
          <li>
            Damage from operating the radio at the wrong LoRa region or
            above the FCC duty-cycle / power limits for the unlicensed
            902&ndash;928 MHz band
          </li>
        </ul>

        <h3>How to file a warranty claim</h3>
        <p>
          Email{" "}
          <a href="mailto:support@offgridevices.com">
            support@offgridevices.com
          </a>{" "}
          with: (1) your order number, (2) a photo or short video of the
          issue, and (3) a one-line description. We reply within one
          business day with next steps — usually a prepaid return label or
          a direct replacement shipment depending on the issue.
        </p>

        <h2>Beacon 1 — retired product</h2>
        <p>
          The 90-day warranty applies to Beacon 1 units within their
          original 90-day window. Beacon 1 is no longer in production;
          replacement units are no longer manufactured. For warranty claims
          on Beacon 1, we&rsquo;ll either refund you or ship a Beacon 2 at
          no cost depending on availability.
        </p>

        <h2>Contact</h2>
        <p>
          Returns and warranty:{" "}
          <a href="mailto:support@offgridevices.com">
            support@offgridevices.com
          </a>
        </p>
      </LegalPageShell>
    </>
  );
}
