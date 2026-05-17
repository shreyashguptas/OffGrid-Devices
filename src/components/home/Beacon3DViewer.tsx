"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/beacon-2/models/beacon-2.glb";

// Ambient hover envelope — gentle, premium pose-following that fires when
// the cursor floats around the page and no one is grabbing the device.
const HOVER_MAX_Y = 0.45; // ~26°
const HOVER_MAX_X = 0.18; // ~10°

// Active drag envelope — wide enough that users can spin the device around
// and inspect every face once they grab it with a mouse or finger.
const DRAG_MAX_Y = Math.PI; // ±180°
const DRAG_MAX_X = Math.PI * 0.45; // ~±81°

// Response stiffness for the FPS-independent damping. Higher = snappier.
const ROTATION_STIFFNESS = 14;

// Fraction of the canvas height the model occupies at rest. Generous
// breathing room so the device — including the antenna and any extreme
// rotated pose — never clips the canvas edges.
const FIT_RATIO = 0.68;

// Zoom range (in multiples of the rest-pose scale).
const MIN_ZOOM = 0.6;
const MAX_ZOOM = 2.2;

// Per-pixel sensitivities. Tuned so a half-screen drag covers the full
// rotation envelope and a single wheel tick is a perceptible zoom step.
const MOUSE_DRAG_SENS = 0.008;
const TOUCH_DRAG_SENS = 0.006;
const WHEEL_SENS = 0.0014;

type ViewerState = {
  targetX: number;
  targetY: number;
  targetZoom: number;
  // While true, ambient hover-tracking is suspended so the manual pose holds.
  isDragging: boolean;
};

function BeaconModel({
  stateRef,
}: {
  stateRef: MutableRefObject<ViewerState>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);
  const currentZoom = useRef(1);

  // Center on origin and uniform-scale into a canvas-relative box. We never
  // mutate the GLB's source materials — colors come straight from the CAD
  // export so the render matches the production print.
  const { scene, offset, baseScale } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    // 3.2 units = the visible height at z=0 with our camera (fov 32, z=6).
    // FIT_RATIO leaves margin so rotated poses don't clip the canvas edges.
    const fit = (3.2 * FIT_RATIO) / maxDim;
    return { scene: cloned, offset: center.multiplyScalar(-1), baseScale: fit };
  }, [gltf.scene]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const s = stateRef.current;
    const alpha = 1 - Math.exp(-ROTATION_STIFFNESS * delta);

    // Take the shortest path on Y so accumulated drag rotation doesn't
    // unwind visibly when the target jumps (e.g. after the user releases
    // a long drag and the hover handler resumes with a small target).
    let currentY = g.rotation.y;
    while (currentY - s.targetY > Math.PI) currentY -= Math.PI * 2;
    while (s.targetY - currentY > Math.PI) currentY += Math.PI * 2;
    g.rotation.y = THREE.MathUtils.lerp(currentY, s.targetY, alpha);

    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, s.targetX, alpha);

    currentZoom.current = THREE.MathUtils.lerp(
      currentZoom.current,
      s.targetZoom,
      alpha,
    );
    g.scale.setScalar(baseScale * currentZoom.current);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} position={offset.toArray()} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);

function LoadingOverlay() {
  const { active, progress } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
    >
      <span
        className="text-sand/60"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Loading device · {Math.round(progress)}%
      </span>
    </div>
  );
}

export function Beacon3DViewer({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ViewerState>({
    targetX: 0,
    targetY: 0,
    targetZoom: 1,
    isDragging: false,
  });

  // MOUSE HOVER — gentle ambient pose-following across the entire viewport.
  // Suspends while the user is actively dragging the device so the manual
  // pose holds.
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      if (stateRef.current.isDragging) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (event.clientY / window.innerHeight) * 2 - 1; // -1..1
      // Cursor right → device looks right; cursor up → device looks up.
      stateRef.current.targetY =
        THREE.MathUtils.clamp(nx, -1, 1) * HOVER_MAX_Y;
      stateRef.current.targetX =
        THREE.MathUtils.clamp(ny, -1, 1) * HOVER_MAX_X;
    };

    const handleLeave = () => {
      if (stateRef.current.isDragging) return;
      stateRef.current.targetX = 0;
      stateRef.current.targetY = 0;
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerleave", handleLeave);
    window.addEventListener("blur", handleLeave);
    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerleave", handleLeave);
      window.removeEventListener("blur", handleLeave);
    };
  }, []);

  // GRAB + ZOOM — pointer-down on the canvas takes manual control. While
  // any pointer is held, the model rotates 1:1 with drag delta inside the
  // wide envelope, and ambient hover is suspended. Two-finger pinch and
  // the mouse wheel adjust zoom.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    type PointerInfo = { x: number; y: number; type: string };
    const pointers = new Map<number, PointerInfo>();
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    const handleDown = (event: PointerEvent) => {
      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType,
      });
      stateRef.current.isDragging = true;
      container.style.cursor = "grabbing";
      try {
        container.setPointerCapture(event.pointerId);
      } catch {
        // setPointerCapture can throw on fast multi-touch; tracking still
        // works via the map without it.
      }
      if (pointers.size === 2) {
        const [a, b] = Array.from(pointers.values());
        pinchStartDist = Math.hypot(a.x - b.x, a.y - b.y);
        pinchStartZoom = stateRef.current.targetZoom;
      }
    };

    const handleMove = (event: PointerEvent) => {
      const prev = pointers.get(event.pointerId);
      if (!prev) return;
      const dx = event.clientX - prev.x;
      const dy = event.clientY - prev.y;
      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType,
      });

      if (pointers.size === 1) {
        const sens =
          prev.type === "mouse" ? MOUSE_DRAG_SENS : TOUCH_DRAG_SENS;
        stateRef.current.targetY = THREE.MathUtils.clamp(
          stateRef.current.targetY + dx * sens,
          -DRAG_MAX_Y,
          DRAG_MAX_Y,
        );
        // Drag down → device looks down (matches the mouse-hover mapping).
        stateRef.current.targetX = THREE.MathUtils.clamp(
          stateRef.current.targetX + dy * sens,
          -DRAG_MAX_X,
          DRAG_MAX_X,
        );
      } else if (pointers.size === 2 && pinchStartDist > 0) {
        const [a, b] = Array.from(pointers.values());
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const ratio = dist / pinchStartDist;
        stateRef.current.targetZoom = THREE.MathUtils.clamp(
          pinchStartZoom * ratio,
          MIN_ZOOM,
          MAX_ZOOM,
        );
      }
    };

    const handleUp = (event: PointerEvent) => {
      pointers.delete(event.pointerId);
      if (container.hasPointerCapture(event.pointerId)) {
        container.releasePointerCapture(event.pointerId);
      }
      if (pointers.size < 2) {
        pinchStartDist = 0;
      }
      if (pointers.size === 0) {
        stateRef.current.isDragging = false;
        container.style.cursor = "grab";
      }
    };

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      stateRef.current.targetZoom = THREE.MathUtils.clamp(
        stateRef.current.targetZoom * Math.exp(-event.deltaY * WHEEL_SENS),
        MIN_ZOOM,
        MAX_ZOOM,
      );
    };

    container.addEventListener("pointerdown", handleDown);
    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerup", handleUp);
    container.addEventListener("pointercancel", handleUp);
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("pointerdown", handleDown);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerup", handleUp);
      container.removeEventListener("pointercancel", handleUp);
      container.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-full w-full select-none ${className ?? ""}`}
      style={{
        // Vertical scroll passes through so mobile users can scroll past
        // the hero; horizontal drags and two-finger pinch are handled by us.
        touchAction: "pan-y",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        cursor: "grab",
      }}
    >
      <Canvas
        camera={{ position: [0, 0.2, 6], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        {/* Warm key — pulls Ember across the device front */}
        <directionalLight position={[4, 5, 6]} intensity={1.4} color="#F3A56A" />
        {/* Cool fill — moonlight against the warm hero gradient */}
        <directionalLight position={[-5, 2, -3]} intensity={0.55} color="#A9B4C2" />
        {/* Bone rim — separates the dark silhouette from the dark background */}
        <directionalLight position={[0, 3, -5]} intensity={0.8} color="#F1ECE0" />
        <Suspense fallback={null}>
          <Environment preset="warehouse" environmentIntensity={0.25} />
          <BeaconModel stateRef={stateRef} />
        </Suspense>
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}
