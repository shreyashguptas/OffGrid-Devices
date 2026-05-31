import Link from "next/link";
import { capabilitiesContent } from "@/content/capabilities";

/**
 * Home teaser for the contract-manufacturing business line. Pulls the eyebrow
 * from the canonical /capabilities content and links there for the full
 * capabilities statement. Kept short on purpose — the depth lives on the page.
 */
export function ServicesTeaserSection() {
  const { hero } = capabilitiesContent;

  return (
    <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-6">
        <p className="type-mono-label text-ember">{hero.eyebrow}</p>
        <h2 className="type-display-section mt-4 text-bone">
          We build hardware for other people, too.
        </h2>
        <p className="font-editorial mt-8 max-w-3xl text-xl leading-[1.55] text-sand/85">
          Beyond our own radios, OffGrid runs a small US shop for 3D design,
          rapid prototyping, and low-volume production — from a rough idea or a
          CAD file to finished, assembled units. Small shop, direct line, real
          parts.
        </p>
        <div className="mt-10">
          <Link
            href="/capabilities"
            className="type-mono-label text-sand transition-colors hover:text-ember"
          >
            See what we make →
          </Link>
        </div>
      </div>
    </section>
  );
}
