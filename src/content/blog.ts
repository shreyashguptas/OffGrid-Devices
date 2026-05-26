export type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string; id?: string }
  | { type: "subheading"; content: string; id?: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; content: string; cite?: string }
  | { type: "callout"; tone: "info" | "warn" | "tip"; content: string }
  | { type: "code"; code: string; language?: string };

export type BlogAuthor = {
  name: string;
  url?: string;
  sameAs?: string[];
};

type BlogFaqItem = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  heroImageAlt?: string;
  sections: BlogSection[];
  // SEO + schema fields
  seoTitle?: string;
  metaDescription: string;
  keywords?: string[];
  author: BlogAuthor;
  publishedAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
  ogImage?: string;
  faq?: BlogFaqItem[];
  relatedSlugs?: string[];
};

const DEFAULT_AUTHOR: BlogAuthor = {
  name: "Shreyash Gupta",
  sameAs: ["https://x.com/ShreyashGuptas", "https://github.com/shreyashguptas"],
};

export const blogPosts = [
  {
    slug: "best-meshtastic-devices-2026",
    title: "Best Meshtastic Devices 2026: An Honest Comparison Guide",
    seoTitle: "Best Meshtastic Devices 2026: Honest Comparison Guide",
    metaDescription:
      "Comparing the top Meshtastic hardware in 2026: Heltec V3, T-Beam, T-Echo, RAK WisBlock, T-Deck, and OffGrid Beacon 2. Real trade-offs, no hype.",
    keywords: [
      "best Meshtastic device 2026",
      "Meshtastic hardware comparison",
      "Heltec V3 Meshtastic",
      "T-Beam Meshtastic",
      "RAK WisBlock Meshtastic",
      "T-Deck Meshtastic",
      "T-Echo Meshtastic",
      "OffGrid Beacon 2",
      "Meshtastic buyer guide",
      "LoRa mesh radio",
      "off-grid communication device",
    ],
    excerpt:
      "Six devices, honest trade-offs, and a straight answer for each type of user. No forum thread required.",
    date: "May 2026",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    readTime: "9 min read",
    category: "Buyer's Guide",
    author: DEFAULT_AUTHOR,
    image: "/beacon-2/hero-front.png",
    heroImageAlt:
      "OffGrid Beacon 2 Meshtastic LoRa radio next to a smartphone on a trail",
    relatedSlugs: ["meshtastic-vs-lorawan", "why-offgrid"],
    sections: [
      {
        type: "paragraph",
        content:
          "If you've searched \"best Meshtastic device\" in 2026, you've already seen the wall: forum threads that turn into chipset debates, YouTube videos filmed in garages that reach completely different conclusions, and listicles that recommend whatever the author got sent for review. The honest answer is that the best device depends almost entirely on what you're going to do with it and how much friction you can tolerate. This guide gives you a straight read on six real options, including their weaknesses, so you can make a call and move on.",
      },
      { type: "heading", content: "How to choose: the decision tree" },
      {
        type: "paragraph",
        content:
          "Before looking at any device, settle a few questions. They'll cut the list in half.",
      },
      {
        type: "list",
        items: [
          "Do you want to flash firmware yourself, or do you want something that works out of the box? Raw dev boards require firmware setup. Pre-built units don't.",
          "Do you carry an iPhone with MagSafe? That limits the field considerably — most Meshtastic hardware is a clip or a bag item, not a snap-on.",
          "Do you need GPS built into the radio? Most Meshtastic setups rely on your phone's GPS via Bluetooth. A handful of devices have GPS chipsets onboard, which matters if you're deploying nodes without a phone attached.",
          "What's your battery expectation? Meshtastic in low-power mode can run weeks on a few hundred milliamp-hours. More battery is better, but it adds weight.",
          "Will you be typing messages directly on the device, or always pairing to a phone? A keyboard screen like the T-Deck changes everything for keyboard users. For everyone else, it's dead weight.",
          "What's your budget? Raw boards run $25–$45. Finished devices with cases and batteries run $60–$120.",
        ],
      },
      { type: "heading", content: "The shortlist at a glance" },
      {
        type: "paragraph",
        content:
          "The table below is a rough orientation. Each device gets a full breakdown in the sections that follow.",
      },
      {
        type: "orderedList",
        items: [
          "Heltec V3 — bare dev board — ~$25 — tinker projects, first flash",
          "LILYGO T-Beam — board with case options, GPS — ~$45 — GPS-required deployments",
          "Seeed T-Echo — ePaper display, compact — ~$70 — low-power nodes, display-only UI",
          "RAK WisBlock 4631 Starter Kit — modular platform, enclosure — ~$60 — mesh nodes, DIY builds",
          "LILYGO T-Deck — keyboard + screen, standalone — ~$70–$90 — phone-free messaging",
          "OffGrid Beacon 2 — MagSafe, pre-flashed, 3000 mAh — ~$79 — iPhone carry, minimum-friction daily use",
        ],
      },
      { type: "heading", content: "Heltec V3 (and Wireless Stick Lite v3)" },
      {
        type: "paragraph",
        content:
          "The Heltec V3 is the entry point for most people who find Meshtastic through a forum. It's an ESP32-S3 board with an onboard SX1262 LoRa radio and a small OLED display, and it costs around $25 shipped from Aliexpress. Meshtastic runs on it fine. The Wireless Stick Lite is a slimmer sibling that drops the display in exchange for a smaller footprint.",
      },
      {
        type: "paragraph",
        content:
          "The trade-off is everything that isn't the radio itself. There's no battery, no case, and no antenna beyond the stub that ships in the box. You'll spend another $15–$30 sourcing those, plus an afternoon on firmware. If that process sounds fun, it is. If it sounds like homework, the Heltec is not your device. Range on the stock antenna is respectable for line-of-sight urban paths — expect a kilometer or two in practice, more with terrain on your side. The ESP32 power draw is higher than some of the nRF52-based boards, which shortens battery life on equivalent battery packs.",
      },
      { type: "heading", content: "LILYGO T-Beam" },
      {
        type: "paragraph",
        content:
          "The T-Beam has been in the Meshtastic community since nearly the beginning, and it's still the go-to recommendation when someone specifically needs GPS in the radio rather than relying on a phone. The board pairs an ESP32 with a LoRa module and a NEO-6M or NEO-8M GPS chipset depending on which revision you find. That GPS chip is the whole reason to buy it.",
      },
      {
        type: "paragraph",
        content:
          "At around $45 for the board alone, it's a reasonable price for what you get. Like the Heltec, it's still a bare board that needs a case and a battery. The form factor is larger than most — call it a TV remote in footprint — which makes it fine for a jacket pocket or a bike mount, but awkward if you're trying to travel light. Battery life on the GPS variant is shorter than nodes that skip the GPS fix, since the GPS chip is always hunting. For mesh relay nodes where location data matters and phone pairing isn't guaranteed, the T-Beam is hard to argue with.",
      },
      { type: "heading", content: "Seeed T-Echo (and Wio Tracker 1110)" },
      {
        type: "paragraph",
        content:
          "The T-Echo is one of the more distinctive devices in the Meshtastic ecosystem. It uses an nRF52840 processor and a SX1262 LoRa radio inside a compact case with an ePaper display. The ePaper display is the differentiator: it draws almost no power while showing your last received messages, so the standby life on T-Echo is genuinely excellent. The Wio Tracker 1110 from the same family adds GPS and is aimed more at tracking applications.",
      },
      {
        type: "paragraph",
        content:
          "At around $70, you're paying for the nRF52 power efficiency and the finished enclosure. The UI is slower than an OLED — ePaper refresh rates are what they are — and without a keyboard or phone pairing you're mostly reading, not typing. That's fine for relay nodes or for checking messages on a hike. It's not the right tool if you need to send messages in the field without a phone. The T-Echo also ships with firmware, though not always the latest stable Meshtastic build, so some users end up reflashing anyway.",
      },
      {
        type: "heading",
        content: "RAK WisBlock 4631 / RAK Meshtastic Starter Kit",
      },
      {
        type: "paragraph",
        content:
          "RAK Wireless makes modular embedded hardware, and the WisBlock system is their platform for building LoRa applications. The 4631 core module is an nRF52840 plus SX1262 in a small form factor designed to snap into RAK's carrier boards. The Meshtastic Starter Kit bundles the 4631 with a base board, an enclosure, and a battery — around $60 depending on where you source it. The OffGrid Beacon 2 is built on this same platform.",
      },
      {
        type: "paragraph",
        content:
          "The nRF52840 has better power characteristics than the ESP32 family, which translates to longer battery life at equivalent capacity. The RAK kit is a legitimate finished device, not a bare board, and Meshtastic support for it is solid. The enclosure is utilitarian — functional, not something most people would choose to carry as a daily item. If you want the platform without the design work, the starter kit is a reasonable way to get a node in the field quickly.",
      },
      { type: "heading", content: "LILYGO T-Deck" },
      {
        type: "paragraph",
        content:
          "The T-Deck is the outlier on this list. It's a self-contained device with a color LCD, a physical QWERTY keyboard, and a trackball. It runs Meshtastic as a standalone terminal — no phone required to type and send messages. Price sits between $70 and $90 depending on supplier and whether you get the Plus variant with a larger battery.",
      },
      {
        type: "paragraph",
        content:
          "Who is the T-Deck for? People who genuinely want to send longer messages without pulling out a phone. Field coordinators, event staff, anyone running a net where typing matters. The form factor is closer to a small PDA than a radio, which means it doesn't pocket as easily and the keyboard takes some adjustment. Battery life is shorter than passive relay nodes — the screen and keyboard draw real power. For the specific use case it targets, nothing else on this list competes. For everyone else, it's more device than necessary.",
      },
      { type: "heading", content: "OffGrid Beacon 2" },
      {
        type: "paragraph",
        content:
          "The OffGrid Beacon 2 is built on the RAK WisBlock 4631, so the core radio and processor are the same proven components you'd find in the RAK starter kit. What OffGrid adds is a finished product around that core: a 3000 mAh battery, a MagSafe magnet ring with N48H neodymium magnets, a replaceable external SMA antenna, a physical on/off switch, sun-tolerant filament, a belt clip, and firmware that's already on the device when you open the box. You pair it to the Meshtastic app over Bluetooth and you're on the mesh. There's nothing to flash.",
      },
      {
        type: "paragraph",
        content:
          "The MagSafe integration is the specific reason to buy it if you carry an iPhone. It snaps to the back of your phone, stays put during normal carry, and comes off cleanly. That keeps the radio with your phone instead of at the bottom of a bag. For Android users, the magnet still works as a general attachment point with a compatible case. The 3000 mAh battery runs weeks in standby on the Meshtastic duty cycle. Range depends on terrain — in open ground with the stock whip antenna, a couple of kilometers is realistic; more with an upgraded antenna or elevated placement.",
      },
      {
        type: "paragraph",
        content:
          "Where Beacon 2 doesn't win: it has no GPS chipset of its own, so it relies on your phone's GPS via Bluetooth for location data. If you're deploying a standalone node in a location without a phone, the T-Beam is a better fit. Beacon 2 also doesn't have a screen or keyboard, so messaging happens through the Meshtastic app. That's the intended workflow — phone as the interface, Beacon as the radio — but if you want a phone-free terminal, look at the T-Deck instead.",
      },
      { type: "heading", content: "The honest verdict" },
      {
        type: "paragraph",
        content:
          "There is no single best Meshtastic device. Anyone who says otherwise is either writing for one use case or has a device to sell. The right answer depends on what you're optimizing for. GPS in the radio, or relying on your phone? Phone-free messaging, or phone-as-interface? Daily carry on an iPhone, or a mesh relay node on a shelf? Once you answer those questions, the list narrows fast. The devices here all run Meshtastic reliably — the differences are in form factor, power architecture, and how much assembly work you're signing up for.",
      },
      { type: "heading", content: "What we'd skip" },
      {
        type: "paragraph",
        content:
          "A few devices that came up in research didn't make this list. The Station G2 from Rokland is a fixed gateway unit — perfectly fine hardware, but it's a mounted base station, not a field device, so it's solving a different problem. First-generation ESP32 boards like the Heltec V2 or original T-Beam still work with Meshtastic but receive slower firmware updates, and the newer revisions are cheap enough that starting with old silicon doesn't make much sense. Generic \"Meshtastic ready\" boards from smaller sellers on Amazon tend to use the same chipsets with worse antenna implementations — the price looks attractive until you're troubleshooting RF performance.",
      },
      { type: "heading", content: "Which device for which person" },
      {
        type: "orderedList",
        items: [
          "If you carry an iPhone with MagSafe and want a mesh radio that travels with your phone rather than in a separate bag, get OffGrid Beacon 2.",
          "If you want GPS built into the radio itself — for standalone nodes or tracking use cases — get the LILYGO T-Beam.",
          "If you want the lowest possible power draw for a long-life relay node with a display, look at the Seeed T-Echo.",
          "If you want to type messages without a phone in your hand, the LILYGO T-Deck is the only device on this list with a real keyboard.",
          "If you want a finished node on the RAK platform without the OffGrid packaging, the RAK WisBlock Starter Kit works and is widely stocked.",
          "If you want to flash your own firmware and don't mind sourcing a battery and case, the Heltec V3 is the cheapest way onto the mesh.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Meshtastic legal to use in the United States?",
        answer:
          "Yes. Meshtastic devices operating in the US use the 915 MHz ISM band, which is unlicensed and available for low-power transmissions without a license. You do need to set your region correctly in the Meshtastic app so the device stays within legal power and frequency limits. Using a region setting that doesn't match your location can put you outside legal parameters.",
      },
      {
        question: "What range can I actually expect from a Meshtastic device?",
        answer:
          "It varies more than most guides admit. In flat open terrain with clear line of sight, a few kilometers is realistic with a stock whip antenna. In dense urban environments with buildings blocking the signal path, you might see a few hundred meters. Elevated placement — a rooftop, a ridge, a second-story window — makes a significant difference. The theoretical maximums you'll read in spec sheets assume conditions that rarely exist in the field. Budget for the realistic range, not the best-case one.",
      },
      {
        question: "Do I need a ham radio license to use Meshtastic?",
        answer:
          "No. Meshtastic devices operating at legal ISM-band power levels on the correct regional frequencies don't require a ham license. The unlicensed ISM bands exist specifically for this kind of low-power data communication. A ham license would let you transmit at higher power on licensed frequencies, but standard Meshtastic use doesn't require one.",
      },
      {
        question: "Do Meshtastic devices work with iPhone?",
        answer:
          "Yes. The official Meshtastic app is available on iOS and works over Bluetooth with any Meshtastic-compatible device. The OffGrid Beacon 2 was specifically designed around iPhone carry via MagSafe, but any Bluetooth-capable Meshtastic device pairs with iOS. Android is also fully supported.",
      },
      {
        question:
          "Which Meshtastic devices work without flashing firmware yourself?",
        answer:
          "The OffGrid Beacon 2 ships pre-flashed and ready to pair. The Seeed T-Echo ships with firmware, though users sometimes reflash for the latest build. The RAK Meshtastic Starter Kit ships with firmware. Most raw dev boards like the Heltec V3 and LILYGO T-Beam ship without Meshtastic installed and require you to flash it using the Meshtastic web flasher or CLI.",
      },
      {
        question: "How much does a basic Meshtastic setup cost?",
        answer:
          "The minimum for a working mesh is two nodes. At the entry level, two Heltec V3 boards with batteries and cases can come together for around $80–$100 total with some sourcing work. Pre-built options like two OffGrid Beacon 2 units run around $160, but arrive ready to use with no assembly. The right number depends on what you're willing to trade in time versus money.",
      },
      {
        question: "Can I add an OffGrid Beacon 2 to an existing Meshtastic mesh?",
        answer:
          "Yes. Beacon 2 runs standard Meshtastic firmware and communicates with any other Meshtastic-compatible node in range, regardless of the hardware brand. Set the same channel name and pre-shared key as your existing mesh and it joins automatically. There's no proprietary pairing process.",
      },
      {
        question: "What is MeshCore and how does it relate to Meshtastic?",
        answer:
          "MeshCore is a separate firmware project for LoRa mesh networking that targets some of the same hardware — particularly nRF52-based boards like the RAK 4631. It takes different design decisions than Meshtastic, particularly around routing and client architecture. The two protocols are not compatible with each other on air, meaning a MeshCore node and a Meshtastic node can't exchange messages directly. MeshCore is newer and has a smaller community. Meshtastic has broader hardware support, a larger user base, and more active firmware development as of mid-2026.",
      },
    ],
  },
  {
    slug: "meshtastic-vs-lorawan",
    title:
      "Meshtastic vs LoRaWAN: What They Actually Do (and Why You'd Pick One Over the Other)",
    seoTitle: "Meshtastic vs LoRaWAN: The Actual Difference Explained",
    metaDescription:
      "LoRa, LoRaWAN, Meshtastic — three terms, two protocols, one radio chip. Here's what each one does and how to pick the right one for your project.",
    keywords: [
      "Meshtastic vs LoRaWAN",
      "LoRa vs LoRaWAN",
      "what is Meshtastic",
      "what is LoRaWAN",
      "LoRa mesh network",
      "Meshtastic explained",
      "LoRaWAN gateway",
      "off-grid mesh radio",
      "Meshtastic hardware",
      "LoRa radio protocol",
    ],
    excerpt:
      "LoRa is the radio. LoRaWAN and Meshtastic are two completely different networks built on top of it. Here's what separates them and how to pick the right one.",
    date: "May 2026",
    publishedAt: "2026-05-18",
    updatedAt: "2026-05-18",
    readTime: "8 min read",
    category: "Explainer",
    author: DEFAULT_AUTHOR,
    image: "/beacon-2/hero-front.png",
    heroImageAlt:
      "OffGrid Beacon 2 LoRa mesh radio against a topographic map background",
    relatedSlugs: ["best-meshtastic-devices-2026", "why-offgrid"],
    sections: [
      {
        type: "paragraph",
        content:
          "If you've gotten this far in your LoRa research, you've hit the wall where every glossary calls these two things 'LoRa networks' and walks away. The datasheets call the chip LoRa. The Alliance calls the protocol LoRaWAN. The GitHub repo calls the firmware Meshtastic. Nobody explains which layer is which, and so people spend half a forum thread arguing past each other about range and gateways and encryption when they're actually describing two different systems that share the same radio hardware. This post is the one that does the explaining.",
      },
      { type: "heading", content: "The one-sentence version" },
      {
        type: "orderedList",
        items: [
          "LoRa — a radio modulation technique (the physics). Chirp spread spectrum on sub-GHz ISM bands. Made by Semtech.",
          "LoRaWAN — a MAC protocol and network architecture that uses LoRa radios. Star-of-stars topology. Gateways, network servers, application servers. Managed by the LoRa Alliance.",
          "Meshtastic — open-source firmware that also uses LoRa radios. Peer-to-peer mesh topology. No gateways, no network servers, no infrastructure required.",
        ],
      },
      {
        type: "paragraph",
        content:
          "LoRa is the engine. LoRaWAN and Meshtastic are two different vehicles built around it. They can run on the exact same chip — an SX1262, for example — and produce completely incompatible networks. The difference is software, not silicon.",
      },
      { type: "heading", content: "LoRa: the radio layer they share" },
      {
        type: "paragraph",
        content:
          "LoRa stands for Long Range. It's a proprietary spread-spectrum modulation technique developed by Cycleo and acquired by Semtech in 2012. The key idea is chirp spread spectrum: the signal is spread across a wide bandwidth using frequency-sweeping chirps, which makes it unusually robust against noise and multipath interference. The tradeoff is throughput. A typical LoRa link moves a few hundred bytes per second at best — enough for a sensor reading or a short text message, not enough for voice or video.",
      },
      {
        type: "paragraph",
        content:
          "LoRa operates in the unlicensed sub-GHz ISM bands: 868 MHz in Europe, 902–928 MHz in North America, 433 MHz and AS923 variants in parts of Asia and Oceania. These bands are shared with other devices under regional duty-cycle and power limits, which is why both LoRaWAN and Meshtastic have mechanisms to avoid hammering the air constantly. LoRa itself is just the modulation. It says nothing about how packets are addressed, routed, encrypted, or acknowledged. That's the job of whatever protocol sits on top of it.",
      },
      { type: "heading", content: "LoRaWAN: infrastructure at scale" },
      {
        type: "paragraph",
        content:
          "LoRaWAN is a network protocol specification maintained by the LoRa Alliance. The architecture is a star-of-stars: end devices talk to gateways, gateways forward packets to a network server over IP, and the network server routes traffic to your application server. End devices are almost always simple sensors or actuators. The intelligence lives in the network server.",
      },
      {
        type: "paragraph",
        content:
          "A few things that follow from that architecture. Gateways are passive: they forward everything they hear without the device knowing which gateway received it. The network server deduplicates packets when multiple gateways pick up the same transmission. Join procedures (OTAA or ABP) handle device authentication. Device traffic is encrypted — session keys are derived during the join, and the spec mandates AES-128 for payload encryption and MIC verification. Power consumption can be very low because end devices spend almost all their time sleeping and only wake to transmit, then go back to sleep immediately. They don't route packets for anyone else.",
      },
      {
        type: "paragraph",
        content:
          "The catch is the infrastructure dependency. A LoRaWAN deployment needs at least one gateway in range, that gateway needs an IP connection to reach a network server, and the network server needs to be running somewhere. You can use a public network like The Things Network for free up to a point, or you can run your own. Either way, the infrastructure has to exist before a single end device can get a message out.",
      },
      { type: "heading", content: "Meshtastic: mesh without the infrastructure" },
      {
        type: "paragraph",
        content:
          "Meshtastic is an open-source firmware project started in 2020. It uses the same LoRa chips as LoRaWAN but implements an entirely different network model: peer-to-peer mesh routing. There are no gateways. There are no network servers. Every node in range of every other node forms a flat mesh, and messages hop through the mesh toward their destination without any central coordination.",
      },
      {
        type: "paragraph",
        content:
          "Routing is handled by a managed flood algorithm with a hop limit. Each packet carries a hop count; nodes decrement it and retransmit until either the hop limit reaches zero or the destination acknowledges receipt. More recent builds have introduced more selective routing to reduce channel congestion on dense networks, but the core premise remains: add a node anywhere in the mesh and it immediately starts routing traffic for everyone else nearby. No configuration, no join procedure, no server.",
      },
      {
        type: "paragraph",
        content:
          "Channels in Meshtastic are AES-256 encrypted with a shared pre-shared key. The default channel ships with a known PSK (LongFast) that any Meshtastic node can join. Private channels use a key you generate and share out-of-band. There is no certificate authority and no network-level authentication — if you have the key, you're in the channel. Nodes pair to the Meshtastic app over Bluetooth for configuration and messaging. The whole thing can run with zero internet connectivity, which is the point.",
      },
      {
        type: "callout",
        tone: "info",
        content:
          "MeshCore is a separate open-source firmware project that also runs on LoRa hardware and implements a mesh network, but with different routing decisions and a different protocol. It is not Meshtastic and the two are not compatible. If you see both mentioned in the same thread, they are not interchangeable.",
      },
      { type: "heading", content: "Side by side" },
      {
        type: "orderedList",
        items: [
          "Infrastructure — LoRaWAN requires gateways + network server. Meshtastic requires nothing except at least two nodes.",
          "Topology — LoRaWAN is star-of-stars (end devices to gateways). Meshtastic is a peer-to-peer mesh (every node routes).",
          "Range — LoRaWAN gateway-to-device links can be very long (10–15 km in good conditions) because gateways run high-sensitivity receivers with proper antennas and backhaul. Meshtastic node-to-node links are typically 1–10 km depending on terrain; range can extend with more hops.",
          "Latency — LoRaWAN: low and predictable for uplinks; downlinks are slower because network server must schedule a receive window. Meshtastic: variable, depends on hop count and channel congestion.",
          "Throughput — Both are low. LoRaWAN end-device duty cycle limits constrain how often you can send. Meshtastic's flood routing amplifies channel usage with every additional hop.",
          "Encryption — LoRaWAN uses AES-128 session keys negotiated per-device. Meshtastic uses AES-256 channel keys shared by all users of that channel.",
          "Cost to deploy — LoRaWAN: gateway hardware plus ongoing server or network subscription. Meshtastic: just the nodes. No gateway, no subscription, no registration.",
          "Regulatory compliance — Both operate on the same ISM bands and are subject to the same duty-cycle rules. A properly configured Meshtastic node and a properly configured LoRaWAN end device are both legal in their regions.",
          "Ideal payload — LoRaWAN: sensor telemetry, small uplink messages from many devices. Meshtastic: text messaging, position sharing, and small data packets between people.",
        ],
      },
      { type: "heading", content: "When LoRaWAN is the right call" },
      {
        type: "paragraph",
        content:
          "LoRaWAN makes sense when you have infrastructure you can deploy or access, the devices are largely one-way senders, and you need to scale to many endpoints without manual coordination. Concrete cases where LoRaWAN is the correct answer:",
      },
      {
        type: "list",
        items: [
          "Agricultural monitoring — soil moisture sensors, weather stations, and livestock trackers spread across a large property feeding into a central dashboard. One gateway covers the farm.",
          "Smart city deployments — parking sensors, utility meters, and environmental monitoring where the city already operates or leases gateway infrastructure.",
          "Industrial IoT — factory floor sensors, asset trackers in a warehouse, or cold-chain monitors that need guaranteed uplinks to a backend system.",
          "Building automation — sensors and actuators inside a structure where a single gateway can reach everything and the data needs to land in a cloud application.",
          "Any scenario where you need more than a few dozen devices, need reliable downlink (commands to the device), or need to integrate with existing cloud infrastructure.",
        ],
      },
      {
        type: "paragraph",
        content:
          "The common thread: LoRaWAN is an IoT network. It's designed to move small amounts of sensor data from many devices to a backend system. It is not designed for people messaging each other.",
      },
      { type: "heading", content: "When Meshtastic is the right call" },
      {
        type: "paragraph",
        content:
          "Meshtastic makes sense when the people using the network are also the infrastructure, when there's no existing gateway coverage, and when the use case is human communication rather than machine telemetry. Cases where Meshtastic is the right answer:",
      },
      {
        type: "list",
        items: [
          "Backcountry hiking and backpacking — a group spread across a trail where everyone carries a node. No cell, no satellite subscription required. Text messages and GPS positions hop across the group.",
          "Off-grid homesteads and rural properties — a small mesh with nodes at the house, barn, and gate. Walkie-talkie replacement that works when the cell signal doesn't reach.",
          "Events without infrastructure — festivals, races, and large outdoor gatherings where cell towers saturate. Each staff member with a node extends the mesh.",
          "Emergency preparedness — a neighborhood or family group with nodes staged at key locations. The mesh works even if cell and internet go down.",
          "Search and rescue support — teams can share GPS positions and short messages without relying on repeaters or cell coverage in remote terrain.",
          "Any scenario where there is no existing gateway, where the users are mobile and distributed, or where infrastructure would be impractical to deploy.",
        ],
      },
      {
        type: "paragraph",
        content:
          "The common thread: Meshtastic is a people network. It's designed for humans to communicate with each other in the absence of normal infrastructure. It is not designed to scale to thousands of endpoints or integrate with cloud backends without additional bridging.",
      },
      { type: "heading", content: "Can you run both on the same hardware?" },
      {
        type: "paragraph",
        content:
          "Yes, but not simultaneously on a single device. An SX1262-based board can run Meshtastic firmware today, be erased and reflashed with a LoRaWAN stack tomorrow, and run Meshtastic again next week. The radio hardware is protocol-agnostic. What you cannot do is run both protocols at the same time on one device — the radio can only be in one mode, doing one thing, tuned to one configuration. A single node must pick one role.",
      },
      {
        type: "paragraph",
        content:
          "There are projects and custom builds that attempt to bridge the two networks — a Meshtastic node that also acts as a LoRaWAN gateway, forwarding selected traffic to a network server, or vice versa. These exist but are not standard deployments and require significant custom configuration. For most users, the right answer is: pick the protocol that matches the use case, equip every participant with compatible hardware, and don't try to bridge the two unless you have a specific reason.",
      },
      { type: "heading", content: "Why we chose Meshtastic for Beacon" },
      {
        type: "paragraph",
        content:
          "The people who buy an OffGrid Beacon 2 are not deploying sensor networks. They're hiking with friends, building a family backup plan, or heading somewhere their phone stops being useful. They need to text the person ahead of them on the trail. They need to share a GPS pin when someone gets turned around. They do not need a gateway, a network server account, or a cloud dashboard. Meshtastic solves the problem without requiring any of that. Pair a Beacon over Bluetooth, share a channel key with your group, and the mesh is running before you've left the trailhead parking lot.",
      },
      {
        type: "paragraph",
        content:
          "That's not a knock on LoRaWAN — it's an excellent protocol for what it does, and if you're managing 200 soil sensors across an orchard you should probably use it. But OffGrid Beacon is for communication between people, and for that, a decentralized mesh with no infrastructure dependency is the right answer. The OffGrid Beacon 2 ships pre-flashed with Meshtastic, ready to join any Meshtastic mesh in range, including nodes your group built themselves.",
      },
    ],
    faq: [
      {
        question: "Is LoRaWAN free to use?",
        answer:
          "The LoRaWAN specification is free to read and implement. The radio bands it operates on are unlicensed and free to use within regional power and duty-cycle limits. However, a LoRaWAN deployment requires gateway hardware and a network server, both of which cost money to run. Public networks like The Things Network offer free tiers, but those come with data limits and fair-use policies. Running your own private LoRaWAN network requires at minimum a gateway (typically $100–$500+) and a server instance.",
      },
      {
        question: "Do I need a gateway for Meshtastic?",
        answer:
          "No. That's the fundamental difference between Meshtastic and LoRaWAN. Meshtastic is a peer-to-peer mesh — every node communicates directly with every other node in range, and packets hop across the mesh without any gateway or server. Two Meshtastic nodes and zero internet connectivity is a working network.",
      },
      {
        question: "Can my LoRaWAN device run Meshtastic?",
        answer:
          "It depends on the hardware. If the device runs on a supported LoRa chipset (such as the SX1262, SX1276, or similar) and the board is compatible with Meshtastic firmware, you may be able to reflash it. Many popular DIY boards support both. However, commercially deployed LoRaWAN end devices are often locked or use firmware that is not user-replaceable, and production LoRaWAN sensor hardware is rarely designed for Meshtastic. Check the Meshtastic device compatibility list before assuming a given board will work.",
      },
      {
        question:
          "What is the range difference between Meshtastic and LoRaWAN?",
        answer:
          "Both use the same LoRa modulation, so raw link budget is similar. The architectural difference is what matters in practice. A LoRaWAN gateway is typically installed in a high location with a quality antenna, which can achieve 10–15 km or more to an end device in open terrain. A Meshtastic node is a handheld device carried by a person, which typically achieves 1–5 km node-to-node in mixed terrain. Meshtastic compensates for shorter individual hops by relaying through additional nodes — a five-node chain can cover the same distance as a single LoRaWAN gateway, just with added latency.",
      },
      {
        question: "Is Meshtastic legal to use in the EU?",
        answer:
          "Yes, when configured correctly. Meshtastic nodes operating in the EU should be set to the EU_868 region in the app, which configures the radio to use the 868 MHz ISM band with compliant duty-cycle limits (typically 1% in the default sub-band). The Meshtastic firmware respects these limits. Operating with the wrong region setting or at non-compliant power levels would be illegal, but a correctly configured node is legal for unlicensed operation under the EU Radio Equipment Directive.",
      },
      {
        question: "What is The Things Network and should I use it?",
        answer:
          "The Things Network (TTN) is a free, community-operated public LoRaWAN network. If you have a LoRaWAN project and there is TTN gateway coverage in your area, TTN lets you skip running your own network server. It is a good option for prototyping and small deployments. It is not useful for Meshtastic, which doesn't use the LoRaWAN protocol at all. If you're using Meshtastic, TTN is not relevant to your setup.",
      },
      {
        question: "Does Meshtastic have a network server?",
        answer:
          "No. There is no Meshtastic network server, central coordinator, or cloud backend required for basic operation. The mesh is fully distributed. There is an optional MQTT integration that lets you bridge a Meshtastic node to the internet for remote monitoring or extended mesh coverage via the internet, but it is optional. The core mesh works with zero internet connectivity and zero cloud accounts.",
      },
      {
        question: "Which is better for hiking — Meshtastic or LoRaWAN?",
        answer:
          "Meshtastic, without much debate. LoRaWAN requires gateways, and there are essentially no LoRaWAN gateways in the backcountry. Even if there were, LoRaWAN is not designed for person-to-person messaging — it's designed for sensor telemetry. Meshtastic runs entirely on the nodes your group carries. Everyone in the party has a node, the nodes form a mesh automatically, and messages and GPS positions move across the group without any external infrastructure. If you're looking at LoRa hardware for hiking, you're looking at Meshtastic.",
      },
    ],
  },
  {
    slug: "why-offgrid",
    title: "Why OffGrid: the gear, the people, and what's coming next",
    seoTitle:
      "Why OffGrid: Mesh Radios for When the Towers Aren't There",
    metaDescription:
      "OffGrid builds pre-flashed Meshtastic LoRa mesh radios for hikers, preppers, and anyone who wants a backup when cell service goes sideways. Here's how we started, what Beacon 2 ships with today, and where we're headed.",
    keywords: [
      "OffGrid Devices",
      "OffGrid Beacon",
      "Beacon 2",
      "MagSafe Meshtastic device",
      "LoRa mesh radio",
      "off-grid communication",
      "Meshtastic hardware",
      "backup comms",
    ],
    excerpt:
      "OffGrid builds mesh radios for the moments when the towers aren't there. Here's how we started, what we ship today, and where we're going.",
    date: "May 2026",
    publishedAt: "2026-05-18",
    readTime: "7 min read",
    category: "Story",
    author: DEFAULT_AUTHOR,
    image: "/beacon-2/hero-front.png",
    heroImageAlt: "OffGrid Beacon 2 MagSafe LoRa mesh radio with antenna",
    sections: [
      {
        type: "paragraph",
        content:
          "The grid is usually fine. Until it isn't. A storm takes the towers down. A festival eats every band. A hike drops you behind a ridge and your bars go to zero. OffGrid is for those moments, and for people who'd rather plan for them than be surprised.",
      },
      { type: "heading", content: "What OffGrid makes" },
      {
        type: "paragraph",
        content:
          "We build small LoRa mesh radios that run Meshtastic out of the box. No flashing. No firmware homework. Snap one onto the back of your phone, pair it over Bluetooth, pick a channel, and you're on a peer-to-peer network that works without a SIM or a tower.",
      },
      { type: "heading", content: "Why we started" },
      {
        type: "paragraph",
        content:
          "Meshtastic is one of the better pieces of open hardware to come out in the last decade, but using it has historically meant a weekend of work: pick a board, source a battery, find an antenna, flash firmware, design a case, hope it doesn't melt in the sun. That's a fun project. It isn't a product. We started OffGrid to ship the finished version, so a family of four or a backcountry crew can hand one around without a screwdriver or a tutorial open in another tab.",
      },
      { type: "heading", content: "Beacon 1, and what it taught us" },
      {
        type: "paragraph",
        content:
          "Beacon 1 went out to 28+ early customers in 2026. It worked. People liked that they could carry a real mesh radio on a MagSafe phone instead of clipping a tactical brick to their belt. They also told us what they wanted next: stronger magnets so it stops slipping off, a real on/off switch, a bigger battery, an antenna you can swap. Every one of those notes turned into a Beacon 2 spec.",
      },
      { type: "heading", content: "Beacon 2: what shipping today looks like" },
      {
        type: "paragraph",
        content:
          "Beacon 2 is the answer to that feedback. The changes from v1 aren't cosmetic:",
      },
      {
        type: "list",
        items: [
          "3000 mAh battery, up from 1800 mAh in v1. Weeks of standby on the Meshtastic duty cycle.",
          "N48H neodymium magnet ring that actually holds onto MagSafe phones.",
          "Physical on/off switch on the top edge.",
          "Replaceable external SMA antenna. Pack the stock whip for the trail; screw on a higher-gain one at camp.",
          "Sun-tolerant filament instead of PLA, so the shell doesn't soften in direct sun.",
          "A precision pinhole that lets the internal charging LED show through. You can finally see when it's charging.",
          "Recessed reset button you can press with a fingertip. No SIM tool required.",
          "Belt clip in the box, magnet-retained, no hinge to break.",
          "Packaging that doubles as a lay-flat node display and a kickstand.",
          "An emergency whistle, because weight is free when it's already in the tray.",
        ],
      },
      { type: "heading", content: "What you can expect from OffGrid" },
      {
        type: "paragraph",
        content:
          "A few things we try to get right with every product.",
      },
      {
        type: "orderedList",
        items: [
          "Our hardware ships ready. It arrives flashed, charged, and on the mesh in under five minutes, because it really is that simple and that fast. If you want to tinker, the door is open. If you don't, you never have to know it's there.",
          "We build on the open Meshtastic protocol. Beacon talks to every other Meshtastic node in range, including the one your neighbor flashed himself. No walled garden.",
          "We iterate on what customers tell us. The v1 to v2 list above isn't marketing copy. It's a punch list from people who carried Beacon 1 for several months.",
        ],
      },
      { type: "heading", content: "What's next" },
      {
        type: "paragraph",
        content:
          "The roadmap is more radios and more accessories: antennas, mounts, power banks, and the kind of small parts that always take longer to source than they should. Beacon is the first OffGrid product line. There will be others. If you want to see what's coming next, follow along. If you have ideas for what's missing, tell us.",
      },
      { type: "heading", content: "Where to start today" },
      {
        type: "paragraph",
        content:
          "Pick up Beacon 2, hand one to the person you most want to stay in touch with when service drops, and set a shared channel. Practice a 30-second check-in once a month. That's the whole plan. The rest is range, terrain, and getting used to a network that works without anyone's permission.",
      },
    ],
    faq: [
      {
        question: "What does OffGrid make?",
        answer:
          "Pre-flashed Meshtastic LoRa mesh radios designed for daily carry. Beacon 2 is the current product — a MagSafe-friendly radio with a 3000 mAh battery, replaceable SMA antenna, and weeks of standby on a single charge.",
      },
      {
        question: "Who is OffGrid for?",
        answer:
          "Hikers, preppers, event organizers, families building a backup comms plan, and anyone who'd rather not depend on cell towers for staying in touch. If you spend time off-grid or want a fallback when the grid fails, Beacon is built for you.",
      },
      {
        question: "Do I need a license to use an OffGrid radio?",
        answer:
          "No. Beacon 2 operates on the unlicensed 915 MHz ISM band in the United States at legal power. Set the correct region in the Meshtastic app and you're compliant. Other regions are supported via the same setting.",
      },
      {
        question: "What changed from Beacon 1 to Beacon 2?",
        answer:
          "Bigger battery (3000 mAh), stronger N48H magnets, a physical on/off switch, a replaceable external SMA antenna, sun-tolerant filament, a visible charging LED, a recessed reset button, an included belt clip, display-stand packaging, and an emergency whistle in the box.",
      },
      {
        question: "Where do I buy?",
        answer:
          "Beacon 2 ships direct from offgridevices.com. Pair it over Bluetooth with the official Meshtastic app on iOS or Android and you're on the mesh.",
      },
    ],
  },
] satisfies BlogPost[];

// Exported as BlogPost[] so optional fields (ogImage, faq, updatedAt, etc.)
// are accessible on every post regardless of which posts currently set them.
export const allBlogPosts: BlogPost[] = blogPosts;
const posts: BlogPost[] = allBlogPosts;

export function getBlogPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  if (post.relatedSlugs && post.relatedSlugs.length > 0) {
    const mapped = post.relatedSlugs
      .map((slug) => getBlogPost(slug))
      .filter((p): p is BlogPost => Boolean(p) && p?.slug !== post.slug);
    if (mapped.length > 0) return mapped.slice(0, limit);
  }
  return posts.filter((p) => p.slug !== post.slug).slice(0, limit);
}
