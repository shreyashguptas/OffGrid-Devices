import Link from "next/link";
import { HeroMeshBackground } from "@/components/landing/HeroMeshBackground";

/**
 * Company-level home hero. Unlike the old home (which led with the 3D Beacon
 * model — now moved to /products/beacon-2), this is a brand statement for
 * OffGrid the company: the two things we do (carry-able mesh radios + US
 * small-batch manufacturing), then the lineup/services/mission below.
 *
 * Server component. The animated mesh-network background is the one Client
 * island (canvas + rAF); a legibility scrim sits between it and the copy so
 * the headline always reads. The scrim uses the `pitch` token so it flips
 * correctly in light mode.
 */
export function CompanyHeroSection() {
  return (
    <section className="relative isolate overflow-hidden border-b border-bark/30 bg-pitch pt-32 pb-20 md:min-h-[640px] md:pt-40 md:pb-28">
      <HeroMeshBackground />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-pitch/75 via-pitch/30 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-pitch/45 via-transparent to-transparent"
      />
      <div className="relative z-10 mx-auto max-w-4xl px-6">
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
