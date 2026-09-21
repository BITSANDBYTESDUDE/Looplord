"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

let lenisInstance: Lenis | null = null;

/** Smoothly scroll to a selector or element, navbar-aware. */
export function scrollToTarget(target: string | HTMLElement) {
  const el =
    typeof target === "string" ? document.querySelector(target) : target;
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el as HTMLElement, {
      offset: -72,
      duration: 1.4,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}

export function SmoothScroll() {
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisInstance = null;
    };
  }, [reducedMotion]);

  return null;
}
