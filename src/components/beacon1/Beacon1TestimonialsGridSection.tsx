import Image from "next/image";
import { RatingStars } from "@/components/shared/RatingStars";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { beacon1Content } from "@/content/beacon1";

export function Beacon1TestimonialsGridSection() {
  return (
    <section className="border-b border-border-subtle bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={beacon1Content.productPage.testimonials.badge}
          title={
            <>
              {beacon1Content.productPage.testimonials.title}
              <br />
              <span className="text-muted">
                {beacon1Content.productPage.testimonials.subtitle}
              </span>
            </>
          }
          description={beacon1Content.reviewSummary.ratingLabel}
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {beacon1Content.testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="section-card flex flex-col rounded-[2rem] p-6"
            >
              <RatingStars size={14} className="mb-4 flex items-center gap-1 text-accent" />
              <p className="mb-6 flex-1 leading-relaxed text-foreground/90">
                &ldquo;{testimonial.review}&rdquo;
              </p>
              {testimonial.image ? (
                <div className="mb-4 overflow-hidden rounded-[1.25rem] border border-border-subtle">
                  <Image
                    src={testimonial.image}
                    alt={`Review photo from ${testimonial.name}`}
                    width={400}
                    height={300}
                    className="h-48 w-full object-cover"
                  />
                </div>
              ) : null}
              <div className="flex items-center justify-between border-t border-border-subtle pt-4">
                <div>
                  <p className="font-display text-sm font-semibold">
                    {testimonial.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted">{testimonial.date}</p>
                </div>
                <span className="text-xs text-muted">Verified buyer</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
