import { startContent } from "@/content/start";
import { StartCallout } from "./StartCallout";
import { StartSection } from "./StartSection";

export function StartFirmwareSection() {
  const firmware = startContent.firmware;
  return (
    <StartSection
      id="firmware"
      eyebrow={firmware.eyebrow}
      title={firmware.title}
      description={firmware.body}
      surface="default"
    >
      <div className="space-y-6">
        <p className="text-base leading-relaxed text-foreground/85">
          {firmware.checkVersion}
        </p>

        <div className="section-card rounded-[1.5rem] p-6 md:p-8">
          <h3 className="font-display text-lg font-semibold tracking-tight text-foreground md:text-xl">
            How to update
          </h3>
          <ol className="mt-4 space-y-3">
            {firmware.updateSteps.map((step, index) => (
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
            Release notes:{" "}
            <a
              href={firmware.releaseNotes}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-dark underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              github.com/meshtastic/firmware/releases
            </a>
          </p>
        </div>

        <StartCallout kind="info" eyebrow="Heads up">
          <p>{firmware.note}</p>
        </StartCallout>
      </div>
    </StartSection>
  );
}
