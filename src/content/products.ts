export type SiteProduct = {
  name: string;
  subtitle: string;
  href: string;
  image: string | null;
  badge: string | null;
};

/**
 * Products surfaced in Navbar dropdowns and the Footer "Carry" column.
 *
 * Beacon 1 is permanently sold out and intentionally NOT listed here — the
 * PDP at `/products/beacon-1` remains live and indexable (preserving inbound
 * links and the Product schema with `availability: OutOfStock`), but it is
 * not promoted from primary navigation. The Beacon 1 PDP itself surfaces a
 * "Beacon 2 is the current model" cross-sell to direct retired-product
 * visitors to the in-stock flagship.
 */
export const siteProducts = [
  {
    name: "Beacon 2",
    subtitle: "OffGrid · LoRa mesh radio",
    href: "/products/beacon-2",
    image: "/beacon-2/hero-front.png",
    badge: null,
  },
] satisfies SiteProduct[];

export type Beacon2Spec = { label: string; value: string };
export type Beacon2FieldRow = readonly [string, string];
export type Beacon2FieldNote = {
  tag: string;
  title: string;
  body: string;
  meta: string;
  image: string;
  alt: string;
};
export type Beacon2Stat = {
  metric: string;
  label: string;
};

export const beacon2Content = {
  name: "Beacon 2",
  brandedName: "OffGrid Beacon 2",
  summary: {
    name: "Beacon 2",
    brandedName: "OffGrid Beacon 2",
    subtitle: "MagSafe LoRa mesh radio",
    href: "/products/beacon-2",
    shortBuyLabel: "Buy",
    buyLabel: "Buy Beacon 2",
    loadingLabel: "Opening Checkout...",
    heroImage: {
      src: "/beacon-2/hero-front.png",
      alt: "OffGrid Beacon 2 MagSafe LoRa mesh radio",
    },
  },
  description:
    "Pre-flashed Meshtastic mesh radio with a 3000 mAh battery, replaceable SMA antenna, and N48H magnets that grip your phone and hold.",
  heroImage: {
    src: "/beacon-2/hero-front.png",
    alt: "OffGrid Beacon 2 on a stone plinth with antenna up",
  },
  home: {
    heroTitle: "Stay Connected.",
    heroSubtitle: "Go Anywhere.",
    heroIntro:
      "Beacon 2 is the MagSafe mesh radio for the trail, the boat, the pass, the tower. No towers. No SIMs. No subscriptions.",
    fieldCard: {
      label: "Field Card · Beacon 2",
      rows: [
        ["MOUNT", "MagSafe · N48H ring"],
        ["RADIO", "LoRa · 902–928 MHz · SMA"],
        ["BATTERY", "3000 mAh · USB-C"],
        ["FIRMWARE", "Meshtastic · pre-flashed"],
        ["INCLUDED", "Belt clip · whistle"],
        ["BUILD", "Sun-tolerant filament"],
      ] satisfies ReadonlyArray<Beacon2FieldRow>,
      quote:
        "“Snap it on, swap the antenna, stay on the mesh for weeks.”",
    },
    stats: [
      { metric: "10+ km", label: "range, line of sight" },
      { metric: "3000 mAh", label: "weeks of standby" },
      { metric: "MagSafe", label: "snaps to your phone" },
      { metric: "USB-C", label: "fast-charge ready" },
    ] satisfies Beacon2Stat[],
    fieldNotes: [
      {
        tag: "DAILY · MAGSAFE",
        title: "Magnets that hold on.",
        body: "N48H neodymium magnets grip the back of your phone — and stay there. The slipping problem from the first Beacon is solved.",
        meta: "MagSafe · N48H ring",
        image: "/beacon-2/feature-magnets.png",
        alt: "Beacon 2 back showing the magnet ring recesses",
      },
      {
        tag: "OUTDOORS · LORA",
        title: "Swap antennas. Safely.",
        body: "External SMA mount with a real on/off switch. Pack the stock whip for the trail; screw on a higher-gain antenna at camp.",
        meta: "SMA · 902–928 MHz",
        image: "/beacon-2/feature-antenna.png",
        alt: "Beacon 2 with replaceable SMA antenna",
      },
      {
        tag: "TRIPS · POWER",
        title: "3000 mAh. Weeks on the mesh.",
        body: "A larger cell paired with the same low-power Meshtastic stack — multi-week runtime on a single USB-C charge, ready before you head out.",
        meta: "USB-C · adventure-ready",
        image: "/beacon-2/feature-battery.png",
        alt: "Beacon 2 lying flat in the belt-clip cradle",
      },
    ] satisfies Beacon2FieldNote[],
    hardwareRows: [
      ["SHELL", "Heat-resistant 3D-printed filament"],
      ["CORE", "RAK4630 · nRF52840 · SX1262"],
      ["RADIO", "LoRa · 902–928 MHz · US915"],
      ["MOUNT", "MagSafe · N48H magnet ring"],
      ["ANTENNA", "Replaceable SMA · external"],
      ["BATTERY", "3000 mAh · USB-C"],
    ] satisfies ReadonlyArray<Beacon2FieldRow>,
    hardwareQuote:
      "It feels less like a gadget and more like a piece of expedition gear. The kind of thing you stop noticing in your pocket — until the moment you need it.",
    hardwareAttribution: "Notes from the field · OffGrid · 2026",
    specsDescription:
      "Every component in Beacon 2 is chosen for range, reliability, and everyday carry. The experience stays simple; the hardware does not.",
    testimonials: {
      eyebrow: "Early Beacon owners",
      title: "Don't take our word.",
      subtitle: "Take theirs.",
      footnote:
        "Reviews below are from Beacon 1 customers — the line Beacon 2 evolved from. Beacon 2 reviews coming soon.",
    },
    cta: {
      eyebrow: "Ready when you are",
      title: "Ready for OffGrid Beacon 2?",
      description:
        "Pick up OffGrid Beacon 2 and join the adventurers, preppers, and mesh enthusiasts who stay connected off-grid.",
      secondaryHref: "/blog",
      secondaryLabel: "Read the blog",
    },
  },
  features: [
    {
      kicker: "Magnets",
      title: "Magnets that hold on",
      description:
        "N48H neodymium magnet ring so Beacon 2 snaps to your phone, your pack, and any steel surface without sliding.",
      image: {
        src: "/beacon-2/feature-magnets.png",
        alt: "Beacon 2 back showing magnet recesses",
      },
    },
    {
      kicker: "Antenna",
      title: "Swap antennas. Safely.",
      description:
        "Standard SMA connector with a guarded mount and on/off switch. Pack the stock whip for hiking, screw on a higher-gain antenna at camp.",
      image: {
        src: "/beacon-2/feature-antenna.png",
        alt: "Beacon 2 with replaceable SMA antenna",
      },
    },
    {
      kicker: "Battery",
      title: "3000 mAh. Weeks on the mesh.",
      description:
        "A larger cell paired with the same low-power Meshtastic stack — multi-week runtime on a single USB-C charge.",
      image: {
        src: "/beacon-2/feature-battery.png",
        alt: "Beacon 2 lying flat in belt-clip cradle",
      },
    },
  ],
  packaging: {
    eyebrow: "Packaging",
    title: "Built to be displayed.",
    description:
      "The box doubles as a kickstand display. Pop out the stand, slot the unit back in, and Beacon 2 keeps catching mesh signals while it sits on your desk.",
    images: [
      {
        src: "/beacon-2/packaging-display.png",
        alt: "Beacon 2 inside its display-stand packaging",
      },
      {
        src: "/beacon-2/packaging-stand.png",
        alt: "Beacon 2 packaging shown with the pop-out kickstand engaged",
      },
      {
        src: "/beacon-2/packaging-detail.png",
        alt: "Macro of the embossed BEACON 2 by OffGrid logo on the packaging",
      },
    ],
  },
  whatsInTheBox: {
    eyebrow: "What's in the box",
    title: "Everything you need on day one.",
    description:
      "Beacon 2 with antenna, belt clip, USB-C charging cable, emergency whistle, and the display-stand packaging it all ships in.",
    image: {
      src: "/beacon-2/whats-in-the-box.png",
      alt: "Flat lay of Beacon 2, belt clip, charging cable, whistle, and display packaging",
    },
  },
  specs: [
    { label: "Range", value: "10+ km LoS" },
    { label: "Radio", value: "LoRa SX1262 · 902–928 MHz" },
    { label: "Battery", value: "3000 mAh Li-Po" },
    { label: "Charging", value: "USB-C · fast charge" },
    { label: "Bluetooth", value: "BLE 5.0 · iOS + Android" },
    { label: "Encryption", value: "AES-256 per channel" },
    { label: "Mounting", value: "MagSafe · N48H magnet ring" },
    { label: "Shell", value: "Heat-resistant 3D-printed filament" },
    { label: "Core", value: "RAK4630 · nRF52840" },
    { label: "Antenna", value: "Replaceable SMA · external" },
    { label: "Firmware", value: "Meshtastic · pre-flashed" },
    { label: "Carry", value: "Magnet mount or belt clip" },
  ] satisfies Beacon2Spec[],
};
