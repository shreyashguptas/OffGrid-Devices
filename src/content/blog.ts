import { link1Content } from "./link1";

export type BlogSection =
  | { type: "paragraph" | "heading"; content: string }
  | { type: "list" | "orderedList"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sections: BlogSection[];
};

export const blogPosts = [
  {
    slug: "getting-started-with-meshtastic",
    title: "OffGrid Link 1 already runs Meshtastic - here's how to go live",
    excerpt:
      "Meshtastic is open firmware you can install on other hardware, but Link 1 ships from OffGrid with it ready. Unbox, pair, and hit the mesh without the firmware homework.",
    date: "January 2026",
    readTime: "8 min read",
    category: "Guides",
    image: link1Content.summary.productImage.src,
    sections: [
      {
        type: "paragraph",
        content:
          "OffGrid builds mesh hardware for when the grid isn't reliable: hikes, events, travel, or backup comms when towers are overloaded or down. Link 1 is our MagSafe-friendly radio, and it already ships ready to join a Meshtastic mesh.",
      },
      { type: "heading", content: "Meshtastic in one minute" },
      {
        type: "paragraph",
        content:
          "Meshtastic is open-source software that turns compatible LoRa hardware into a long-range, low-power mesh network. Nodes pass messages hop by hop with no SIM, no carrier, and no Wi-Fi required.",
      },
      { type: "heading", content: "What you skip with Link 1" },
      {
        type: "paragraph",
        content:
          "Link 1 ships from OffGrid with Meshtastic already on the radio. You don't hunt down a board, flash firmware, or debug a first boot before you've sent a single message. The job left to you is the useful part: pair it and use it.",
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
          "Install the official app on the phone you'll use with Link 1.",
      },
      { type: "list", items: ["iOS: App Store", "Android: Google Play"] },
      { type: "heading", content: "Step 2: Pair your Link 1" },
      {
        type: "paragraph",
        content:
          "Bluetooth links your phone to the radio. With Meshtastic already on Link 1, you're connecting rather than provisioning from scratch.",
      },
      {
        type: "orderedList",
        items: [
          "Enable Bluetooth on your phone",
          "Open the Meshtastic app",
          'Tap "+" to add a device',
          "Choose your Link 1 from the list and complete pairing",
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
  },
] satisfies BlogPost[];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
