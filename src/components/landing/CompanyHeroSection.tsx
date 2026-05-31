import Link from "next/link";

/**
 * Company-level home hero. Unlike the old home (which led with the 3D Beacon
 * model — now moved to /products/beacon-2), this is a brand statement for
 * OffGrid the company: the two things we do (carry-able mesh radios + US
 * small-batch manufacturing), then the lineup/services/mission below.
 *
 * Static server component, matching the /about and /capabilities heroes. No
 * 3D canvas here keeps the landing page light on first paint.
 */
export function CompanyHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-bark/30 bg-pitch pt-32 pb-20 md:pt-40 md:pb-28">
      <div aria-hidden className="absolute inset-0 topo-overlay opacity-30" />
      <div className="relative mx-auto max-w-4xl px-6">
        <p className="type-mono-label text-ember">OFFGRID DEVICES · MARYLAND, USA</p>
        <h1 className="type-display-hero mt-5 text-bone">
          Off-grid hardware, built to be carried.
        </h1>
        <p className="font-editorial mt-8 max-w-2xl text-xl leading-[1.55] text-sand/85 md:text-2xl">
          We design and build MagSafe LoRa mesh radios that run Meshtastic — and
          we manufacture small-batch hardware for the people who make things. No
          towers. No SIMs. No subscriptions.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            href="/products/beacon-2"
            className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone sm:px-10 sm:py-5"
          >
            Meet Beacon 2 →
          </Link>
          <Link
            href="/capabilities"
            className="type-mono-label text-sand transition-colors hover:text-ember"
          >
            Explore manufacturing →
          </Link>
        </div>
      </div>
    </section>
  );
}
