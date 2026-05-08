import type { ReactNode } from "react";
import type { StartStep } from "@/content/start";
import { StartCallout } from "./StartCallout";

type StartStepCardProps = {
  step: StartStep;
  children?: ReactNode;
};

export function StartStepCard({ step, children }: StartStepCardProps) {
  const stepId = `step-${step.number}`;
  return (
    <article
      id={stepId}
      className="section-card scroll-mt-24 rounded-[1.75rem] p-6 md:p-8"
    >
      <header className="flex items-baseline gap-4">
        <span
          aria-hidden="true"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-display text-base font-semibold text-accent-dark"
        >
          {step.number}
        </span>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            <span className="sr-only">Step </span>
            Step {step.number}
          </p>
          <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.65rem]">
            {step.title}
          </h3>
        </div>
      </header>

      <div className="mt-5 space-y-4 text-base leading-relaxed text-foreground/85">
        {step.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      {children ? <div className="mt-6">{children}</div> : null}

      {step.warning ? (
        <div className="mt-6">
          <StartCallout kind="warning" icon="!" eyebrow="Warning">
            <p>{step.warning}</p>
          </StartCallout>
        </div>
      ) : null}

      {step.note ? (
        <div className="mt-6">
          <StartCallout kind="info" eyebrow="Note">
            <p>{step.note}</p>
          </StartCallout>
        </div>
      ) : null}
    </article>
  );
}
