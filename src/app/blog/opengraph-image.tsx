import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "OffGrid Blog — Meshtastic, LoRa & off-grid communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function BlogIndexOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #0b1f1c 0%, #0f2a27 50%, #133731 100%)",
          color: "#f3f7f2",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a8c1b9",
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
              color: "#a8c1b9",
              maxWidth: 960,
              lineHeight: 1.3,
            }}
          >
            Practical guides, comparisons, and notes from the team behind Beacon 1.
          </div>
        </div>

        <div style={{ fontSize: 26, color: "#8fb0a6" }}>offgridevices.com/blog</div>
      </div>
    ),
    { ...size },
  );
}
