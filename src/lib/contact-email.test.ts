import { describe, expect, it } from "vitest";
import { escapeHtml } from "./contact-email";

// escapeHtml is the single line of defense that stops a malicious contact-form
// submission from injecting markup into the HTML notification email we send
// ourselves. These cases pin the exact entity output.
describe("escapeHtml", () => {
  it("escapes the four HTML-significant characters", () => {
    expect(escapeHtml("&")).toBe("&amp;");
    expect(escapeHtml("<")).toBe("&lt;");
    expect(escapeHtml(">")).toBe("&gt;");
    expect(escapeHtml('"')).toBe("&quot;");
  });

  it("neutralizes a script-tag injection attempt", () => {
    expect(escapeHtml('<script>alert("xss")</script>')).toBe(
      "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;",
    );
  });

  it("escapes ampersands first so existing entities are not double-mangled into tags", () => {
    // The & must become &amp; before < / > are processed, otherwise the output
    // could be re-interpreted. "&lt;" in raw input should round-trip safely.
    expect(escapeHtml("a & b < c")).toBe("a &amp; b &lt; c");
  });

  it("leaves ordinary text untouched", () => {
    expect(escapeHtml("Hello world 123")).toBe("Hello world 123");
    expect(escapeHtml("")).toBe("");
  });
});
