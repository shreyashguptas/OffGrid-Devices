"use client";
import React, { useRef } from "react";
import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
  useReducedMotion,
} from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const compactViewportQuery = window.matchMedia("(max-width: 768px)");
    const checkMobile = () => setIsMobile(compactViewportQuery.matches);
    checkMobile();
    compactViewportQuery.addEventListener("change", checkMobile);
    return () => {
      compactViewportQuery.removeEventListener("change", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [0, 0] : [20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.4], scaleDimensions());
  const translate = useTransform(
    scrollYProgress,
    [0, 0.4],
    prefersReducedMotion ? [0, 0] : [0, -100],
  );

  return (
    <div
      className="h-[48rem] sm:h-[52rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20 pt-24 md:pt-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-32 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center relative z-10 pb-12"
    >
      {titleComponent}
    </motion.div>
  );
}

function Card({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow: "var(--app-hero-card-shadow)",
      }}
      className="max-w-5xl mx-auto h-[20rem] sm:h-[26rem] md:h-[40rem] w-full border-2 border-border-subtle p-2 md:p-6 bg-surface rounded-[24px] md:rounded-[30px]"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-background md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}
