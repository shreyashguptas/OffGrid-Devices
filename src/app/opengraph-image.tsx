import { ImageResponse } from "next/og";
import { BEACON_MARK_BONE, BEACON_MARK_EMBER } from "@/lib/beaconMarkSvg";
import { loadArchivoFont } from "@/lib/ogFont";

export const alt =
  "OffGrid Devices — MagSafe LoRa mesh radio for off-grid communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const archivoData = await loadArchivoFont();

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
          color: BEACON_MARK_BONE,
          fontFamily: "Archivo",
        }}
      >
        {/* Top — wordmark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg
            width="64"
            height="64"
            viewBox="24 20 152 152"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke={BEACON_MARK_EMBER} fill="none" strokeLinecap="round">
              <circle cx="100" cy="64" r="22" strokeWidth="4" opacity="0.18" />
              <circle cx="100" cy="64" r="34" strokeWidth="4" opacity="0.10" />
            </g>
            <g
              stroke={BEACON_MARK_EMBER}
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.85"
            >
              <line x1="100" y1="64" x2="146" y2="110" />
              <line x1="146" y1="110" x2="100" y2="156" />
              <line x1="100" y1="156" x2="54" y2="110" />
              <line x1="54" y1="110" x2="100" y2="64" />
              <line x1="100" y1="64" x2="100" y2="156" opacity="0.55" />
              <line x1="54" y1="110" x2="146" y2="110" opacity="0.55" />
            </g>
            <circle cx="100" cy="64" r="13" fill={BEACON_MARK_EMBER} />
            <circle cx="146" cy="110" r="9" fill={BEACON_MARK_EMBER} />
            <circle cx="100" cy="156" r="9" fill={BEACON_MARK_EMBER} />
            <circle cx="54" cy="110" r="9" fill={BEACON_MARK_EMBER} />
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
              display: "flex",
              flexDirection: "column",
              fontSize: 96,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              maxWidth: 1040,
            }}
          >
            <span>Stay connected.</span>
            <span style={{ color: BEACON_MARK_EMBER }}>Go anywhere.</span>
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
              color: BEACON_MARK_BONE,
            }}
          >
            OffGrid Beacon 2
          </div>
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
