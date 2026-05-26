export type ReviewerAvatar = {
  name: string;
  image: string | null;
  initials: string | null;
};

export type Beacon1FeatureHighlight = {
  icon: string;
  kicker: string;
  title: string;
  tab: string;
  caption: string;
  description: string;
  chips: string[];
  image: string;
  alt: string;
};

export type Beacon1FeatureCard = {
  icon: string;
  title: string;
  description: string;
};

export type Beacon1Signal = {
  label: string;
  value: string;
};

export type Beacon1GalleryCard = {
  kicker: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export type Beacon1ParallaxImage = {
  src: string;
  alt: string;
  label: string;
};

export type Beacon1Spec = {
  label: string;
  value: string;
};

export type Beacon1Testimonial = {
  name: string;
  date: string;
  review: string;
  image: string | null;
};

export const beacon1Content = {
  summary: {
    name: "Beacon 1",
    brandedName: "OffGrid Beacon 1",
    subtitle: "MagSafe LoRa mesh radio",
    href: "/products/beacon-1",
    shortBuyLabel: "Buy",
    buyLabel: "Buy Beacon 1",
    loadingLabel: "Opening Checkout...",
    heroImage: {
      src: "/products/beacon1-hero-v1.png",
      alt: "OffGrid Beacon 1 MagSafe LoRa radio hero image",
    },
    productImage: {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 MagSafe LoRa radio",
    },
  },
  reviewSummary: {
    pillText: "Loved by 28+ customers.",
    customerCountLabel: "28+",
    ratingLabel: "5.0 from 28+ customers",
    reviewerAvatars: [
      { name: "Jesus", image: "/reviewers/jesus.jpg", initials: null },
      { name: "Brazen", image: "/reviewers/brazen.webp", initials: null },
      { name: "Ryan", image: null, initials: "R" },
      { name: "John", image: null, initials: "J" },
      { name: "Bob", image: null, initials: "B" },
    ] satisfies ReviewerAvatar[],
  },
  home: {
    heroTitle: "Stay Connected.",
    heroSubtitle: "Go Anywhere.",
    details: {
      badge: "Product details",
      title: "A closer look at Beacon 1.",
      description:
        "This section is ready for your detail shots, in-hand photos, and hardware closeups. Drop images into the named paths and they will replace the placeholders automatically.",
    },
    story: {
      badge: "Product story",
      title: "Snaps On.",
      subtitle: "Stays With You.",
      description:
        "Beacon 1 belongs on the phone you already never leave behind, so your mesh radio is always in reach.",
      quickViewLabel: "Quick view",
      quickViewDescription:
        "The essentials, without the spec sheet. Tap a card, or let it rotate on its own.",
    },
    hardware: {
      badge: "Hardware",
      title: "Transparent Design.",
      subtitle: "Nothing to Hide.",
      description:
        "See the technology that keeps you connected. The enclosure shows the hardware instead of hiding it behind effects.",
    },
    specs: {
      badge: "Specifications",
      title: "Engineered for the real world.",
      description:
        "Every component in Beacon 1 is chosen for range, reliability, and everyday carry. The experience stays simple; the hardware does not.",
    },
    testimonials: {
      badge: "Reviews",
      title: "Don't take our word. Take theirs.",
      description:
        "Real feedback from Beacon 1 owners: MagSafe carry, mesh range, and support that shows up.",
    },
    cta: {
      eyebrow: "Ready when you are",
      title: "Ready for OffGrid Beacon 1?",
      description:
        "Pick up OffGrid Beacon 1 and join the adventurers, preppers, and mesh enthusiasts who stay connected off-grid.",
      secondaryHref: "/blog",
      secondaryLabel: "Read the blog",
    },
  },
  productPage: {
    eyebrow: "OffGrid Beacon 1",
    description:
      "The world's first MagSafe-compatible LoRa mesh radio from OffGrid. It snaps to your phone, carries cleanly, and stays ready for the places where phones still matter but towers do not.",
    why: {
      badge: "Why Beacon 1",
      title: "Never forget it.",
      subtitle: "Always connected.",
      description:
        "Beacon 1 is designed around one simple idea: the radio should stay with the phone you already reach for.",
    },
    design: {
      badge: "Design details",
      title: "Transparent design.",
      subtitle: "No extra styling required.",
      description:
        "The hardware is part of the product story. Beacon 1 keeps the build visible instead of burying it in decoration.",
    },
    specs: {
      badge: "Specifications",
      title: "Engineered for range, reliability, and carry.",
      description:
        "Every component in Beacon 1 is chosen for real-world use. It works with the mesh tools people already trust and keeps the hardware package simple enough to carry daily.",
      firmwareTitle: "Built for Meshtastic and MeshCore workflows.",
      firmwareDescription:
        "Beacon 1 fits the setup people already use instead of forcing a new process just to get on the mesh.",
    },
    testimonials: {
      badge: "Customer feedback",
      title: "Don't take our word.",
      subtitle: "Take theirs.",
    },
    cta: {
      eyebrow: "Off-grid ready",
      title: "Ready for Beacon 1?",
      description:
        "Get OffGrid Beacon 1 and keep the radio with the device you already carry.",
      secondaryHref: "/blog/why-offgrid",
      secondaryLabel: "Read the OffGrid story",
    },
  },
  blog: {
    cta: {
      eyebrow: "Ready to start",
      title: "Ready for Beacon 1?",
      description:
        "Get OffGrid Beacon 1, pair it, and join the mesh without the usual setup friction.",
      secondaryHref: "/products/beacon-1",
      secondaryLabel: "View Beacon 1",
    },
  },
  featureHighlights: [
    {
      icon: "MAG",
      kicker: "Daily carry",
      title: "Snap it on and go",
      tab: "MagSafe carry",
      caption: "Beacon 1 follows the phone.",
      description:
        "MagSafe puts Beacon 1 on the phone you already carry, so the radio is with you when you actually need it.",
      chips: ["MagSafe", "No loose gear"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 MagSafe-mounted to a phone",
    },
    {
      icon: "RF",
      kicker: "Off-grid reach",
      title: "Keep talking past the dead zone",
      tab: "LoRa range",
      caption: "Built for places without bars.",
      description:
        "When cell service drops away, LoRa keeps messages moving through the mesh without relying on a tower.",
      chips: ["Off-grid", "Peer to peer"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 used outdoors",
    },
    {
      icon: "BAT",
      kicker: "Trip-ready power",
      title: "Charge once, stay out longer",
      tab: "Battery",
      caption: "Less babysitting, more moving.",
      description:
        "Rechargeable power and USB-C make Beacon 1 easy to top off before a trip and easy to trust once you're out.",
      chips: ["USB-C", "Adventure ready"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "OffGrid Beacon 1 internal hardware and battery",
    },
    {
      icon: "VIS",
      kicker: "Built to be seen",
      title: "Let the hardware do the talking",
      tab: "Transparent shell",
      caption: "Beacon 1 looks as technical as it is.",
      description:
        "The transparent shell shows the hardware inside instead of hiding it behind extra styling.",
      chips: ["Visible internals", "Distinctive look"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "Transparent OffGrid Beacon 1 close-up",
    },
    {
      icon: "FW",
      kicker: "Flexible setup",
      title: "Run the firmware you already prefer",
      tab: "Dual firmware",
      caption: "Meshtastic or MeshCore.",
      description:
        "Beacon 1 fits the Meshtastic or MeshCore workflow you already use instead of forcing a new one.",
      chips: ["Meshtastic", "MeshCore"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 product view",
    },
    {
      icon: "NET",
      kicker: "Network effect",
      title: "Every extra node makes the system stronger",
      tab: "Mesh network",
      caption: "Coverage grows with the group.",
      description:
        "Messages can hop across nearby devices, so the network gets tougher as more people join.",
      chips: ["Shared coverage", "Resilient"],
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 used during an outdoor trip",
    },
  ] satisfies Beacon1FeatureHighlight[],
  featureCards: [
    {
      icon: "MAG",
      title: "MagSafe compatible",
      description:
        "Attaches securely to MagSafe-compatible phones and cases so Beacon 1 stays with the device you already carry.",
    },
    {
      icon: "RF",
      title: "Long-range LoRa",
      description:
        "Communicate miles away without cell service using LoRa mesh networking built for low-power, off-grid use.",
    },
    {
      icon: "BAT",
      title: "All-day battery",
      description:
        "A rechargeable internal battery and USB-C charging make Beacon 1 simple to top off before the next trip.",
    },
    {
      icon: "VIS",
      title: "Transparent shell",
      description:
        "The enclosure shows the board, battery, and antenna instead of hiding the hardware behind unnecessary styling.",
    },
    {
      icon: "FW",
      title: "Dual firmware support",
      description:
        "Run Meshtastic or MeshCore depending on the workflow you already use and the network you want to join.",
    },
    {
      icon: "NET",
      title: "Mesh networking",
      description:
        "Messages hop between devices, extending range and building a more resilient communication network as more nodes join.",
    },
  ] satisfies Beacon1FeatureCard[],
  heroSignals: [
    { label: "Mount", value: "MagSafe" },
    { label: "Mesh", value: "LoRa" },
    { label: "Charge", value: "USB-C" },
  ] satisfies Beacon1Signal[],
  homeGalleryCards: [
    {
      kicker: "Outdoor use",
      title: "Built for trips where phones still matter",
      description:
        "MagSafe keeps the radio with the device already in your hand, whether you're on a trail, at an event, or off the grid.",
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 outdoor use",
    },
    {
      kicker: "Transparent shell",
      title: "The hardware is part of the look",
      description:
        "The enclosure shows the RAK board, battery, and antenna with no extra visual noise around it.",
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "OffGrid Beacon 1 detail view",
    },
  ] satisfies Beacon1GalleryCard[],
  productGalleryCards: [
    {
      kicker: "Daily carry",
      title: "Built for the phone, not the backpack.",
      description:
        "Beacon 1 snaps to the device you already reach for, so you don't have to remember a separate radio before heading out.",
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 outdoor use",
    },
    {
      kicker: "Visible internals",
      title: "The hardware stays part of the experience.",
      description:
        "The transparent shell makes the engineering visible and keeps the product looking as technical as it actually is.",
      image:
        "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "OffGrid Beacon 1 detail view",
    },
  ] satisfies Beacon1GalleryCard[],
  parallaxImages: [
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 MagSafe-mounted to a phone",
      label: "Hero detail",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 used outdoors",
      label: "In hand",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "OffGrid Beacon 1 antenna and internal hardware detail",
      label: "Antenna detail",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 front view",
      label: "Front view",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/2_v2_2.jpg?v=1775678042",
      alt: "OffGrid Beacon 1 board closeup",
      label: "Board closeup",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/3v2.jpg?v=1775678009",
      alt: "OffGrid Beacon 1 carried outdoors",
      label: "Carry shot",
    },
    {
      src: "https://cdn.shopify.com/s/files/1/0780/9135/4351/files/1_v2.jpg?v=1775678037",
      alt: "OffGrid Beacon 1 side profile",
      label: "Side profile",
    },
  ] satisfies Beacon1ParallaxImage[],
  specs: [
    { label: "Core module", value: "RAK WisBlock System" },
    { label: "Connectivity", value: "Bluetooth 5.0 + LoRa" },
    { label: "Battery", value: "Rechargeable Li-Po" },
    { label: "Range", value: "Up to 10+ km line of sight" },
    { label: "Charging", value: "USB-C fast charging" },
    { label: "Firmware", value: "Meshtastic or MeshCore" },
  ] satisfies Beacon1Spec[],
  testimonials: [
    {
      name: "Ryan",
      date: "February 2026",
      review:
        "Feels great in the hand.. strong attachment to the phone and would recommend.",
      image: "/reviews/ryan-review.webp",
    },
    {
      name: "Brazen",
      date: "March 2026",
      review:
        "This is my first step into Mesh networks, and this thing is perfect! The MagSafe works better than I'd hoped with the case on my Android, very sturdy and secure feel. The quality of the 3D print seems wonderful out of the box. Very responsive seller and very helpful.",
      image: null,
    },
    {
      name: "Christopher",
      date: "February 2026",
      review: "Great product, even included a personal handwritten note.",
      image: "/reviews/christopher-review.webp",
    },
    {
      name: "John",
      date: "March 2026",
      review:
        "Product works great as a drop-in case/battery solution for a node you've already purchased. Seller really cares about customer satisfaction and is very responsive. Magnets attach strong to my dbrand phone case. The 2000mAh battery lasts almost 2 weeks.",
      image: null,
    },
    {
      name: "Bob",
      date: "March 2026",
      review:
        "Nicely made product with a strong magnet. Would recommend or buy again. It should hold up better to a drop than those power bank versions from other companies especially with it being lightweight.",
      image: null,
    },
    {
      name: "Jesus",
      date: "January 2026",
      review:
        "Package arrived on time and in great condition. Shreyash is awesome, thank you.",
      image: null,
    },
  ] satisfies Beacon1Testimonial[],
};
