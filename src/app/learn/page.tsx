import type { Metadata } from "next";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";
import { explainers } from "@/content/learn";
import { ExplainerCard } from "@/components/learn/ExplainerCard";

const TITLE = "Learn — Interactive Explainers | OffGrid Devices";
const DESCRIPTION =
  "When reading alone doesn't make a concept click, I ask Claude to build me a small interactive page I can poke at until it does. A couple of those, on drone physics, cleaned up and shared.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: "/learn" },
  openGraph: {
    type: "website",
    url: "/learn",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function LearnPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Learn", url: "/learn" },
          ]),
        )}
      />

      <section className="border-b border-bark/30 bg-pitch pt-28 pb-16 md:pt-32 md:pb-20">
        <div className="mx-auto max-w-4xl px-6">
          <p className="type-mono-label text-ember">LEARN · HOW I FIGURE THINGS OUT</p>
          <h1 className="type-display-section mt-4 text-bone">
            The interactive pages I learn from.
          </h1>
          <p className="type-editorial-lead mt-6 max-w-2xl text-sand">
            Some things just don&rsquo;t click for me by reading about them. When I
            have a very specific question, I ask Claude to build me a small
            interactive page I can poke at until it makes sense — drag a slider,
            flip a toggle, watch the thing react. These are a couple of those,
            cleaned up and put here in case they help you learn them too.
          </p>
        </div>
      </section>

      <section className="bg-pitch pb-24 pt-12 md:pb-32 md:pt-16">
        <div className="mx-auto max-w-4xl px-6">
          <ul className="grid gap-4 sm:grid-cols-2">
            {explainers.map((e) => (
              <li key={e.slug} className="flex">
                <ExplainerCard explainer={e} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
