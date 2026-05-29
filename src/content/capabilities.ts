/**
 * Copy for the /capabilities page — OffGrid's 3D-design + small-batch
 * manufacturing business line. Edit text here without touching the component.
 *
 * The page doubles as an online federal capabilities statement, so the
 * `credentials` block is structured the way government buyers expect
 * (company snapshot, core competencies, differentiators, registration numbers,
 * point of contact).
 *
 * IMPORTANT — credentials policy:
 *   - Government registration NUMBERS (SAM status, UEI, CAGE, NAICS, PSC,
 *     business-size/socioeconomic status) are intentionally left BLANK below.
 *     A registration row only renders when it has a non-empty `value`, so the
 *     page never shows a placeholder or an invented number. Drop real values in
 *     when you decide to publish them and the rows appear automatically.
 *   - NEVER add the EIN or any financial/banking detail here. The component
 *     also defensively refuses to render anything that looks like one.
 */

export type CapabilityItem = { title: string; body: string };
export type SpecRow = { label: string; value: string };
export type ProcessStep = { number: number; title: string; body: string };
export type CredentialItem = { label: string; value: string };

export const capabilitiesContent = {
  hero: {
    eyebrow: "MANUFACTURING · OFFGRID LLC",
    title: "US-based 3D design & small-batch manufacturing.",
    body: "OffGrid LLC is a founder-run hardware shop in Maryland. We help companies design, prototype, and manufacture parts and small-run hardware in the United States — from a rough idea or a CAD file to finished, assembled units. Small shop, direct line, real parts.",
    primaryCta: { label: "Start a conversation", href: "/contact" },
  },

  whatWeDo: {
    eyebrow: "WHAT WE DO",
    title: "From a sketch to a shipped batch.",
    intro:
      "We are a small shop, so we take on work where that is an advantage: fast iteration, low minimums, and a single person who owns your project end to end.",
    items: [
      {
        title: "Rapid prototyping",
        body: "From a sketch or a CAD file to a physical part in days. Iterate fast and hold the real thing before you commit to a production run.",
      },
      {
        title: "Custom 3D-printed enclosures & parts",
        body: "Functional enclosures, brackets, mounts, and parts — designed for the field and finished for the real world, not just the print bed.",
      },
      {
        title: "Low-volume production runs",
        body: "Small-batch manufacturing for tens to low hundreds of units, without the tooling cost and minimum-order overhead of injection molding.",
      },
      {
        title: "Design for manufacturing & CAD",
        body: "CAD modeling in Shapr3D (Creator Partner) and design-for-manufacturing help to make parts cheaper, stronger, and actually printable.",
      },
      {
        title: "Electronics integration & assembly",
        body: "Assembling electronics into custom enclosures — brass heat-set inserts, LoRa mesh devices on the RAKwireless WisBlock platform, and MagSafe-compatible designs.",
      },
      {
        title: "Jigs, fixtures & tooling",
        body: "Custom jigs and fixtures to speed up your own assembly, testing, or production line.",
      },
    ] satisfies CapabilityItem[],
  },

  materials: {
    eyebrow: "MATERIALS & EQUIPMENT",
    title: "In-house FDM, finished properly.",
    intro:
      "Printing happens in-house on a Prusa Core One, so we control the whole process — material choice, print, post-processing, assembly, and QC.",
    specs: [
      { label: "Printing", value: "FDM on a Prusa Core One — in-house" },
      {
        label: "ASA",
        value: "UV-resistant — finished outdoor parts; acetone vapor smoothing",
      },
      { label: "ABS", value: "Tough, heat-tolerant functional parts" },
      { label: "TPU", value: "Flexible parts — gaskets, grips, bumpers" },
      { label: "PLA", value: "Fast concept prototypes and fixtures" },
      {
        label: "Post-processing",
        value: "Acetone vapor smoothing for ASA; brass heat-set inserts",
      },
      {
        label: "Assembly & QC",
        value: "Small-batch assembly with per-unit quality checks",
      },
      {
        label: "Electronics",
        value: "LoRa mesh on RAKwireless WisBlock; MagSafe-compatible builds",
      },
    ] satisfies SpecRow[],
  },

  // Doubles as an online capabilities statement for partners and gov buyers.
  credentials: {
    eyebrow: "CAPABILITIES STATEMENT",
    title: "Credentials & compliance.",
    intro:
      "A snapshot for partners and government buyers evaluating OffGrid LLC as a domestic supplier.",
    // Only entries with a non-empty `value` render (see component). Government
    // registration numbers are blank on purpose until the owner publishes them.
    items: [
      { label: "Legal entity", value: "OffGrid LLC" },
      {
        label: "Business structure",
        value: "Maryland-registered limited liability company (LLC)",
      },
      { label: "Location", value: "Rockville, MD, USA" },
      { label: "Manufacturing", value: "Designed & assembled in the USA" },
      {
        label: "Shipping compliance",
        value:
          "USPS hazardous-materials rules (Publication 52) for LiPo-containing products",
      },
      // --- Federal contracting (left blank until the owner chooses to publish) ---
      // Fill a value and the row appears; leave "" and it stays hidden.
      { label: "SAM.gov registration", value: "" },
      { label: "UEI", value: "" },
      { label: "CAGE code", value: "" },
      { label: "NAICS codes", value: "" },
      { label: "PSC codes", value: "" },
      { label: "Business size / socioeconomic status", value: "" },
    ] satisfies CredentialItem[],
    coreCompetencies: [
      "3D design & CAD (Shapr3D)",
      "FDM 3D printing (ASA, ABS, TPU, PLA)",
      "Rapid prototyping & first-article",
      "Low-volume production & assembly",
      "Electronics integration (LoRa / RAK WisBlock)",
      "Design for manufacturing (DFM)",
    ],
    differentiators: [
      "US-based, founder-run — you talk to the person doing the work.",
      "Low minimums and fast turnaround on small batches.",
      "End-to-end: design, print, finish, assemble, QC, and ship.",
      "Ships battery-containing products under USPS hazmat rules.",
    ],
    pointOfContact: {
      name: "Shreyash Gupta",
      title: "Founder",
      email: "hello@offgridevices.com",
    },
  },

  process: {
    eyebrow: "HOW TO WORK WITH US",
    title: "Inquiry to production, in four steps.",
    steps: [
      {
        number: 1,
        title: "Inquiry",
        body: "Tell us what you're making — a sketch, a CAD file, photos of the part, or just the problem you're trying to solve.",
      },
      {
        number: 2,
        title: "Quote",
        body: "We scope materials, tolerances, finish, and quantity, then send a clear quote and a realistic timeline.",
      },
      {
        number: 3,
        title: "Prototype",
        body: "We print and iterate a first article so you can hold and test the part before committing to a run.",
      },
      {
        number: 4,
        title: "Production",
        body: "We run the batch, QC each unit, and ship — with proper hazmat handling when there's a battery inside.",
      },
    ] satisfies ProcessStep[],
  },

  closing: {
    eyebrow: "LET'S BUILD IT",
    title: "Have a part or a product in mind?",
    body: "Tell us what you're making and we'll tell you how we'd build it. We typically reply within 1–2 business days.",
    cta: { label: "Start a conversation", href: "/contact" },
  },
} as const;
