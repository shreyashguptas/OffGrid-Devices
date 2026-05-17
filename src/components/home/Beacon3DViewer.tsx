"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { MutableRefObject, ReactNode } from "react";
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
  // True when the OS reports prefers-reduced-motion. Locks the device in
  // its rest pose; explicit drag/pinch still work as user-initiated actions.
  reducedMotion: boolean;
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

  // Dispose of clone-owned geometries on unmount. Materials and textures
  // are shared with the cached gltf root (which drei reuses), so we only
  // drop what clone(true) actually duplicated.
  useEffect(() => {
    return () => {
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.isMesh && mesh.geometry) mesh.geometry.dispose();
      });
    };
  }, [scene]);

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

// A GLB fetch failure or GL context loss should never take the whole page
// down with it — swallow the error, log it, and render nothing so the
// surrounding hero layout stays intact.
class ViewerErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.error("[Beacon3DViewer]", error);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export function Beacon3DViewer({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<ViewerState>({
    targetX: 0,
    targetY: 0,
    targetZoom: 1,
    isDragging: false,
    reducedMotion: false,
  });
  const [frameloop, setFrameloop] = useState<"always" | "demand">("always");

  // Respect prefers-reduced-motion: skip ambient cursor-tracking entirely.
  // The device stays in its rest pose unless the user explicitly grabs it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      stateRef.current.reducedMotion = mq.matches;
      if (mq.matches && !stateRef.current.isDragging) {
        stateRef.current.targetX = 0;
        stateRef.current.targetY = 0;
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Pause the render loop when the viewer scrolls out of view so the GPU
  // doesn't burn battery on a device the user can't see.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setFrameloop(entry.isIntersecting ? "always" : "demand"),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // MOUSE HOVER — gentle ambient pose-following across the entire viewport.
  // Suspends while the user is actively dragging the device so the manual
  // pose holds, and stays off entirely when prefers-reduced-motion is set.
  useEffect(() => {
    const handleMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const s = stateRef.current;
      if (s.isDragging || s.reducedMotion) return;
      const nx = (event.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (event.clientY / window.innerHeight) * 2 - 1; // -1..1
      // Cursor right → device looks right; cursor up → device looks up.
      s.targetY = THREE.MathUtils.clamp(nx, -1, 1) * HOVER_MAX_Y;
      s.targetX = THREE.MathUtils.clamp(ny, -1, 1) * HOVER_MAX_X;
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

  // GRAB + ZOOM — pointer-down on the canvas takes manual control. Drag
  // rotates 1:1; two-finger pinch and ⌘/Ctrl+wheel zoom; bare wheel events
  // pass through so the page can still scroll past the hero when the
  // cursor happens to be over it.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    type PointerInfo = { x: number; y: number; type: string };
    const pointers = new Map<number, PointerInfo>();
    let pinchStartDist = 0;
    let pinchStartZoom = 1;

    const setCursor = () => {
      container.style.cursor = pointers.size > 0 ? "grabbing" : "grab";
    };

    const releaseCapture = (id: number) => {
      try {
        if (container.hasPointerCapture(id)) {
          container.releasePointerCapture(id);
        }
      } catch {
        // Element may be detached during teardown; safe to ignore.
      }
    };

    const clearAll = () => {
      pointers.forEach((_, id) => releaseCapture(id));
      pointers.clear();
      pinchStartDist = 0;
      stateRef.current.isDragging = false;
      setCursor();
    };

    const handleDown = (event: PointerEvent) => {
      pointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
        type: event.pointerType,
      });
      stateRef.current.isDragging = true;
      setCursor();
      try {
        container.setPointerCapture(event.pointerId);
      } catch {
        // setPointerCapture can throw on fast multi-touch; the pointer
        // map is source of truth so tracking still works without it.
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
      releaseCapture(event.pointerId);
      // If only one pointer remains after a pinch, the next finger drop
      // needs a fresh baseline — reset distance so we don't reuse stale.
      if (pointers.size < 2) {
        pinchStartDist = 0;
      }
      if (pointers.size === 0) {
        stateRef.current.isDragging = false;
      }
      setCursor();
    };

    const handleWheel = (event: WheelEvent) => {
      // Only intercept when the user actually means to zoom: trackpad
      // pinch sets ctrlKey natively, mouse users hold ⌘/Ctrl, and the
      // mouse-wheel is fair game while a drag is in progress. Otherwise
      // let the wheel scroll the page — the hero can be full-width on
      // mobile/tablet so silently swallowing all wheel events strands
      // the user.
      const zoomIntent =
        event.ctrlKey || event.metaKey || stateRef.current.isDragging;
      if (!zoomIntent) return;
      event.preventDefault();
      stateRef.current.targetZoom = THREE.MathUtils.clamp(
        stateRef.current.targetZoom * Math.exp(-event.deltaY * WHEEL_SENS),
        MIN_ZOOM,
        MAX_ZOOM,
      );
    };

    // Document-level safety net: if pointer release fires outside the
    // container (drag carried into another window, system gesture, focus
    // loss), wipe in-flight state so we never get stuck in isDragging.
    const handleDocUp = (event: PointerEvent) => {
      if (pointers.has(event.pointerId)) handleUp(event);
    };
    const handleVisibility = () => {
      if (document.hidden) clearAll();
    };

    container.addEventListener("pointerdown", handleDown);
    container.addEventListener("pointermove", handleMove);
    container.addEventListener("pointerup", handleUp);
    container.addEventListener("pointercancel", handleUp);
    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("pointerup", handleDocUp);
    document.addEventListener("pointercancel", handleDocUp);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      container.removeEventListener("pointerdown", handleDown);
      container.removeEventListener("pointermove", handleMove);
      container.removeEventListener("pointerup", handleUp);
      container.removeEventListener("pointercancel", handleUp);
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("pointerup", handleDocUp);
      document.removeEventListener("pointercancel", handleDocUp);
      document.removeEventListener("visibilitychange", handleVisibility);
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
      <ViewerErrorBoundary>
        <Canvas
          camera={{ position: [0, 0.2, 6], fov: 32 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          frameloop={frameloop}
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
      </ViewerErrorBoundary>
    </div>
  );
}
