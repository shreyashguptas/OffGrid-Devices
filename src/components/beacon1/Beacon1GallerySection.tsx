import { SectionIntro } from "@/components/shared/SectionIntro";
import { ZoomableImage } from "@/components/shared/ZoomableImage";
import { beacon1Content } from "@/content/beacon1";

export function Beacon1GallerySection() {
  return (
    <section
      id="gallery"
      className="border-b border-border-subtle bg-background py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={beacon1Content.productPage.design.badge}
          title={
            <>
              {beacon1Content.productPage.design.title}
              <br />
              <span className="text-muted">{beacon1Content.productPage.design.subtitle}</span>
            </>
          }
          description={beacon1Content.productPage.design.description}
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2">
          {beacon1Content.productGalleryCards.map((card) => (
            <article
              key={card.title}
              className="section-card overflow-hidden"
            >
              <div className="bg-surface-elevated p-5 md:p-8">
                <div className="overflow-hidden bg-background">
                  <ZoomableImage
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
                <h3 className="mt-3 type-display-card">
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
