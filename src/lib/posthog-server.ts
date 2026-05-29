import "server-only";
import { PostHog } from "posthog-node";

// Cloudflare Workers invocations are short-lived, so we flush every capture
// immediately rather than relying on the SDK's batch timer. The singleton is
// reused across invocations within a warm isolate.
let cached: PostHog | undefined;

export function getPostHogClient(): PostHog | undefined {
  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) return undefined;
  if (!cached) {
    cached = new PostHog(token, {
      host:
        process.env.POSTHOG_PROJECT_HOST ?? "https://us.i.posthog.com",
      flushAt: 1,
      flushInterval: 0,
    });
  }
  return cached;
}

export async function shutdownPostHog(): Promise<void> {
  if (cached) {
    await cached.shutdown();
  }
}
