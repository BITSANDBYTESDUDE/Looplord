"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { pointer } from "@/lib/pointer";

interface ParticleFieldProps {
  count: number;
  color: string;
  size: number;
  speed: number;
  spread: [number, number, number];
  offset?: [number, number, number];
}

function ParticleField({
  count,
  color,
  size,
  speed,
  spread,
  offset = [0, 0, 0],
}: ParticleFieldProps) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const [sx, sy, sz] = spread;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * sx;
      arr[i * 3 + 1] = (Math.random() - 0.5) * sy;
      arr[i * 3 + 2] = (Math.random() - 0.5) * sz;
    }
    return arr;
  }, [count, spread]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * speed;
    // Subtle drift toward the pointer — the whole field breathes with you.
    ref.current.rotation.x = THREE.MathUtils.damp(
      ref.current.rotation.x,
      pointer.y * 0.06,
      2,
      delta
    );
  });

  return (
    <points ref={ref} position={offset}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={size}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function Particles({ lite = false }: { lite?: boolean }) {
  return (
    <group>
      <ParticleField
        count={lite ? 500 : 1400}
        color="#60A5FA"
        size={0.022}
        speed={0.014}
        spread={[16, 9, 6]}
      />
      <ParticleField
        count={lite ? 260 : 700}
        color="#22D3EE"
        size={0.03}
        speed={-0.01}
        spread={[12, 7, 4]}
        offset={[0, 0.5, -1]}
      />
      <Sparkles
        count={lite ? 40 : 90}
        color="#7DD3FC"
        size={2.4}
        speed={0.32}
        opacity={0.55}
        scale={[12, 6.5, 4]}
      />
    </group>
  );
}
