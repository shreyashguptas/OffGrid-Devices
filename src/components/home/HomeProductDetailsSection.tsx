import { SectionIntro } from "@/components/shared/SectionIntro";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { link1Content } from "@/content/link1";

export function HomeProductDetailsSection() {
  return (
    <section className="border-b border-border-subtle bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={link1Content.home.details.badge}
          title={link1Content.home.details.title}
          description={link1Content.home.details.description}
          className="mb-14"
        />
      </div>

      <ZoomParallax images={link1Content.parallaxImages} />
    </section>
  );
}
