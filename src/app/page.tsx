import type { Metadata } from "next";
import Link from "next/link";
import { Beacon2CallToAction } from "@/components/beacon2/Beacon2CallToAction";
import { HomeFeatureShowcaseSection } from "@/components/home/HomeFeatureShowcaseSection";
import { HomeHardwareSection } from "@/components/home/HomeHardwareSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProductDetailsSection } from "@/components/home/HomeProductDetailsSection";
import { HomeSpecsSection } from "@/components/home/HomeSpecsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { allBlogPosts } from "@/content/blog";
import { beacon2Content } from "@/content/products";
import { jsonLdScriptProps, productJsonLd } from "@/lib/jsonLd";
import { loadProductForPage } from "@/lib/loadProductForPage";
import { getBeacon2ProductWithCache } from "@/lib/shopify";

export const metadata: Metadata = {
  title: {
    absolute: "MagSafe LoRa Mesh Radio · OffGrid Beacon 2",
  },
  description:
    "OffGrid Beacon 2 is the MagSafe LoRa mesh radio with Meshtastic pre-flashed — 3000 mAh battery, replaceable antenna, N48H magnets. Stay connected off-grid for hiking, events, and emergencies — no cell tower required.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MagSafe LoRa Mesh Radio · OffGrid Beacon 2",
    description:
      "OffGrid Beacon 2: MagSafe-compatible LoRa mesh radio with Meshtastic pre-flashed, 3000 mAh, and a replaceable SMA antenna. Off-grid communication that stays on your phone.",
    url: "/",
    type: "website",
  },
};

export default async function Home() {
  const beacon2Product = await loadProductForPage(
    "Beacon 2 product for homepage",
    getBeacon2ProductWithCache,
  );
  const price = beacon2Product?.variant?.price?.amount;
  const priceCurrency = beacon2Product?.variant?.price?.currencyCode ?? "USD";
  const availability =
    beacon2Product?.availableForSale && beacon2Product.variant?.availableForSale
      ? "InStock"
      : "OutOfStock";
  const latestPost = allBlogPosts[0];

  return (
    <>
      <script
        {...jsonLdScriptProps(
          productJsonLd({
            slot: "beacon-2",
            brandedName: beacon2Content.summary.brandedName,
            shortName: beacon2Content.summary.name,
            description: beacon2Content.description,
            sku: "OFFGRID-BEACON-2",
            category: "Radios > LoRa Mesh Radios",
            url: "/",
            images: [
              beacon2Content.summary.heroImage.src,
              "/beacon-2/feature-antenna.png",
              "/beacon-2/whats-in-the-box.png",
            ],
            offer: price
              ? {
                  price,
                  priceCurrency,
                  availability,
                }
              : undefined,
          }),
        )}
      />
      <HomeHeroSection product={beacon2Product} />
      <HomeProductDetailsSection />
      <HomeFeatureShowcaseSection />
      <HomeHardwareSection />
      <HomeTestimonialsSection />
      <HomeSpecsSection />
      {latestPost ? (
        <section className="border-b border-border-subtle bg-background py-16 md:py-20">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
            <div>
              <p className="type-eyebrow text-muted">Field notes</p>
              <h2 className="mt-4 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                Practical notes from the mesh.
              </h2>
            </div>
            <Link
              href={`/blog/${latestPost.slug}`}
              className="group border border-border-card bg-surface-elevated p-6 transition-colors hover:border-border-emphasis"
            >
              <p className="text-sm uppercase tracking-[0.22em] text-muted">
                Latest from the blog
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                {latestPost.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-light">
                {latestPost.excerpt}
              </p>
              <span className="mt-5 inline-block text-sm font-semibold uppercase tracking-[0.16em] text-accent">
                Read field notes
              </span>
            </Link>
          </div>
        </section>
      ) : null}
      <Beacon2CallToAction
        eyebrow={beacon2Content.home.cta.eyebrow}
        title={beacon2Content.home.cta.title}
        description={beacon2Content.home.cta.description}
        secondaryHref={beacon2Content.home.cta.secondaryHref}
        secondaryLabel={beacon2Content.home.cta.secondaryLabel}
      />
    </>
  );
}
