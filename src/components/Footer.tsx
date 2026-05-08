"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BeaconWordmark } from "@/components/shared/WaypointMark";
import { siteProducts } from "@/content/products";

type FooterColumn = {
  heading: string;
  links: Array<{
    label: string;
    href: string;
    badge?: string | null;
    external?: boolean;
  }>;
};

export function Footer() {
  const [primaryProduct, secondaryProduct] = siteProducts;

  const columns: FooterColumn[] = [
    {
      heading: "Carry",
      links: [
        { label: primaryProduct.name, href: primaryProduct.href },
        {
          label: secondaryProduct.name,
          href: secondaryProduct.href,
          badge: secondaryProduct.badge,
        },
      ],
    },
    {
      heading: "Mesh",
      links: [
        { label: "Meshtastic", href: "https://meshtastic.org", external: true },
        { label: "MeshCore", href: "https://meshcore.co.uk", external: true },
      ],
    },
    {
      heading: "Trail",
      links: [
        { label: "Field notes", href: "/blog" },
      ],
    },
    {
      heading: "Crew",
      links: [
        {
          label: "X / Twitter",
          href: "https://x.com/ShreyashGuptas",
          external: true,
        },
        {
          label: "YouTube",
          href: "https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-bark bg-pitch-deep">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-7xl px-6 py-16 md:py-20"
      >
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1fr]">
          <div>
            <BeaconWordmark size={20} />
            <p
              className="mt-5 max-w-xs text-sand/75"
              style={{
                fontFamily: "var(--font-editorial)",
                fontStyle: "italic",
                fontSize: 15,
                lineHeight: 1.55,
              }}
            >
              OffGrid builds rugged mesh hardware for the field — designed to
              stay with the phone you already carry.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <h3
                className="text-bone"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                }}
              >
                {column.heading}
              </h3>
              <ul className="mt-5 space-y-3">
                {column.links.map((link) => {
                  const content = (
                    <span className="inline-flex items-center gap-2">
                      <span>{link.label}</span>
                      {link.badge ? (
                        <span className="border border-ember/40 bg-ember/15 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-ember">
                          {link.badge}
                        </span>
                      ) : null}
                    </span>
                  );

                  const className =
                    "text-[13px] text-sand transition-colors duration-300 hover:text-ember";

                  if (link.external) {
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={className}
                        >
                          {content}
                        </a>
                      </li>
                    );
                  }

                  return (
                    <li key={link.label}>
                      <Link href={link.href} className={className}>
                        {content}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-14 flex flex-col gap-3 border-t border-bark pt-6 text-sand/65 md:flex-row md:items-center md:justify-between"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>&copy; {new Date().getFullYear()} OFFGRID · MADE IN SF</span>
          <span>Built to be carried</span>
          <span>NO TOWERS · NO SIMS · NO SUBSCRIPTIONS</span>
        </div>
      </motion.div>
    </footer>
  );
}
