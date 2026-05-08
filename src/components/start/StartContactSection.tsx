import { startContent } from "@/content/start";
import { StartSection } from "./StartSection";

export function StartContactSection() {
  const contact = startContent.contact;
  const community = contact.community;
  return (
    <StartSection
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      surface="elevated"
    >
      <div className="space-y-8">
        <div className="section-card rounded-[1.5rem] p-6 md:p-8">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
            Direct support
          </p>
          <a
            href={`mailto:${contact.supportEmail}`}
            className="mt-3 block break-all font-display text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-accent-dark md:text-3xl"
          >
            {contact.supportEmail}
          </a>
          <p className="mt-4 text-base leading-relaxed text-muted-light">
            {contact.body}
          </p>
          <p className="mt-3 text-sm text-muted">{contact.responseTime}</p>
        </div>

        <div className="section-card rounded-[1.5rem] p-6 md:p-8">
          <h3 className="font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {community.title}
          </h3>
          <p className="mt-3 text-base leading-relaxed text-muted-light">
            {community.body}
          </p>
          <ul className="mt-5 space-y-2">
            {community.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-base text-foreground/85 transition-colors hover:text-accent-dark"
                >
                  <span className="font-medium underline decoration-transparent underline-offset-4 group-hover:decoration-accent/40">
                    {link.label}
                  </span>
                  <span aria-hidden="true" className="text-muted">
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
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StartSection>
  );
}
