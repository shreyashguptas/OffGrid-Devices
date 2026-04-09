"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";

// Blog post data - in a real app, this would come from a CMS or MDX files
interface BlogPost {
  title: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  sections: Section[];
}

interface Section {
  type: "paragraph" | "heading" | "list" | "orderedList";
  content?: string;
  items?: string[];
}

const blogPostsData: Record<string, BlogPost> = {
  "getting-started-with-meshtastic": {
    title: "OffGrid Link 1 already runs Meshtastic—here’s how to go live",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "Guides",
    image: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    sections: [
      { type: "paragraph", content: "OffGrid builds mesh hardware for when the grid isn’t reliable—hikes, events, travel, or backup comms when towers are overloaded or down. Link 1 is our MagSafe-friendly radio; you’re holding hardware that’s already set up to join a Meshtastic mesh." },
      { type: "heading", content: "Meshtastic in one minute" },
      { type: "paragraph", content: "Meshtastic is open-source software that turns compatible LoRa hardware into a long-range, low-power mesh network. Nodes pass messages hop by hop—no SIM, no carrier, no Wi‑Fi required. Many people install it themselves on radios they source and flash; that flexibility is part of why the ecosystem is strong." },
      { type: "heading", content: "What you skip with Link 1" },
      { type: "paragraph", content: "Link 1 ships from OffGrid with Meshtastic already on the radio. You don’t hunt down a board, flash firmware, or debug a first boot before you’ve sent a single message. The job left to you is the fun part: open the app, pair, and use the network." },
      { type: "list", items: ["No DIY install path required to get on the air", "Same open protocol as the rest of the Meshtastic mesh—compatible with other nodes in range", "Focus on range, channels, and your group—not on whether the radio was flashed correctly"] },
      { type: "heading", content: "Step 1: Download the Meshtastic app" },
      { type: "paragraph", content: "Install the official app on the phone you’ll use with Link 1:" },
      { type: "list", items: ["iOS: App Store", "Android: Google Play"] },
      { type: "heading", content: "Step 2: Pair your Link 1" },
      { type: "paragraph", content: "Bluetooth links your phone to the radio. With Meshtastic already on Link 1, you’re connecting—not provisioning from scratch." },
      { type: "orderedList", items: ["Enable Bluetooth on your phone", "Open the Meshtastic app", "Tap “+” to add a device", "Choose your Link 1 from the list and complete pairing"] },
      { type: "heading", content: "Step 3: Set region, name, and channel" },
      { type: "paragraph", content: "After pairing, set your region (this keeps transmit power and frequencies legal where you are), pick a display name, and align channel settings with the people you want to talk to. Match channels with your group so everyone hears the same traffic." },
      { type: "heading", content: "You’re on the mesh" },
      { type: "paragraph", content: "That’s it—you’re participating in the same decentralized mesh as other Meshtastic users nearby. Range depends on terrain, antennas, and how many nodes relay between you and your destination, but you’ve cleared the usual “day one” hurdle: the software is already on Link 1. Go test with a friend in the field when you can." },
    ],
  },
};

function ContentSection({ section }: { section: Section }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="font-display text-2xl font-semibold mt-12 mb-4">
          {section.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="text-muted-light leading-relaxed mb-4">{section.content}</p>
      );
    case "list":
      return (
        <ul className="list-disc list-inside text-muted-light space-y-2 mb-4 ml-4">
          {section.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="list-decimal list-inside text-muted-light space-y-2 mb-4 ml-4">
          {section.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPostsData[slug];

  if (!post) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-light mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="px-6 py-3 bg-accent text-on-accent font-medium rounded-full"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-muted hover:text-foreground transition-colors mb-8"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 text-sm mb-6">
            <span className="px-3 py-1.5 bg-accent/10 text-accent rounded-full">
              {post.category}
            </span>
            <span className="text-muted">{post.date}</span>
            <span className="w-1 h-1 rounded-full bg-muted" />
            <span className="text-muted">{post.readTime}</span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-8">
            {post.title}
          </h1>
        </motion.header>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden mb-12"
        >
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full aspect-[2/1] object-cover"
          />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg"
        >
          {post.sections.map((section, index) => (
            <ContentSection key={index} section={section} />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 p-8 rounded-3xl glass text-center"
        >
          <h3 className="font-display text-2xl font-semibold mb-4">
            Ready for Link 1?
          </h3>
          <p className="text-muted-light mb-6 max-w-md mx-auto">
            Get OffGrid Link 1—the MagSafe-compatible LoRa mesh radio—and join
            the community.
          </p>
          <Link1CheckoutButton
            defaultLabel="Buy Link 1"
            loadingLabel="Opening Checkout..."
            showArrow
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-on-accent font-semibold rounded-full hover:bg-accent-light transition-all duration-300"
          />
        </motion.div>
      </div>
    </article>
  );
}
