import type { StartFaqItem } from "@/content/start";

type StartFaqListProps = {
  items: readonly StartFaqItem[];
};

export function StartFaqList({ items }: StartFaqListProps) {
  return (
    <dl className="space-y-3">
      {items.map((item) => (
        <details
          key={item.id}
          id={item.id}
          className="group section-card scroll-mt-24 rounded-[1.5rem] px-5 py-4 transition-colors open:bg-surface-elevated md:px-7 md:py-5"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-3 sm:gap-6">
            <dt className="font-display text-base font-semibold leading-snug text-foreground md:text-lg">
              {item.question}
            </dt>
            <span
              aria-hidden="true"
              className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-card text-muted transition-transform duration-300 group-open:rotate-45"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
            </span>
          </summary>
          <dd className="mt-4 space-y-3 text-base leading-relaxed text-muted-light">
            {item.answer.split("\n\n").map((paragraph, idx) => (
              <p key={`${item.id}-p-${idx}`}>{paragraph}</p>
            ))}
          </dd>
        </details>
      ))}
    </dl>
  );
}
