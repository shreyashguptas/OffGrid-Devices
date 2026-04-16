import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "OffGrid Devices — MagSafe LoRa mesh radio for off-grid communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#f3f7f2",
              color: "#0b1f1c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 800,
              letterSpacing: -1,
            }}
          >
            OG
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 600,
              letterSpacing: 0.2,
              color: "#c7d8d2",
            }}
          >
            OffGrid Devices
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 1040,
            }}
          >
            MagSafe LoRa Mesh Radio
          </div>
          <div
            style={{
              fontSize: 36,
              color: "#a8c1b9",
              maxWidth: 960,
              lineHeight: 1.3,
            }}
          >
            Meshtastic-ready. Off-grid communication that stays with the phone
            you already carry.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: 26, color: "#8fb0a6" }}>
            offgridevices.com
          </div>
          <div
            style={{
              fontSize: 24,
              padding: "12px 22px",
              borderRadius: 999,
              border: "1px solid #2f5b52",
              color: "#c7d8d2",
            }}
          >
            OffGrid Link 1
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
