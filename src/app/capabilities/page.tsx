import type { Metadata } from "next";
import Link from "next/link";
import {
  breadcrumbJsonLd,
  jsonLdScriptProps,
  manufacturingServiceJsonLd,
} from "@/lib/jsonLd";
import { capabilitiesContent } from "@/content/capabilities";

const TITLE = "3D Design & Small-Batch Manufacturing — OffGrid";
const DESCRIPTION =
  "OffGrid LLC is a Maryland-based shop for US 3D design, rapid prototyping, custom enclosures, low-volume production, and electronics assembly.";

export const metadata: Metadata = {
  // `title.absolute` skips the global ` | OffGrid Devices` template so the
  // rendered <title> stays under 60 chars for SERP display.
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/capabilities" },
  openGraph: {
    type: "website",
    url: "/capabilities",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const { hero, whatWeDo, materials, credentials, process, closing } =
  capabilitiesContent;

// Defensive guard: never render the EIN or any financial/banking detail, even
// if one is ever added to the content file by mistake.
const SENSITIVE_LABEL =
  /\b(ein|employer identification|tax id|bank|routing|account number|ssn)\b/i;

const visibleCredentials = credentials.items.filter(
  (item) => item.value.trim().length > 0 && !SENSITIVE_LABEL.test(item.label),
);

export default function CapabilitiesPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Manufacturing", url: "/capabilities" },
          ]),
        )}
      />
      <script {...jsonLdScriptProps(manufacturingServiceJsonLd())} />

      <section className="border-b border-bark/30 bg-pitch pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">{hero.eyebrow}</p>
          <h1 className="type-display-section mt-4 text-bone">{hero.title}</h1>
          <p className="font-editorial mt-8 max-w-3xl text-xl leading-[1.55] text-sand/85">
            {hero.body}
          </p>
          <div className="mt-10">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone sm:px-10 sm:py-5"
            >
              {hero.primaryCta.label} →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="type-mono-label text-ember">{whatWeDo.eyebrow}</p>
          <h2 className="type-display-section mt-4 text-bone">
            {whatWeDo.title}
          </h2>
          <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.55] text-sand/80">
            {whatWeDo.intro}
          </p>

          <div className="mt-12 grid gap-px border border-bark/40 bg-bark/40 sm:grid-cols-2 lg:grid-cols-3">
            {whatWeDo.items.map((item) => (
              <div key={item.title} className="bg-pitch-deep p-6 md:p-8">
                <h3 className="font-display text-[15px] font-bold uppercase tracking-[0.06em] text-bone">
                  {item.title}
                </h3>
                <p className="font-editorial mt-3 text-[15px] leading-[1.6] text-sand/80">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="type-mono-label text-ember">{materials.eyebrow}</p>
          <h2 className="type-display-section mt-4 text-bone">
            {materials.title}
          </h2>
          <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.55] text-sand/80">
            {materials.intro}
          </p>

          <dl className="mt-12 grid gap-x-12 gap-y-5 border-t border-bark/40 pt-8 md:grid-cols-2">
            {materials.specs.map((spec) => (
              <div
                key={spec.label}
                className="grid grid-cols-1 gap-1 border-b border-bark/30 pb-4 sm:grid-cols-[140px_1fr] sm:items-baseline sm:gap-4"
              >
                <dt className="type-mono-label text-sand/65">{spec.label}</dt>
                <dd className="font-editorial text-base leading-snug text-bone">
                  {spec.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Credentials & compliance — online capabilities statement */}
      <section className="border-b border-bark/30 bg-pitch-deep py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">{credentials.eyebrow}</p>
          <h2 className="type-display-section mt-4 text-bone">
            {credentials.title}
          </h2>
          <p className="font-editorial mt-6 max-w-2xl text-lg leading-[1.55] text-sand/80">
            {credentials.intro}
          </p>

          <dl className="mt-10 border-t border-bark/40 pt-8">
            {visibleCredentials.map((item) => (
              <div
                key={item.label}
                className="grid gap-1 border-b border-bark/30 pb-4 [&:not(:first-child)]:pt-4 sm:grid-cols-[220px_1fr] sm:items-baseline sm:gap-6"
              >
                <dt className="type-mono-label text-sand/65">{item.label}</dt>
                <dd className="font-editorial text-base leading-snug text-bone">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <div>
              <h3 className="type-eyebrow text-bone">Core competencies</h3>
              <ul className="mt-5 space-y-2.5 font-editorial text-[15px] leading-[1.5] text-sand/80">
                {credentials.coreCompetencies.map((line) => (
                  <li key={line} className="border-l border-bark pl-4">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="type-eyebrow text-bone">What sets us apart</h3>
              <ul className="mt-5 space-y-2.5 font-editorial text-[15px] leading-[1.5] text-sand/80">
                {credentials.differentiators.map((line) => (
                  <li key={line} className="border-l border-bark pl-4">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="type-mono-label mt-12 border-t border-bark/40 pt-6 text-sand/65">
            <span className="text-sand/45">POINT OF CONTACT · </span>
            {credentials.pointOfContact.name} ·{" "}
            {credentials.pointOfContact.title} ·{" "}
            <a
              href={`mailto:${credentials.pointOfContact.email}`}
              className="hover:text-ember"
            >
              {credentials.pointOfContact.email.toUpperCase()}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6">
          <p className="type-mono-label text-ember">{process.eyebrow}</p>
          <h2 className="type-display-section mt-4 text-bone">
            {process.title}
          </h2>

          <ol className="mt-12 grid gap-px border border-bark/40 bg-bark/40 sm:grid-cols-2 lg:grid-cols-4">
            {process.steps.map((step) => (
              <li key={step.number} className="bg-pitch p-6 md:p-8">
                <span className="type-mono-label text-sand/45">
                  STEP {step.number}
                </span>
                <h3 className="font-display mt-3 text-[15px] font-bold uppercase tracking-[0.06em] text-bone">
                  {step.title}
                </h3>
                <p className="font-editorial mt-3 text-[15px] leading-[1.6] text-sand/80">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-b border-bark/30 bg-pitch py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="type-mono-label text-ember">{closing.eyebrow}</p>
          <h2 className="type-display-section mt-4 text-bone">
            {closing.title}
          </h2>
          <p className="font-editorial mx-auto mt-6 max-w-2xl text-lg leading-[1.55] text-sand/85">
            {closing.body}
          </p>
          <div className="mt-10">
            <Link
              href={closing.cta.href}
              className="inline-flex min-h-[56px] items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[13px] font-bold uppercase tracking-[0.18em] text-pitch transition-colors hover:bg-bone sm:px-10 sm:py-5"
            >
              {closing.cta.label} →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
