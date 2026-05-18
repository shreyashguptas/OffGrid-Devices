import { AccordionDetails } from "@/components/shared/AccordionDetails";
import type { StartFaqItem } from "@/content/start";

type StartFaqListProps = {
  items: readonly StartFaqItem[];
};

export function StartFaqList({ items }: StartFaqListProps) {
  return (
    <dl className="space-y-3">
      {items.map((item) => (
        <AccordionDetails
          key={item.id}
          id={item.id}
          className="scroll-mt-24 rounded-[1.5rem] px-5 py-4 md:px-7 md:py-5"
          summaryClassName="gap-3 sm:gap-6"
          contentClassName="contents"
          summary={
            <dt className="font-display text-base font-semibold leading-snug text-foreground md:text-lg">
              {item.question}
            </dt>
          }
        >
          <dd className="mt-4 space-y-3 text-base leading-relaxed text-muted-light">
            {item.answer.split("\n\n").map((paragraph, idx) => (
              <p key={`${item.id}-p-${idx}`}>{paragraph}</p>
            ))}
          </dd>
        </AccordionDetails>
      ))}
    </dl>
  );
}
