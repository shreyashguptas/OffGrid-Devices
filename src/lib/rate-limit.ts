import "server-only";

type RateLimitOptions = {
  key: string;
  limit: number;
  windowMs: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

/**
 * Minimal shape of the Cloudflare Workers Rate Limiting binding. Declared
 * locally because this project does not depend on `@cloudflare/workers-types`.
 * See https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/
 */
type RateLimitBinding = {
  limit: (options: { key: string }) => Promise<{ success: boolean }>;
};

export type RateLimitScope = "contact";

/**
 * Central limit config. `binding` matches a `ratelimits[].name` in
 * wrangler.jsonc; `period` is in SECONDS and must be 10 or 60 to satisfy the
 * Cloudflare Rate Limiting binding contract.
 */
const RATE_LIMITS: Record<
  RateLimitScope,
  { binding: string; limit: number; period: 10 | 60 }
> = {
  contact: { binding: "RL_CONTACT", limit: 5, period: 60 },
};

const buckets = new Map<string, RateLimitEntry>();

/**
 * Resolve the client IP from trusted platform metadata.
 *
 * Prefers Cloudflare's `cf-connecting-ip` — the edge sets it and a client
 * cannot forge it. The `x-forwarded-for` / `x-real-ip` fallbacks only matter in
 * local dev where `cf-connecting-ip` is absent. NEVER trust the leading
 * `x-forwarded-for` value in production: Cloudflare APPENDS the real client IP,
 * it does not strip an attacker-supplied leading value, so `xff[0]` is
 * attacker-controlled.
 */
export function clientIp(request: Request | undefined): string | undefined {
  if (!request) {
    return undefined;
  }
  const forwardedFor = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  return (
    request.headers.get("cf-connecting-ip")?.trim() ||
    forwardedFor ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined
  );
}

function getRateLimitKey(request: Request | undefined, scope: string) {
  return `${scope}:${clientIp(request) ?? "anonymous"}`;
}

async function getRateLimitBinding(
  name: string,
): Promise<RateLimitBinding | undefined> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = getCloudflareContext();
    const binding = (env as Record<string, unknown>)[name] as
      | RateLimitBinding
      | undefined;
    return typeof binding?.limit === "function" ? binding : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Enforce the rate limit for a scope. Uses the Cloudflare Rate Limiting binding
 * (counters shared across isolates within a Cloudflare location, eventually
 * consistent) when available, falling back to a per-isolate in-memory counter
 * for local dev / test where no binding is bound.
 *
 * NOTE: on the binding path the RateLimit-Remaining / -Reset headers are
 * best-effort estimates — the binding only reports success/failure, not counts.
 */
export async function enforceRateLimit(
  request: Request | undefined,
  scope: RateLimitScope,
): Promise<RateLimitResult> {
  const { binding: bindingName, limit, period } = RATE_LIMITS[scope];
  const key = getRateLimitKey(request, scope);

  const binding = await getRateLimitBinding(bindingName);
  if (binding) {
    try {
      const { success } = await binding.limit({ key });
      return {
        allowed: success,
        limit,
        remaining: success ? limit - 1 : 0,
        resetAt: Date.now() + period * 1000,
      };
    } catch {
      // Binding glitched — fall through to the in-memory limiter rather than
      // failing the endpoint open or closed on an infra hiccup.
    }
  }

  return checkRateLimit({ key, limit, windowMs: period * 1000 });
}

function checkRateLimit({
  key,
  limit,
  windowMs,
}: RateLimitOptions): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    cleanupExpiredBuckets(now);
    return { allowed: true, limit, remaining: limit - 1, resetAt };
  }

  existing.count += 1;

  return {
    allowed: existing.count <= limit,
    limit,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "RateLimit-Limit": String(result.limit),
    "RateLimit-Remaining": String(result.remaining),
    "RateLimit-Reset": String(Math.ceil(result.resetAt / 1000)),
  };
}

function cleanupExpiredBuckets(now: number) {
  if (buckets.size < 500) {
    return;
  }

  for (const [key, entry] of buckets) {
    if (entry.resetAt <= now) {
      buckets.delete(key);
    }
  }
}
