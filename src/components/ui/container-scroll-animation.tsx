"use client";

import React, { useRef } from "react";
import {
  useReducedMotion,
  useTransform,
  motion,
  type MotionValue,
} from "framer-motion";
import { useSectionScrollProgress } from "@/lib/use-section-scroll-progress";

export const ContainerScroll = ({
  titleComponent,
  footerComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  footerComponent?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useSectionScrollProgress(containerRef, "end-start");
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.88, 1] : [1.02, 1];
  };

  const rotate = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [0, 0] : [20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.45], scaleDimensions());
  const translate = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [0, 0] : [0, -72],
  );
  const footerTranslate = useTransform(
    scrollYProgress,
    [0, 0.45],
    prefersReducedMotion ? [0, 0] : isMobile ? [24, 0] : [34, 0],
  );

  return (
    <div
      className="relative flex items-start justify-center px-2 pt-8 pb-8 md:px-10 md:pt-10 md:pb-10"
      ref={containerRef}
    >
      <div
        className="relative w-full"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
        {footerComponent ? (
          <Footer translate={footerTranslate}>{footerComponent}</Footer>
        ) : null}
      </div>
    </div>
  );
};

const Header = ({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="mx-auto max-w-5xl text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformPerspective: 1000,
        boxShadow:
          "0 0 #0000002d, 0 10px 24px #0000001f, 0 36px 40px #0000001a, 0 80px 64px #00000012, 0 0 80px rgba(29,29,31,0.08)",
      }}
      className="relative z-10 mx-auto mt-8 h-[14rem] w-full max-w-5xl rounded-[30px] border-[10px] border-[#1f1f22] bg-[#1f1f22] p-2 sm:h-[18rem] md:h-[30rem] md:rounded-[38px] md:border-[12px] md:p-4"
    >
      <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[#f3f4f7] md:rounded-[28px]">
        <div className="absolute left-1/2 top-3 z-20 h-2.5 w-24 -translate-x-1/2 rounded-full bg-black/80 md:top-4 md:h-3 md:w-28" />
        {children}
      </div>
    </motion.div>
  );
};

const Footer = ({
  translate,
  children,
}: {
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="relative z-20 mt-6 flex justify-center md:mt-7"
    >
      {children}
    </motion.div>
  );
};
