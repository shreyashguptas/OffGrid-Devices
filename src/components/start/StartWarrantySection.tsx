import { startContent } from "@/content/start";
import { StartSection } from "./StartSection";

export function StartWarrantySection() {
  const warranty = startContent.warranty;
  const returns = warranty.returns;
  return (
    <StartSection
      id="warranty"
      eyebrow={warranty.eyebrow}
      title={warranty.title}
      description={warranty.body}
      surface="default"
    >
      <div className="space-y-8">
        <div className="grid gap-4 md:grid-cols-2">
          <CoverageList
            title="Covered"
            tone="positive"
            items={warranty.covered}
          />
          <CoverageList
            title="Not covered"
            tone="negative"
            items={warranty.notCovered}
          />
        </div>

        <p className="text-sm leading-relaxed text-muted-light">
          {warranty.legal}
        </p>

        <div id="returns" className="section-card scroll-mt-24 p-6 md:p-8">
          <h3 className="type-display-card text-foreground">
            {returns.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-light">
            {returns.body}
          </p>
          <ol className="mt-5 space-y-3">
            {returns.steps.map((step, index) => (
              <li key={step} className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border-card bg-fill-muted font-mono text-xs text-muted"
                >
                  {index + 1}
                </span>
                <span className="text-base leading-relaxed text-foreground/85">
                  {step}
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-muted">{returns.note}</p>
        </div>
      </div>
    </StartSection>
  );
}

function CoverageList({
  title,
  tone,
  items,
}: {
  title: string;
  tone: "positive" | "negative";
  items: readonly string[];
}) {
  const styles =
    tone === "positive"
      ? {
          eyebrow: "text-accent-dark",
          bullet: "bg-accent",
        }
      : {
          eyebrow: "text-ember",
          bullet: "bg-ember",
        };

  return (
    <div className="section-card p-6">
      <p
        className={`type-mono-label ${styles.eyebrow}`}
      >
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className={`mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full ${styles.bullet}`}
            />
            <span className="text-sm leading-relaxed text-foreground/85 md:text-base">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
