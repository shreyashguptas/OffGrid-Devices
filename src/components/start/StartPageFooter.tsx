import { startContent } from "@/content/start";

export function StartPageFooter() {
  const legal = startContent.legal;
  return (
    <section
      aria-label="About this guide"
      className="bg-background py-12 md:py-14"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <div className="border border-border-subtle bg-surface px-6 py-6 md:px-8 md:py-7">
          <p className="type-mono-label text-muted">
            About this guide
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-light">
            {legal.line}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-light">
            {legal.company} · {legal.location}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a
              href="#top"
              className="font-medium text-foreground transition-colors hover:text-accent-dark"
            >
              Back to top
            </a>
            <a
              href="mailto:hello@offgridevices.com"
              className="font-medium text-foreground transition-colors hover:text-accent-dark"
            >
              Email support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
