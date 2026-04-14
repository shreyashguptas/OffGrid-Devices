import { TestimonialsV2Section } from "@/components/ui/testimonial-v2";
import { link1Content } from "@/content/link1";

export function HomeTestimonialsSection() {
  const items = link1Content.testimonials.map((testimonial) => {
    const reviewer = link1Content.reviewSummary.reviewerAvatars.find(
      (avatar) => avatar.name.toLowerCase() === testimonial.name.toLowerCase(),
    );

    return {
      text: testimonial.review,
      name: testimonial.name,
      role: `${testimonial.date} · Verified buyer`,
      avatarSrc: reviewer?.image ?? testimonial.image ?? null,
    };
  });

  return (
    <section className="border-b border-border-subtle bg-background">
      <TestimonialsV2Section
        badge={link1Content.home.testimonials.badge}
        title={link1Content.home.testimonials.title}
        description={link1Content.home.testimonials.description}
        items={items}
        headerExtra={
          <>
            <div className="flex items-center justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((index) => (
                <svg
                  key={index}
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <span className="text-lg font-medium text-muted-light">
              {link1Content.reviewSummary.ratingLabel}
            </span>
          </>
        }
      />
    </section>
  );
}
