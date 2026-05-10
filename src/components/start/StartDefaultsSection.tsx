import { startContent } from "@/content/start";
import { cn } from "@/lib/utils";
import { StartSection } from "./StartSection";

export function StartDefaultsSection() {
  const defaults = startContent.defaults;
  const channels = defaults.privateChannels;
  return (
    <StartSection
      id="defaults"
      eyebrow={defaults.eyebrow}
      title={defaults.title}
      description={defaults.body}
      surface="elevated"
    >
      <div className="space-y-10">
        <div className="section-card overflow-hidden rounded-[1.5rem]">
          <table className="w-full text-left text-sm md:text-base">
            <caption className="sr-only">
              Default settings for the OffGrid Beacon 2
            </caption>
            <thead>
              <tr className="border-b border-border-subtle bg-fill-muted">
                <th
                  scope="col"
                  className="px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted md:px-6"
                >
                  Setting
                </th>
                <th
                  scope="col"
                  className="px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted md:px-6"
                >
                  Default
                </th>
                <th
                  scope="col"
                  className="hidden px-5 py-3 font-display text-xs font-semibold uppercase tracking-[0.18em] text-muted md:table-cell md:px-6"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {defaults.rows.map((row, idx) => (
                <tr
                  key={row.label}
                  className={cn(
                    idx > 0 && "border-t border-border-subtle",
                    row.emphasis && "bg-red-500/[0.07]",
                  )}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 align-top font-display font-semibold text-foreground md:px-6"
                  >
                    {row.label}
                  </th>
                  <td
                    className={cn(
                      "px-5 py-4 align-top md:px-6",
                      row.emphasis ? "text-red-300 font-medium" : "text-foreground/85",
                    )}
                  >
                    {row.value}
                    {row.note ? (
                      <span className="mt-1 block text-xs text-muted md:hidden">
                        {row.note}
                      </span>
                    ) : null}
                  </td>
                  <td
                    className={cn(
                      "hidden px-5 py-4 align-top text-sm md:table-cell md:px-6",
                      row.emphasis ? "text-red-300 font-medium" : "text-muted",
                    )}
                  >
                    {row.note ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section-card rounded-[1.5rem] p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {channels.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-light">
            {channels.body}
          </p>
          <ol className="mt-5 space-y-3">
            {channels.steps.map((step, index) => (
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
          <p className="mt-5 text-sm text-muted">
            Detailed walkthrough:{" "}
            <a
              href={channels.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-dark underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              meshtastic.org/docs/configuration/radio/channels
            </a>
          </p>
        </div>
      </div>
    </StartSection>
  );
}
