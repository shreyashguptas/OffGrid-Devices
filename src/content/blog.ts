import { link1Content } from "./link1";

export type BlogSection =
  | { type: "paragraph" | "heading"; content: string }
  | { type: "list" | "orderedList"; items: string[] };

export type BlogAuthor = {
  name: string;
  url?: string;
};

export type BlogFaqItem = {
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

const DEFAULT_AUTHOR: BlogAuthor = { name: "Shreyash Gupta" };

export const blogPosts = [
  {
    slug: "getting-started-with-meshtastic",
    title: "OffGrid Beacon 1 already runs Meshtastic - here's how to go live",
    seoTitle: "Meshtastic Setup Guide for OffGrid Beacon 1 (MagSafe LoRa Radio)",
    metaDescription:
      "Set up your OffGrid Beacon 1 MagSafe LoRa radio on the Meshtastic mesh in under 10 minutes: pair over Bluetooth, pick a region, choose a channel, and you're live.",
    keywords: [
      "Meshtastic setup",
      "pre-configured Meshtastic",
      "MagSafe Meshtastic device",
      "LoRa mesh radio setup",
      "Meshtastic pairing guide",
      "off-grid communication device",
      "Meshtastic for iPhone",
      "no-flash Meshtastic",
      "OffGrid Beacon 1 setup",
    ],
    excerpt:
      "Meshtastic is open firmware you can install on other hardware, but Beacon 1 ships from OffGrid with it ready. Unbox, pair, and hit the mesh without the firmware homework.",
    date: "January 2026",
    publishedAt: "2026-01-15",
    updatedAt: "2026-04-16",
    readTime: "8 min read",
    category: "Guides",
    author: DEFAULT_AUTHOR,
    image: link1Content.summary.productImage.src,
    sections: [
      {
        type: "paragraph",
        content:
          "OffGrid builds mesh hardware for when the grid isn't reliable: hikes, events, travel, or backup comms when towers are overloaded or down. Beacon 1 is our MagSafe-friendly radio, and it already ships ready to join a Meshtastic mesh.",
      },
      { type: "heading", content: "Meshtastic in one minute" },
      {
        type: "paragraph",
        content:
          "Meshtastic is open-source software that turns compatible LoRa hardware into a long-range, low-power mesh network. Nodes pass messages hop by hop with no SIM, no carrier, and no Wi-Fi required.",
      },
      { type: "heading", content: "What you skip with Beacon 1" },
      {
        type: "paragraph",
        content:
          "Beacon 1 ships from OffGrid with Meshtastic already on the radio. You don't hunt down a board, flash firmware, or debug a first boot before you've sent a single message. The job left to you is the useful part: pair it and use it.",
      },
      {
        type: "list",
        items: [
          "No DIY firmware install path required to get on the air",
          "Compatible with other Meshtastic nodes in range",
          "Focus on channels, range, and your group instead of setup friction",
        ],
      },
      { type: "heading", content: "Step 1: Download the Meshtastic app" },
      {
        type: "paragraph",
        content:
          "Install the official app on the phone you'll use with Beacon 1.",
      },
      { type: "list", items: ["iOS: App Store", "Android: Google Play"] },
      { type: "heading", content: "Step 2: Pair your Beacon 1" },
      {
        type: "paragraph",
        content:
          "Bluetooth links your phone to the radio. With Meshtastic already on Beacon 1, you're connecting rather than provisioning from scratch.",
      },
      {
        type: "orderedList",
        items: [
          "Enable Bluetooth on your phone",
          "Open the Meshtastic app",
          'Tap "+" to add a device',
          "Choose your Beacon 1 from the list and complete pairing",
        ],
      },
      { type: "heading", content: "Step 3: Set region, name, and channel" },
      {
        type: "paragraph",
        content:
          "After pairing, set your region, choose a display name, and align channel settings with the people you want to talk to. Match channels with your group so everyone hears the same traffic.",
      },
      { type: "heading", content: "You're on the mesh" },
      {
        type: "paragraph",
        content:
          "That's it. You're participating in the same decentralized mesh as other Meshtastic users nearby. Range depends on terrain, antennas, and how many nodes relay between you and your destination, but the software hurdle is already behind you.",
      },
    ],
    faq: [
      {
        question: "Do I need to flash Meshtastic firmware on OffGrid Beacon 1?",
        answer:
          "No. OffGrid Beacon 1 ships with Meshtastic firmware pre-installed. You do not need to download firmware, connect a USB cable to a computer, or use a web flasher. Pair the radio over Bluetooth from the Meshtastic app and you are on the mesh.",
      },
      {
        question: "Does Beacon 1 work with iPhone and MagSafe?",
        answer:
          "Yes. Beacon 1 is MagSafe-compatible and works with the official Meshtastic iOS app over Bluetooth 5.0. It snaps to MagSafe-ready iPhones and most MagSafe cases, including popular third-party cases such as dbrand.",
      },
      {
        question: "What range can I expect from Beacon 1?",
        answer:
          "Line-of-sight range on LoRa is up to 10+ km for Beacon 1, depending on terrain, antenna orientation, and interference. Real-world range in suburban or forested terrain is shorter, but mesh routing extends effective coverage as more nodes join.",
      },
      {
        question: "Do I need a license to use Meshtastic in the United States?",
        answer:
          "No license is required. Meshtastic operates on the unlicensed 915 MHz ISM band in the US. Always select the correct region setting in the Meshtastic app so your Beacon 1 complies with local regulations on frequency and duty cycle.",
      },
      {
        question: "Can I talk to other Meshtastic users near me with Beacon 1?",
        answer:
          "Yes. Beacon 1 uses the standard Meshtastic protocol, so it can exchange messages with any other Meshtastic node that shares the same region, frequency channel, and encryption key.",
      },
    ],
    relatedSlugs: [
      "what-is-lora-mesh-off-grid-communication-explained",
      "meshtastic-vs-walkie-talkies-frs-gmrs",
      "backup-comms-when-cell-towers-go-down",
    ],
  },
  {
    slug: "what-is-lora-mesh-off-grid-communication-explained",
    title: "What Is LoRa Mesh? Off-Grid Communication Explained",
    seoTitle: "What Is LoRa Mesh? Off-Grid Communication Explained",
    metaDescription:
      "LoRa mesh networks let phones and radios pass messages hop by hop without cell towers or Wi-Fi. Here's how the technology works and where it fits.",
    keywords: [
      "what is LoRa",
      "LoRa mesh network",
      "off-grid communication",
      "how does Meshtastic work",
      "low-power radio mesh",
      "LoRa vs Wi-Fi",
      "mesh networking explained",
    ],
    excerpt:
      "LoRa mesh networks pass messages hop by hop with no SIM, no carrier, and no Wi-Fi. Here's a plain-English explanation of how it works and when to reach for it.",
    date: "February 2026",
    publishedAt: "2026-02-05",
    readTime: "6 min read",
    category: "Education",
    author: DEFAULT_AUTHOR,
    image: link1Content.homeGalleryCards[0].image,
    sections: [
      {
        type: "paragraph",
        content:
          "LoRa mesh is a way for small, low-power radios to talk to each other across long distances without relying on cell towers, Wi-Fi routers, or satellites. If you want off-grid communication that still works when infrastructure is overloaded or missing, it's one of the most practical options available today.",
      },
      { type: "heading", content: "LoRa: the long-range radio layer" },
      {
        type: "paragraph",
        content:
          "LoRa (Long Range) is a wireless modulation technique designed for sending small amounts of data over kilometers at very low power. It runs on unlicensed ISM bands (915 MHz in North America, 868 MHz in Europe, and others regionally), which means you don't need a license to transmit.",
      },
      { type: "heading", content: "Mesh: messages hop between nodes" },
      {
        type: "paragraph",
        content:
          "A single LoRa radio has a limited range, but a mesh of radios extends that reach. Every node relays messages for every other node. If your message can't reach its destination directly, intermediate nodes forward it for you.",
      },
      {
        type: "list",
        items: [
          "No central server or tower",
          "Range grows as more nodes join",
          "Works during outages, disasters, or remote trips",
          "End-to-end encrypted by default in protocols like Meshtastic",
        ],
      },
      { type: "heading", content: "Where LoRa mesh fits" },
      {
        type: "paragraph",
        content:
          "LoRa mesh is not a replacement for a cellular connection. It's a complement: a low-bandwidth, high-resilience channel for short text messages, location beacons, and small telemetry. Typical use cases include hiking and backcountry trips, large events where cell service is saturated, neighborhood mesh networks, emergency preparedness, and backup comms when the grid fails.",
      },
      { type: "heading", content: "Where it doesn't fit" },
      {
        type: "paragraph",
        content:
          "LoRa is not for voice, video, or large files. Expect kilobytes, not megabytes. If you need a phone call, use a phone or a satellite messenger with voice support.",
      },
      {
        type: "heading",
        content: "What you need to start",
      },
      {
        type: "paragraph",
        content:
          "A LoRa radio running a mesh protocol like Meshtastic, and the companion app on your phone. OffGrid Beacon 1 ships with Meshtastic pre-installed and snaps to your phone via MagSafe, so you can skip firmware setup entirely and get onto the mesh in minutes.",
      },
    ],
    faq: [
      {
        question: "Is LoRa mesh the same as Meshtastic?",
        answer:
          "No. LoRa is the underlying radio technology. Meshtastic is one of several open-source mesh protocols that runs on top of LoRa. Meshtastic adds routing, encryption, and phone app integration.",
      },
      {
        question: "Does LoRa mesh work without the internet?",
        answer:
          "Yes. LoRa mesh operates entirely peer-to-peer between radios. It does not depend on the internet, cellular networks, or Wi-Fi.",
      },
      {
        question: "How far can a LoRa mesh reach?",
        answer:
          "Point-to-point range is typically a few kilometers in real-world conditions and up to 10+ km line-of-sight. Mesh routing can extend effective coverage much further by hopping between nodes.",
      },
    ],
    relatedSlugs: [
      "getting-started-with-meshtastic",
      "meshtastic-vs-walkie-talkies-frs-gmrs",
      "backup-comms-when-cell-towers-go-down",
    ],
  },
  {
    slug: "meshtastic-vs-walkie-talkies-frs-gmrs",
    title: "Meshtastic vs Walkie-Talkies: When Mesh Beats FRS/GMRS",
    seoTitle: "Meshtastic vs Walkie-Talkies: Mesh vs FRS/GMRS Compared",
    metaDescription:
      "Meshtastic radios and FRS/GMRS walkie-talkies solve different problems. Here's when mesh wins, when a walkie-talkie wins, and when you want both.",
    keywords: [
      "Meshtastic vs walkie talkie",
      "LoRa vs FRS",
      "mesh radio vs GMRS",
      "best off-grid radio",
      "best Meshtastic device 2026",
      "RAK vs LilyGO",
    ],
    excerpt:
      "Meshtastic radios and FRS/GMRS walkie-talkies solve different problems. Here's a practical comparison for hikers, preppers, and group trips.",
    date: "March 2026",
    publishedAt: "2026-03-10",
    readTime: "7 min read",
    category: "Comparisons",
    author: DEFAULT_AUTHOR,
    image: link1Content.featureHighlights[1].image,
    sections: [
      {
        type: "paragraph",
        content:
          "If you're picking between a Meshtastic-capable radio like OffGrid Beacon 1 and a classic walkie-talkie on FRS or GMRS, the honest answer is they do different jobs. Here's how they compare on the criteria that matter off-grid.",
      },
      { type: "heading", content: "What each radio is good at" },
      {
        type: "list",
        items: [
          "Walkie-talkies (FRS/GMRS): live voice, simple push-to-talk, group channels for immediate coordination",
          "Meshtastic radios (LoRa): text messaging, location sharing, telemetry, encrypted mesh routing over long distances",
        ],
      },
      { type: "heading", content: "Range" },
      {
        type: "paragraph",
        content:
          "FRS walkie-talkies are limited to 2 watts and usually get a mile or two in real terrain. GMRS (license required) can push further with higher power and repeaters. Meshtastic on LoRa can reliably cover several kilometers line-of-sight per hop, and mesh routing multiplies that: five nodes spread out can easily exceed the coverage of a single GMRS radio.",
      },
      { type: "heading", content: "Battery and carry" },
      {
        type: "paragraph",
        content:
          "Mesh radios win on idle battery. Meshtastic nodes sip power because they only transmit short bursts. Beacon 1 customers regularly report close to two weeks of standby on a single charge. Walkie-talkies draw far more when transmitting voice.",
      },
      { type: "heading", content: "License and legality" },
      {
        type: "paragraph",
        content:
          "FRS is license-free in the US. GMRS requires an FCC license (inexpensive, no test). Meshtastic on the 915 MHz ISM band is license-free in the US at legal power limits. Always check your regional settings.",
      },
      { type: "heading", content: "Which should you pick?" },
      {
        type: "paragraph",
        content:
          "If you need live voice for a group on the move and you'll always stay within a mile of each other, a GMRS walkie-talkie is simple and effective. If you want longer range, text messages, location beacons, and a network that gets stronger as your group grows, Meshtastic on a device like OffGrid Beacon 1 is the better fit. Many groups carry both.",
      },
    ],
    faq: [
      {
        question: "Can Meshtastic send voice messages?",
        answer:
          "Meshtastic is designed for short text, position, and telemetry messages. It does not carry live voice. For voice in an off-grid scenario, pair a Meshtastic radio with a GMRS or ham radio.",
      },
      {
        question: "Is Meshtastic legal without a license in the US?",
        answer:
          "Yes, Meshtastic operates on the unlicensed 915 MHz ISM band in the US. No license is required as long as you use the correct regional settings.",
      },
      {
        question: "Do I need a different radio for every group member?",
        answer:
          "Every person who wants to send or receive on the mesh needs their own node. More nodes means better mesh coverage for everyone.",
      },
    ],
    relatedSlugs: [
      "getting-started-with-meshtastic",
      "what-is-lora-mesh-off-grid-communication-explained",
      "backup-comms-when-cell-towers-go-down",
    ],
  },
  {
    slug: "backup-comms-when-cell-towers-go-down",
    title: "Backup Comms When Cell Towers Go Down: A Practical Guide",
    seoTitle: "Backup Communication Plan for When Cell Towers Go Down",
    metaDescription:
      "Hurricanes, outages, wildfires, and saturated events all take cell towers offline. Here's a practical backup comms plan built around LoRa mesh radios.",
    keywords: [
      "emergency communication device",
      "backup comms",
      "cell tower down communication",
      "disaster preparedness radio",
      "hurricane communication plan",
      "off-grid emergency radio",
      "MagSafe LoRa radio",
    ],
    excerpt:
      "Towers fail more often than most people expect. Here's a simple, low-cost plan for staying in touch with family when cell service is unavailable.",
    date: "April 2026",
    publishedAt: "2026-04-02",
    readTime: "7 min read",
    category: "Use cases",
    author: DEFAULT_AUTHOR,
    image: link1Content.featureHighlights[5].image,
    sections: [
      {
        type: "paragraph",
        content:
          "Cell towers go down or saturate more often than people plan for: hurricanes, power outages, wildfires, major concerts, and holiday weekends. A backup communication plan that doesn't depend on the carrier is cheap insurance for families, small teams, and anyone who travels away from coverage.",
      },
      { type: "heading", content: "What a good backup comms plan includes" },
      {
        type: "list",
        items: [
          "A way to reach household members and close neighbors that does not rely on cell service",
          "A power source for each radio that survives a grid outage",
          "A shared channel and pre-agreed check-in times",
          "A fallback plan if the primary channel fills with traffic",
        ],
      },
      { type: "heading", content: "Why LoRa mesh fits" },
      {
        type: "paragraph",
        content:
          "LoRa mesh radios are cheap enough to equip a whole household, efficient enough to run for a week on a single charge, and independent of carriers. Meshtastic adds encryption and group channels so your messages stay private.",
      },
      { type: "heading", content: "A simple 3-step setup" },
      {
        type: "orderedList",
        items: [
          "Give every household member a Meshtastic-ready radio (Beacon 1 snaps to the phone they already carry).",
          "Configure a shared encrypted channel and agree on daily check-in times.",
          "Keep each radio topped off via USB-C and a small power bank.",
        ],
      },
      { type: "heading", content: "When to step up to voice or satellite" },
      {
        type: "paragraph",
        content:
          "LoRa mesh is ideal for short text and location updates. For live voice, add a GMRS walkie-talkie. For coverage beyond your local mesh, a satellite messenger is the next step. Treat them as layers, not replacements.",
      },
      { type: "heading", content: "The easy version" },
      {
        type: "paragraph",
        content:
          "If you want the shortest path to a working backup comms plan, pick up OffGrid Beacon 1 for each family member, pair it over Bluetooth, pick a shared channel, and practice a 30-second check-in once a month. That's it.",
      },
    ],
    faq: [
      {
        question: "Will Meshtastic radios work during a power outage?",
        answer:
          "Yes. Each radio runs off its own rechargeable battery, independent of the grid. Keep a small USB-C power bank on hand to extend runtime indefinitely.",
      },
      {
        question: "Do I need cell service for Meshtastic?",
        answer:
          "No. Meshtastic operates entirely peer-to-peer between LoRa radios. Cell service, Wi-Fi, and internet are not required.",
      },
      {
        question: "What's the minimum setup for a family of four?",
        answer:
          "Four Meshtastic-capable radios (one per person), a shared encrypted channel, and a power bank per household. OffGrid Beacon 1 is designed for this use case and runs close to two weeks on a charge.",
      },
    ],
    relatedSlugs: [
      "getting-started-with-meshtastic",
      "what-is-lora-mesh-off-grid-communication-explained",
      "meshtastic-vs-walkie-talkies-frs-gmrs",
    ],
  },
] satisfies BlogPost[];

// Exported as BlogPost[] so optional fields (ogImage, faq, updatedAt, etc.)
// are accessible on every post regardless of which posts currently set them.
const posts: BlogPost[] = blogPosts;

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
