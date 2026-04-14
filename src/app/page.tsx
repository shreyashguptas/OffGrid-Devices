import { HomeFeatureStorySection } from "@/components/home/HomeFeatureStorySection";
import { HomeHardwareSection } from "@/components/home/HomeHardwareSection";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeProductDetailsSection } from "@/components/home/HomeProductDetailsSection";
import { HomeSpecsSection } from "@/components/home/HomeSpecsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { Link1CallToAction } from "@/components/link1/Link1CallToAction";
import { link1Content } from "@/content/link1";

export default function Home() {
  return (
    <>
      <HomeHeroSection />
      <HomeProductDetailsSection />
      <HomeFeatureStorySection />
      <HomeHardwareSection />
      <HomeSpecsSection />
      <HomeTestimonialsSection />
      <Link1CallToAction
        eyebrow={link1Content.home.cta.eyebrow}
        title={link1Content.home.cta.title}
        description={link1Content.home.cta.description}
        secondaryHref={link1Content.home.cta.secondaryHref}
        secondaryLabel={link1Content.home.cta.secondaryLabel}
      />
    </>
  );
}
