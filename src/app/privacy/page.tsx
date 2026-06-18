import type { Metadata } from "next";
import { LegalPageShell } from "@/components/legal/LegalPageShell";
import { PostHogOptOut } from "@/components/analytics/PostHogOptOut";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

const TITLE = "Privacy Policy — OffGrid Devices";
const DESCRIPTION =
  "How OffGrid Devices collects, uses, and protects your information. Templated US e-commerce policy — Etsy handles checkout and payments; we collect minimal data.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: "/privacy",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION },
};

export default function PrivacyPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Privacy", url: "/privacy" },
          ]),
        )}
      />
      <LegalPageShell
        eyebrow="LEGAL · PRIVACY"
        title="Privacy Policy"
        lastUpdated="2026-06-18"
      >
        <p>
          OffGrid Devices (&ldquo;OffGrid&rdquo;, &ldquo;we&rdquo;,
          &ldquo;us&rdquo;) respects your privacy. This policy explains what
          information we collect when you visit offgridevices.com or purchase
          an OffGrid product, how we use that information, and the rights you
          have over it. This is a templated policy intended as a starting
          point — it is not legal advice. If you need a binding privacy
          document for a specific jurisdiction, consult a qualified attorney.
        </p>

        <h2>What we collect</h2>
        <h3>Information you give us</h3>
        <ul>
          <li>
            <strong>Order data</strong> — name, shipping address, billing
            address, email, phone (optional), and the items you ordered.
            Collected by Etsy, the marketplace where the Beacon listing lives,
            on Etsy&rsquo;s own checkout. OffGrid never sees or stores your
            payment-card details.
          </li>
          <li>
            <strong>Contact form</strong> — when you use the form at{" "}
            <a href="/contact">offgridevices.com/contact</a>, you provide your
            name, email, an inquiry type, your message, and optionally a company
            name and phone number. We use it to reply and keep a record of the
            conversation. How we store and retain it is described under{" "}
            <em>Storing and retaining contact submissions</em> below.
          </li>
          <li>
            <strong>Support email</strong> — when you email
            hello@offgridevices.com directly, we receive the address you sent
            from and the contents of your message.
          </li>
        </ul>

        <h3>Information collected automatically</h3>
        <ul>
          <li>
            <strong>Product analytics (PostHog)</strong> — to understand how
            the site is used, PostHog records: pageviews, how long you spend on
            each page, clicks and taps, scroll and mouse activity used to build
            heatmaps, page-performance (web vitals) measurements, JavaScript
            errors, and anonymous session replays used to debug usability
            issues. It also records your device, browser, and operating system,
            an approximate location derived from your IP address (country and
            region only — never the raw address), and, if you arrive from an ad,
            email, or another site, the referring source (such as the campaign
            tags in the link). Visitors are{" "}
            <strong>anonymous by default</strong> — we do not build a named
            profile of you. All analytics traffic is proxied through{" "}
            <code>offgridevices.com/ingest</code> so PostHog never sees your IP
            address directly. We honor the browser <em>Do Not Track</em> signal,
            and the &ldquo;opt out&rdquo; button at the bottom of this page
            disables PostHog entirely for your browser. See posthog.com/privacy.
          </li>
          <li>
            <strong>Bot protection (Cloudflare Turnstile)</strong> — the contact
            form is protected by Cloudflare Turnstile, a privacy-preserving
            check that blocks spam and automated abuse. Cloudflare receives a
            challenge token and your IP address for this check; Turnstile does
            not track you across websites. See cloudflare.com/privacypolicy.
          </li>
          <li>
            <strong>Etsy checkout</strong> — Etsy collects standard
            e-commerce data (IP, browser, items viewed, cart state) during
            checkout to process payment, prevent fraud, and ship your order.
            See etsy.com/legal/privacy.
          </li>
          <li>
            <strong>Server logs</strong> — Cloudflare records request metadata
            (timestamp, path, status code, response time) for operational
            purposes; retained briefly.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To fulfill, ship, and provide support for your order.</li>
          <li>
            To send order confirmation and shipping update emails (via
            Etsy).
          </li>
          <li>
            To respond when you contact hello@offgridevices.com.
          </li>
          <li>
            To understand site traffic in aggregate so we can improve the
            product and the site.
          </li>
        </ul>

        <h2>Cookies and local storage</h2>
        <p>
          We use a small number of first-party cookies and browser-storage
          entries — and <strong>no third-party advertising cookies</strong>.
          PostHog sets a first-party cookie so it can recognize your browser
          across pages and visits and avoid double-counting; your analytics
          opt-out choice is stored in your browser so it persists across visits.
          Cloudflare Turnstile may set a short-lived token while you use the
          contact form. You can clear these at any time in your browser
          settings, and opting out of analytics (below) removes the PostHog
          cookie.
        </p>

        <h2>Storing and retaining contact submissions</h2>
        <p>
          When you submit the contact form, we email your message to ourselves
          (delivered by Resend) and also save the submission in a Cloudflare D1
          database as a durable record, so a message isn&rsquo;t lost if email
          delivery fails. We store the name, email, inquiry type, message, any
          company or phone number you provide, your browser&rsquo;s user-agent
          string, and a <strong>one-way hashed</strong> version of your IP
          address — we never store your raw IP. You may also receive a
          confirmation email that we received your message. To have a contact
          submission deleted, email{" "}
          <a href="mailto:hello@offgridevices.com">hello@offgridevices.com</a>.
        </p>

        <h2>What we do not do</h2>
        <ul>
          <li>We do not sell your information to third parties.</li>
          <li>
            We do not run third-party <em>advertising</em> trackers (no
            Meta pixel, no Google Ads tag, no TikTok pixel). The product
            analytics we do run — PostHog — are described above.
          </li>
          <li>
            We do not email marketing newsletters unless you opt in
            separately.
          </li>
        </ul>

        <h2>Third parties we rely on</h2>
        <ul>
          <li>
            <strong>Etsy</strong> — marketplace, checkout, payment processing,
            order fulfillment data. etsy.com/legal/privacy
          </li>
          <li>
            <strong>Cloudflare</strong> — hosting and edge network, server
            logs, the Turnstile bot-protection check, and the D1 database that
            stores contact submissions. cloudflare.com/privacypolicy
          </li>
          <li>
            <strong>Resend</strong> — delivers the email generated by the
            contact form to us (and the confirmation email to you).
            resend.com/legal/privacy-policy
          </li>
          <li>
            <strong>PostHog</strong> — product analytics, session replay,
            and error tracking. posthog.com/privacy
          </li>
          <li>
            <strong>USPS / UPS</strong> — shipping. Shipping data is shared
            with the carrier you choose at checkout.
          </li>
        </ul>

        <h2>Your rights</h2>
        <p>
          If you are a California resident (CCPA / CPRA), an EU/UK resident
          (GDPR), or otherwise covered by a comprehensive privacy law, you
          have the right to request a copy of the information we hold about
          you, to request correction or deletion, and to withdraw consent
          for processing. Email{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>{" "}
          with your request. We respond within 30 days.
        </p>

        <h2>Children</h2>
        <p>
          OffGrid products are not directed to children under 13. We do not
          knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy. Material changes will be noted with a
          new &ldquo;Last updated&rdquo; date at the top of this page.
          Continued use of the site after a change constitutes acceptance.
        </p>

        <h2>Contact</h2>
        <p>
          OffGrid LLC · Rockville, MD ·{" "}
          <a href="mailto:hello@offgridevices.com">
            hello@offgridevices.com
          </a>
        </p>

        <h2>Opt out of analytics</h2>
        <p>
          Click below to disable PostHog product analytics for this
          browser. The setting persists across visits.
        </p>
        <PostHogOptOut />
      </LegalPageShell>
    </>
  );
}
