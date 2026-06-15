import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyTurnstile } from "./turnstile";

// Cloudflare's siteverify endpoint, mocked via global fetch.
const okResponse = (success: boolean) =>
  new Response(JSON.stringify({ success }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

describe("verifyTurnstile", () => {
  const originalSecret = process.env.TURNSTILE_SECRET_KEY;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.TURNSTILE_SECRET_KEY;
    } else {
      process.env.TURNSTILE_SECRET_KEY = originalSecret;
    }
  });

  it("treats Turnstile as not-required (returns true) when the secret is unset", async () => {
    delete process.env.TURNSTILE_SECRET_KEY;
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(verifyTurnstile("any-token")).resolves.toBe(true);
    // Must not make a network call when there's nothing to verify against.
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("fails closed (returns false) when configured but no token is supplied", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const fetchSpy = vi.spyOn(globalThis, "fetch");

    await expect(verifyTurnstile(undefined)).resolves.toBe(false);
    await expect(verifyTurnstile(null)).resolves.toBe(false);
    await expect(verifyTurnstile("")).resolves.toBe(false);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it("returns true when Cloudflare reports success", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse(true));

    await expect(verifyTurnstile("good-token")).resolves.toBe(true);
  });

  it("returns false when Cloudflare reports failure", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(okResponse(false));

    await expect(verifyTurnstile("bad-token")).resolves.toBe(false);
  });

  it("returns false on a non-OK HTTP response", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("nope", { status: 500 }),
    );

    await expect(verifyTurnstile("token")).resolves.toBe(false);
  });

  it("returns false when the network request throws", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("network down"));
    // Silence the expected warn so the test output stays clean.
    vi.spyOn(console, "warn").mockImplementation(() => {});

    await expect(verifyTurnstile("token")).resolves.toBe(false);
  });

  it("includes the client IP in the verification payload when provided", async () => {
    process.env.TURNSTILE_SECRET_KEY = "secret";
    const fetchSpy = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(okResponse(true));

    await verifyTurnstile("token", "203.0.113.7");

    const body = fetchSpy.mock.calls[0]?.[1]?.body as URLSearchParams;
    expect(body.get("remoteip")).toBe("203.0.113.7");
    expect(body.get("response")).toBe("token");
  });
});
