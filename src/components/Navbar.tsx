"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Beacon2CheckoutButton } from "@/components/Beacon2CheckoutButton";
import { BadgeEmberOutline } from "@/components/shared/BadgeEmberOutline";
import { BeaconWordmark, WaypointMark } from "@/components/shared/WaypointMark";
import { beacon2Content, siteProducts } from "@/content/products";
import { primaryNavLinks, productsMenuLabel } from "@/content/navigation";

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
              type="button"
              className="flex items-center gap-1.5 font-display text-[12px] font-semibold tracking-[0.18em] uppercase text-sand hover:text-bone transition-colors duration-300"
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
                    <p className="type-mono-label px-3 pt-2 pb-1.5 text-sand/55">
                      {productsMenuLabel}
                    </p>
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
                              alt={`OffGrid ${product.name} MagSafe LoRa mesh radio`}
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
                            <span className="font-display text-[13px] font-bold uppercase tracking-[0.04em] text-bone">
                              {product.name}
                            </span>
                            {product.badge && (
                              <BadgeEmberOutline className="px-2 py-0.5 font-bold tracking-[0.16em]">
                                {product.badge}
                              </BadgeEmberOutline>
                            )}
                          </div>
                          <p className="mt-0.5 truncate font-mono text-[11px] tracking-[0.06em] text-sand/70">
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

          {primaryNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-[12px] font-semibold tracking-[0.18em] uppercase text-sand transition-colors duration-300 hover:text-bone"
            >
              {link.label}
            </Link>
          ))}
          <Beacon2CheckoutButton
            defaultLabel={beacon2Content.summary.buyLabel}
            loadingLabel={beacon2Content.summary.loadingLabel}
            surface="nav-desktop"
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
                type="button"
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="flex w-full items-center justify-between text-left font-display text-[14px] font-bold tracking-[0.18em] uppercase text-sand transition-colors hover:text-bone"
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
                      <p className="type-mono-label text-sand/55">
                        {productsMenuLabel}
                      </p>
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
                                alt={`OffGrid ${product.name} MagSafe LoRa mesh radio`}
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
                          <span className="font-display text-[13px] font-bold uppercase tracking-[0.06em]">
                            {product.name}
                          </span>
                          {product.badge && (
                            <BadgeEmberOutline className="px-1.5 py-0.5 font-bold tracking-[0.16em]">
                              {product.badge}
                            </BadgeEmberOutline>
                          )}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {primaryNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-[14px] font-bold tracking-[0.18em] uppercase text-sand transition-colors hover:text-bone"
                >
                  {link.label}
                </Link>
              ))}
              <Beacon2CheckoutButton
                defaultLabel={beacon2Content.summary.buyLabel}
                loadingLabel={beacon2Content.summary.loadingLabel}
                surface="nav-mobile"
                className="mt-2 px-5 py-4 bg-bone text-pitch font-display text-[12px] font-bold tracking-[0.14em] uppercase text-center hover:bg-ember transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
