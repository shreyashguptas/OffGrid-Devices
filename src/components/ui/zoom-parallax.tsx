"use client";

import { motion, useMotionTemplate, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { useSectionScrollProgress } from "@/lib/use-section-scroll-progress";
import { cn } from "@/lib/utils";

interface ZoomParallaxImage {
  src: string;
  alt?: string;
  label?: string;
}

interface ZoomParallaxProps {
  images: ZoomParallaxImage[];
  className?: string;
}

const framePositions = [
  "",
  "[&>div]:!-top-[22vh] [&>div]:!left-[8vw] [&>div]:!h-[18vh] [&>div]:!w-[44vw] md:[&>div]:!-top-[30vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[30vh] md:[&>div]:!w-[35vw]",
  "[&>div]:!-top-[10vh] [&>div]:!-left-[20vw] [&>div]:!h-[24vh] [&>div]:!w-[28vw] md:[&>div]:!-top-[10vh] md:[&>div]:!-left-[25vw] md:[&>div]:!h-[45vh] md:[&>div]:!w-[20vw]",
  "[&>div]:!top-[4vh] [&>div]:!left-[18vw] [&>div]:!h-[16vh] [&>div]:!w-[38vw] md:[&>div]:!top-0 md:[&>div]:!left-[27.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[25vw]",
  "[&>div]:!top-[26vh] [&>div]:!left-[8vw] [&>div]:!h-[16vh] [&>div]:!w-[30vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!left-[5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[20vw]",
  "[&>div]:!top-[25vh] [&>div]:!-left-[18vw] [&>div]:!h-[18vh] [&>div]:!w-[40vw] md:[&>div]:!top-[27.5vh] md:[&>div]:!-left-[22.5vw] md:[&>div]:!h-[25vh] md:[&>div]:!w-[30vw]",
  "[&>div]:!top-[20vh] [&>div]:!left-[26vw] [&>div]:!h-[12vh] [&>div]:!w-[24vw] md:[&>div]:!top-[22.5vh] md:[&>div]:!left-[25vw] md:[&>div]:!h-[15vh] md:[&>div]:!w-[15vw]",
] as const;

export function ZoomParallax({ images, className }: ZoomParallaxProps) {
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileScrollYProgress = useSectionScrollProgress(
    mobileContainerRef,
    "end-end",
  );
  const scrollYProgress = useSectionScrollProgress(containerRef, "end-end");
  const mobileImages = images.slice(0, 3);
  const mobileLeadImage = mobileImages[2] ?? mobileImages[0];
  const mobileSupportImages = mobileImages.slice(0, 2);

  const mobileLeadScale = useTransform(
    mobileScrollYProgress,
    [0, 0.45, 1],
    [0.88, 1.02, 1.12],
  );
  const mobileLeadWidth = useTransform(
    mobileScrollYProgress,
    [0, 0.45, 1],
    [62, 80, 94],
  );
  const mobileLeadWidthStyle = useMotionTemplate`${mobileLeadWidth}vw`;
  const mobileLeadOpacity = useTransform(
    mobileScrollYProgress,
    [0, 0.2, 0.35],
    [0.2, 0.75, 1],
  );
  const mobileLeadY = useTransform(
    mobileScrollYProgress,
    [0, 0.45, 1],
    [44, 0, -12],
  );
  const mobileSupportLeftOpacity = useTransform(
    mobileScrollYProgress,
    [0, 0.28, 0.48],
    [1, 1, 0],
  );
  const mobileSupportLeftScale = useTransform(
    mobileScrollYProgress,
    [0, 0.38],
    [0.94, 1.06],
  );
  const mobileSupportLeftY = useTransform(
    mobileScrollYProgress,
    [0, 0.48],
    [0, -34],
  );
  const mobileSupportRightOpacity = useTransform(
    mobileScrollYProgress,
    [0.08, 0.34, 0.56],
    [0, 1, 0],
  );
  const mobileSupportRightScale = useTransform(
    mobileScrollYProgress,
    [0.08, 0.46],
    [0.92, 1.08],
  );
  const mobileSupportRightY = useTransform(
    mobileScrollYProgress,
    [0.08, 0.56],
    [24, -28],
  );

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const scales = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  return (
    <div className={className}>
      <div ref={mobileContainerRef} className="relative h-[185vh] md:hidden">
        <div className="sticky top-0 h-screen overflow-hidden px-6 py-6">
          <div className="relative flex h-full items-center justify-center">
            {mobileSupportImages[0] ? (
              <motion.div
                style={{
                  opacity: mobileSupportLeftOpacity,
                  scale: mobileSupportLeftScale,
                  y: mobileSupportLeftY,
                }}
                className="absolute left-0 top-[16vh] w-[43vw]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <ParallaxTile {...mobileSupportImages[0]} />
                </div>
              </motion.div>
            ) : null}

            {mobileSupportImages[1] ? (
              <motion.div
                style={{
                  opacity: mobileSupportRightOpacity,
                  scale: mobileSupportRightScale,
                  y: mobileSupportRightY,
                }}
                className="absolute bottom-[18vh] right-0 w-[48vw]"
              >
                <div className="relative aspect-[4/5] w-full">
                  <ParallaxTile {...mobileSupportImages[1]} />
                </div>
              </motion.div>
            ) : null}

            {mobileLeadImage ? (
              <motion.div
                style={{
                  width: mobileLeadWidthStyle,
                  opacity: mobileLeadOpacity,
                  scale: mobileLeadScale,
                  y: mobileLeadY,
                }}
                className="relative z-10 max-w-none will-change-transform"
              >
                <div className="relative aspect-[4/5] w-full">
                  <ParallaxTile {...mobileLeadImage} />
                </div>
              </motion.div>
            ) : null}
          </div>
        </div>
      </div>

      <div ref={containerRef} className="relative hidden h-[300vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden">
          {images.map((image, index) => (
            <motion.div
              key={image.src}
              style={{ scale: scales[index % scales.length] }}
              className={cn(
                "absolute top-0 flex h-full w-full items-center justify-center",
                framePositions[index % framePositions.length],
              )}
            >
              <div className="relative h-[25vh] w-[25vw]">
                <ParallaxTile {...image} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ParallaxTile({
  src,
  alt,
  label,
}: {
  src: string;
  alt?: string;
  label?: string;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] border border-border-card bg-surface shadow-[0_18px_48px_rgba(29,29,31,0.12)]">
      {hasError ? (
        <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(180deg,#ffffff_0%,#f5f5f7_100%)] p-5 text-left">
          <div className="rounded-full border border-dashed border-border-emphasis bg-surface-elevated px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
            Image placeholder
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-foreground">
              {label ?? "Drop image here"}
            </p>
            <p className="mt-2 break-all text-sm leading-relaxed text-muted-light">
              {src}
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt ?? label ?? "Zoom parallax image"}
          fill
          sizes="(max-width: 768px) 94vw, 25vw"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
      {!hasError ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent p-4">
          <p className="text-sm font-medium text-white/95">{label}</p>
        </div>
      ) : null}
    </div>
  );
}
