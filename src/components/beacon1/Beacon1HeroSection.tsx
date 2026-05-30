import Image from "next/image";
import Link from "next/link";
import { beacon1Content } from "@/content/beacon1";

/**
 * Beacon 1 hero — retirement-aware variant.
 *
 * Beacon 1 is permanently sold out, replaced by Beacon 2. The PDP stays
 * indexable to preserve the URL's link equity and reviewer-rating history,
 * but the hero CTA cross-sells to /products/beacon-2 instead of offering
 * a (dead) checkout button. A "replaced by Beacon 2" notice sits above the
 * H1 so retired-product visitors immediately understand the current state.
 */
export function Beacon1HeroSection() {
  return (
    <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 border border-border-emphasis bg-surface-elevated px-4 py-2 text-xs uppercase tracking-[0.2em] text-muted-light">
              <span className="h-2 w-2 rounded-full bg-accent" />
              Retired · Replaced by Beacon 2
            </div>

            <h1 className="mt-6 break-words type-display-hero md:mt-8">
              {beacon1Content.summary.brandedName}
            </h1>

            <p className="mt-3 text-lg text-muted-light sm:text-xl md:mt-4 md:text-2xl">
              {beacon1Content.summary.subtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-light md:mt-6 md:text-lg lg:max-w-2xl">
              {beacon1Content.productPage.description}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-light md:text-lg lg:max-w-2xl">
              Beacon 1 is permanently sold out. OffGrid Beacon 2 carries the
              same MagSafe LoRa idea forward with a 3000 mAh battery,
              replaceable antenna, and N48H magnets that grip and hold.
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10 lg:justify-start">
              <Link
                href="/products/beacon-2"
                className="inline-flex min-h-[52px] items-center justify-center bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors hover:bg-bone"
              >
                Shop OffGrid Beacon 2 →
              </Link>
              <Link
                href="#features"
                className="inline-flex min-h-[52px] items-center justify-center border border-border-card px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-bone transition-colors hover:border-border-emphasis"
              >
                Explore Beacon 1
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {beacon1Content.heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="border border-border-card bg-surface-elevated px-4 py-5 text-left"
                >
                  <p className="text-xs uppercase tracking-[0.24em] text-muted">
                    {signal.label}
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold text-foreground">
                    {signal.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="section-stage p-5 md:p-8">
            <div className="overflow-hidden bg-white p-4 md:p-8">
              <Image
                src={beacon1Content.summary.productImage.src}
                alt={beacon1Content.summary.productImage.alt}
                width={900}
                height={1100}
                className="mx-auto h-auto w-full max-w-[680px]"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
