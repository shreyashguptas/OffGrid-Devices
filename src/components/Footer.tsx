"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-surface-elevated">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              OffGrid
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-tight md:text-5xl">
              Stay Connected.
              <br />
              <span className="text-muted">Go Anywhere.</span>
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted-light">
              Off-grid communication hardware designed to stay with the phone
              you already carry.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Products
              </h3>
              <div className="mt-5 space-y-4">
                <Link
                  href="/products/link-1"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  Link 1
                </Link>
                <Link
                  href="/products/link-2"
                  className="inline-flex items-center gap-2 text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  Link 2
                  <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-orange-500">
                    Coming soon
                  </span>
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Resources
              </h3>
              <div className="mt-5 space-y-4">
                <Link
                  href="/blog"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  Blog
                </Link>
                <a
                  href="https://meshtastic.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  Meshtastic
                </a>
                <a
                  href="https://meshcore.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  MeshCore
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                Social
              </h3>
              <div className="mt-5 space-y-4">
                <a
                  href="https://x.com/ShreyashGuptas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  X / Twitter
                </a>
                <a
                  href="https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-foreground/80 transition-colors duration-300 hover:text-accent"
                >
                  YouTube
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-6 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-512.png"
              alt="OffGrid Logo"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <p>&copy; {new Date().getFullYear()} OffGrid. All rights reserved.</p>
          </div>

          <div className="flex items-center gap-5">
            <Link
              href="/products/link-1"
              className="transition-colors duration-300 hover:text-accent"
            >
              Link 1
            </Link>
            <Link
              href="/blog"
              className="transition-colors duration-300 hover:text-accent"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
