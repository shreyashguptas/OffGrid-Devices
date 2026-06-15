import { describe, expect, it } from "vitest";
import { toIsoDate } from "./jsonLd";

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
