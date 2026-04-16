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
  themeColor: "#f3f7f2",
};

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
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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
        url: "/logo-1024.png",
        width: 1024,
        height: 1024,
        alt: "OffGrid Devices — MagSafe LoRa mesh radio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/logo-1024.png"],
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
