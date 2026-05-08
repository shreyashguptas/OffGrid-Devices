import { startContent } from "@/content/start";

export function StartRegionNoticeSection() {
  const notice = startContent.regionNotice;
  return (
    <section
      id="region"
      className="scroll-mt-24 border-b border-border-subtle bg-background py-12 md:py-16"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <div
          role="alert"
          className="overflow-hidden rounded-[1.75rem] border border-red-500/30 bg-red-500/[0.06] ring-1 ring-inset ring-red-500/10"
        >
          <div className="flex items-center gap-3 border-b border-red-500/20 bg-red-500/10 px-6 py-3 md:px-8">
            <span
              aria-hidden="true"
              className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-red-500/40 bg-red-500/15 text-sm font-bold text-red-700"
            >
              !
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-700 dark:text-red-500">
              {notice.eyebrow}
            </p>
          </div>

          <div className="space-y-5 px-6 py-7 md:px-8 md:py-8">
            <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-foreground md:text-3xl">
              {notice.title}
            </h2>

            {notice.body.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-relaxed text-foreground/85 md:text-lg"
              >
                {paragraph}
              </p>
            ))}

            <ol className="space-y-3">
              {notice.steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 font-mono text-xs font-semibold text-red-700"
                  >
                    {index + 1}
                  </span>
                  <span className="text-base leading-relaxed text-foreground/85">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

            <p className="text-base leading-relaxed text-foreground/85">
              {notice.closing}{" "}
              <a
                href="#step-6"
                className="font-semibold text-accent-dark underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
              >
                Jump to Step 6
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
