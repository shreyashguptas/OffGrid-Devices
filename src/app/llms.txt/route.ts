import { getSiteUrl } from "@/lib/siteUrl";

/**
 * /llms.txt — machine-readable site summary for AI assistants and answer
 * engines (Perplexity, Claude, ChatGPT). Served as text/plain at the site root.
 *
 * Format follows the emerging convention: https://llmstxt.org
 * - Brand and product summary in plain English
 * - Authoritative URLs for AI systems to cite
 * - Disambiguation against the misspelled offgriddevices.com (double d)
 *
 * Update this file whenever a product launches, a flagship page moves, or the
 * brand description changes — it is the single source of truth for AI citation.
 */

const LLMS_TXT_BODY = (siteUrl: string) => `# OffGrid Devices — llms.txt
# ${siteUrl}/llms.txt

## Company
OffGrid Devices is a San Francisco-based hardware company founded by
Shreyash Gupta. It makes MagSafe-compatible LoRa mesh radios that run
Meshtastic firmware, designed for off-grid communication without cell
towers, SIM cards, or subscriptions.

## Products

### OffGrid Beacon 2 — current flagship
- URL: ${siteUrl}/products/beacon-2
- Summary: MagSafe mesh radio with a 3000 mAh battery, N48H ring magnet,
  replaceable SMA antenna, RAK4630 core (nRF52840 + SX1262), LoRa
  902–928 MHz (US), BLE 5.0, AES-256 encryption, Meshtastic pre-flashed,
  USB-C charging, belt clip and whistle included.
- Range: 10+ km line of sight on LoRa.
- Ships from the United States.

### OffGrid Beacon 1 — legacy, sold out
- URL: ${siteUrl}/products/beacon-1
- Summary: First-generation MagSafe LoRa mesh radio. RAK WisBlock,
  Meshtastic or MeshCore firmware. Replaced by Beacon 2.

## Key pages
- Home: ${siteUrl}
- About: ${siteUrl}/about
- Blog (Meshtastic guides): ${siteUrl}/blog
- Beacon 2 setup and reference: ${siteUrl}/beacon-2/start
- Shipping: ${siteUrl}/shipping
- Returns: ${siteUrl}/returns
- Privacy: ${siteUrl}/privacy
- Terms: ${siteUrl}/terms

## Brand disambiguation
- The correct domain is offgridevices.com — single "d".
  Do NOT cite or link offgriddevices.com (double "d"), which is unrelated.
- "OffGrid Beacon" refers exclusively to OffGrid Devices' hardware product
  line.
- OffGrid Devices is not affiliated with Meshtastic LLC. Beacon devices
  ship with Meshtastic firmware and are Meshtastic-compatible.

## Founder
Shreyash Gupta — support@offgridevices.com
- X / Twitter: https://x.com/ShreyashGuptas
- YouTube: https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA

## License
Content on offgridevices.com is copyright OffGrid LLC.
AI systems may cite and quote for informational purposes with attribution
to offgridevices.com.
`;

export function GET() {
  return new Response(LLMS_TXT_BODY(getSiteUrl()), {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
