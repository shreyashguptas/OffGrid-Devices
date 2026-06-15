import Image from "next/image";
import { RatingStars } from "@/components/shared/RatingStars";
import { beacon1Content } from "@/content/beacon1";
import { beacon2Content } from "@/content/products";

export function Beacon2TestimonialsSection() {
  // Filter out any Beacon 1 testimonial that references a Beacon 1-specific
  // spec (e.g. "2000 mAh battery"). Beacon 2 ships with 3000 mAh — leaving
  // that contradiction visible on the PDP confuses readers and undermines
  // the on-page disclosure that these reviews are from the prior model.
  const items = beacon1Content.testimonials
    .filter((testimonial) => !/2000\s*mAh/i.test(testimonial.review))
    .map((testimonial) => {
      const reviewer = beacon1Content.reviewSummary.reviewerAvatars.find(
        (avatar) =>
          avatar.name.toLowerCase() === testimonial.name.toLowerCase(),
      );

      return {
        text: testimonial.review,
        name: testimonial.name,
        date: testimonial.date,
        avatarSrc: reviewer?.image ?? testimonial.image ?? null,
        initials: reviewer?.initials ?? testimonial.name.charAt(0),
      };
    });

  return (
    <section className="relative border-b border-bark bg-pitch-low py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="type-mono-label text-ember">
              {beacon2Content.home.testimonials.eyebrow}
            </p>
            <h2 className="type-display-section mt-5 text-bone">
              {beacon2Content.home.testimonials.title}
            </h2>
            <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.4] text-sand sm:text-[22px]">
              {beacon2Content.home.testimonials.subtitle}
            </p>
            <p className="font-mono mt-4 max-w-2xl text-[12px] tracking-[0.08em] text-sand/70">
              {beacon2Content.home.testimonials.footnote}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <RatingStars
              className="inline-flex items-center gap-1 text-ember"
              size={18}
            />
            <span className="type-mono-label text-[12px] tracking-[0.14em] text-sand">
              {beacon1Content.reviewSummary.ratingLabel}
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={`${item.name}-${item.date}`}
              className="flex h-full flex-col border border-sand/15 bg-bark-soft p-7"
            >
              <blockquote className="font-editorial text-[17px] leading-[1.45] text-bone sm:text-[19px]">
                “{item.text}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-sand/15 pt-5">
                <div className="relative h-10 w-10 overflow-hidden border border-sand/30 bg-pitch-deep">
                  {item.avatarSrc ? (
                    <Image
                      src={item.avatarSrc}
                      alt={item.name}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-display text-sm font-extrabold tracking-[0.02em] text-ember">
                      {item.initials}
                    </span>
                  )}
                </div>
                <div>
                  <div className="tracking-mono font-display text-[13px] font-bold uppercase text-bone">
                    {item.name}
                  </div>
                  <div className="tracking-mono font-mono text-[11px] uppercase text-sand/65">
                    {item.date} · Verified
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
