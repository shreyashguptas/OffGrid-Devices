import { startContent } from "@/content/start";

export function StartTocSection() {
  return (
    <section
      id="contents"
      aria-label="Table of contents"
      className="border-b border-border-subtle bg-surface-elevated py-14 md:py-16"
    >
      <div className="mx-auto w-full max-w-3xl px-6">
        <p className="type-eyebrow text-muted">
          Contents
        </p>
        <h2 className="type-display-card mt-3 text-foreground">
          Jump to a section
        </h2>
        <nav className="mt-8">
          <ol className="grid gap-3 sm:grid-cols-2">
            {startContent.toc.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group flex h-full items-start gap-4 border border-border-card bg-surface px-4 py-3 transition-colors hover:bg-fill-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border-card font-mono text-xs text-muted"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-base font-semibold text-foreground">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm text-muted-light">
                      {item.description}
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="mt-1 text-muted transition-transform group-hover:translate-x-0.5"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </section>
  );
}
