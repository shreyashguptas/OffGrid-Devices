import { absoluteUrl, getSiteUrl } from "@/lib/siteUrl";
import type { BlogPost, BlogSection } from "@/content/blog";

const ORGANIZATION_NAME = "OffGrid Devices";
const ORGANIZATION_LEGAL = "OffGrid Devices";
const DEFAULT_AUTHOR_NAME = "Shreyash Gupta";
const LOGO_PATH = "/logo.svg";

function absoluteSiteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) {
    return pathOrUrl;
  }
  return absoluteUrl(pathOrUrl);
}

const MONTH_NAMES = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
] as const;

/**
 * Convert a human-readable date ("February 2026", "Feb 2026", "2026-02-15")
 * into ISO 8601 (YYYY-MM-DD) for Schema.org `datePublished` / `dateModified`.
 *
 * Google's Rich Results Test accepts human strings but flags them as warnings.
 * ISO 8601 is the documented preferred format. We keep human dates in content
 * for display and only normalize at the JSON-LD boundary.
 */
function toIsoDate(date: string): string {
  if (!date) return date;

  // Already ISO (YYYY-MM-DD or full timestamp) — pass through.
  if (/^\d{4}-\d{2}-\d{2}/.test(date)) {
    return date;
  }

  // Try "Month Year" → first of the month.
  const match = date.trim().match(/^([A-Za-z]+)\s+(\d{4})$/);
  if (match) {
    const monthIndex = MONTH_NAMES.findIndex((m) =>
      m.startsWith(match[1].toLowerCase()),
    );
    if (monthIndex >= 0) {
      const mm = String(monthIndex + 1).padStart(2, "0");
      return `${match[2]}-${mm}-01`;
    }
  }

  // Last-resort: try native Date parsing.
  const parsed = new Date(date);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().slice(0, 10);
  }

  return date;
}

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
    },
    founder: {
      "@type": "Person",
      name: DEFAULT_AUTHOR_NAME,
    },
    sameAs: [
      "https://x.com/ShreyashGuptas",
      "https://github.com/shreyashguptas",
      "https://www.youtube.com/channel/UCe0X6IPIEuNpCvuQtOlKNrA",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@offgridevices.com",
      contactType: "customer support",
      availableLanguage: ["en"],
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

/**
 * JSON-LD for the manufacturing arm (the /capabilities page). Models OffGrid's
 * 3D-design / small-batch manufacturing offering as a Service provided by
 * OffGrid LLC, with a Maryland address (city/state only — no street, matching
 * the public address granularity), a national service area, and the shop's
 * core competencies as `knowsAbout`. Deliberately claims no certifications or
 * registrations that have not been confirmed.
 */
export function manufacturingServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${getSiteUrl()}/capabilities#service`,
    name: "3D Design & Small-Batch Manufacturing",
    serviceType: "Contract manufacturing, 3D printing, and design services",
    url: absoluteUrl("/capabilities"),
    description:
      "US-based 3D design, rapid prototyping, custom enclosures, low-volume production runs, and electronics integration & assembly.",
    areaServed: { "@type": "Country", name: "United States" },
    provider: {
      "@type": "Organization",
      "@id": `${getSiteUrl()}#organization`,
      name: "OffGrid LLC",
      url: getSiteUrl(),
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rockville",
        addressRegion: "MD",
        addressCountry: "US",
      },
      knowsAbout: [
        "FDM 3D printing",
        "Fused deposition modeling",
        "CAD design",
        "Design for manufacturing",
        "Rapid prototyping",
        "Low-volume production",
        "Electronics integration and assembly",
        "LoRa mesh devices",
        "Custom 3D-printed enclosures",
        "ASA, ABS, TPU, and PLA materials",
      ],
    },
  } as const;
}

/**
 * JSON-LD for the /contact page. A ContactPage that points back at the
 * OffGrid organization node so search engines tie the intake page to the brand.
 */
export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${getSiteUrl()}/contact#contactpage`,
    url: absoluteUrl("/contact"),
    name: "Contact OffGrid Devices",
    description:
      "Get in touch with OffGrid about manufacturing, custom design, Beacon devices, wholesale, or government inquiries.",
    isPartOf: { "@id": `${getSiteUrl()}#website` },
    about: { "@id": `${getSiteUrl()}#organization` },
  } as const;
}

export type ProductSchemaInput = {
  slot: "beacon-1" | "beacon-2";
  brandedName: string;
  shortName: string;
  description: string;
  sku: string;
  /** Manufacturer Part Number — required by Google Merchant Center matching. */
  mpn?: string;
  /** GTIN if registered with GS1 (optional, unlocks catalog matching). */
  gtin?: string;
  category: string;
  url: string;
  images: string[];
  aggregateRating?: { ratingValue: string; reviewCount: number };
  reviews?: Array<{ name: string; date: string; review: string }>;
  offer?: {
    price?: string;
    priceCurrency: string;
    availability: "InStock" | "OutOfStock" | "Discontinued";
    priceValidUntil?: string;
  };
};

/**
 * Standard merchant return policy for OffGrid products. Surfaces in Google
 * Shopping "free returns" filter and is required for free Shopping listings.
 * Keep in sync with /returns page copy.
 */
const OFFGRID_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "US",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 30,
  returnMethod: "https://schema.org/ReturnByMail",
  returnFees: "https://schema.org/FreeReturn",
} as const;

/**
 * Standard US shipping details for OffGrid products. Surfaces in Google
 * Shopping "free shipping" filter and is required for free Shopping listings.
 * Keep in sync with /shipping page copy.
 */
const OFFGRID_SHIPPING_DETAILS = {
  "@type": "OfferShippingDetails",
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "US",
  },
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 3,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 2,
      maxValue: 7,
      unitCode: "DAY",
    },
  },
} as const;

export function productJsonLd(input: ProductSchemaInput) {
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(input.url)}#product`,
    name: input.brandedName,
    alternateName: input.shortName,
    description: input.description,
    sku: input.sku,
    brand: {
      "@type": "Brand",
      name: ORGANIZATION_NAME,
    },
    image: input.images.map(absoluteSiteUrl),
    category: input.category,
    url: absoluteUrl(input.url),
  };

  if (input.aggregateRating) {
    product.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: input.aggregateRating.ratingValue,
      reviewCount: input.aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  if (input.reviews?.length) {
    product.review = input.reviews.map((review) => ({
      "@type": "Review",
      author: { "@type": "Person", name: review.name },
      datePublished: toIsoDate(review.date),
      reviewBody: review.review,
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
        worstRating: "1",
      },
    }));
  }

  if (input.mpn) {
    product.mpn = input.mpn;
  }
  if (input.gtin) {
    product.gtin = input.gtin;
  }

  if (input.offer?.price) {
    product.offers = {
      "@type": "Offer",
      url: absoluteUrl(input.url),
      price: input.offer.price,
      priceCurrency: input.offer.priceCurrency,
      availability: `https://schema.org/${input.offer.availability}`,
      priceValidUntil: input.offer.priceValidUntil,
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: ORGANIZATION_NAME },
      hasMerchantReturnPolicy: OFFGRID_RETURN_POLICY,
      shippingDetails: OFFGRID_SHIPPING_DETAILS,
    };
  }

  return product;
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

function textForSection(section: BlogSection): string {
  switch (section.type) {
    case "paragraph":
    case "heading":
    case "subheading":
    case "quote":
    case "callout":
      return section.content;
    case "list":
    case "orderedList":
      return section.items.join(" ");
    case "image":
      return [section.alt, section.caption].filter(Boolean).join(" ");
    case "code":
      return section.code;
    case "table":
      return [
        section.caption ?? "",
        ...section.headers,
        ...section.rows.flat(),
      ]
        .filter(Boolean)
        .join(" ");
  }
}

function countWords(post: BlogPost): number {
  const text = post.sections.map(textForSection).join(" ").trim();
  if (!text) {
    return 0;
  }
  return text.split(/\s+/).length;
}

function readTimeToDuration(readTime: string): string | undefined {
  const match = readTime.match(/(\d+)\s*min/i);
  if (!match) {
    return undefined;
  }
  return `PT${match[1]}M`;
}

function resolveArticleImage(post: BlogPost): string {
  if (post.ogImage) {
    return absoluteUrl(post.ogImage);
  }
  if (post.image.startsWith("http")) {
    return post.image;
  }
  return absoluteUrl(post.image);
}

export function articleJsonLd(post: BlogPost) {
  const published = post.publishedAt ?? post.date;
  const modified = post.updatedAt ?? published;
  const url = absoluteUrl(`/blog/${post.slug}`);
  const image = resolveArticleImage(post);

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
      sameAs: post.author?.sameAs,
    },
    publisher: { "@id": `${getSiteUrl()}#organization` },
    keywords: post.keywords?.join(", "),
    articleSection: post.category,
    wordCount: countWords(post),
    timeRequired: readTimeToDuration(post.readTime),
    inLanguage: "en-US",
  } as const;
}

export type PersonSchemaInput = {
  name: string;
  url?: string;
  image?: string;
  jobTitle?: string;
  worksFor?: { name: string; url: string };
  sameAs?: string[];
};

export function personJsonLd(input: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": input.url ? `${input.url}#person` : undefined,
    name: input.name,
    url: input.url,
    image: input.image ? absoluteSiteUrl(input.image) : undefined,
    jobTitle: input.jobTitle,
    worksFor: input.worksFor
      ? {
          "@type": "Organization",
          name: input.worksFor.name,
          url: input.worksFor.url,
        }
      : undefined,
    sameAs: input.sameAs,
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
    // Escape characters that can break out of JSON-in-script contexts.
    dangerouslySetInnerHTML: {
      __html: JSON.stringify(data)
        .replace(/</g, "\\u003c")
        .replace(/\u2028/g, "\\u2028")
        .replace(/\u2029/g, "\\u2029"),
    },
  };
}
