import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

const TITLE = "Shipping — OffGrid Devices";
const DESCRIPTION =
  "OffGrid Beacon ships free from the United States. 1–3 day handling, 2–7 day USPS or UPS transit. International shipping is not currently offered.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/shipping" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/shipping",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function ShippingPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Shipping", url: "/shipping" },
          ]),
        )}
      />
      <LegalPageShell
        eyebrow="POLICIES · SHIPPING"
        title="Shipping"
        lastUpdated="2026-05-18"
      >
        <h2>Where we ship</h2>
        <p>
          OffGrid Beacon ships from the United States to anywhere in the 50
          US states and DC. We do not currently offer international shipping
          or shipping to APO/FPO addresses. If international availability is
          important to you, email{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>{" "}
          and we&rsquo;ll let you know when it changes.
        </p>

        <h2>Cost</h2>
        <p>
          <strong>Shipping is free for every domestic order.</strong> No
          minimum, no expedited tier, no surprise checkout fees. Free
          shipping is reflected in the Google Shopping listing for each
          OffGrid product.
        </p>

        <h2>Timing</h2>
        <p>
          Every Beacon is built in small batches and tested before it ships.
          The typical timeline:
        </p>
        <ul>
          <li>
            <strong>1&ndash;3 business days</strong> handling time (we batch
            assembly and quality-check before each shipment goes out)
          </li>
          <li>
            <strong>2&ndash;7 business days</strong> transit time via USPS
            or UPS ground service, depending on your distance from
            Maryland
          </li>
        </ul>
        <p>
          You&rsquo;ll receive a shipping confirmation email from Etsy with a
          tracking number the moment the carrier picks the package up.
        </p>

        <h2>Out-of-stock notice</h2>
        <p>
          When a product is sold out, the Buy button on its product page
          will show as such. We do not run pre-orders; we restock when the
          next batch is ready. To be notified when a sold-out product is
          back, follow{" "}
          <a
            href="https://x.com/ShreyashGuptas"
            target="_blank"
            rel="noopener noreferrer"
          >
            @ShreyashGuptas
          </a>{" "}
          or check back here.
        </p>

        <h2>Lost or damaged shipments</h2>
        <p>
          If a package is marked delivered but you haven&rsquo;t received
          it, wait 24 hours, check with neighbors and your local carrier,
          then email us. We will work with the carrier to file a claim and
          either replace the unit or refund you in full.
        </p>
        <p>
          If a package arrives damaged, photograph the box and the contents
          and email{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>{" "}
          within 7 days of delivery. We&rsquo;ll send a replacement at no
          cost.
        </p>

        <h2>Contact</h2>
        <p>
          Shipping questions:{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>
        </p>
      </LegalPageShell>
    </>
  );
}
