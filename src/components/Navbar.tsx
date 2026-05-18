"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Link2CheckoutButton } from "@/components/Link2CheckoutButton";
import { BeaconWordmark, WaypointMark } from "@/components/shared/WaypointMark";
import { link2Content, siteProducts } from "@/content/products";

export function Navbar() {
  const pathname = usePathname();

  return <NavbarContent key={pathname} />;
}

function NavbarContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  const openTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (openTimeoutRef.current) clearTimeout(openTimeoutRef.current);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktopMode = (event?: MediaQueryListEvent) => {
      if ((event?.matches ?? desktopQuery.matches) === false) {
        return;
      }

      setIsMobileMenuOpen(false);
      setIsMobileProductsOpen(false);
    };

    handleDesktopMode();
    desktopQuery.addEventListener("change", handleDesktopMode);
    return () => {
      desktopQuery.removeEventListener("change", handleDesktopMode);
    };
  }, []);
  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(true);
    }, 150);
  };

  const handleMouseLeave = () => {
    if (openTimeoutRef.current) {
      clearTimeout(openTimeoutRef.current);
      openTimeoutRef.current = null;
    }
    closeTimeoutRef.current = setTimeout(() => {
      setIsProductsOpen(false);
    }, 300);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out"
      style={{
        padding: isScrolled ? "0.75rem 0" : "1rem 0",
        backgroundColor: isScrolled
          ? "var(--app-nav-scrolled)"
          : "transparent",
        backdropFilter: isScrolled ? "saturate(180%) blur(18px)" : "none",
        WebkitBackdropFilter: isScrolled
          ? "saturate(180%) blur(18px)"
          : "none",
        borderBottom: isScrolled
          ? "1px solid var(--app-border-subtle)"
          : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center transition-opacity duration-300 hover:opacity-85"
          aria-label="OffGrid home"
        >
          <BeaconWordmark size={20} />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-9">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.18em] uppercase text-sand hover:text-bone transition-colors duration-300"
              style={{ fontFamily: "var(--font-display)" }}
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              Products
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform duration-200 ${
                  isProductsOpen ? "rotate-180" : ""
                }`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence>
              {isProductsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-80"
                >
                  <div
                    className="media-shadow border border-border-card p-2"
                    style={{
                      background: "var(--app-dropdown)",
                      backdropFilter: "blur(40px)",
                      WebkitBackdropFilter: "blur(40px)",
                    }}
                  >
                    {siteProducts.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center gap-4 p-3 hover:bg-fill-glass-elevated transition-all duration-200 group"
                      >
                        {/* Product thumbnail */}
                        <div className="w-12 h-12 overflow-hidden shrink-0 bg-bark-soft border border-border-card">
                          {product.image ? (
                            <Image
                              src={product.image}
                              alt={product.name}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <WaypointMark size={28} />
                            </div>
                          )}
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="font-display text-[13px] font-bold uppercase tracking-[0.04em] text-bone"
                              style={{ fontFamily: "var(--font-display)" }}
                            >
                              {product.name}
                            </span>
                            {product.badge && (
                              <span className="border border-ember/40 bg-ember/15 px-2 py-0.5 text-[10px] font-bold tracking-[0.16em] uppercase text-ember">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p
                            className="mt-0.5 truncate text-[11px] text-sand/70"
                            style={{
                              fontFamily: "var(--font-mono)",
                              letterSpacing: "0.06em",
                            }}
                          >
                            {product.subtitle}
                          </p>
                        </div>

                        {/* Arrow */}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-sand/60 group-hover:text-bone group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                        >
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/blog"
            className="text-[12px] font-semibold tracking-[0.18em] uppercase text-sand hover:text-bone transition-colors duration-300"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Blog
          </Link>
          <Link2CheckoutButton
            defaultLabel={link2Content.summary.buyLabel}
            loadingLabel={link2Content.summary.loadingLabel}
            className="bg-bone px-5 py-3 font-display text-[12px] font-bold tracking-[0.14em] uppercase text-pitch transition-all duration-300 hover:bg-ember hover:text-pitch disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden h-11 w-11 flex items-center justify-center -mr-2"
          aria-label="Toggle menu"
        >
          <div className="relative w-6 h-5">
            <span
              className={`absolute left-0 w-full h-0.5 bg-bone transition-all duration-300 ${
                isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-2 w-full h-0.5 bg-bone transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-bone transition-all duration-300 ${
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
            className="md:hidden glass-strong mt-2 mx-4 overflow-hidden"
          >
            <div className="p-6 flex flex-col gap-4">
              {/* Products Expandable */}
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="flex items-center justify-between text-[14px] font-bold tracking-[0.18em] uppercase text-sand hover:text-bone transition-colors w-full text-left"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Products
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform duration-200 ${
                    isMobileProductsOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <AnimatePresence>
                {isMobileProductsOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="pl-4 flex flex-col gap-3 pb-2">
                      {siteProducts.map((product) => (
                        <Link
                          key={product.name}
                          href={product.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-sand hover:text-bone transition-colors"
                        >
                          <div className="w-8 h-8 overflow-hidden shrink-0 bg-bark-soft border border-border-card">
                            {product.image ? (
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <WaypointMark size={20} />
                              </div>
                            )}
                          </div>
                          <span
                            className="text-[13px] font-bold uppercase tracking-[0.06em]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {product.name}
                          </span>
                          {product.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-[0.16em] px-1.5 py-0.5 bg-ember/15 text-ember border border-ember/40">
                              {product.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link
                href="/blog"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[14px] font-bold tracking-[0.18em] uppercase text-sand hover:text-bone transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Blog
              </Link>
              <Link2CheckoutButton
                defaultLabel={link2Content.summary.buyLabel}
                loadingLabel={link2Content.summary.loadingLabel}
                className="mt-2 px-5 py-4 bg-bone text-pitch font-display text-[12px] font-bold tracking-[0.14em] uppercase text-center hover:bg-ember transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
