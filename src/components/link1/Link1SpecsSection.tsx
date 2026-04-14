import Image from "next/image";
import { SectionIntro } from "@/components/shared/SectionIntro";
import { link1Content } from "@/content/link1";

export function Link1SpecsSection() {
  return (
    <section
      id="specs"
      className="border-b border-border-subtle bg-surface-elevated py-20 md:py-24"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionIntro
              badge={link1Content.productPage.specs.badge}
              title={link1Content.productPage.specs.title}
              description={link1Content.productPage.specs.description}
              centered={false}
            />

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {link1Content.specs.map((spec) => (
                <div key={spec.label} className="section-card rounded-[1.5rem] p-5">
                  <p className="text-sm text-muted">{spec.label}</p>
                  <p className="mt-2 font-display text-xl font-semibold text-foreground">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="section-stage rounded-[2rem] p-6 md:p-8">
              <Image
                src={link1Content.summary.productImage.src}
                alt="OffGrid Link 1 hardware specifications"
                width={900}
                height={1100}
                className="mx-auto rounded-[1.75rem]"
              />
            </div>

            <div className="section-card rounded-[2rem] p-6 md:p-8">
              <p className="text-xs uppercase tracking-[0.24em] text-muted">
                Firmware support
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold">
                {link1Content.productPage.specs.firmwareTitle}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-muted-light">
                {link1Content.productPage.specs.firmwareDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
