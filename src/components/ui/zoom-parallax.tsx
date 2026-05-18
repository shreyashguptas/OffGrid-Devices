"use client";

import { useScroll, useTransform, motion, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

interface ParallaxImage {
  src: string;
  alt?: string;
}

type Layout = {
  scale: number;
  top?: string;
  left?: string;
  height: string;
  width: string;
};

const DEFAULT_HEIGHT = "25vh";
const DEFAULT_WIDTH = "25vw";

// Per-slot rest-frame position/size and end-of-scroll scale. Slot 0 is the
// centered hero frame; the rest are arranged around it. ZoomParallax silently
// caps its `images` prop at LAYOUTS.length, so callers can pass fewer but
// extra entries are dropped.
const LAYOUTS: readonly Layout[] = [
  { scale: 4, height: DEFAULT_HEIGHT, width: DEFAULT_WIDTH },
  { scale: 5, top: "-30vh", left: "5vw", height: "30vh", width: "35vw" },
  { scale: 6, top: "-10vh", left: "-25vw", height: "45vh", width: "20vw" },
  { scale: 5, left: "27.5vw", height: "25vh", width: "25vw" },
  { scale: 6, top: "27.5vh", left: "5vw", height: "25vh", width: "20vw" },
  { scale: 8, top: "27.5vh", left: "-22.5vw", height: "25vh", width: "30vw" },
  { scale: 9, top: "22.5vh", left: "25vw", height: "15vh", width: "15vw" },
];

interface ZoomParallaxProps {
  images: ParallaxImage[];
}

export function ZoomParallax({ images }: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const slots = images.slice(0, LAYOUTS.length);

  return (
    <div ref={container} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        {slots.map((image, i) => (
          <ZoomLayer
            key={i}
            image={image}
            layout={LAYOUTS[i]}
            scrollYProgress={scrollYProgress}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}

function ZoomLayer({
  image,
  layout,
  scrollYProgress,
  index,
}: {
  image: ParallaxImage;
  layout: Layout;
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, layout.scale]);

  return (
    <motion.div
      style={{ scale }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative"
        style={{
          top: layout.top,
          left: layout.left,
          height: layout.height,
          width: layout.width,
        }}
      >
        <Image
          src={image.src}
          alt={image.alt ?? `Parallax image ${index + 1}`}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover"
          priority={index === 0}
        />
      </div>
    </motion.div>
  );
}
