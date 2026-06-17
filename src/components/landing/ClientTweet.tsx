"use client";

import {
  EmbeddedTweet,
  TweetNotFound,
  TweetSkeleton,
  useTweet,
} from "react-tweet";

/**
 * Client-side tweet embed.
 *
 * Why this exists instead of react-tweet's server `<Tweet>` component:
 * the server component fetches the tweet ONCE, at build time, from the CI
 * build machine. X's public syndication CDN routinely blocks/rate-limits
 * requests coming from data-center IPs (CI runners, Cloudflare Workers), so
 * that single build-time fetch came back empty and the "Tweet not found"
 * card got frozen into the statically prerendered HTML for every visitor.
 *
 * `useTweet` instead fetches in the visitor's browser at view time, through
 * react-tweet's maintained public proxy (its default `apiUrl`). That fetch
 * does not originate from our build/Worker IP, so it isn't subject to the
 * same data-center block, and because it runs per view it self-heals — a
 * transient miss never gets baked in permanently.
 *
 * Note: we deliberately do NOT point `apiUrl` at a self-hosted /api/tweet
 * route. That route would run on Cloudflare Workers (also a data-center IP)
 * and would reproduce the exact block we're working around.
 *
 * Styling matches the server component: both render `EmbeddedTweet`, which
 * uses the `.react-tweet-theme` hooks already themed in globals.css.
 */
export function ClientTweet({ id }: { id: string }) {
  const { data, error, isLoading } = useTweet(id);

  if (isLoading) return <TweetSkeleton />;
  if (error || !data) return <TweetNotFound error={error} />;
  return <EmbeddedTweet tweet={data} />;
}
