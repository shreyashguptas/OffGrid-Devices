export type BlogSection =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string; id?: string }
  | { type: "subheading"; content: string; id?: string }
  | { type: "list"; items: string[] }
  | { type: "orderedList"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "quote"; content: string; cite?: string }
  | { type: "callout"; tone: "info" | "warn" | "tip"; content: string }
  | { type: "code"; code: string; language?: string }
  | {
      type: "table";
      caption?: string;
      headers: string[];
      rows: string[][];
    };

type BlogAuthor = {
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
    slug: "why-i-built-beacon",
    title: "Why I Built Beacon: the Mesh Radio I Kept Leaving at Home",
    seoTitle: "Why I Built OffGrid Beacon — the MagSafe Story",
    metaDescription:
      "The honest story behind OffGrid Beacon: a Meshtastic mesh radio I kept forgetting at home, the MagSafe insight that fixed it, and the magnet engineering it took.",
    keywords: [
      "why OffGrid Beacon",
      "MagSafe Meshtastic",
      "Meshtastic mesh radio",
      "MeshCore",
      "LoRa mesh network",
      "MagSafe LoRa radio",
      "OffGrid Devices",
      "neodymium magnet 3D print",
      "off-grid communication",
    ],
    excerpt:
      "Every mesh radio I owned had the same flaw, and it had nothing to do with the radio. I kept leaving it at home. Here's how that one problem became a product.",
    date: "June 2026",
    publishedAt: "2026-06-14",
    updatedAt: "2026-06-14",
    readTime: "7 min read",
    category: "Story",
    author: DEFAULT_AUTHOR,
    image: "/beacon-2/tier-3-kit.jpg",
    heroImageAlt:
      "OffGrid Beacon 2 mesh radio with its belt-clip cradle, replaceable SMA antenna, spare whip antenna, and whistle keychain on an orange background",
    sections: [
      {
        type: "paragraph",
        content:
          "Every Meshtastic radio I owned had the same flaw, and it had nothing to do with the radio. I kept leaving it at home. The hardware was fine. The mesh worked. But a device that only helps you when it's in your pocket isn't much help if it's sitting on your desk while you're three miles up a trail. That single, stupid, entirely human problem is the reason OffGrid exists.",
      },
      {
        type: "paragraph",
        content:
          "This is the long version of how Beacon went from a thing I printed for myself to a product line. It's mostly a story about magnets.",
      },
      { type: "heading", content: "First, what mesh networking even is" },
      {
        type: "paragraph",
        content:
          "Mesh networking over LoRa is still a niche corner of the world, so here's the short version. LoRa stands for Long Range — it's a radio technology built to send tiny amounts of data a very long way. Meshtastic and MeshCore are two open-source frameworks that run on top of it. Both turn a small radio into a node on a peer-to-peer network with no towers, no SIM, and no subscription.",
      },
      {
        type: "paragraph",
        content:
          "The mesh part is the magic. Say your friend is a state away, and scattered between you are strangers who happen to carry the same kind of device. Your message hops from their device to the next to the next until it reaches your friend — but none of those people in the middle can read it. They just pass it along. The more nodes exist, the further the network reaches. That's the whole appeal: a communication layer that the people using it build simply by showing up.",
      },
      {
        type: "heading",
        content: "The problem I actually wanted to solve",
      },
      {
        type: "paragraph",
        content:
          "When I got into Meshtastic and MeshCore, I was hooked on how the devices worked, but I wasn't a 3D-design person yet. So I did what everyone does: I downloaded other people's designs and printed them. The big RAK board with the giant antenna on top — great hardware, but it lives on my desk permanently. The smaller printed nodes worked fine too. They all worked fine.",
      },
      {
        type: "paragraph",
        content:
          "But every one of them was a separate thing I had to remember to bring. And if you're into a niche hobby like this, you want the device on you everywhere, because the whole point is finding new nodes and connecting with other people. So you head out with your keys, your wallet, your phone — and the radio stays home on the desk. I kept doing it. The problem was never the radio. The problem was me, and the fact that the radio asked me to remember one more object.",
      },
      {
        type: "paragraph",
        content:
          "Then I thought about the one thing I never forget: my wallet. And my phone is always in my hand. What if the radio just lived on the back of my phone? What if I took a device like this, put MagSafe magnets inside it, and combined the two so it traveled with the thing I was never going to leave behind? That was the entire idea. Everything OffGrid has built since is downstream of that one question.",
      },
      { type: "heading", content: "Beacon 1, and the feedback that built Beacon 2" },
      {
        type: "paragraph",
        content:
          "Beacon 1 was the first crack at it: a MagSafe-friendly Meshtastic radio you could carry on the back of your phone instead of clipping a brick to your belt. People liked it. They also told me, clearly, what wasn't good enough yet — and almost every note came back to the magnets. A device whose entire reason for existing is that it stays on your phone cannot afford a magnet that slips. That was the feedback that mattered most, and it's where I spent the most time.",
      },
      {
        type: "paragraph",
        content:
          "The rest of the list came from real use, too: people wanted to swap antennas, power the thing off without unscrewing it, see when it was charging, get more than a few days of battery, and trust it not to crack or soften when they actually took it outside. Beacon 2 is the answer to that whole list. But let me start with the part that is the product: the magnet.",
      },
      { type: "heading", content: "The magnet problem (this is the whole product)" },
      {
        type: "paragraph",
        content:
          "Getting a strong magnet into a slim 3D print, without making the device thicker or scratching the back of someone's phone, was much harder than it sounds. I went through a lot of dead ends over about five months.",
      },
      {
        type: "paragraph",
        content:
          "The first idea was a simple metal ring — let the phone's own MagSafe magnets grab onto it. It barely held. A metal ring is not a magnet, and it shows. So I switched to real magnets embedded partway through the print, which left a quarter-millimeter of plastic over the magnet face. That doesn't sound like much, but for a weak magnet a quarter millimeter is everything, and those early units were the ones that drew the 'please make it stronger' feedback.",
      },
      {
        type: "paragraph",
        content:
          "Eventually I found a supplier with proper 1.5 mm ring magnets and bought them in bulk. Embedded in the middle of the print — hidden so they can't scratch a phone or fall out with use — those held genuinely well. That's what Beacon 1 shipped with. For Beacon 2 I wanted more. I tracked down the 2.5 mm neodymium magnet that matches the spec Apple documents for the magnets inside every iPhone — same magnet, one millimeter thicker, noticeably stronger. Stack two of them and they're hard to pull apart.",
      },
      {
        type: "paragraph",
        content:
          "The catch: a thicker magnet should mean a thicker device, and the entire premise is that this thing disappears onto the back of your phone. So I redesigned how the base is printed. Instead of laying the magnet mid-print and capping it with another layer of plastic, the new design seats the magnet so there's no extra plastic above it at all. The base got 0.25 mm taller, but the magnet pocket got shallower — net, the part that touches your phone is actually thinner than before, around 2.45 mm, while holding a stronger magnet. That's the part I'm proudest of.",
      },
      { type: "heading", content: "The other six things, briefly" },
      {
        type: "paragraph",
        content:
          "Once the magnet was right, the rest of the feedback list became its own set of small design problems. None of them were glamorous; all of them mattered to someone carrying this every day.",
      },
      {
        type: "orderedList",
        items: [
          "An on/off switch. Beacon 1 couldn't be powered down without unscrewing it and pulling the battery. I tested an assortment of switches on a breadboard, picked the most reliable one, and designed a pocket that holds it purely mechanically — the cover's ridges lock it in place on every axis, no glue, no screws.",
          "A replaceable antenna. People upgrade their antennas for more range. The new mount is hot-swappable and pairs with the on/off switch so you can actually power down to change it.",
          "A real reset button. Double-pressing reset puts the board into bootloader mode for reflashing, but Beacon 1 needed a SIM-ejector tool to reach it. I borrowed the flexing-plastic button design from an elevator emergency light and got a clean click with a fingertip.",
          "A visible charging light. The board's charging LED was invisible through darker cases. A small, precisely placed pinhole lets it show through any color.",
          "A bigger battery. Beacon 1 ran an 1800 mAh cell — about a week, less in a busy area. Beacon 2 fits a 3000 mAh cell by mounting it landscape, and still stays within the width of a base-model iPhone.",
          "Durability. PLA and PETG soften in the sun, and most cheap mesh devices use them. I moved to ASA, then — with help from a manufacturing partner, PCBWay — to an MJF nylon (PA 12) enclosure that's tougher, has a matte finish, and finally solved the rough printed corners I could never get clean on a filament printer.",
        ],
      },
      { type: "heading", content: "Why the RAK board, not the cheaper one" },
      {
        type: "paragraph",
        content:
          "Before any of the case design could happen, I had to pick the electronics. The Meshtastic community mostly uses two options, so I tried both. The Heltec board is the cheaper one, and I designed an early enclosure around it — but it's simply too long. In a device meant to sit on the back of a phone, alongside a battery, length is the one dimension you can't spare. The RAK WisBlock was the right call for this form factor, and that's what Beacon 2 is built on. The hardware underneath runs both Meshtastic and MeshCore, so you're not locked into one firmware.",
      },
      { type: "heading", content: "What this project actually was" },
      {
        type: "paragraph",
        content:
          "Beacon started as a fix for my own bad habit and turned into the best engineering education I've given myself. Magnet suppliers, print orientation, switch reliability, battery geometry, material science I didn't know I'd need — every one of those came from a real person telling me what was wrong with the thing they'd bought. That's the part I'd do again in a heartbeat: taking a device people liked but had real complaints about, and grinding through every complaint until they were all answered in one product.",
      },
      {
        type: "paragraph",
        content:
          "Beacon is the first OffGrid product line, and there will be more — radios, antennas, mounts, the small parts that always take longer to source than they should. If there's something you wish your mesh device did and doesn't, that's exactly the kind of note that built this one. Tell me.",
      },
    ],
    faq: [
      {
        question: "What problem does OffGrid Beacon solve?",
        answer:
          "Most Meshtastic and MeshCore radios are a separate device you have to remember to carry — and it's easy to leave them at home. Beacon puts the radio on the back of your phone with MagSafe magnets, so it travels with something you never forget. The radio is only useful when it's with you, and that's the whole design goal.",
      },
      {
        question: "Why does Beacon use MagSafe magnets?",
        answer:
          "Because the hardest part of mesh networking in daily life isn't the radio — it's remembering to bring it. Attaching the radio to your phone via MagSafe means it goes everywhere your phone goes. Beacon 2 uses a 2.5 mm neodymium magnet matched to the spec Apple documents for iPhones, embedded so it can't scratch your phone or fall out.",
      },
      {
        question: "What's the difference between Meshtastic and MeshCore?",
        answer:
          "Both are open-source firmware projects for LoRa mesh networking, with different routing and design decisions, and they aren't compatible with each other on air. Beacon's underlying RAK WisBlock hardware (nRF52840 + SX1262) runs either one, so you can choose the workflow you prefer.",
      },
      {
        question: "How is Beacon 2 different from Beacon 1?",
        answer:
          "Beacon 2 came directly from Beacon 1 customer feedback: a much stronger magnet without added thickness, a physical on/off switch, a replaceable antenna, a fingertip reset button, a visible charging light, a larger 3000 mAh battery, and a tougher MJF nylon enclosure.",
      },
      {
        question: "Do I need a license to use Beacon?",
        answer:
          "No. Beacon operates on the unlicensed 915 MHz ISM band in the United States when the correct Meshtastic region is selected. No ham or GMRS license is required for standard unlicensed-band mesh use.",
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
