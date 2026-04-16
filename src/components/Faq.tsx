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
          <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-5xl">
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
            <details
              key={item.question}
              className="group section-card rounded-[1.5rem] px-6 py-5 transition-colors open:bg-surface-elevated md:px-7 md:py-6"
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6">
                <dt className="font-display text-lg font-semibold leading-snug text-foreground md:text-xl">
                  {item.question}
                </dt>
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-card text-muted transition-transform duration-300 group-open:rotate-45"
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
              <dd className="mt-4 text-base leading-relaxed text-muted-light md:text-[1.05rem]">
                {item.answer}
              </dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
