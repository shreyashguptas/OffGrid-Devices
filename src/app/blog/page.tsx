"use client";

import { motion } from "framer-motion";
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
      "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
  },
];

export default function BlogPage() {
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

        {/* Blog posts grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {blogPosts.map((post, index) => (
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
                    <span className="px-3 py-1.5 text-xs font-medium bg-accent/90 text-on-accent rounded-full">
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
          ))}
        </motion.div>
      </div>
    </div>
  );
}
