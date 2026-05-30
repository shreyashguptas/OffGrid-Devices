import { startContent } from "@/content/start";
import { StartCallout } from "./StartCallout";
import { StartPhotoPlaceholder } from "./StartPhotoPlaceholder";
import { StartSection } from "./StartSection";
import { StartStepCard } from "./StartStepCard";

export function StartSetupSection() {
  const setup = startContent.setup;
  const captions = setup.photoCaptions;
  const stepExtras: Record<number, React.ReactNode> = {
    1: <StartPhotoPlaceholder caption={captions.charging} />,
    2: <StartPhotoPlaceholder caption={captions.antenna} />,
    3: <StartPhotoPlaceholder caption={captions.power} />,
    4: <AppLinks ios={setup.appLinks.ios} android={setup.appLinks.android} />,
    6: <StartPhotoPlaceholder caption={captions.regionScreen} />,
  };

  return (
    <StartSection
      id="setup"
      eyebrow={setup.eyebrow}
      title={setup.title}
      surface="default"
    >
      <div className="space-y-6">
        <StartCallout kind="info" eyebrow="Estimated time" icon="⏱">
          <p>{setup.note}</p>
        </StartCallout>

        <ol className="space-y-6">
          {setup.steps.map((step) => (
            <li key={step.number}>
              <StartStepCard step={step}>
                {stepExtras[step.number]}
              </StartStepCard>
            </li>
          ))}
        </ol>
      </div>
    </StartSection>
  );
}

function AppLinks({ ios, android }: { ios: string; android: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <a
        href={ios}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 border border-border-card bg-surface px-5 py-4 transition-colors hover:bg-fill-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div>
          <p className="type-mono-label-sm text-muted">
            iOS
          </p>
          <p className="mt-1 font-display text-base font-semibold text-foreground">
            Meshtastic on the App Store
          </p>
        </div>
        <span aria-hidden="true" className="text-muted">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </a>
      <a
        href={android}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-4 border border-border-card bg-surface px-5 py-4 transition-colors hover:bg-fill-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div>
          <p className="type-mono-label-sm text-muted">
            Android
          </p>
          <p className="mt-1 font-display text-base font-semibold text-foreground">
            Meshtastic on Google Play
          </p>
        </div>
        <span aria-hidden="true" className="text-muted">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M9 7h8v8" />
          </svg>
        </span>
      </a>
    </div>
  );
}
