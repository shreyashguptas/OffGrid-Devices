import { link1Content } from "./link1";

export const COMING_SOON_LABEL = "Coming soon";

export type SiteProduct = {
  name: string;
  subtitle: string;
  href: string;
  image: string | null;
  badge: string | null;
};

export const siteProducts = [
  {
    name: link1Content.summary.name,
    subtitle: `OffGrid · ${link1Content.summary.subtitle}`,
    href: link1Content.summary.href,
    image: link1Content.summary.productImage.src,
    badge: null,
  },
  {
    name: "Link 2",
    subtitle: "OffGrid · Next in the Link line",
    href: "/products/link-2",
    image: null,
    badge: COMING_SOON_LABEL,
  },
] satisfies SiteProduct[];

export const link2Content = {
  name: "Link 2",
  brandedName: "OffGrid Link 2",
  badge: COMING_SOON_LABEL,
  description:
    "The next hardware in the OffGrid Link line. A cleaner product page deserves a cleaner placeholder too.",
  cards: [
    {
      kicker: "What it means",
      title: "A cleaner placeholder",
      description:
        "Link 2 now sits inside the same neutral product system as the rest of the site instead of a separate glow-heavy page.",
    },
    {
      kicker: "What to expect",
      title: "More product detail later",
      description:
        "When Link 2 is ready, this page can expand into the same section-based product storytelling used for Link 1.",
    },
    {
      kicker: "Until then",
      title: "The current product stays front and center",
      description:
        "The page makes it clear that Link 2 is coming while still steering visitors toward the product that exists today.",
    },
  ],
};
