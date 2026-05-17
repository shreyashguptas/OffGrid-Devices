"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, useGLTF, useProgress } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/beacon-2/models/beacon-2.glb";

function BeaconModel() {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const gltf = useGLTF(MODEL_PATH);

  // Center the model at origin and uniform-scale into a ~3.4 unit box
  // so the camera framing is independent of source-file units (mm vs m).
  const { scene, offset, scale } = useMemo(() => {
    const cloned = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const sizeVec = new THREE.Vector3();
    box.getSize(sizeVec);
    const maxDim = Math.max(sizeVec.x, sizeVec.y, sizeVec.z) || 1;
    const fit = 3.4 / maxDim;

    // Slightly tame harshly metallic / glossy materials so the device
    // reads as the matte production print, not as a chrome render.
    cloned.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mats = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];
      mats.forEach((m) => {
        const std = m as THREE.MeshStandardMaterial;
        if (std && "roughness" in std) {
          std.roughness = Math.max(std.roughness ?? 0.5, 0.55);
          std.envMapIntensity = 0.6;
        }
      });
    });

    return { scene: cloned, offset: center.multiplyScalar(-1), scale: fit };
  }, [gltf.scene]);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const nx = (event.clientX / size.width) * 2 - 1;
      const ny = (event.clientY / size.height) * 2 - 1;
      targetRotation.current.y = nx * Math.PI * 0.75;
      targetRotation.current.x = THREE.MathUtils.clamp(ny * 0.45, -0.55, 0.55);
    };
    const handlePointerLeave = () => {
      targetRotation.current.x = 0;
    };
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [size.width, size.height]);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const g = groupRef.current;
    g.rotation.y = THREE.MathUtils.lerp(
      g.rotation.y,
      targetRotation.current.y,
      0.08,
    );
    g.rotation.x = THREE.MathUtils.lerp(
      g.rotation.x,
      targetRotation.current.x,
      0.08,
    );
    // Slow idle drift so the device is always alive, even before cursor moves.
    g.rotation.y += delta * 0.12;
    if (g.rotation.y > Math.PI) g.rotation.y -= Math.PI * 2;
    if (g.rotation.y < -Math.PI) g.rotation.y += Math.PI * 2;
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
  return (
    <div className={`relative h-full w-full ${className ?? ""}`}>
      <Canvas
        camera={{ position: [0, 0.4, 6], fov: 32 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.45} />
        {/* Warm key — pulls Ember across the device front */}
        <directionalLight position={[4, 5, 6]} intensity={1.6} color="#F3A56A" />
        {/* Cool fill — moonlight against the warm hero gradient */}
        <directionalLight position={[-5, 2, -3]} intensity={0.6} color="#A9B4C2" />
        {/* Bone rim — separates the dark silhouette from the dark background */}
        <directionalLight position={[0, 3, -5]} intensity={0.9} color="#F1ECE0" />
        <Suspense fallback={null}>
          <Environment preset="warehouse" environmentIntensity={0.3} />
          <BeaconModel />
        </Suspense>
      </Canvas>
      <LoadingOverlay />
    </div>
  );
}
