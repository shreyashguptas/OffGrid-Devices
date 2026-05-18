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
          "Beacon 2 ships direct from offgriddevices.com. Pair it over Bluetooth with the official Meshtastic app on iOS or Android and you're on the mesh.",
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
