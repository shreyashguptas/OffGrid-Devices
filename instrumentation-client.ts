import posthog from "posthog-js";

// instrumentation-client.ts runs before React hydrates, so the first
// pageview is captured even if the visitor never re-renders. Per PostHog's
// Next.js 15.3+ guidance this is the ONLY place we initialize posthog-js —
// no <PostHogProvider> on top of this, otherwise we'd double-init.
const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;

if (token) {
  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "/ingest",
    ui_host:
      process.env.NEXT_PUBLIC_POSTHOG_UI_HOST ?? "https://us.posthog.com",
    // Opts into PostHog's bundled defaults: App Router-aware pageview/
    // pageleave on history changes, web vitals, dead clicks, heatmaps,
    // and head-injected scripts.
    defaults: "2026-01-30",
    // Funnel JS exceptions into PostHog Error Tracking so they line up
    // with the session replay that produced them.
    capture_exceptions: true,
    // Only create person profiles after a posthog.identify() call —
    // keeps the pay-as-you-go MAU meter at zero for anonymous visitors
    // while still recording every event.
    person_profiles: "identified_only",
    // Respect the browser's Do Not Track signal so we don't need a
    // banner for the small minority of visitors who set it.
    respect_dnt: true,
    secure_cookie: process.env.NODE_ENV === "production",
    debug: process.env.NODE_ENV === "development",
  });
}
