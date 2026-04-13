"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";

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
    image:
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    sections: [
      {
        type: "paragraph",
        content:
          "OffGrid builds mesh hardware for when the grid isn’t reliable: hikes, events, travel, or backup comms when towers are overloaded or down. Link 1 is our MagSafe-friendly radio, and it already ships ready to join a Meshtastic mesh.",
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
          "Link 1 ships from OffGrid with Meshtastic already on the radio. You don’t hunt down a board, flash firmware, or debug a first boot before you’ve sent a single message. The job left to you is the useful part: pair it and use it.",
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
          "Install the official app on the phone you’ll use with Link 1.",
      },
      { type: "list", items: ["iOS: App Store", "Android: Google Play"] },
      { type: "heading", content: "Step 2: Pair your Link 1" },
      {
        type: "paragraph",
        content:
          "Bluetooth links your phone to the radio. With Meshtastic already on Link 1, you’re connecting rather than provisioning from scratch.",
      },
      {
        type: "orderedList",
        items: [
          "Enable Bluetooth on your phone",
          "Open the Meshtastic app",
          "Tap “+” to add a device",
          "Choose your Link 1 from the list and complete pairing",
        ],
      },
      { type: "heading", content: "Step 3: Set region, name, and channel" },
      {
        type: "paragraph",
        content:
          "After pairing, set your region, choose a display name, and align channel settings with the people you want to talk to. Match channels with your group so everyone hears the same traffic.",
      },
      { type: "heading", content: "You’re on the mesh" },
      {
        type: "paragraph",
        content:
          "That’s it. You’re participating in the same decentralized mesh as other Meshtastic users nearby. Range depends on terrain, antennas, and how many nodes relay between you and your destination, but the software hurdle is already behind you.",
      },
    ],
  },
};

function ContentSection({ section }: { section: Section }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="mt-12 font-display text-3xl font-semibold tracking-tight text-foreground first:mt-0">
          {section.content}
        </h2>
      );
    case "paragraph":
      return (
        <p className="mt-5 text-lg leading-relaxed text-muted-light first:mt-0">
          {section.content}
        </p>
      );
    case "list":
      return (
        <ul className="mt-5 list-disc space-y-3 pl-5 text-lg leading-relaxed text-muted-light marker:text-accent">
          {section.items?.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case "orderedList":
      return (
        <ol className="mt-5 list-decimal space-y-3 pl-5 text-lg leading-relaxed text-muted-light marker:text-accent">
          {section.items?.map((item, i) => <li key={i}>{item}</li>)}
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
      <div className="flex min-h-screen items-center justify-center bg-background px-6 pt-28 pb-20">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold">Post not found</h1>
          <p className="mt-4 text-lg text-muted-light">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/blog"
            className="mt-8 inline-flex rounded-full bg-accent px-6 py-3 font-medium text-on-accent"
          >
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="border-b border-border-subtle bg-background pt-28 pb-14 md:pt-32 md:pb-16">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to blog
            </Link>
          </motion.div>

          <motion.header
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">
                {post.category}
              </span>
              <span>{post.date}</span>
              <span className="h-1 w-1 rounded-full bg-muted" />
              <span>{post.readTime}</span>
            </div>

            <h1 className="mt-6 font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              {post.title}
            </h1>
          </motion.header>
        </div>
      </section>

      <section className="border-b border-border-subtle bg-surface-elevated py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.05 }}
            className="section-stage rounded-[2.25rem] p-5 md:p-6"
          >
            <div className="overflow-hidden rounded-[1.75rem] bg-background">
              <Image
                src={post.image}
                alt={post.title}
                width={1400}
                height={800}
                className="aspect-[2/1] w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="section-card mt-8 rounded-[2rem] px-6 py-10 md:px-10 md:py-12"
          >
            {post.sections.map((section, index) => (
              <ContentSection key={index} section={section} />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="section-card mt-8 rounded-[2rem] px-8 py-10 text-center md:px-10 md:py-12"
          >
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              Ready to start
            </p>
            <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight">
              Ready for Link 1?
            </h3>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-light">
              Get OffGrid Link 1, pair it, and join the mesh without the usual
              setup friction.
            </p>
            <div className="mt-8 flex justify-center">
              <Link1CheckoutButton
                defaultLabel="Buy Link 1"
                loadingLabel="Opening Checkout..."
                showArrow
                className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
