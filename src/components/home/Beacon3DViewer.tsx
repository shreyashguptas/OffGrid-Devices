"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/beacon-2/models/beacon-2.glb";

// Comfortable rotation envelope. Tight enough to feel premium (no spinning),
// wide enough to clearly show the device's depth as the cursor moves.
const MAX_Y_ROTATION = 0.45; // ~26°
const MAX_X_ROTATION = 0.18; // ~10°

// Response stiffness for the FPS-independent damping. Higher = snappier.
// ~12 lands around 80 ms half-life — smooth without feeling laggy.
const ROTATION_STIFFNESS = 12;

// Fraction of the canvas height the model occupies at rest. Generous
// breathing room so the device — including the antenna and any extreme
// rotated pose — never clips the canvas edges.
const FIT_RATIO = 0.68;

type RotationTarget = { x: number; y: number };

function BeaconModel({
  targetRef,
}: {
  targetRef: MutableRefObject<RotationTarget>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const gltf = useGLTF(MODEL_PATH);

  // Center on origin and uniform-scale into a canvas-relative box. We never
  // mutate the GLB's source materials — colors/finish come straight from the
  // CAD export so the render matches the production print.
  const { scene, offset, scale } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    // 3.2 units = the visible height at z=0 with our camera (fov 32, z=6).
    // Multiplying by FIT_RATIO leaves the rest as transparent margin so the
    // device floats in space and rotation never clips the canvas edges.
    const fit = (3.2 * FIT_RATIO) / maxDim;

    return { scene: cloned, offset: center.multiplyScalar(-1), scale: fit };
  }, [gltf.scene]);

  // FPS-independent damping: regardless of monitor refresh rate, the response
  // time to a target is consistent. No idle drift — when the cursor is still,
  // the device is still.
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    const alpha = 1 - Math.exp(-ROTATION_STIFFNESS * delta);
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, targetRef.current.y, alpha);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, targetRef.current.x, alpha);
  });

  return (
    <group ref={groupRef} scale={scale}>
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
  const targetRef = useRef<RotationTarget>({ x: 0, y: 0 });

  useEffect(() => {
    // Normalize cursor against the *viewport*, not the canvas. The previous
    // bug used canvas size for clientX, which yielded values past ±1 whenever
    // the cursor was outside the canvas — producing huge rotation targets
    // that, combined with idle drift, looked like uncontrolled spinning.
    const handleMove = (event: PointerEvent) => {
      const nx = (event.clientX / window.innerWidth) * 2 - 1; // -1..1
      const ny = (event.clientY / window.innerHeight) * 2 - 1; // -1..1
      targetRef.current.y = THREE.MathUtils.clamp(nx, -1, 1) * MAX_Y_ROTATION;
      targetRef.current.x =
        -THREE.MathUtils.clamp(ny, -1, 1) * MAX_X_ROTATION;
    };

    // Cursor leaves the window → smoothly return to neutral pose. The damping
    // loop will glide back to zero; nothing snaps.
    const handleLeave = () => {
      targetRef.current.x = 0;
      targetRef.current.y = 0;
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

  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
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
          <BeaconModel targetRef={targetRef} />
        </Suspense>
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}
