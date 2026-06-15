import { afterEach, describe, expect, it, vi } from "vitest";
import { clientIp, enforceRateLimit, rateLimitHeaders } from "./rate-limit";

// In the test environment there is no Cloudflare Rate Limiting binding
// (getCloudflareContext throws), so enforceRateLimit falls back to the
// per-isolate in-memory limiter — which is exactly the path we want to pin.
// The in-memory `buckets` map is module-global, so every test uses a fresh IP
// to avoid cross-test collisions.
function requestFromIp(ip: string): Request {
  return new Request("https://offgridevices.com/api/contact", {
    method: "POST",
    headers: { "x-forwarded-for": ip },
  });
}

describe("clientIp", () => {
  it("prefers the unforgeable cf-connecting-ip over x-forwarded-for", () => {
    const req = new Request("https://x", {
      headers: {
        "cf-connecting-ip": "9.9.9.9",
        "x-forwarded-for": "1.2.3.4",
      },
    });
    expect(clientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to the first x-forwarded-for entry, then x-real-ip", () => {
    const xff = new Request("https://x", {
      headers: { "x-forwarded-for": "1.1.1.1, 2.2.2.2" },
    });
    expect(clientIp(xff)).toBe("1.1.1.1");

    const real = new Request("https://x", {
      headers: { "x-real-ip": "3.3.3.3" },
    });
    expect(clientIp(real)).toBe("3.3.3.3");
  });

  it("returns undefined when there is no request", () => {
    expect(clientIp(undefined)).toBeUndefined();
  });
});

describe("enforceRateLimit (in-memory fallback)", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("allows up to the limit then blocks, decrementing remaining", async () => {
    const req = requestFromIp("198.51.100.10");

    const first = await enforceRateLimit(req, "contact");
    expect(first.allowed).toBe(true);
    expect(first.limit).toBe(5);
    expect(first.remaining).toBe(4);

    // Calls 2–5 stay allowed.
    for (let i = 0; i < 4; i += 1) {
      expect((await enforceRateLimit(req, "contact")).allowed).toBe(true);
    }

    // The 6th call within the window is blocked with remaining 0.
    const blocked = await enforceRateLimit(req, "contact");
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("resets and allows again once the window elapses", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_000_000);
    const req = requestFromIp("198.51.100.20");

    for (let i = 0; i < 5; i += 1) {
      await enforceRateLimit(req, "contact");
    }
    expect((await enforceRateLimit(req, "contact")).allowed).toBe(false);

    // Advance past the 60s window — the bucket should expire and reset.
    vi.setSystemTime(1_000_000 + 61_000);
    const afterReset = await enforceRateLimit(req, "contact");
    expect(afterReset.allowed).toBe(true);
    expect(afterReset.remaining).toBe(4);
  });

  it("tracks separate IPs independently", async () => {
    const a = requestFromIp("198.51.100.30");
    const b = requestFromIp("198.51.100.31");

    for (let i = 0; i < 5; i += 1) await enforceRateLimit(a, "contact");
    expect((await enforceRateLimit(a, "contact")).allowed).toBe(false);

    // A different IP is unaffected by A's exhausted bucket.
    expect((await enforceRateLimit(b, "contact")).allowed).toBe(true);
  });
});

describe("rateLimitHeaders", () => {
  it("emits string RateLimit-* headers with Reset in whole seconds", () => {
    const headers = rateLimitHeaders({
      allowed: true,
      limit: 5,
      remaining: 3,
      resetAt: 1_700_000_000_500,
    });
    expect(headers).toEqual({
      "RateLimit-Limit": "5",
      "RateLimit-Remaining": "3",
      "RateLimit-Reset": "1700000001", // ceil(…500 / 1000)
    });
  });
});
