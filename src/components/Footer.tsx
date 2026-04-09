"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
export function Footer() {
  return (
    <footer className="relative mt-32">
      {/* Top Section - Bold Statement */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
          >
            {/* Left - Statement */}
            <div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                Stay Connected.
                <br />
                <span className="text-accent">Go Anywhere.</span>
              </h2>
              <p className="mt-6 text-muted-light text-lg max-w-md leading-relaxed">
                Join the mesh network revolution. Off-grid communication that
                goes wherever your adventures take you.
              </p>
            </div>

            {/* Right - Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 lg:gap-12">
              {/* Products */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
                  Products
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/products/link-1"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      Link 1
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products/link-2"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300 inline-flex items-center gap-2"
                    >
                      Link 2
                      <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                        New
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
                  Resources
                </h4>
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/blog"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://meshtastic.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      Meshtastic
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://meshcore.co.uk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      MeshCore
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-6">
                  Social
                </h4>
                <ul className="space-y-4">
                  <li>
                    <a
                      href="https://x.com/ShreyashGuptas"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      X / Twitter
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      YouTube
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Section - Large Brand Mark */}
      <div className="border-t border-border-subtle overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Copyright and Social Icons Row */}
          <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <Image
                src="/logo-512.png"
                alt="OffGrid Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <p className="text-muted text-sm">
                &copy; {new Date().getFullYear()} OffGrid. All rights reserved.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <a
                href="https://x.com/ShreyashGuptas"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors duration-300"
                aria-label="X / Twitter"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <Link
                href="/products/link-1"
                className="text-muted hover:text-accent transition-colors duration-300"
                aria-label="OffGrid Link 1 product page"
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
                  <path d="M6 7h12l-1 13H7L6 7Z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Large Typography Brand Mark */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative py-12 select-none flex justify-center"
          >
            <div className="font-display text-[18vw] md:text-[14vw] lg:text-[12vw] font-bold tracking-tighter leading-none text-mark-watermark text-center">
              OFFGRID
            </div>
            {/* Gradient overlay for fade effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
