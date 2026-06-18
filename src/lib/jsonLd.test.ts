import { describe, expect, it } from "vitest";
import { howToJsonLd, itemListJsonLd, toIsoDate } from "./jsonLd";

// toIsoDate normalizes the human dates we keep in content ("February 2026")
// into the ISO 8601 form Schema.org wants for datePublished / dateModified.
// Bad output here silently degrades rich-result eligibility, so the contract
// is worth pinning.
describe("toIsoDate", () => {
  it("passes ISO dates through unchanged", () => {
    expect(toIsoDate("2026-02-15")).toBe("2026-02-15");
    expect(toIsoDate("2026-02-15T10:30:00Z")).toBe("2026-02-15T10:30:00Z");
  });

  it('converts "Month Year" to the first of that month', () => {
    expect(toIsoDate("February 2026")).toBe("2026-02-01");
    expect(toIsoDate("January 2026")).toBe("2026-01-01");
    expect(toIsoDate("December 2025")).toBe("2025-12-01");
  });

  it("accepts abbreviated month names via prefix match", () => {
    expect(toIsoDate("Feb 2026")).toBe("2026-02-01");
    expect(toIsoDate("Sept 2026")).toBe("2026-09-01");
  });

  it("is case-insensitive for month names", () => {
    expect(toIsoDate("march 2026")).toBe("2026-03-01");
    expect(toIsoDate("MARCH 2026")).toBe("2026-03-01");
  });

  it("returns the original string when it cannot be parsed at all", () => {
    expect(toIsoDate("not a date")).toBe("not a date");
    expect(toIsoDate("garbage")).toBe("garbage");
  });

  it("returns empty/falsey input unchanged", () => {
    expect(toIsoDate("")).toBe("");
  });
});

// itemListJsonLd surfaces a listing page's collection to search engines. The
// contract: correct @type, a position-ordered itemListElement with absolute
// URLs, and numberOfItems matching the input length.
describe("itemListJsonLd", () => {
  it("builds a position-ordered ItemList with absolute URLs", () => {
    const result = itemListJsonLd("Blog", [
      { name: "First", url: "/blog/first", description: "one" },
      { name: "Second", url: "/blog/second" },
    ]);

    expect(result["@type"]).toBe("ItemList");
    expect(result.name).toBe("Blog");
    expect(result.numberOfItems).toBe(2);
    expect(result.itemListElement).toHaveLength(2);

    const [first, second] = result.itemListElement;
    expect(first.position).toBe(1);
    expect(first.name).toBe("First");
    expect(first.url).toMatch(/^https?:\/\/.+\/blog\/first$/);
    expect(first).toHaveProperty("description", "one");
    expect(second.position).toBe(2);
    // description is omitted when not provided
    expect(second).not.toHaveProperty("description");
  });
});

// howToJsonLd makes a step-by-step guide eligible for the How-To rich result.
// The contract: HowTo type, an absolute url, and position-numbered HowToStep
// entries that carry the step name + text.
describe("howToJsonLd", () => {
  it("builds an ordered HowTo with numbered steps", () => {
    const result = howToJsonLd({
      name: "Set up",
      description: "do it",
      url: "/guide",
      steps: [
        { name: "Charge", text: "plug it in" },
        { name: "Pair", text: "open the app", url: "/guide#pair" },
      ],
    });

    expect(result["@type"]).toBe("HowTo");
    expect(result.name).toBe("Set up");
    expect(result.url).toMatch(/^https?:\/\/.+\/guide$/);
    expect(result.step).toHaveLength(2);
    expect(result.step[0]).toMatchObject({
      "@type": "HowToStep",
      position: 1,
      name: "Charge",
      text: "plug it in",
    });
    expect(result.step[0]).not.toHaveProperty("url");
    expect(result.step[1].position).toBe(2);
    expect(result.step[1].url).toMatch(/^https?:\/\/.+\/guide#pair$/);
  });
});
