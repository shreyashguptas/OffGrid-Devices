import type { Metadata } from "next";
import Link from "next/link";
import { BeaconWordmark } from "@/components/shared/WaypointMark";

export const metadata: Metadata = {
  title: "Page not found — OffGrid",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/products/beacon-1", label: "Beacon 1" },
  { href: "/blog", label: "Blog" },
  { href: "/beacon-2/start", label: "Beacon 2 setup" },
];

export default function NotFound() {
  return (
    <section className="min-h-[80vh] border-b border-border-subtle bg-background px-6 pt-32 pb-20">
      <div className="mx-auto max-w-3xl">
        <BeaconWordmark size={24} />
        <p className="mt-10 text-sm font-semibold uppercase tracking-[0.24em] text-muted">
          404
        </p>
        <h1 className="mt-4 font-display text-5xl font-bold tracking-tight md:text-7xl">
          This page didn&apos;t make it onto the mesh.
        </h1>
        <div className="mt-10 flex flex-wrap gap-3">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-border-card px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:border-border-emphasis hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
