import Image from "next/image";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { link1Content } from "@/content/link1";

export function Link1TestimonialsGridSection() {
  return (
    <section className="border-b border-border-subtle bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionIntro
          badge={link1Content.productPage.testimonials.badge}
          title={
            <>
              {link1Content.productPage.testimonials.title}
              <br />
              <span className="text-muted">
                {link1Content.productPage.testimonials.subtitle}
              </span>
            </>
          }
          description={link1Content.reviewSummary.ratingLabel}
          className="mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {link1Content.testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="section-card flex flex-col rounded-[2rem] p-6"
            >
              <div className="mb-4 flex items-center gap-1 text-accent">
                {[1, 2, 3, 4, 5].map((index) => (
                  <svg
                    key={index}
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
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
