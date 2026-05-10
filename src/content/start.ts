export type StartTocItem = {
  href: string;
  label: string;
  description: string;
};

export type StartFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type StartStep = {
  number: number;
  title: string;
  body: string[];
  warning?: string;
  note?: string;
};

export type StartTableRow = {
  label: string;
  value: string;
  emphasis?: boolean;
  note?: string;
};

export const startContent = {
  productName: "Beacon 2",
  fullProductName: "OffGrid Beacon 2",
  productLineDescription:
    "A handheld LoRa mesh radio that lets you communicate when there's no cell signal, no Wi-Fi, and no infrastructure.",
  hero: {
    eyebrow: "Setup & reference",
    title: "Welcome to the network.",
    body: "You've just unboxed your OffGrid Beacon 2 — a handheld LoRa mesh radio that lets you communicate when there's no cell signal, no Wi-Fi, and no infrastructure. This page walks you through setup and answers the most common questions.",
    primaryCta: { label: "Start setup", href: "#setup" },
    secondaryCta: { label: "Jump to FAQ", href: "#troubleshooting" },
  },
  toc: [
    {
      href: "#setup",
      label: "First-time setup",
      description: "Seven steps to get on the mesh.",
    },
    {
      href: "#defaults",
      label: "Default settings",
      description: "What ships preconfigured.",
    },
    {
      href: "#care",
      label: "Care & charging",
      description: "Temperature, storage, cleaning.",
    },
    {
      href: "#troubleshooting",
      label: "Troubleshooting & FAQ",
      description: "Quick answers to common questions.",
    },
    {
      href: "#firmware",
      label: "Firmware & updates",
      description: "Stay current with Meshtastic.",
    },
    {
      href: "#safety",
      label: "Safety & compliance",
      description: "Battery, magnets, RF, FCC, Prop 65.",
    },
    {
      href: "#warranty",
      label: "Warranty & returns",
      description: "90-day limited warranty.",
    },
    {
      href: "#contact",
      label: "Contact & community",
      description: "Get help, find resources.",
    },
  ] satisfies StartTocItem[],
  regionNotice: {
    eyebrow: "One-time setup required",
    title: "Set your region before first use.",
    body: [
      "Your Beacon 2 ships with no region selected. This is intentional — the Meshtastic firmware defaults to \"UNSET\" so the device cannot transmit illegally in regions where this hardware is not licensed.",
      "Before your device will send or receive any messages, you must:",
    ],
    steps: [
      "Pair the device with your phone via the Meshtastic app.",
      "Open the app's settings and set Region → United States.",
    ],
    closing:
      "Until you do this, the device will appear to power on and pair, but it will not transmit. This is the most common \"my device doesn't work\" question we get — see Step 6 below for instructions.",
  },
  identify: {
    eyebrow: "Identify your device",
    title: "Confirm you have a Beacon 2.",
    body: "Look at the bottom of your device. You should see debossed text reading:",
    deboss: [
      "OffGrid Beacon 2  •  US915",
      "Contains FCC ID: 2AF6B-RAK4630",
      "Li-ion 3.7V 11.1Wh",
      "OffGrid LLC, MD, USA",
    ],
    fallback:
      "If your device shows a different model identifier or no debossed text, you may have an earlier version or a DIY-kit-built unit. Email hello@offgridevices.com with a photo and we'll point you to the right guide.",
    photoCaption: "Bottom of device showing debossed regulatory text.",
  },
  setup: {
    eyebrow: "First-time setup",
    title: "Get on the mesh in 5–10 minutes.",
    note:
      "Estimated time: 5–10 minutes. You'll need your phone and a USB-C cable to charge if the battery is low.",
    steps: [
      {
        number: 1,
        title: "Charge first (recommended).",
        body: [
          "Your device shipped with a partial charge. For best first-use experience, charge to full before initial setup.",
          "Plug the supplied USB-C cable into the charging port on the side of the device. Plug the other end into any USB power source (5V, 1A or higher). The status LED will pulse during charging and turn solid when full. Full charge time from empty: approximately 2.5 hours.",
          "You can use the device while it charges, but battery percentage in the app will be more accurate after a full first charge.",
        ],
      },
      {
        number: 2,
        title: "Attach the antenna.",
        body: [
          "Locate the SMA connector — the brass-colored threaded port on top of the device.",
          "Hold the antenna by the rubber base, not the metal whip. Align the threaded base with the SMA connector. Hand-tighten clockwise until snug. Do not use tools.",
        ],
        warning:
          "Do not power the device on without the antenna attached. Transmitting without an antenna can permanently damage the radio.",
      },
      {
        number: 3,
        title: "Power on.",
        body: [
          "Locate the power switch on the side of the device.",
          "Slide the switch to the ON position. The status LED will blink during boot. Boot takes approximately 10 seconds. A solid LED indicates the device is ready to pair.",
        ],
      },
      {
        number: 4,
        title: "Install the Meshtastic app.",
        body: [
          "Your device works with the open-source Meshtastic app, available free on iOS and Android.",
        ],
      },
      {
        number: 5,
        title: "Pair via Bluetooth.",
        body: [
          "Once the app is installed, open the Meshtastic app and tap \"Connect\" or the radio icon at the top.",
          "Select \"Bluetooth.\" Wait for your device to appear in the list. The default name format is BCN-XXXX (where XXXX is the last 4 characters of your device's MAC address).",
          "Tap your device to pair. If prompted for a PIN, the default is 123456 — change this in the app settings after pairing.",
        ],
        note: "If your device doesn't appear, see the Troubleshooting section below.",
      },
      {
        number: 6,
        title: "Set your region (required).",
        body: [
          "This is the step everyone forgets — and the device will not work without it.",
          "Your device ships with no region configured. You must set the region to \"United States\" before it will transmit.",
          "In the Meshtastic app, after pairing: tap the menu icon (usually three lines or a gear). Tap \"Radio Configuration\" (or \"Settings\" → \"Radio\"). Tap \"LoRa\" or \"Region.\" From the region dropdown, select \"United States\" (sometimes shown as \"US\" or \"US915\"). Tap \"Save\" or \"Send\" to apply the configuration. Wait 5–10 seconds for the device to reboot with the new region.",
          "Your device is now legal to transmit in the 902–928 MHz band and will start communicating with any nearby Meshtastic nodes.",
        ],
        note:
          "Why does this exist? Meshtastic ships with no default region as a safety measure — the same firmware runs on hardware sold worldwide, and transmitting in the wrong band is illegal in most countries. Your Beacon 2 is US915 hardware, so \"United States\" is the correct setting. Do not change this unless you have legal authorization to operate in another band.",
      },
      {
        number: 7,
        title: "Send your first message.",
        body: [
          "Once the region is set, open the \"Channels\" or \"Messages\" tab in the app. Send a test message to the public broadcast channel.",
          "If other Meshtastic nodes are nearby (within 1–5 km depending on terrain), you may see them appear in your node list. If you're solo, that's fine — the device is working. You're now ready to communicate when you encounter another mesh node.",
          "For information on creating private channels with friends or family, see the Default device configuration section below.",
        ],
      },
    ] satisfies StartStep[],
    appLinks: {
      ios: "https://apps.apple.com/us/app/meshtastic/id1586432531",
      android:
        "https://play.google.com/store/apps/details?id=com.geeksville.mesh",
    },
    photoCaptions: {
      charging: "USB-C charging port with cable inserted.",
      antenna: "Antenna being threaded onto SMA connector.",
      power: "Power switch in the ON position.",
      regionScreen: "Meshtastic app — region selection screen.",
    },
  },
  defaults: {
    eyebrow: "Default device configuration",
    title: "What's preconfigured (and what you set yourself).",
    body: "Your Beacon 2 ships with these settings:",
    rows: [
      {
        label: "Hardware",
        value: "RAK4631 + RAK19003",
        note: "Fixed",
      },
      {
        label: "Frequency band",
        value: "US915 (902–928 MHz)",
        note: "Hardware",
      },
      {
        label: "Region",
        value: "UNSET — must be set to \"United States\"",
        emphasis: true,
        note: "Required — see Step 6",
      },
      {
        label: "Firmware",
        value: "Meshtastic (latest stable at ship date)",
        note: "Pre-flashed",
      },
      {
        label: "LoRa preset",
        value: "Long Fast (Meshtastic default)",
        note: "Optional in app",
      },
      {
        label: "Channel",
        value: "Public Meshtastic primary channel",
        note: "Add private channels in app",
      },
      {
        label: "Device name",
        value: "BCN-[last 4 of MAC]",
        note: "Rename in app if desired",
      },
      {
        label: "Bluetooth PIN",
        value: "123456",
        note: "Change after first pairing",
      },
    ] satisfies StartTableRow[],
    privateChannels: {
      title: "Custom channels for private groups.",
      body: "The default public Meshtastic channel is shared with all unencrypted Meshtastic devices in range. To set up a private encrypted channel for your family, friends, or work group:",
      steps: [
        "In the Meshtastic app, tap the channels icon.",
        "Tap \"Add channel.\"",
        "Give the channel a name and set a strong PSK (pre-shared key).",
        "Share the channel QR code with people you want to include — they scan it from their own Meshtastic app to join.",
        "All messages on that channel are AES-256 encrypted and only readable by devices that have scanned the QR code.",
      ],
      docs: "https://meshtastic.org/docs/configuration/radio/channels/",
    },
  },
  care: {
    eyebrow: "Care, charging & temperature",
    title: "Keep your device healthy.",
    body: "The lithium-ion battery inside your device has specific operating limits. Follow these to maximize life and avoid damage.",
    temperatures: [
      { activity: "Use (discharge)", range: "-20°C to 60°C  (-4°F to 140°F)" },
      { activity: "Charging", range: "0°C to 45°C  (32°F to 113°F)" },
      { activity: "Long-term storage", range: "10°C to 30°C  (50°F to 86°F)" },
    ],
    storage: [
      "For storage longer than a month, charge the device to about 50% before storing.",
      "Store in a cool, dry place out of direct sunlight.",
      "For storage longer than 3 months, top up to 50% every 3 months to prevent over-discharge.",
    ],
    charging: [
      "Use the supplied USB-C cable or any UL/CE certified USB-C cable.",
      "Power source: 5V at 1A or higher (most phone chargers work fine).",
      "Avoid charging the device when it is hot to the touch.",
      "Avoid charging unattended overnight if you can.",
    ],
    cleaning: [
      "Wipe the case with a soft, slightly damp cloth.",
      "For stubborn dirt, use isopropyl alcohol on a microfiber cloth — avoid acetone, ethanol, or other solvents (they will damage the resin enclosure).",
      "Do not submerge in water. The device is not waterproof.",
    ],
  },
  faq: {
    eyebrow: "Troubleshooting & FAQ",
    title: "Common questions.",
    description:
      "Tap any question to expand. The first one is the answer to over half of all support emails — read it first.",
    items: [
      {
        id: "faq-region",
        question:
          "My device pairs but won't send or receive messages. Nothing happens when I send a test.",
        answer:
          "This is almost always because the region hasn't been set. By default the Meshtastic firmware ships with region = UNSET, which prevents the device from transmitting any RF until the user explicitly chooses a region.\n\nTo fix: open the Meshtastic app while paired with the device. Go to Radio Configuration → LoRa → Region. Select \"United States\" (or \"US\" / \"US915\" depending on app version). Save / send the configuration. Wait for the device to reboot (5–10 seconds). Send another test message — it should work now.\n\nIf you've set the region correctly and still can't send, see the next question.",
      },
      {
        id: "faq-power",
        question: "My device won't power on.",
        answer:
          "Connect the device to a USB-C charger and wait 5 minutes — the battery may be deeply discharged. While charging, slide the power switch off, wait 10 seconds, then back on. If the LED still doesn't light, check that the USB-C cable works with another device. If the above doesn't help, email hello@offgridevices.com with your purchase date and we'll arrange a warranty repair or replacement.",
      },
      {
        id: "faq-bluetooth",
        question: "My phone can't find the device via Bluetooth.",
        answer:
          "Make sure the device is powered on and the LED is solid (not blinking — that means it's still booting). In your phone's Bluetooth settings, \"forget\" any old Meshtastic pairing first. Force-close and reopen the Meshtastic app. Move within 1 meter of the device while pairing. If you previously paired the device with another phone, unpair it from that phone first — Meshtastic only allows one active Bluetooth connection. Try restarting your phone.",
      },
      {
        id: "faq-led",
        question: "What do the LED colors mean?",
        answer:
          "A reference table will be published here once the shipping firmware LED behavior is finalized. In the meantime: a slow pulse during charging means charging in progress, a solid LED means full charge or device ready to pair, and a blinking LED during boot is normal. If the LED behavior on your device differs from this, email hello@offgridevices.com.",
      },
      {
        id: "faq-range",
        question: "My range is shorter than expected.",
        answer:
          "Several things affect LoRa range. Region setting: confirm region is set to \"United States\" — an unset or wrong region prevents transmission entirely. Antenna orientation: the antenna should be vertical for best results, not horizontal. Obstructions: buildings, hills, dense foliage, and metal objects all attenuate the signal. Open terrain at elevation gives best range. MagSafe phone proximity: keep the antenna at least 8 cm (3 in) from any MagSafe-equipped phone or metallic surface during transmission. Antenna damage: if the antenna whip is bent, kinked, or partially unscrewed, range will drop dramatically. Battery low: at low battery, transmit power may auto-reduce.\n\nTypical line-of-sight range: 1–10 km depending on terrain. Urban range: 0.5–2 km.",
      },
      {
        id: "faq-heat",
        question: "The device is hot. Is that a problem?",
        answer:
          "The device should be warm but not uncomfortably hot during normal use or charging.\n\nIf the device is hot to the touch: stop charging immediately and unplug. Move the device to a cool, well-ventilated area. Do not put it back in a pocket, bag, or enclosed space until it returns to room temperature. If the case is swelling, has changed shape, or smells unusual, do not use the device. Contact hello@offgridevices.com immediately for safety guidance.\n\nThe lithium-ion battery inside has thermal limits — sustained operation above 60°C (140°F) can cause permanent damage and, in extreme cases, fire. Do not leave the device on a car dashboard, in direct sun, or near heat sources.",
      },
      {
        id: "faq-international",
        question: "Can I use the device internationally?",
        answer:
          "Your device transmits in the 902–928 MHz band (US915), which is licensed for unlicensed use only in the US, Canada, Mexico, parts of South America, and a few other regions. Using this device in regions where US915 is not authorized (most of Europe, much of Asia, Australia) may violate local radio regulations and is the user's responsibility. If you travel internationally and need a different region version, contact us — international region versions of similar hardware are available, but require different firmware and antenna.",
      },
      {
        id: "faq-private",
        question: "How do I set up a private channel for my family or group?",
        answer:
          "See the \"Custom channels for private groups\" subsection above under Default device configuration.",
      },
      {
        id: "faq-firmware",
        question: "How do I update the firmware?",
        answer:
          "Your device runs standard Meshtastic firmware, so it's compatible with all official Meshtastic releases for the RAK4631 platform.\n\nTo check your current firmware version: open the Meshtastic app, go to Settings → About, look for \"Firmware version.\"\n\nTo update: visit https://flasher.meshtastic.org/ on a Chrome-based browser (Chrome, Edge, Brave, Arc). Connect your device via USB-C. Follow the on-screen instructions.\n\nFor release notes: https://github.com/meshtastic/firmware/releases",
      },
      {
        id: "faq-reset",
        question: "How do I reset the device to factory defaults?",
        answer:
          "In the Meshtastic app: connect to your device, go to Settings → Device Configuration, tap \"Factory Reset,\" confirm.\n\nNote: this will erase your region setting, custom channels, and any other configuration. After resetting, you'll need to repeat Step 6 (set region to United States) before the device will transmit again. Save channel QR codes before resetting if you want to restore them later.",
      },
    ] satisfies StartFaqItem[],
  },
  firmware: {
    eyebrow: "Firmware & updates",
    title: "Stay current with Meshtastic.",
    body: "Your Beacon 2 ships with standard Meshtastic firmware (latest stable release at the time of assembly). Because we use the upstream firmware, your device is compatible with all official Meshtastic releases for the RAK4631 platform.",
    checkVersion:
      "To check your current version: Settings → About → Firmware version.",
    updateSteps: [
      "Go to https://flasher.meshtastic.org/ on a Chrome-based browser.",
      "Connect your device via USB-C with the included cable.",
      "Select the latest stable release.",
      "Click \"Flash.\"",
      "Wait for the process to complete.",
    ],
    releaseNotes: "https://github.com/meshtastic/firmware/releases",
    note:
      "After updating firmware, you may need to repeat Step 6 (set region to United States) — major firmware updates sometimes reset device configuration.",
  },
  safety: {
    eyebrow: "Safety & compliance",
    title: "Read this before using the device.",
    sections: [
      {
        id: "safety-battery",
        emoji: "🔥",
        kind: "warning" as const,
        title: "Lithium-ion battery — heat hazard",
        intro:
          "This device contains a sealed lithium-ion battery (3.7 V, 3000 mAh).",
        rangeRows: [
          { activity: "Use (discharge)", range: "-20°C to 60°C   (-4°F to 140°F)" },
          { activity: "Charging", range: "0°C to 45°C     (32°F to 113°F)" },
          { activity: "Storage (long-term)", range: "10°C to 30°C    (50°F to 86°F)" },
        ],
        bullets: [
          "Do not leave on a car dashboard or in a parked vehicle in direct sun. Vehicle interiors regularly exceed 70°C (158°F) — above the safe range. Heat exposure causes battery swelling, leakage, capacity loss, and risk of fire.",
          "Do not operate or store in direct sunlight for extended periods.",
          "Do not charge below freezing (0°C / 32°F) — this causes lithium plating and permanent battery damage.",
          "Do not puncture, crush, disassemble, or expose to water, fire, or open flame.",
          "Do not charge unattended or near flammable materials.",
          "If the case feels hot to the touch, swells, or smells unusual, stop charging and move the device outdoors immediately.",
        ],
      },
      {
        id: "safety-magnets",
        emoji: "🧲",
        kind: "warning" as const,
        title: "Strong magnets — medical & data hazard",
        intro:
          "This device contains strong neodymium magnets (N48H grade).",
        bullets: [
          "Keep away from pacemakers, defibrillators, insulin pumps, and other medical implants. Maintain at least 6 inches (15 cm) of separation. If you or anyone handling this product has a medical implant, do not use this product.",
          "Keep away from credit cards, hotel keycards, magnetic ID badges, and magnetic storage media. Permanent data loss may occur.",
          "Keep out of reach of children. Swallowed magnets can cause life-threatening internal injuries requiring emergency surgery. If swallowed, seek emergency care immediately.",
          "Do not use near hearing aids or other sensitive electronics.",
          "Wireless charging performance may be affected when this device is attached to a phone.",
        ],
      },
      {
        id: "safety-rf",
        emoji: "📡",
        kind: "info" as const,
        title: "RF & antenna",
        bullets: [
          "Always operate with the supplied antenna attached. Operating without the antenna may damage the radio.",
          "Maintain at least 8 cm (3 in) between the antenna and any MagSafe-equipped phone or metal object during transmission to avoid range degradation.",
          "This device transmits in the 902–928 MHz band (US915). Use only in regions where this band is legal (and only after setting the region in the Meshtastic app — see Step 6 of setup).",
        ],
      },
      {
        id: "safety-fcc",
        emoji: null,
        kind: "info" as const,
        title: "FCC compliance",
        intro: "Contains FCC ID: 2AF6B-RAK4630",
        body: [
          "This device complies with Part 15 of the FCC Rules. Operation is subject to the following two conditions: (1) this device may not cause harmful interference, and (2) this device must accept any interference received, including interference that may cause undesired operation.",
          "Changes or modifications not expressly approved by OffGrid LLC could void the user's authority to operate the equipment.",
        ],
      },
      {
        id: "safety-prop65",
        emoji: "⚠️",
        kind: "warning" as const,
        title: "California Proposition 65",
        body: [
          "WARNING: This product can expose you to chemicals including lead, which is known to the State of California to cause cancer and birth defects or other reproductive harm. For more information, visit www.P65Warnings.ca.gov.",
        ],
      },
      {
        id: "safety-recycle",
        emoji: "🔋",
        kind: "info" as const,
        title: "Battery disposal & recycling",
        body: [
          "This product contains a sealed rechargeable lithium-ion battery. Do not dispose of in household trash. Recycle through your local battery program or at participating retailers (Best Buy, Home Depot, Lowe's, Staples) via Call2Recycle: https://www.call2recycle.org/",
        ],
      },
    ],
  },
  warranty: {
    eyebrow: "Warranty & returns",
    title: "90-day limited warranty.",
    body: "OffGrid LLC warrants this product against manufacturing defects for 90 days from the date of delivery.",
    covered: [
      "Manufacturing defects in the case, fasteners, or assembly.",
      "PCB or radio module failures not caused by user damage.",
      "Battery defects (e.g., shipped already swollen or non-functional).",
    ],
    notCovered: [
      "Damage from drops, water exposure, or other physical accidents.",
      "Damage from operating outside the temperature ranges listed in the Safety section.",
      "Damage from charging with non-compliant USB-C cables or chargers.",
      "Damage from modification, disassembly, or repair attempts.",
      "Cosmetic wear (scratches, fading, etc.).",
      "Lost or stolen devices.",
    ],
    legal:
      "By using this product, you acknowledge the safety warnings on this page and assume all risks associated with use. OffGrid LLC is not liable for damage to other devices, personal property, data loss, or injuries resulting from misuse, magnetic exposure, or thermal exposure. This warranty and any disputes arising from it are governed by the laws of the State of Maryland.",
    returns: {
      title: "Returns within 30 days.",
      body: "If you're unhappy with your purchase, you can return it within 30 days of delivery for a full refund (minus return shipping).",
      steps: [
        "Email hello@offgridevices.com with your order number and reason.",
        "We'll send return instructions and a return authorization number.",
        "Ship the device back in its original packaging if possible.",
        "Refund is processed within 5 business days of receiving the return.",
      ],
      note:
        "Devices must be returned in working condition with all included accessories (antenna, cable, packaging insert).",
    },
  },
  contact: {
    eyebrow: "Contact & community",
    title: "Get help.",
    supportEmail: "hello@offgridevices.com",
    body: "For all support questions, warranty claims, and business inquiries: hello@offgridevices.com.",
    responseTime:
      "Response time: typically within 1–2 business days. We're a small team, so if you don't hear back in 3 days, please follow up.",
    community: {
      title: "Community resources.",
      body: "OffGrid devices use the open-source Meshtastic firmware. The Meshtastic community is the best place for technical questions about the protocol, range optimization, and advanced configuration.",
      links: [
        {
          label: "Meshtastic documentation",
          href: "https://meshtastic.org/docs/",
        },
        {
          label: "Meshtastic Discord",
          href: "https://discord.gg/ktMAKGBnBs",
        },
        {
          label: "Meshtastic subreddit",
          href: "https://reddit.com/r/meshtastic",
        },
      ],
    },
  },
  legal: {
    company: "OffGrid LLC",
    location: "Rockville, Maryland, USA",
    line:
      "Designed and assembled in Maryland, USA, by OffGrid LLC. Enclosure 3D-printed in-house. Contains imported electronic components.",
  },
} as const;
