import Link from "next/link";

/**
 * Condensed mission block for the company home. A short distillation of the
 * fuller mission on /about, which it links to. Same headline the /about
 * mission uses, kept verbatim for brand continuity.
 */
export function MissionTeaserSection() {
  return (
    <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <p className="type-mono-label text-ember">MISSION</p>
        <h2 className="type-display-section mt-4 text-bone">
          No towers. No SIMs. No subscriptions.
        </h2>
        <p className="font-editorial mt-8 text-lg leading-[1.7] text-sand/85 md:text-xl">
          We believe communication shouldn&rsquo;t depend on a single tower or a
          monthly bill. Our job is to make Meshtastic invisible — snap a Beacon
          to your phone, set your region once, and forget about it until the
          moment you need it.
        </p>
        <div className="mt-10">
          <Link
            href="/about"
            className="type-mono-label text-sand transition-colors hover:text-ember"
          >
            Read our story →
          </Link>
        </div>
      </div>
    </section>
  );
}
