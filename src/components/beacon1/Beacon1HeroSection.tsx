import Image from "next/image";
import Link from "next/link";
import { Beacon1CheckoutButton } from "@/components/Beacon1CheckoutButton";
import { beacon1Content } from "@/content/beacon1";

export function Beacon1HeroSection() {
  return (
    <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {beacon1Content.productPage.eyebrow}
            </div>

            <h1 className="mt-6 break-words font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:mt-8 md:text-6xl lg:text-7xl">
              {beacon1Content.summary.brandedName}
            </h1>

            <p className="mt-3 text-lg text-muted-light sm:text-xl md:mt-4 md:text-2xl">
              {beacon1Content.summary.subtitle}
            </p>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-light md:mt-6 md:text-lg lg:max-w-2xl">
              {beacon1Content.productPage.description}
            </p>

            <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-10 lg:justify-start">
              <Beacon1CheckoutButton
                defaultLabel={beacon1Content.summary.buyLabel}
                loadingLabel={beacon1Content.summary.loadingLabel}
                surface="hero"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-accent px-7 py-3.5 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20 sm:px-8 sm:py-4"
              />
              <Link
                href="#features"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full border border-border-emphasis bg-surface px-7 py-3.5 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-surface-elevated sm:px-8 sm:py-4"
              >
                Explore features
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {beacon1Content.heroSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-[1.5rem] border border-border-card bg-surface-elevated px-4 py-5 text-left"
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

          <div className="section-stage rounded-[2.5rem] p-5 md:p-8">
            <div className="overflow-hidden rounded-[2rem] bg-white p-4 md:p-8">
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
