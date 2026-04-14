import Image from "next/image";
import Link from "next/link";
import { Link1CheckoutButton } from "@/components/Link1CheckoutButton";
import { link1Content } from "@/content/link1";

export function Link1HeroSection() {
  return (
    <section className="border-b border-border-subtle bg-background pt-28 pb-20 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-3 rounded-full border border-border-card bg-surface px-4 py-2 text-sm text-muted-light">
              <span className="h-2 w-2 rounded-full bg-accent" />
              {link1Content.productPage.eyebrow}
            </div>

            <h1 className="mt-8 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
              {link1Content.summary.name}
            </h1>

            <p className="mt-4 text-xl text-muted-light md:text-2xl">
              {link1Content.summary.subtitle}
            </p>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-light lg:max-w-2xl">
              {link1Content.productPage.description}
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <Link1CheckoutButton
                defaultLabel={link1Content.summary.buyLabel}
                loadingLabel={link1Content.summary.loadingLabel}
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 font-semibold text-on-accent transition-all duration-300 hover:bg-accent-light hover:shadow-lg hover:shadow-accent/20"
              />
              <Link
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-border-emphasis bg-surface px-8 py-4 font-semibold text-foreground transition-colors duration-300 hover:border-border-emphasis-hover hover:bg-surface-elevated"
              >
                Explore features
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {link1Content.heroSignals.map((signal) => (
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
                src={link1Content.summary.productImage.src}
                alt={link1Content.summary.productImage.alt}
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
