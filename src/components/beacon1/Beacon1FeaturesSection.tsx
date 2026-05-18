import { SectionIntro } from "@/components/shared/SectionIntro";
import { beacon1Content } from "@/content/beacon1";

export function Beacon1FeaturesSection() {
  return (
    <section
      id="features"
      className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={beacon1Content.productPage.why.badge}
          title={
            <>
              {beacon1Content.productPage.why.title}
              <br />
              <span className="text-muted">{beacon1Content.productPage.why.subtitle}</span>
            </>
          }
          description={beacon1Content.productPage.why.description}
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beacon1Content.featureCards.map((feature) => (
            <article
              key={feature.title}
              className="section-card rounded-[2rem] p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent/10 text-2xl">
                {feature.icon}
              </div>
              <h3 className="mt-6 font-display text-2xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-light">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
