import { describe, expect, it, vi, beforeEach } from "vitest";
import { POST } from "./route";

vi.mock("@/lib/turnstile", () => ({
  verifyTurnstile: vi.fn(),
}));
vi.mock("@/lib/contact-db", () => ({
  saveContactSubmission: vi.fn(),
}));
vi.mock("@/lib/contact-email", () => ({
  sendContactNotification: vi.fn(),
  sendContactAutoreply: vi.fn(),
}));

import * as turnstile from "@/lib/turnstile";
import * as db from "@/lib/contact-db";
import * as email from "@/lib/contact-email";

const VALID = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  company: "Analytical Engines",
  phone: "555-0100",
  inquiryType: "3D printing / manufacturing",
  message: "I need 50 custom enclosures printed in ASA.",
};

// Unique IP per request keeps the in-memory rate-limit buckets from colliding
// across tests; pass an explicit IP when a test needs repeat calls.
let ipCounter = 0;
function makeRequest(body: Record<string, unknown> = VALID, ip?: string) {
  return new Request("https://offgridevices.com/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip ?? `198.51.100.${(ipCounter += 1)}`,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.mocked(turnstile.verifyTurnstile).mockReset();
    vi.mocked(db.saveContactSubmission).mockReset();
    vi.mocked(email.sendContactNotification).mockReset();
    vi.mocked(email.sendContactAutoreply).mockReset();
    // Happy-path defaults; individual tests override as needed.
    vi.mocked(turnstile.verifyTurnstile).mockResolvedValue(true);
    vi.mocked(db.saveContactSubmission).mockResolvedValue(true);
    vi.mocked(email.sendContactNotification).mockResolvedValue(true);
    vi.mocked(email.sendContactAutoreply).mockResolvedValue();
  });

  it("returns 200 on a valid submission and sends the email", async () => {
    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(email.sendContactNotification).toHaveBeenCalledOnce();
  });

  it("returns 400 when a required field is missing or invalid", async () => {
    const res = await POST(makeRequest({ ...VALID, email: "not-an-email" }));
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toMatch(/valid email/i);
    expect(email.sendContactNotification).not.toHaveBeenCalled();
  });

  it("returns 403 when Turnstile verification fails", async () => {
    vi.mocked(turnstile.verifyTurnstile).mockResolvedValue(false);

    const res = await POST(makeRequest({ ...VALID, turnstileToken: "bad" }));
    const json = await res.json();

    expect(res.status).toBe(403);
    expect(json.error).toMatch(/verification/i);
    expect(email.sendContactNotification).not.toHaveBeenCalled();
  });

  it("accepts the honeypot silently without emailing or persisting", async () => {
    const res = await POST(makeRequest({ ...VALID, company_website: "bot" }));
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(email.sendContactNotification).not.toHaveBeenCalled();
    expect(db.saveContactSubmission).not.toHaveBeenCalled();
  });

  it("returns 500 when no email transport is configured", async () => {
    vi.mocked(email.sendContactNotification).mockResolvedValue(false);

    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(500);
    expect(json.error).toMatch(/email/i);
  });

  it("still succeeds and still emails when persistence throws", async () => {
    vi.mocked(db.saveContactSubmission).mockRejectedValue(new Error("D1 down"));

    const res = await POST(makeRequest());
    const json = await res.json();

    expect(res.status).toBe(200);
    expect(json.ok).toBe(true);
    expect(email.sendContactNotification).toHaveBeenCalledOnce();
  });

  it("rate limits repeated submissions from one IP", async () => {
    const ip = "203.0.113.55";

    for (let i = 0; i < 5; i += 1) {
      const res = await POST(makeRequest(VALID, ip));
      expect(res.status).toBe(200);
    }

    const limited = await POST(makeRequest(VALID, ip));
    const json = await limited.json();

    expect(limited.status).toBe(429);
    expect(json.error).toMatch(/too many/i);
    expect(limited.headers.get("retry-after")).toBeTruthy();
  });
});
