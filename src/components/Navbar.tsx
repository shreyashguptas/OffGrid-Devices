"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";

const products = [
  {
    name: "Link 1",
    subtitle: "OffGrid · MagSafe LoRa mesh radio",
    href: "/products/link-1",
    image: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
    badge: null,
  },
  {
    name: "Link 2",
    subtitle: "OffGrid · Next in the Link line",
    href: "/products/link-2",
    image: null,
    badge: "Coming soon",
  },
];

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
        <Link href="/" className="group flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:opacity-90">
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
        <div className="hidden md:flex items-center gap-7">
          {/* Products Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="flex items-center gap-1.5 text-sm text-muted-light hover:text-foreground transition-colors duration-300"
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
                    className="media-shadow rounded-2xl border border-border-subtle p-2"
                    style={{
                      background: "var(--app-dropdown)",
                      backdropFilter: "blur(40px)",
                      WebkitBackdropFilter: "blur(40px)",
                    }}
                  >
                    {products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-fill-glass-elevated transition-all duration-200 group"
                      >
                        {/* Product thumbnail */}
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-surface-elevated border border-border-subtle">
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
                              <Image
                                src="/logo-512.png"
                                alt={product.name}
                                width={28}
                                height={28}
                                className="opacity-40"
                              />
                            </div>
                          )}
                        </div>

                        {/* Product info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-semibold text-sm text-foreground">
                              {product.name}
                            </span>
                            {product.badge && (
                              <span className="rounded-full border border-orange-500/30 bg-orange-500/20 px-2 py-0.5 text-[10px] font-bold tracking-[0.08em] text-orange-400">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted mt-0.5 truncate">
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
                          className="text-muted group-hover:text-foreground group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
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
            className="text-sm text-muted-light hover:text-foreground transition-colors duration-300"
          >
            Blog
          </Link>
          <Link1CheckoutButton
            defaultLabel="Buy Link 1"
            loadingLabel="Opening Checkout..."
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
          />
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
            className="md:hidden glass-strong mt-2 mx-4 overflow-hidden rounded-[1.75rem]"
          >
            <div className="p-6 flex flex-col gap-4">
              {/* Products Expandable */}
              <button
                onClick={() => setIsMobileProductsOpen(!isMobileProductsOpen)}
                className="flex items-center justify-between text-lg text-muted-light hover:text-foreground transition-colors w-full text-left"
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
                      {products.map((product) => (
                        <Link
                          key={product.name}
                          href={product.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="flex items-center gap-3 text-muted-light hover:text-foreground transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 bg-surface-elevated border border-border-subtle">
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
                                <Image
                                  src="/logo-512.png"
                                  alt={product.name}
                                  width={20}
                                  height={20}
                                  className="opacity-40"
                                />
                              </div>
                            )}
                          </div>
                          <span className="text-base">{product.name}</span>
                          {product.badge && (
                            <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
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
                className="text-lg text-muted-light hover:text-foreground transition-colors"
              >
                Blog
              </Link>
              <Link1CheckoutButton
                defaultLabel="Buy Link 1"
                loadingLabel="Opening Checkout..."
                className="mt-2 px-5 py-3 bg-accent text-on-accent font-medium rounded-full text-center hover:bg-accent-light transition-all duration-300"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
