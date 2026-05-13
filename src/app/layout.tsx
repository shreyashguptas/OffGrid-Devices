import type { Metadata, Viewport } from "next";
import {
  Archivo,
  Inter_Tight,
  JetBrains_Mono,
  Newsreader,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { BfCacheShell } from "@/components/BfCacheShell";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getMetadataBase } from "@/lib/siteUrl";
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

export const viewport: Viewport = {
  themeColor: "#1B1813",
};

const BEACON_FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='24 20 152 152'%3E%3Crect x='24' y='20' width='152' height='152' fill='%231B1813'/%3E%3Cg stroke='%23E8743C' fill='none' stroke-linecap='round'%3E%3Ccircle cx='100' cy='64' r='22' stroke-width='4' opacity='0.18'/%3E%3Ccircle cx='100' cy='64' r='34' stroke-width='4' opacity='0.10'/%3E%3C/g%3E%3Cg stroke='%23E8743C' stroke-width='5' stroke-linecap='round' opacity='0.85'%3E%3Cline x1='100' y1='64' x2='146' y2='110'/%3E%3Cline x1='146' y1='110' x2='100' y2='156'/%3E%3Cline x1='100' y1='156' x2='54' y2='110'/%3E%3Cline x1='54' y1='110' x2='100' y2='64'/%3E%3Cline x1='100' y1='64' x2='100' y2='156' opacity='0.55'/%3E%3Cline x1='54' y1='110' x2='146' y2='110' opacity='0.55'/%3E%3C/g%3E%3Ccircle cx='100' cy='64' r='13' fill='%23E8743C'/%3E%3Ccircle cx='146' cy='110' r='9' fill='%23E8743C'/%3E%3Ccircle cx='100' cy='156' r='9' fill='%23E8743C'/%3E%3Ccircle cx='54' cy='110' r='9' fill='%23E8743C'/%3E%3C/svg%3E";

const SITE_NAME = "OffGrid Devices";
const DEFAULT_TITLE =
  "OffGrid Beacon 1 | MagSafe LoRa Mesh Radio for Off-Grid Communication";
const DEFAULT_DESCRIPTION =
  "OffGrid Devices makes Beacon 1 — the MagSafe-compatible LoRa mesh radio with Meshtastic pre-installed. Off-grid communication that stays with the phone you already carry.";

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
    "OffGrid Beacon 1",
  ],
  authors: [{ name: "Shreyash Gupta" }],
  creator: "Shreyash Gupta",
  publisher: SITE_NAME,
  category: "technology",
  alternates: {
    canonical: "/",
  },
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
    apple: { url: "/logo.svg", type: "image/svg+xml" },
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
    >
      <head>
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <script {...jsonLdScriptProps(organizationJsonLd())} />
        <script {...jsonLdScriptProps(websiteJsonLd())} />
      </head>
      <body className="bg-background text-foreground antialiased">
        <BfCacheShell>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </BfCacheShell>
        <Analytics />
      </body>
    </html>
  );
}
