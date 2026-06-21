import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumbJsonLd, jsonLdScriptProps } from "@/lib/jsonLd";
import { getExplainer } from "@/content/learn";
import { FramePhysicsLab } from "@/components/learn/FramePhysicsLab";

const explainer = getExplainer("drone-frame-physics")!;

export const metadata: Metadata = {
  title: { absolute: `${explainer.seoTitle} | OffGrid Devices` },
  description: explainer.metaDescription,
  alternates: { canonical: "/learn/drone-frame-physics" },
  openGraph: {
    type: "article",
    url: "/learn/drone-frame-physics",
    title: explainer.seoTitle,
    description: explainer.metaDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: explainer.seoTitle,
    description: explainer.metaDescription,
  },
};

export default function DroneFramePhysicsPage() {
  return (
    <>
      <script
        {...jsonLdScriptProps(
          breadcrumbJsonLd([
            { name: "Home", url: "/" },
            { name: "Learn", url: "/learn" },
            { name: explainer.title, url: "/learn/drone-frame-physics" },
          ]),
        )}
      />

      <div className="bg-background pt-24 md:pt-28">
        <div className="mx-auto max-w-4xl px-6">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 font-mono text-[13px] uppercase tracking-[0.14em] text-foreground/60 transition-colors hover:text-ember"
          >
            &larr; Learn
          </Link>
          <p className="font-body mt-4 max-w-2xl text-[15px] leading-[1.6] text-foreground/70">
            {explainer.intro}
          </p>
        </div>
      </div>

      <FramePhysicsLab />
    </>
  );
}
