import { startContent } from "@/content/start";
import { cn } from "@/lib/utils";
import { StartSection } from "./StartSection";

const KIND_STYLES = {
  warning: {
    block:
      "border-border-emphasis border-l-2 border-l-ember bg-pitch-low",
    eyebrow: "text-ember",
    iconWrap: "border-ember bg-pitch-low text-ember",
    bullet: "bg-ember",
  },
  info: {
    block:
      "border-border-card bg-surface ring-0 ring-inset ring-transparent",
    eyebrow: "text-muted",
    iconWrap: "border-border-card bg-fill-muted text-foreground",
    bullet: "bg-accent",
  },
} as const;

export function StartSafetySection() {
  const safety = startContent.safety;
  return (
    <StartSection
      id="safety"
      eyebrow={safety.eyebrow}
      title={safety.title}
      surface="elevated"
    >
      <div className="space-y-6">
        {safety.sections.map((section) => {
          const styles = KIND_STYLES[section.kind];
          return (
            <article
              key={section.id}
              id={section.id}
              className={cn(
                "scroll-mt-24 border p-6 md:p-8",
                styles.block,
              )}
            >
              <header className="flex items-start gap-3 sm:gap-4">
                {section.emoji ? (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-lg",
                      styles.iconWrap,
                    )}
                  >
                    {section.emoji}
                  </span>
                ) : null}
                <div>
                  <p
                    className={cn(
                      "type-mono-label",
                      styles.eyebrow,
                    )}
                  >
                    {section.kind === "warning" ? "Safety" : "Compliance"}
                  </p>
                  <h3 className="type-display-card mt-1 text-foreground">
                    {section.title}
                  </h3>
                </div>
              </header>

              {"intro" in section && section.intro ? (
                <p className="mt-5 text-base leading-relaxed text-foreground/85">
                  {section.intro}
                </p>
              ) : null}

              {"rangeRows" in section && section.rangeRows ? (
                <div className="mt-5 overflow-hidden border border-border-card bg-surface">
                  <table className="w-full text-left text-sm md:text-base">
                    <caption className="sr-only">Operating ranges</caption>
                    <tbody>
                      {section.rangeRows.map((row, idx) => (
                        <tr
                          key={row.activity}
                          className={cn(
                            "block md:table-row",
                            idx > 0 && "border-t border-border-subtle",
                          )}
                        >
                          <th
                            scope="row"
                            className="block px-5 pt-3 pb-1 font-display font-semibold text-foreground md:table-cell md:py-3"
                          >
                            {row.activity}
                          </th>
                          <td className="block px-5 pt-0 pb-3 font-mono text-sm text-foreground/85 md:table-cell md:py-3 md:text-base">
                            {row.range}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {"bullets" in section && section.bullets ? (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full",
                          styles.bullet,
                        )}
                      />
                      <span className="text-base leading-relaxed text-foreground/85">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {"body" in section && section.body
                ? section.body.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 text-base leading-relaxed text-foreground/85 first-of-type:mt-5"
                    >
                      {paragraph}
                    </p>
                  ))
                : null}
            </article>
          );
        })}
      </div>
    </StartSection>
  );
}
