import { ImageResponse } from "next/og";
import {
  BLOG_OG_FOOTER,
  BLOG_OG_MUTED,
  blogOgShellStyle,
} from "@/lib/blogOgLayout";
import { loadArchivoFont } from "@/lib/ogFont";

export const alt = "OffGrid Blog — Meshtastic, LoRa & off-grid communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function BlogIndexOgImage() {
  const archivoData = await loadArchivoFont();

  return new ImageResponse(
    (
      <div style={blogOgShellStyle}>
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: BLOG_OG_MUTED,
          }}
        >
          OffGrid Blog
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 92,
              fontWeight: 800,
              lineHeight: 1.02,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            Meshtastic, LoRa & off-grid comms.
          </div>
          <div
            style={{
              fontSize: 34,
              color: BLOG_OG_MUTED,
              maxWidth: 960,
              lineHeight: 1.3,
            }}
          >
            Practical guides, comparisons, and notes from the team behind Beacon
            2.
          </div>
        </div>

        <div style={{ fontSize: 26, color: BLOG_OG_FOOTER }}>
          offgridevices.com/blog
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Archivo",
          data: archivoData,
          weight: 900,
          style: "normal",
        },
      ],
    },
  );
}
