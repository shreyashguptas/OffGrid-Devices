import type { Metadata } from "next";
import Link from "next/link";
import {
  breadcrumbJsonLd,
  jsonLdScriptProps,
  personJsonLd,
} from "@/lib/jsonLd";
import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";

const TITLE = "About OffGrid Devices — Founder & Mission";
const DESCRIPTION =
  "OffGrid Devices is a San Francisco-based hardware company making MagSafe-compatible LoRa mesh radios that run Meshtastic. Founded by Shreyash Gupta.";

export const metadata: Metadata = {
  // `title.absolute` skips the global ` | OffGrid Devices` template so the
  // rendered <title> stays under 60 chars for SERP display.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    url: "/about",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    // `summary_large_image` so the auto-resolved root OG image renders as a
    // full card in tweets, not a thumbnail.
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "About", url: "/about" },
          ]),
        )}
      />
      <script
        {...jsonLdScriptProps(
          personJsonLd({
            name: "Shreyash Gupta",
            url: absoluteUrl("/about"),
            jobTitle: "Founder",
            worksFor: {
              name: "OffGrid Devices",
              url: getSiteUrl(),
            },
            sameAs: [
              "https://x.com/ShreyashGuptas",
              "https://github.com/shreyashguptas",
              "https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA",
            ],
          }),
        )}
      />

      {/* Hero */}
      <section className="border-b border-bark/30 bg-pitch pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">ABOUT · OFFGRID DEVICES</p>
          <h1 className="type-display-section mt-4 text-bone">
            What OffGrid Beacon is — and why it exists.
          </h1>
          <p className="font-editorial mt-8 max-w-3xl text-xl leading-[1.55] text-sand/85">
            OffGrid Devices is a one-person hardware company based in San
            Francisco. We make MagSafe-compatible LoRa mesh radios that run
            Meshtastic firmware — small, rugged radios that snap to your phone
            and stay on the mesh for the places where towers, SIM cards, and
            subscriptions stop working.
          </p>
        </div>
      </section>

      {/* Definitional block — passage-level citable for AI Overviews */}
      <section className="border-b border-bark/30 bg-pitch-deep py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-6">
          <p className="type-mono-label text-ember">WHAT IS OFFGRID BEACON?</p>
          <p className="font-editorial mt-6 text-lg leading-[1.7] text-sand/85 md:text-xl">
            OffGrid Beacon is a MagSafe-compatible LoRa mesh radio that runs
            Meshtastic firmware out of the box. It snaps magnetically to the
            back of a MagSafe iPhone or any phone with a MagSafe-compatible
            case, pairs over Bluetooth 5.0, and joins the Meshtastic mesh on
            the 902&ndash;928 MHz LoRa band — no cell tower, no SIM card, no
            subscription. The current flagship is OffGrid Beacon 2, with a
            3000 mAh battery, replaceable SMA antenna, N48H ring magnets,
            and a typical line-of-sight range of 10+ km on the stock antenna.
            Beacons ship from the United States and are designed for hikers,
            preppers, event organizers, and Meshtastic enthusiasts who want a
            radio that fits in a pocket and lasts weeks on a charge.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">FOUNDER</p>
          <h2 className="type-display-section mt-4 text-bone">
            Shreyash Gupta
          </h2>
          <div className="font-editorial mt-8 space-y-6 text-lg leading-[1.7] text-sand/85 md:text-xl">
            <p>
              I started OffGrid because I wanted a Meshtastic radio that would
              fit my actual life — not a breadboard with an antenna I&rsquo;d
              never carry, and not a $400 handheld I&rsquo;d leave at home.
              Beacon 1 shipped in early 2026 as the first MagSafe-compatible
              Meshtastic radio I knew of: a transparent shell, RAK WisBlock
              hardware, firmware pre-flashed, magnets that just barely held.
            </p>
            <p>
              The slipping bothered me. So did the small battery, the fixed
              antenna, the lack of a clean charge-light cutout. Beacon 2 is
              the version I wanted Beacon 1 to be — N48H magnets that grip
              and hold, a 3000 mAh cell that lasts weeks, a replaceable SMA
              antenna with a real on/off switch, a belt clip, and an
              emergency whistle in the box.
            </p>
            <p>
              Every Beacon is built in small batches. I personally answer
              every support email. If you want to talk hardware, range, or
              what&rsquo;s coming next — reach me directly.
            </p>
          </div>

          <div className="type-mono-label mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sand/85">
            <a
              href="mailto:support@offgridevices.com"
              className="hover:text-ember"
            >
              SUPPORT@OFFGRIDEVICES.COM
            </a>
            <a
              href="https://x.com/ShreyashGuptas"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ember"
            >
              X / TWITTER →
            </a>
            <a
              href="https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ember"
            >
              YOUTUBE →
            </a>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <p className="type-mono-label text-ember">MISSION</p>
          <h2 className="type-display-section mt-4 text-bone">
            No towers. No SIMs. No subscriptions.
          </h2>
          <div className="font-editorial mt-8 space-y-6 text-lg leading-[1.7] text-sand/85 md:text-xl">
            <p>
              We believe communication should not depend on a single tower or
              a monthly bill. Meshtastic is the right protocol for that
              future — open, decentralized, low-power, and built on
              unlicensed LoRa hardware that anyone can carry.
            </p>
            <p>
              OffGrid&rsquo;s job is to make that protocol invisible. You
              should not have to flash firmware, debug Bluetooth pairing, or
              source a case that does not exist. You should be able to snap
              a Beacon to your phone, set your region once, and forget about
              it until the moment you need it.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="type-mono-label text-ember">READY WHEN YOU ARE</p>
          <h2 className="type-display-section mt-4 text-bone">
            Get a Beacon 2 in your pocket.
          </h2>
          <p className="font-editorial mx-auto mt-6 max-w-2xl text-lg leading-[1.55] text-sand/85">
            Beacon 2 is in stock, ships free from the United States, and is
            covered by a 90-day warranty and a 30-day return window.
          </p>
          <div className="mt-10">
            <Link
              href="/products/beacon-2"
              className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone sm:px-10 sm:py-5"
            >
              Shop OffGrid Beacon 2 →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
