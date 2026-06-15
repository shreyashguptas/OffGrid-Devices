"use client";

import { useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  INQUIRY_TYPES,
  CONTACT_LIMITS,
  HONEYPOT_FIELD,
  contactContent,
} from "@/content/contact";
import { trackContactSubmit, getPostHogDistinctId } from "@/lib/analytics";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

type Status = "idle" | "submitting" | "success" | "error";

const COPY = contactContent.form;

const INPUT_CLASS =
  "mt-2 w-full border border-bark bg-pitch px-4 py-3 text-base text-bone placeholder:text-sand/35 focus:border-ember focus:outline-none transition-colors";
const LABEL_CLASS = "type-mono-label text-sand/65";

export function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    message: "",
  });
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const turnstileRequired = Boolean(siteKey);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [scriptReady, setScriptReady] = useState(false);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (
      !siteKey ||
      !scriptReady ||
      !turnstileRef.current ||
      widgetIdRef.current ||
      !window.turnstile
    ) {
      return;
    }
    widgetIdRef.current = window.turnstile.render(turnstileRef.current, {
      sitekey: siteKey,
      theme: "dark",
      callback: (token: string) => setTurnstileToken(token),
      "error-callback": () => setTurnstileToken(""),
      "expired-callback": () => setTurnstileToken(""),
    });
  }, [siteKey, scriptReady]);

  function resetTurnstile() {
    setTurnstileToken("");
    if (window.turnstile && widgetIdRef.current) {
      window.turnstile.reset(widgetIdRef.current);
    }
  }

  const update =
    (field: keyof typeof values) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const canSubmit =
    status !== "submitting" && (!turnstileRequired || Boolean(turnstileToken));

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMessage("");

    function fail(message: string) {
      setStatus("error");
      setErrorMessage(message);
      resetTurnstile();
    }

    try {
      const distinctId = getPostHogDistinctId();
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(distinctId ? { "x-posthog-distinct-id": distinctId } : {}),
        },
        body: JSON.stringify({
          ...values,
          turnstileToken,
          [HONEYPOT_FIELD]: honeypot,
        }),
      });

      if (res.ok) {
        setStatus("success");
        trackContactSubmit(values.inquiryType);
        resetTurnstile();
        return;
      }

      const data = (await res.json().catch(() => ({}))) as { error?: string };
      fail(data.error || COPY.errorBody);
    } catch {
      fail(COPY.errorBody);
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border border-bark bg-pitch-deep p-8 md:p-10"
      >
        <p className="type-mono-label text-ember">SENT</p>
        <h2 className="type-display-section mt-3 text-2xl text-bone">
          {COPY.successTitle}
        </h2>
        <p className="font-editorial mt-4 text-lg leading-[1.6] text-sand/85">
          {COPY.successBody}
        </p>
      </div>
    );
  }

  return (
    <>
      {siteKey ? (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="relative space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${uid}-name`} className={LABEL_CLASS}>
              {COPY.nameLabel}
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              required
              maxLength={CONTACT_LIMITS.name}
              autoComplete="name"
              value={values.name}
              onChange={update("name")}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-email`} className={LABEL_CLASS}>
              {COPY.emailLabel}
            </label>
            <input
              id={`${uid}-email`}
              name="email"
              type="email"
              required
              maxLength={CONTACT_LIMITS.email}
              autoComplete="email"
              value={values.email}
              onChange={update("email")}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-company`} className={LABEL_CLASS}>
              {COPY.companyLabel}{" "}
              <span className="text-sand/40">· {COPY.companyOptional}</span>
            </label>
            <input
              id={`${uid}-company`}
              name="company"
              type="text"
              maxLength={CONTACT_LIMITS.company}
              autoComplete="organization"
              value={values.company}
              onChange={update("company")}
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label htmlFor={`${uid}-phone`} className={LABEL_CLASS}>
              {COPY.phoneLabel}{" "}
              <span className="text-sand/40">· {COPY.phoneOptional}</span>
            </label>
            <input
              id={`${uid}-phone`}
              name="phone"
              type="tel"
              maxLength={CONTACT_LIMITS.phone}
              autoComplete="tel"
              value={values.phone}
              onChange={update("phone")}
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${uid}-inquiry`} className={LABEL_CLASS}>
            {COPY.inquiryLabel}
          </label>
          <select
            id={`${uid}-inquiry`}
            name="inquiryType"
            required
            value={values.inquiryType}
            onChange={update("inquiryType")}
            className={INPUT_CLASS}
          >
            <option value="" disabled>
              {COPY.inquiryPlaceholder}
            </option>
            {INQUIRY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor={`${uid}-message`} className={LABEL_CLASS}>
            {COPY.messageLabel}
          </label>
          <textarea
            id={`${uid}-message`}
            name="message"
            required
            rows={6}
            maxLength={CONTACT_LIMITS.message}
            value={values.message}
            onChange={update("message")}
            className={`${INPUT_CLASS} resize-y`}
          />
        </div>

        {/* Honeypot — visually hidden via the sr-only clip pattern (not
            display:none, so bots that skip hidden inputs still fill it; not
            off-screen with a negative left, which expands the layout and caused
            a few px of horizontal overflow on narrow phones). */}
        <div aria-hidden="true" className="sr-only">
          <label htmlFor={`${uid}-${HONEYPOT_FIELD}`}>Company website</label>
          <input
            id={`${uid}-${HONEYPOT_FIELD}`}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(event) => setHoneypot(event.target.value)}
          />
        </div>

        {siteKey ? <div ref={turnstileRef} className="min-h-[65px]" /> : null}

        {status === "error" ? (
          <p role="alert" className="font-editorial text-[15px] text-ember">
            {errorMessage}
          </p>
        ) : null}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex min-h-[56px] items-center justify-center bg-ember px-8 py-4 font-display text-[13px] font-bold uppercase tracking-[0.14em] text-pitch transition-colors hover:bg-bone disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? COPY.submittingLabel : COPY.submitLabel}
          </button>
          <p className="text-sm leading-[1.5] text-sand/55">
            {COPY.privacyPrefix}
            <Link href="/privacy" className="text-sand underline hover:text-ember">
              {COPY.privacyLinkLabel}
            </Link>
            {COPY.privacySuffix}
          </p>
        </div>
      </form>
    </>
  );
}
