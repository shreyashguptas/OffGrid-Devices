"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

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
    title: "Getting Started with Meshtastic: A Complete Beginner's Guide",
    date: "January 15, 2026",
    readTime: "8 min read",
    category: "Tutorials",
    image: "https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg",
    sections: [
      { type: "paragraph", content: "Welcome to the world of off-grid communication! If you've just received your OffGrid device, this guide will help you get started with Meshtastic firmware and begin communicating without cellular service." },
      { type: "heading", content: "What is Meshtastic?" },
      { type: "paragraph", content: "Meshtastic is an open-source project that creates a long-range, low-power mesh network. Using LoRa (Long Range) radio technology, devices can communicate over several kilometers without any existing infrastructure." },
      { type: "heading", content: "Step 1: Download the App" },
      { type: "paragraph", content: "First, download the Meshtastic app for your phone:" },
      { type: "list", items: ["iOS: Available on the App Store", "Android: Available on Google Play"] },
      { type: "heading", content: "Step 2: Pair Your Device" },
      { type: "paragraph", content: "Your OffGrid device comes pre-flashed with Meshtastic firmware. Simply:" },
      { type: "orderedList", items: ["Enable Bluetooth on your phone", "Open the Meshtastic app", "Tap '+' to add a new device", "Select your OffGrid device from the list"] },
      { type: "heading", content: "Step 3: Configure Your Settings" },
      { type: "paragraph", content: "Once paired, you can customize your device settings including your name, region settings, and channel configuration." },
      { type: "heading", content: "You're Ready!" },
      { type: "paragraph", content: "That's it! You're now part of the mesh network. Any other Meshtastic users within range will be able to communicate with you—no cell towers required." },
    ],
  },
  "lora-vs-cellular-comparison": {
    title: "LoRa vs Cellular: Why Off-Grid Communication Matters",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "Education",
    image: "https://i.etsystatic.com/61623051/r/il/dac7cb/7509660894/il_fullxfull.7509660894_1nka.jpg",
    sections: [
      { type: "paragraph", content: "In an increasingly connected world, we often take cellular coverage for granted. But what happens when the towers go down, or when you venture into remote wilderness? That's where LoRa technology shines." },
      { type: "heading", content: "The Limitations of Cellular" },
      { type: "paragraph", content: "Cellular networks depend on infrastructure—towers, power grids, and backhaul connections. In emergencies or remote areas, this infrastructure can fail or simply not exist." },
      { type: "heading", content: "How LoRa is Different" },
      { type: "paragraph", content: "LoRa (Long Range) technology operates independently of infrastructure. Each device is both a transmitter and receiver, creating a mesh network that routes messages through multiple hops to reach their destination." },
      { type: "heading", content: "Real-World Applications" },
      { type: "list", items: ["Hiking & Camping: Stay connected with your group in areas without cell service", "Emergency Preparedness: Communicate when disaster strikes and infrastructure fails", "Events & Gatherings: Create instant communication networks for large events"] },
      { type: "heading", content: "The OffGrid Advantage" },
      { type: "paragraph", content: "With our MagSafe design, your mesh device is always with you. No more forgetting it at home—it attaches right to your phone and goes wherever you go." },
    ],
  },
  "mesh-network-explained": {
    title: "How Mesh Networks Work: The Technology Behind OffGrid",
    date: "January 5, 2026",
    readTime: "10 min read",
    category: "Technology",
    image: "https://i.etsystatic.com/61623051/r/il/d606f2/7553086919/il_fullxfull.7553086919_pb5k.jpg",
    sections: [
      { type: "paragraph", content: "Mesh networking might sound complex, but the concept is beautifully simple: instead of relying on a central hub, every device in the network helps relay messages to their destination." },
      { type: "heading", content: "The Power of Decentralization" },
      { type: "paragraph", content: "Traditional networks have single points of failure. If a router goes down, everyone connected to it loses access. Mesh networks solve this by creating multiple paths between any two points." },
      { type: "heading", content: "How Messages Travel" },
      { type: "paragraph", content: "When you send a message on a mesh network:" },
      { type: "orderedList", items: ["Your device broadcasts the message via LoRa radio", "Any device in range receives it", "If it's not the intended recipient, it rebroadcasts", "The message hops from device to device until it reaches the destination"] },
      { type: "heading", content: "The RAK WisBlock Inside" },
      { type: "paragraph", content: "At the heart of your OffGrid device is a RAK WisBlock system—a modular, powerful platform that handles all the radio communication. Combined with our custom antenna, it provides excellent range and reliability." },
      { type: "heading", content: "Building Community" },
      { type: "paragraph", content: "The more devices on the network, the stronger and more resilient it becomes. Each new user extends the range and reliability for everyone else. That's the beauty of mesh technology." },
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
            className="px-6 py-3 bg-accent text-background font-medium rounded-full"
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
            Ready to Go Off-Grid?
          </h3>
          <p className="text-muted-light mb-6 max-w-md mx-auto">
            Get your own MagSafe-compatible mesh device and join the community.
          </p>
          <a
            href="https://www.etsy.com/shop/offgriddevices"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-background font-semibold rounded-full hover:bg-accent-light transition-all duration-300"
          >
            Shop on Etsy
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </article>
  );
}
