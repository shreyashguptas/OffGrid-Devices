import { startContent } from "@/content/start";
import { StartCopyValue } from "./StartCopyValue";
import { StartPhotoPlaceholder } from "./StartPhotoPlaceholder";
import { StartSection } from "./StartSection";

export function StartIdentifySection() {
  const identify = startContent.identify;
  return (
    <StartSection
      id="identify"
      eyebrow={identify.eyebrow}
      title={identify.title}
      description={identify.body}
      surface="default"
    >
      <div className="space-y-6">
        <div className="section-card rounded-[1.5rem] p-5 md:p-6">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Debossed text on bottom of device
          </p>
          <pre className="mt-3 overflow-x-auto whitespace-pre rounded-2xl border border-border-card bg-fill-muted px-5 py-4 font-mono text-sm leading-relaxed text-foreground md:text-base">
{identify.deboss.join("\n")}
          </pre>
        </div>

        <StartCopyValue label="FCC ID" value="2AF6B-RAK4630" />

        <StartPhotoPlaceholder caption={identify.photoCaption} aspect="wide" />

        <p className="text-base leading-relaxed text-muted-light">
          {identify.fallback.split("hello@offgridevices.com")[0]}
          <a
            href="mailto:hello@offgridevices.com"
            className="font-medium text-accent-dark underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
          >
            hello@offgridevices.com
          </a>
          {identify.fallback.split("hello@offgridevices.com")[1]}
        </p>
      </div>
    </StartSection>
  );
}
