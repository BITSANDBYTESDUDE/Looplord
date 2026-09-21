"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const springX = useSpring(x, { damping: 30, stiffness: 350 });
  const springY = useSpring(y, { damping: 30, stiffness: 350 });

  useEffect(() => {
    const onMove = (event: MouseEvent) => {
      x.set(event.clientX - 10);
      y.set(event.clientY - 10);
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full border border-cyan-300/80 bg-cyan-300/20 backdrop-blur-sm md:block"
      style={{ x: springX, y: springY }}
    />
  );
}
