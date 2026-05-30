import { cn } from "@/lib/utils";

type StartPhotoPlaceholderProps = {
  caption: string;
  aspect?: "video" | "wide" | "square";
  className?: string;
};

const ASPECT_CLASS: Record<NonNullable<StartPhotoPlaceholderProps["aspect"]>, string> = {
  video: "aspect-[16/10]",
  wide: "aspect-[5/2]",
  square: "aspect-[4/3]",
};

export function StartPhotoPlaceholder({
  caption,
  aspect = "video",
  className,
}: StartPhotoPlaceholderProps) {
  return (
    <figure
      className={cn(
        "section-stage p-3 md:p-4",
        "print:hidden",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex w-full items-center justify-center overflow-hidden bg-surface-elevated",
          ASPECT_CLASS[aspect],
        )}
        aria-hidden="true"
      >
        <svg
          className="absolute inset-0 h-full w-full text-border-subtle"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <line
            x1="0"
            y1="0"
            x2="100%"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
          />
          <line
            x1="100%"
            y1="0"
            x2="0"
            y2="100%"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <span className="type-mono-label-sm relative inline-flex items-center gap-2 border border-border-card bg-surface px-3 py-1 text-muted">
          Photo
        </span>
      </div>
      <figcaption className="mt-3 px-2 text-center text-sm text-muted">
        {caption}
      </figcaption>
    </figure>
  );
}
