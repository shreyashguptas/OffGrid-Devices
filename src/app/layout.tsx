import type { Metadata, Viewport } from "next";
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

const metadataBase = getMetadataBase();

export const viewport: Viewport = {
  themeColor: "#1B1813",
};

const BEACON_FAVICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%231B1813'/%3E%3Cg stroke='%23F1ECE0' stroke-width='12' fill='none' stroke-linecap='square'%3E%3Cpath d='M 32 56 L 32 32 L 56 32'/%3E%3Cpath d='M 144 32 L 168 32 L 168 56'/%3E%3Cpath d='M 168 144 L 168 168 L 144 168'/%3E%3Cpath d='M 56 168 L 32 168 L 32 144'/%3E%3C/g%3E%3Cg stroke='%23E8743C' stroke-width='14' fill='none' stroke-linejoin='miter' stroke-linecap='butt'%3E%3Cpath d='M 100 58 L 142 100 L 100 142 L 58 100 Z'/%3E%3Cline x1='100' y1='58' x2='100' y2='142'/%3E%3Cline x1='58' y1='100' x2='142' y2='100'/%3E%3C/g%3E%3Ccircle cx='100' cy='58' r='12' fill='%23E8743C'/%3E%3Ccircle cx='142' cy='100' r='9' fill='%23F1ECE0'/%3E%3Ccircle cx='100' cy='142' r='9' fill='%23F1ECE0'/%3E%3Ccircle cx='58' cy='100' r='9' fill='%23F1ECE0'/%3E%3Ccircle cx='100' cy='100' r='10' fill='%23E8743C'/%3E%3C/svg%3E";

const SITE_NAME = "OffGrid Devices";
const DEFAULT_TITLE =
  "OffGrid Link 1 | MagSafe LoRa Mesh Radio for Off-Grid Communication";
const DEFAULT_DESCRIPTION =
  "OffGrid Devices makes Link 1 — the MagSafe-compatible LoRa mesh radio with Meshtastic pre-installed. Off-grid communication that stays with the phone you already carry.";

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
    "OffGrid Link 1",
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
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.shopify.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://cdn.shopify.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter+Tight:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
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
