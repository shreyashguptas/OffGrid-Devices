import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { BfCacheShell } from "@/components/BfCacheShell";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function getFirstNonEmptyString(...values: Array<string | undefined>) {
  for (const value of values) {
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }
  return undefined;
}

function createMetadataBase() {
  const rawValue =
    getFirstNonEmptyString(
      process.env.NEXT_PUBLIC_SITE_URL,
      process.env.VERCEL_PROJECT_PRODUCTION_URL,
      process.env.VERCEL_URL,
    ) ?? "http://localhost:3000";

  const normalizedValue = /^[a-zA-Z][a-zA-Z\d+\-.]*:\/\//.test(rawValue)
    ? rawValue
    : `https://${rawValue}`;

  try {
    return new URL(normalizedValue);
  } catch {
    return new URL("http://localhost:3000");
  }
}

const metadataBase = createMetadataBase();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  title: "OffGrid Link 1 | MagSafe LoRa Mesh Radio",
  description:
    "OffGrid makes Link 1—the MagSafe-compatible LoRa mesh radio with Meshtastic-ready firmware. Off-grid communication that stays on the phone you already carry.",
  metadataBase,
  keywords: [
    "LoRa",
    "Meshtastic",
    "MeshCore",
    "off-grid communication",
    "MagSafe",
    "mesh network",
    "RAK",
    "emergency communication",
  ],
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
    title: "OffGrid Link 1 | MagSafe LoRa Mesh Radio",
    description:
      "OffGrid Link 1: the MagSafe-compatible LoRa mesh radio—Meshtastic-ready, built to stay on your phone.",
    type: "website",
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
