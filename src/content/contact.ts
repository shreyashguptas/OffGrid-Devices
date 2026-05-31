/**
 * Copy + shared constants for the /contact page and the /api/contact route.
 * INQUIRY_TYPES and CONTACT_LIMITS are imported by BOTH the client form and the
 * server route so the dropdown options and field caps never drift apart.
 */

export const INQUIRY_TYPES = [
  "3D printing / manufacturing",
  "Custom design / prototyping",
  "Meshtastic device (Beacon) — sales or support",
  "Wholesale / bulk order",
  "Government / defense",
  "Other",
] as const;

/** Max field lengths — enforced on the client (maxLength) and the server. */
export const CONTACT_LIMITS = {
  name: 100,
  email: 200,
  company: 150,
  phone: 40,
  message: 5000,
} as const;

/** Hidden honeypot field name — real users never fill it; bots usually do. */
export const HONEYPOT_FIELD = "company_website";

export const contactContent = {
  hero: {
    eyebrow: "CONTACT · OFFGRID",
    title: "Tell us what you're building.",
    body: "Whether it's a manufacturing run, a custom part, a Beacon question, or a bulk order — send a note and you'll hear back from a real person, usually within 1–2 business days.",
  },
  form: {
    nameLabel: "Name",
    emailLabel: "Email",
    companyLabel: "Company / organization",
    companyOptional: "Optional",
    phoneLabel: "Phone",
    phoneOptional: "Optional",
    inquiryLabel: "What's this about?",
    inquiryPlaceholder: "Select an inquiry type",
    messageLabel: "Project details / message",
    submitLabel: "Send message",
    submittingLabel: "Sending…",
    successTitle: "Message sent.",
    successBody:
      "Thanks — we've got your message and will reply within 1–2 business days.",
    errorTitle: "That didn't go through.",
    errorBody:
      "Something went wrong sending your message. Please email us directly at hello@offgridevices.com.",
    validationBody: "Please check the highlighted fields and try again.",
    privacyPrefix: "We use your details only to reply. See our ",
    privacyLinkLabel: "privacy policy",
    privacySuffix: ".",
  },
  directEmail: "hello@offgridevices.com",
  responseTime: "We typically reply within 1–2 business days.",
} as const;
