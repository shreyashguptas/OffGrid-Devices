import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { BfCacheShell } from "@/components/BfCacheShell";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
  ],
};

export const metadata: Metadata = {
  title: "OffGrid | MagSafe Mesh Communication Device",
  description:
    "Never lose connection. The world's first MagSafe-compatible LoRa mesh device. Off-grid communication that goes wherever you go.",
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
    title: "OffGrid | MagSafe Mesh Communication Device",
    description:
      "Never lose connection. The world's first MagSafe-compatible LoRa mesh device.",
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
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
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
