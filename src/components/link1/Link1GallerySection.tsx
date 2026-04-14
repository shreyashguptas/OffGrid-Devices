import Image from "next/image";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { link1Content } from "@/content/link1";

export function Link1GallerySection() {
  return (
    <section
      id="gallery"
      className="border-b border-border-subtle bg-background py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={link1Content.productPage.design.badge}
          title={
            <>
              {link1Content.productPage.design.title}
              <br />
              <span className="text-muted">{link1Content.productPage.design.subtitle}</span>
            </>
          }
          description={link1Content.productPage.design.description}
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {link1Content.productGalleryCards.map((card) => (
            <article
              key={card.title}
              className="section-card overflow-hidden rounded-[2rem]"
            >
              <div className="bg-surface-elevated p-5 md:p-8">
                <div className="overflow-hidden rounded-[1.5rem] bg-background">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    width={900}
                    height={1100}
                    className="h-auto w-full image-hover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="px-6 pb-8 pt-2 md:px-8">
                <p className="text-xs uppercase tracking-[0.24em] text-muted">
                  {card.kicker}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold">
                  {card.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-light">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
