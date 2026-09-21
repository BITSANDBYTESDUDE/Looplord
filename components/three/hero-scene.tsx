"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Particles } from "@/components/three/particles";
import { Robot } from "@/components/three/robot";
import { useIsTouchDevice } from "@/hooks/use-media-query";

interface HeroSceneProps {
  active: boolean;
}

/**
 * The hero's WebGL layer — particle nebula + the Loop Lord robot.
 * Unmounts while the hero is scrolled out of view to keep the GPU free.
 */
export default function HeroScene({ active }: HeroSceneProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [entered, setEntered] = useState(false);
  const lite = useIsTouchDevice();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.02 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (active) {
      const t = window.setTimeout(() => setEntered(true), 60);
      return () => window.clearTimeout(t);
    }
  }, [active]);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-[1400ms] ${
        entered ? "opacity-100" : "opacity-0"
      }`}
    >
      {visible && (
        <Canvas
          dpr={[1, 1.75]}
          camera={{ position: [0, 0.5, 6.2], fov: 38 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.42} />
          <hemisphereLight intensity={0.32} color="#BFD4FF" groundColor="#0B0B10" />
          <directionalLight position={[5, 7, 4]} intensity={1.5} />
          <pointLight position={[-5, 2.5, 2.5]} intensity={30} distance={18} color="#3B82F6" />
          <pointLight position={[4, -1, 3]} intensity={16} distance={14} color="#06B6D4" />
          <Suspense fallback={null}>
            <Particles lite={lite} />
            <Robot active={active} mode="hero" />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
