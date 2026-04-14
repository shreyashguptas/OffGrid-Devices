import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import { Link1FeaturesSection } from "@/components/link1/Link1FeaturesSection";
import { Link1GallerySection } from "@/components/link1/Link1GallerySection";
import { Link1HeroSection } from "@/components/link1/Link1HeroSection";
import { Link1SpecsSection } from "@/components/link1/Link1SpecsSection";
import { Link1TestimonialsGridSection } from "@/components/link1/Link1TestimonialsGridSection";
import { link1Content } from "@/content/link1";

export default function Link1Product() {
  return (
    <>
      <Link1HeroSection />
      <Link1FeaturesSection />
      <Link1GallerySection />
      <Link1SpecsSection />
      <Link1TestimonialsGridSection />
      <Link1CallToAction
        eyebrow={link1Content.productPage.cta.eyebrow}
        title={link1Content.productPage.cta.title}
        description={link1Content.productPage.cta.description}
        secondaryHref={link1Content.productPage.cta.secondaryHref}
        secondaryLabel={link1Content.productPage.cta.secondaryLabel}
        backgroundClassName="bg-surface-elevated"
      />
    </>
  );
}
