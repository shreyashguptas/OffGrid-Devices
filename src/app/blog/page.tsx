"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    slug: "getting-started-with-meshtastic",
    title: "Getting Started with Meshtastic: A Complete Beginner's Guide",
    excerpt:
      "Learn how to set up your OffGrid device with Meshtastic firmware and start communicating off-grid in minutes.",
    date: "January 2026",
    readTime: "8 min read",
    category: "Tutorials",
    image:
      "https://i.etsystatic.com/61623051/r/il/9f66b4/7517364106/il_fullxfull.7517364106_5bbx.jpg",
  },
  {
    slug: "lora-vs-cellular-comparison",
    title: "LoRa vs Cellular: Why Off-Grid Communication Matters",
    excerpt:
      "Discover why LoRa technology outperforms cellular networks in remote areas and emergency situations.",
    date: "January 2026",
    readTime: "6 min read",
    category: "Education",
    image:
      "https://i.etsystatic.com/61623051/r/il/dac7cb/7509660894/il_fullxfull.7509660894_1nka.jpg",
  },
  {
    slug: "mesh-network-explained",
    title: "How Mesh Networks Work: The Technology Behind OffGrid",
    excerpt:
      "A deep dive into mesh networking technology and how it creates resilient, decentralized communication systems.",
    date: "January 2026",
    readTime: "10 min read",
    category: "Technology",
    image:
      "https://i.etsystatic.com/61623051/r/il/d606f2/7553086919/il_fullxfull.7553086919_pb5k.jpg",
  },
];

const categories = ["All", "Tutorials", "Education", "Technology", "News"];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
            The OffGrid <span className="text-accent">Blog</span>
          </h1>
          <p className="text-lg text-muted-light max-w-2xl mx-auto">
            Tutorials, guides, and insights about off-grid communication, mesh
            networking, and the technology that keeps you connected.
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-accent text-background"
                  : "bg-white/5 border border-white/10 hover:bg-white/10 text-muted-light hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Blog posts grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group"
                >
                  <Link href={`/blog/${post.slug}`} className="block">
                    <div className="relative overflow-hidden rounded-2xl mb-6">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 text-xs font-medium bg-accent/90 text-background rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-muted mb-3">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 rounded-full bg-muted" />
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="font-display text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">
                      {post.title}
                    </h2>

                    <p className="text-muted-light leading-relaxed">
                      {post.excerpt}
                    </p>
                  </Link>
                </motion.article>
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <p className="text-muted-light text-lg">
                  No posts in this category yet.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
