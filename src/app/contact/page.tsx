import type { Metadata } from "next";
import {
  breadcrumbJsonLd,
  contactPageJsonLd,
  jsonLdScriptProps,
} from "@/lib/jsonLd";
import { contactContent } from "@/content/contact";
import { ContactForm } from "@/components/contact/ContactForm";

const TITLE = "Contact OffGrid — Manufacturing & Beacon";
const DESCRIPTION =
  "Get in touch with OffGrid about 3D printing & manufacturing, custom design, Beacon device sales or support, wholesale, or government inquiries.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/contact" },
  openGraph: {
    type: "website",
    url: "/contact",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const { hero, directEmail, responseTime } = contactContent;

export default function ContactPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Contact", url: "/contact" },
          ]),
        )}
      />
      <script {...jsonLdScriptProps(contactPageJsonLd())} />

      <section className="border-b border-bark/30 bg-pitch pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">{hero.eyebrow}</p>
          <h1 className="type-display-section mt-4 text-bone">{hero.title}</h1>
          <p className="font-editorial mt-8 max-w-3xl text-xl leading-[1.55] text-sand/85">
            {hero.body}
          </p>
        </div>
      </section>

      <section className="border-b border-bark/30 bg-pitch-deep py-16 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 lg:grid-cols-[1.6fr_1fr]">
          <div className="min-w-0">
            <ContactForm />
          </div>

          <aside className="min-w-0 lg:border-l lg:border-bark/40 lg:pl-10">
            <p className="type-mono-label text-sand/55">PREFER EMAIL?</p>
            <p className="font-editorial mt-4 text-lg leading-[1.6] text-sand/85">
              Reach us directly at{" "}
              <a
                href={`mailto:${directEmail}`}
                className="text-ember hover:underline"
              >
                {directEmail}
              </a>
              .
            </p>
            <p className="font-editorial mt-6 text-[15px] leading-[1.6] text-sand/65">
              {responseTime}
            </p>
          </aside>
        </div>
      </section>
    </>
  );
}
