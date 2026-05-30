import { WaypointMark } from "@/components/shared/WaypointMark";
import { startContent } from "@/content/start";

export function StartHeroSection() {
  const hero = startContent.hero;
  return (
    <section
      id="top"
      className="border-b border-border-subtle bg-background pt-28 pb-16 md:pt-32 md:pb-20"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
            <WaypointMark size={44} />
            <div>
              <p className="font-display text-base font-semibold tracking-tight text-foreground">
                OffGrid
              </p>
              <p className="tracking-instrument text-xs text-muted">
                {hero.eyebrow}
              </p>
            </div>
          </div>

          <div>
            <p className="type-eyebrow text-muted">
              {startContent.fullProductName}
            </p>
            <h1 className="type-display-hero mt-3 text-foreground">
              {hero.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted-light md:text-lg">
              {hero.body}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={hero.primaryCta.href}
              className="inline-flex items-center justify-center gap-2 bg-ember px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors hover:bg-bone"
            >
              {hero.primaryCta.label}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex items-center justify-center border border-border-card px-7 py-[18px] font-display text-[13px] font-bold uppercase tracking-[0.14em] text-bone hover:border-border-emphasis"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
