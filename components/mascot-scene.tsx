"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import type * as THREE from "three";

function Robot({ cursor }: { cursor: { x: number; y: number } }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y += (cursor.x * 0.4 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (cursor.y * 0.2 - group.current.rotation.x) * 0.05;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.8, 0.6]} />
        <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.7, 0.65, 0.55]} />
        <meshStandardMaterial color="#111827" metalness={0.75} roughness={0.25} />
      </mesh>
      <mesh position={[-0.2, 0.75, 0.28]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={1.3} />
      </mesh>
      <mesh position={[0.2, 0.75, 0.28]}>
        <sphereGeometry args={[0.06, 24, 24]} />
        <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1.3} />
      </mesh>
      <mesh position={[-0.65, 0.05, 0]} rotation={[0, 0, 0.4]}>
        <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[0.65, 0.05, 0]} rotation={[0, 0, -0.4]}>
        <capsuleGeometry args={[0.13, 0.6, 8, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.6} roughness={0.35} />
      </mesh>
      <mesh position={[-0.25, -0.75, 0]}>
        <capsuleGeometry args={[0.15, 0.65, 8, 16]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>
      <mesh position={[0.25, -0.75, 0]}>
        <capsuleGeometry args={[0.15, 0.65, 8, 16]} />
        <meshStandardMaterial color="#111827" metalness={0.7} roughness={0.25} />
      </mesh>
    </group>
  );
}

export function MascotScene({ cursor }: { cursor: { x: number; y: number } }) {
  const dpr = useMemo(() => [1, 1.5] as [number, number], []);

  return (
    <Canvas dpr={dpr} camera={{ position: [0, 0.4, 3.2], fov: 45 }} shadows>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 3, 3]} intensity={1.5} castShadow />
      <Suspense fallback={null}>
        <Float speed={1.8} rotationIntensity={0.45} floatIntensity={0.7}>
          <Robot cursor={cursor} />
        </Float>
        <Environment preset="city" />
      </Suspense>
    </Canvas>
  );
}
