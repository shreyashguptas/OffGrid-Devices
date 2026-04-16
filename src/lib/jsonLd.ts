import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import { link1Content } from "@/content/link1";
import type { BlogPost } from "@/content/blog";

const ORGANIZATION_NAME = "OffGrid Devices";
const ORGANIZATION_LEGAL = "OffGrid Devices";
const DEFAULT_AUTHOR_NAME = "Shreyash Gupta";
const LOGO_PATH = "/logo-1024.png";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}#organization`,
    name: ORGANIZATION_NAME,
    legalName: ORGANIZATION_LEGAL,
    url: getSiteUrl(),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(LOGO_PATH),
      width: 1024,
      height: 1024,
    },
    founder: {
      "@type": "Person",
      name: DEFAULT_AUTHOR_NAME,
    },
    slogan: "Stay connected. Go anywhere.",
  } as const;
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}#website`,
    url: getSiteUrl(),
    name: ORGANIZATION_NAME,
    publisher: { "@id": `${getSiteUrl()}#organization` },
    inLanguage: "en-US",
  } as const;
}

export function productJsonLd() {
  const images = [
    absoluteUrl(link1Content.summary.heroImage.src),
    link1Content.summary.productImage.src,
  ];
  const ratingValue = 5.0;
  const reviewCount = link1Content.testimonials.length; // 6 written reviews on page
  const customerCount = 28; // displayed "Loved by 28+ customers"

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl("/products/link-1")}#product`,
    name: link1Content.summary.brandedName,
    alternateName: link1Content.summary.name,
    description:
      "MagSafe-compatible LoRa mesh radio with Meshtastic-ready firmware. Snap-on off-grid communication that stays with the phone you already carry.",
    sku: "OFFGRID-LINK-1",
    brand: {
      "@type": "Brand",
      name: ORGANIZATION_NAME,
    },
    image: images,
    category: "Radios > LoRa Mesh Radios",
    url: absoluteUrl("/products/link-1"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toFixed(1),
      reviewCount: Math.max(reviewCount, customerCount),
      bestRating: "5",
      worstRating: "1",
    },
    review: link1Content.testimonials.slice(0, 5).map((t) => ({
      "@type": "Review",
      author: { "@type": "Person", name: t.name },
      datePublished: t.date,
      reviewBody: t.review,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    })),
    offers: {
      "@type": "Offer",
      url: absoluteUrl("/products/link-1"),
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: ORGANIZATION_NAME },
    },
  } as const;
}

export type BreadcrumbItem = { name: string; url: string };

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  } as const;
}

export function articleJsonLd(post: BlogPost) {
  const published = post.publishedAt ?? post.date;
  const modified = post.updatedAt ?? published;
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = post.ogImage
    ? absoluteUrl(post.ogImage)
    : post.image.startsWith("http")
      ? post.image
      : absoluteUrl(post.image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.metaDescription ?? post.excerpt,
    image: [image],
    datePublished: published,
    dateModified: modified,
    author: {
      "@type": "Person",
      name: post.author?.name ?? DEFAULT_AUTHOR_NAME,
      url: post.author?.url,
    },
    publisher: { "@id": `${getSiteUrl()}#organization` },
    keywords: post.keywords?.join(", "),
    articleSection: post.category,
    inLanguage: "en-US",
  } as const;
}

export type FaqItem = { question: string; answer: string };

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  } as const;
}

/** Helper for rendering JSON-LD script tags. */
export function jsonLdScriptProps(data: unknown) {
  return {
    type: "application/ld+json" as const,
    // JSON.stringify with no unsafe characters; escape "</" to avoid early closing.
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data).replace(/</g, "\\u003c"),
    },
  };
}
