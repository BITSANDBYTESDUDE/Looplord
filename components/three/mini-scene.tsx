"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Robot } from "@/components/three/robot";
import { useIsTouchDevice } from "@/hooks/use-media-query";
import { Particles } from "@/components/three/particles";

/**
 * Companion robot for the contact section — mounted lazily as the
 * section approaches the viewport, then waves on a cheerful loop.
 */
export default function MiniScene() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const lite = useIsTouchDevice();

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden
      className={`absolute inset-x-0 bottom-0 top-24 transition-opacity duration-1000 sm:inset-y-0 sm:left-1/2 sm:right-0 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {ready && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.6, 4.9], fov: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        >
          <ambientLight intensity={0.5} />
          <hemisphereLight intensity={0.3} color="#BFD4FF" groundColor="#0B0B10" />
          <directionalLight position={[4, 6, 4]} intensity={1.4} />
          <pointLight position={[-4, 2, 3]} intensity={24} distance={16} color="#3B82F6" />
          <Suspense fallback={null}>
            <Particles lite />
            <Robot mode="mini" position={[0, -1.85, 0]} scale={0.92} />
          </Suspense>
        </Canvas>
      )}
    </div>
  );
}
