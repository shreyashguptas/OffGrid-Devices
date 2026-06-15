import { startContent } from "@/content/start";
import { StartSection } from "./StartSection";

export function StartCareSection() {
  const care = startContent.care;
  return (
    <StartSection
      id="care"
      eyebrow={care.eyebrow}
      title={care.title}
      description={care.body}
      surface="default"
    >
      <div className="space-y-8">
        <div className="section-card overflow-hidden">
          <table className="w-full text-left text-sm md:text-base">
            <caption className="sr-only">Operating temperature ranges</caption>
            <thead className="hidden md:table-header-group">
              <tr className="border-b border-border-subtle bg-fill-muted">
                <th
                  scope="col"
                  className="px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted md:px-6"
                >
                  Activity
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted md:px-6"
                >
                  Safe range
                </th>
              </tr>
            </thead>
            <tbody>
              {care.temperatures.map((row, idx) => (
                <tr
                  key={row.activity}
                  className={
                    idx > 0
                      ? "block border-t border-border-subtle md:table-row"
                      : "block md:table-row"
                  }
                >
                  <th
                    scope="row"
                    className="block px-5 pt-4 pb-1 font-display font-semibold text-foreground md:table-cell md:px-6 md:py-4"
                  >
                    {row.activity}
                  </th>
                  <td className="block px-5 pt-0 pb-4 font-mono text-sm text-foreground/85 md:table-cell md:px-6 md:py-4 md:text-base">
                    {row.range}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <CareList title="Storage tips" items={care.storage} />
        <CareList title="Charging tips" items={care.charging} />
        <CareList title="Cleaning" items={care.cleaning} />
      </div>
    </StartSection>
  );
}

function CareList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              aria-hidden="true"
              className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
            />
            <span className="text-base leading-relaxed text-foreground/85">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
