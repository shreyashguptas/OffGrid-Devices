"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out"
      style={{
        padding: isScrolled ? "1rem 0" : "1.5rem 0",
        backgroundColor: isScrolled ? "rgba(10, 10, 10, 0.8)" : "transparent",
        backdropFilter: isScrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: isScrolled ? "blur(20px)" : "none",
        borderBottom: isScrolled
          ? "1px solid rgba(255, 255, 255, 0.05)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden group-hover:ring-2 group-hover:ring-accent/30 transition-all duration-300">
            <Image
              src="/logo-512.png"
              alt="OffGrid Logo"
              width={40}
              height={40}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            OffGrid
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/#features"
            className="text-muted-light hover:text-foreground transition-colors duration-300 link-underline"
          >
            Features
          </Link>
          <Link
            href="/#gallery"
            className="text-muted-light hover:text-foreground transition-colors duration-300 link-underline"
          >
            Gallery
          </Link>
          <Link
            href="/#specs"
            className="text-muted-light hover:text-foreground transition-colors duration-300 link-underline"
          >
            Specs
          </Link>
          <Link
            href="/blog"
            className="text-muted-light hover:text-foreground transition-colors duration-300 link-underline"
          >
            Blog
          </Link>
          <a
            href="https://www.etsy.com/shop/offgriddevices"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-accent text-background font-semibold rounded-full hover:bg-accent-light transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 hover:-translate-y-0.5 border border-accent-light/50"
          >
            Shop Now
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 w-full h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-foreground transition-all duration-300 ${
                isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass-strong mt-2 mx-4 rounded-2xl overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              <Link
                href="/#features"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-light hover:text-foreground transition-colors"
              >
                Features
              </Link>
              <Link
                href="/#gallery"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-light hover:text-foreground transition-colors"
              >
                Gallery
              </Link>
              <Link
                href="/#specs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-light hover:text-foreground transition-colors"
              >
                Specs
              </Link>
              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg text-muted-light hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <a
                href="https://www.etsy.com/shop/offgriddevices"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 px-5 py-3 bg-accent text-background font-medium rounded-full text-center hover:bg-accent-light transition-all duration-300"
              >
                Shop Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
