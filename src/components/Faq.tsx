import { AccordionDetails } from "@/components/shared/AccordionDetails";
import { FaqAnalytics } from "@/components/analytics/FaqAnalytics";
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
            <p className="type-eyebrow text-muted">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-4 type-display-section">
            {title}
          </h2>
          {description ? (
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-light md:text-lg">
              {description}
            </p>
          ) : null}
        </div>

        <FaqAnalytics>
          <dl className="mt-12 space-y-4">
            {items.map((item) => (
              <AccordionDetails
                key={item.question}
                className="px-6 py-5 md:px-7 md:py-6"
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
        </FaqAnalytics>
      </div>
    </section>
  );
}
