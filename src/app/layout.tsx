import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BfCacheShell } from "@/components/BfCacheShell";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

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
      </body>
    </html>
  );
}
