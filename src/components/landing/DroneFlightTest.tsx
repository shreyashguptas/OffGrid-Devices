"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

/**
 * DroneFlightTest — a small interactive "flight bay" that closes the home page.
 *
 * An empty instrument-bay surface with a line-art quadcopter that chases the
 * cursor with spring physics: it lags behind the pointer (mass + damping),
 * yaws to face its direction of travel, and spins its rotors. When the pointer
 * is idle or absent (touch devices), it flies an autonomous drifting path so
 * there's always something in motion. Purely decorative — hidden from the a11y
 * tree — and fully disabled under prefers-reduced-motion.
 *
 * Brand: quiet chrome, hairline survey-corner brackets (the instrument/motion
 * motif), zero-radius body, and a single Ember accent (the front nav light).
 */
export function DroneFlightTest() {
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [engaged, setEngaged] = useState(false);

  // Goal the craft chases (offset in px from the bay's center). The springs
  // below trail this value, which is what gives the motion its weight.
  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const x = useSpring(targetX, { stiffness: 90, damping: 15, mass: 1.25 });
  const y = useSpring(targetY, { stiffness: 90, damping: 15, mass: 1.25 });
  // Continuous (unwrapped) heading in degrees; eased toward travel direction.
  const heading = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;
    const el = containerRef.current;
    if (!el) return;

    const pad = 60; // keep the whole craft inside the bay
    let half = { w: el.clientWidth / 2, h: el.clientHeight / 2 };
    let lastPointer = -100000;
    let raf = 0;
    const start = performance.now();

    const ro = new ResizeObserver(() => {
      half = { w: el.clientWidth / 2, h: el.clientHeight / 2 };
    });
    ro.observe(el);

    const clamp = (v: number, m: number) => (m <= 0 ? 0 : Math.max(-m, Math.min(m, v)));

    const onPointerMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      targetX.set(clamp(event.clientX - rect.left - rect.width / 2, half.w - pad));
      targetY.set(clamp(event.clientY - rect.top - rect.height / 2, half.h - pad));
      lastPointer = performance.now();
      setEngaged(true);
    };
    el.addEventListener("pointermove", onPointerMove);

    const tick = (now: number) => {
      // Autonomous drift whenever the pointer hasn't moved recently.
      if (now - lastPointer > 1500) {
        const t = now - start;
        const ampX = Math.max(0, half.w - pad);
        const ampY = Math.max(0, half.h - pad);
        const nx =
          Math.sin(t * 0.00046) * ampX * 0.82 + Math.sin(t * 0.0011) * ampX * 0.15;
        const ny =
          Math.sin(t * 0.00069 + 1.3) * ampY * 0.7 +
          Math.cos(t * 0.00037) * ampY * 0.22;
        targetX.set(clamp(nx, half.w - pad));
        targetY.set(clamp(ny, half.h - pad));
      }

      // Yaw toward the current travel direction (front nav light leads),
      // smoothing across the ±180° wrap so it never spins the long way.
      const vx = x.getVelocity();
      const vy = y.getVelocity();
      if (Math.hypot(vx, vy) > 45) {
        const desired = (Math.atan2(vy, vx) * 180) / Math.PI + 90;
        const cur = heading.get();
        const delta = ((desired - cur + 540) % 360) - 180;
        heading.set(cur + delta * 0.18);
      }

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      el.removeEventListener("pointermove", onPointerMove);
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [reduceMotion, targetX, targetY, x, y, heading]);

  return (
    <section className="relative border-t border-bark/40 bg-pitch">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div
          ref={containerRef}
          aria-hidden
          className="relative h-72 w-full overflow-hidden md:h-96"
        >
          <Brackets />

          {/* faint center reticle */}
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-px w-8 -translate-x-1/2 -translate-y-1/2 bg-sand/15" />
          <span className="pointer-events-none absolute left-1/2 top-1/2 h-8 w-px -translate-x-1/2 -translate-y-1/2 bg-sand/15" />

          {/* the craft */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -ml-[52px] -mt-[52px] h-[104px] w-[104px]"
            style={reduceMotion ? undefined : { x, y, rotate: heading }}
          >
            <motion.div
              className="h-full w-full"
              animate={reduceMotion ? undefined : { y: [-2.5, 2.5, -2.5] }}
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 3.2, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <DroneCraft spin={!reduceMotion} />
            </motion.div>
          </motion.div>

          {/* discoverability hint, fades once the craft is being flown */}
          <motion.p
            initial={false}
            animate={{ opacity: engaged ? 0 : 1 }}
            transition={{ duration: 0.5 }}
            className="type-mono-label pointer-events-none absolute inset-x-0 bottom-3 text-center text-sand/40"
          >
            Move your cursor — it follows.
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function Brackets() {
  const base = "pointer-events-none absolute h-5 w-5 border-sand/30";
  return (
    <>
      <span className={`${base} left-0 top-0 border-l border-t`} />
      <span className={`${base} right-0 top-0 border-r border-t`} />
      <span className={`${base} bottom-0 left-0 border-b border-l`} />
      <span className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

/** Top-down line-art quadcopter, drawn from CSS so the rotors spin cheaply. */
function DroneCraft({ spin }: { spin: boolean }) {
  return (
    <div className="relative h-[104px] w-[104px]">
      {/* arms — an X joining opposite rotors */}
      <span className="absolute left-1/2 top-1/2 h-[2px] w-[92px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-sand/40" />
      <span className="absolute left-1/2 top-1/2 h-[2px] w-[92px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-sand/40" />

      <Rotor className="left-0 top-0" spin={spin} />
      <Rotor className="right-0 top-0" spin={spin} />
      <Rotor className="bottom-0 left-0" spin={spin} />
      <Rotor className="bottom-0 right-0" spin={spin} />

      {/* body */}
      <span className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 border border-bone/60 bg-pitch" />
      <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 bg-sand/55" />

      {/* front nav light — the single Ember accent, marks the "front" */}
      <span className="absolute left-1/2 top-[3px] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ember" />
    </div>
  );
}

function Rotor({ className, spin }: { className: string; spin: boolean }) {
  return (
    <div className={`absolute h-9 w-9 ${className}`}>
      <span className="absolute inset-0 rounded-full border border-dashed border-sand/35" />
      <motion.div
        className="absolute inset-0"
        animate={spin ? { rotate: 360 } : undefined}
        transition={
          spin ? { duration: 0.45, ease: "linear", repeat: Infinity } : undefined
        }
      >
        <span className="absolute left-1/2 top-1/2 h-[2px] w-7 -translate-x-1/2 -translate-y-1/2 bg-bone/55" />
        <span className="absolute left-1/2 top-1/2 h-7 w-[2px] -translate-x-1/2 -translate-y-1/2 bg-bone/55" />
      </motion.div>
    </div>
  );
}
