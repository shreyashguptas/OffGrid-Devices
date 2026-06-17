import type { MetadataRoute } from "next";
import { ICON_VERSION } from "@/lib/iconVersion";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OffGrid Devices",
    short_name: "OffGrid",
    description:
      "OffGrid Beacon 2 is the MagSafe-compatible LoRa mesh radio with Meshtastic pre-flashed.",
    theme_color: "#1B1813",
    background_color: "#F1ECE0",
    display: "standalone",
    start_url: "/",
    icons: [
      {
        src: `/icon-192.png?v=${ICON_VERSION}`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `/icon-512.png?v=${ICON_VERSION}`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
