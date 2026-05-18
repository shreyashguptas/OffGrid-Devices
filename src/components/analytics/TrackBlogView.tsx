"use client";

import { useEffect } from "react";
import { trackBlogRead } from "@/lib/analytics";

export function TrackBlogView({ slug }: { slug: string }) {
  useEffect(() => {
    trackBlogRead(slug);
  }, [slug]);

  return null;
}
