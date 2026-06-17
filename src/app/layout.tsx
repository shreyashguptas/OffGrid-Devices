import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Inter_Tight,
  JetBrains_Mono,
  Newsreader,
} from "next/font/google";
import "./globals.css";
import { BfCacheShell } from "@/components/BfCacheShell";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LightboxProvider } from "@/components/shared/Lightbox";
import { getMetadataBase } from "@/lib/siteUrl";
import {
  BEACON_MARK_BONE,
  BEACON_MARK_PITCH,
  beaconFaviconDataUrl,
} from "@/lib/beaconMarkSvg";
import {
  jsonLdScriptProps,
  organizationJsonLd,
  websiteJsonLd,
} from "@/lib/jsonLd";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-archivo",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter-tight",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-newsreader",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const metadataBase = getMetadataBase();

// Browser chrome / status bar tint matches the user's OS preference.
// (When JS is disabled, the @media (prefers-color-scheme) block in
// globals.css still swaps tokens because nothing sets data-theme="dark".)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: BEACON_MARK_BONE },
    { media: "(prefers-color-scheme: dark)", color: BEACON_MARK_PITCH },
  ],
};

const BEACON_FAVICON = beaconFaviconDataUrl();

const SITE_NAME = "OffGrid Devices";
const DEFAULT_TITLE =
  "OffGrid Beacon 2 — MagSafe Meshtastic Mesh Radio";
const DEFAULT_DESCRIPTION =
  "OffGrid Devices makes Beacon 2 — the MagSafe-compatible LoRa mesh radio with Meshtastic pre-flashed, a 3000 mAh battery, and a replaceable SMA antenna. Off-grid communication that stays with the phone you already carry.";
const THEME_INIT_SCRIPT = `/* OffGrid early-paint theme switcher. */
(function () {
  try {
    var doc = document.documentElement;
    var mql =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-color-scheme: light)");

    function apply(prefersLight) {
      doc.setAttribute("data-theme", prefersLight ? "light" : "dark");
    }

    apply(!!(mql && mql.matches));

    if (mql) {
      var onChange = function (e) {
        apply(!!e.matches);
      };
      if (typeof mql.addEventListener === "function") {
        mql.addEventListener("change", onChange);
      } else if (typeof mql.addListener === "function") {
        mql.addListener(onChange);
      }
    }
  } catch (err) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();`;

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: DEFAULT_TITLE,
    template: "%s | OffGrid Devices",
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "LoRa mesh radio",
    "Meshtastic",
    "MagSafe Meshtastic",
    "MeshCore",
    "off-grid communication",
    "off-grid radio",
    "mesh network",
    "RAK WisBlock",
    "emergency communication device",
    "backup comms",
    "hiking two-way radio",
    "OffGrid Devices",
    "OffGrid Beacon 2",
    "OffGrid Beacon 1",
  ],
  authors: [{ name: "Shreyash Gupta" }],
  creator: "Shreyash Gupta",
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
    types: {
      "application/atom+xml": "/blog/feed.xml",
    },
  },
  manifest: "/manifest.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: BEACON_FAVICON, type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-icon.png", type: "image/png" },
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    type: "website",
    url: "/",
    siteName: SITE_NAME,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "OffGrid Devices — MagSafe LoRa mesh radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
      // Opt the `scroll-behavior: smooth` in globals.css into Next's
      // route-transition handling (silences the dev hint and keeps instant
      // scroll restoration on navigation while preserving smooth in-page jumps).
      data-scroll-behavior="smooth"
      // The early-paint theme script sets data-theme before
      // React hydrates; suppress the resulting attribute mismatch warning.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(websiteJsonLd())} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <BfCacheShell>
          <Navbar />
          <LightboxProvider>
            <main>{children}</main>
          </LightboxProvider>
          <Footer />
        </BfCacheShell>
      </body>
    </html>
  );
}
