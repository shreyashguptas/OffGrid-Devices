"use client";

import { trackContactTap } from "@/lib/analytics";
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
        <div className="section-card p-6 md:p-8">
          <p className="type-eyebrow text-muted">
            Direct support
          </p>
          <a
            href={`mailto:${contact.supportEmail}`}
            onClick={() => trackContactTap("email")}
            className="type-display-card mt-3 block break-words [overflow-wrap:anywhere] text-foreground transition-colors hover:text-accent-dark"
          >
            {contact.supportEmail}
          </a>
          <p className="mt-4 text-base leading-relaxed text-muted-light">
            {contact.body}
          </p>
          <p className="mt-3 text-sm text-muted">{contact.responseTime}</p>
        </div>

        <div className="section-card p-6 md:p-8">
          <h3 className="type-display-card text-foreground">
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
                  onClick={() => trackContactTap("community")}
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
