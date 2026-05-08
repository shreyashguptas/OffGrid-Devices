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
          padding: "72px 80px",
          background:
            "radial-gradient(ellipse 120% 80% at 80% 30%, #4a3826 0%, transparent 50%), radial-gradient(ellipse 90% 100% at 20% 110%, #2a1f15 0%, transparent 60%), linear-gradient(180deg, #221c14 0%, #1B1813 100%)",
          color: "#F1ECE0",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top — wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg
            width="56"
            height="56"
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g
              stroke="#E8743C"
              strokeWidth="9"
              fill="none"
              strokeLinejoin="miter"
            >
              <path d="M 100 50 L 150 100 L 100 150 L 50 100 Z" />
              <line x1="100" y1="50" x2="100" y2="150" />
              <line x1="50" y1="100" x2="150" y2="100" />
            </g>
            <circle cx="100" cy="50" r="11" fill="#E8743C" />
            <circle cx="150" cy="100" r="8" fill="#F1ECE0" />
            <circle cx="100" cy="150" r="8" fill="#F1ECE0" />
            <circle cx="50" cy="100" r="8" fill="#F1ECE0" />
            <circle cx="100" cy="100" r="9" fill="#E8743C" />
          </svg>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            OffGrid
          </div>
        </div>

        {/* Middle — display copy */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            Stay connected.
            <br />
            <span style={{ color: "#E8743C" }}>Go anywhere.</span>
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#D9C9A8",
              fontStyle: "italic",
              maxWidth: 920,
              lineHeight: 1.35,
            }}
          >
            MagSafe LoRa mesh radio. No towers. No SIMs. No subscriptions.
          </div>
        </div>

        {/* Bottom — meta */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.18em",
            color: "#D9C9A8",
            textTransform: "uppercase",
          }}
        >
          <div>offgridevices.com</div>
          <div
            style={{
              padding: "12px 22px",
              border: "1px solid #D9C9A855",
              color: "#F1ECE0",
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
