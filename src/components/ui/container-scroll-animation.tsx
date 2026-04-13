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
    return isMobile ? [0.72, 0.9] : [1.02, 1];
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
      className="relative flex h-[48rem] items-center justify-center p-2 pt-24 sm:h-[52rem] md:h-[80rem] md:p-20 md:pt-20"
      ref={containerRef}
    >
      <div
        className="relative w-full py-10 md:py-24"
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
      className="relative z-10 mx-auto max-w-5xl pb-10 text-center"
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
      className="mx-auto h-[20rem] w-full max-w-5xl rounded-[24px] border-2 border-border-subtle bg-surface p-2 sm:h-[26rem] md:h-[40rem] md:rounded-[30px] md:p-6"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-background md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
}
