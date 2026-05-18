import { AccordionDetails } from "@/components/shared/AccordionDetails";
import { faqJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";

export type FaqProps = {
  items: { question: string; answer: string }[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
};

export function Faq({
  items,
  eyebrow = "FAQ",
  title = "Frequently asked questions",
  description,
  className,
}: FaqProps) {
  if (!items || items.length === 0) return null;

  return (
    <section
      className={`border-b border-border-subtle bg-background py-16 md:py-20 ${className ?? ""}`.trim()}
    >
      <script {...jsonLdScriptProps(faqJsonLd(items))} />
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center">
          {eyebrow ? (
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <dl className="mt-12 space-y-4">
          {items.map((item) => (
            <AccordionDetails
              key={item.question}
              className="rounded-[1.5rem] px-6 py-5 md:px-7 md:py-6"
              summaryClassName="gap-6"
              contentClassName="contents"
              summary={
                <dt className="font-display text-lg font-semibold leading-snug text-foreground md:text-xl">
                  {item.question}
                </dt>
              }
            >
              <dd className="mt-4 text-base leading-relaxed text-muted-light md:text-[1.05rem]">
                {item.answer}
              </dd>
            </AccordionDetails>
          ))}
        </dl>
      </div>
    </section>
  );
}
