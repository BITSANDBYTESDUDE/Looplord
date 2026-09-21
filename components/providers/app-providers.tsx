"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Preloader } from "@/components/effects/preloader";
import { Cursor } from "@/components/effects/cursor";
import { BackgroundFX } from "@/components/effects/background-fx";

gsap.registerPlugin(ScrollTrigger);

const LoadingContext = createContext(false);

/** True while the preloader is on screen. */
export function useLoading() {
  return useContext(LoadingContext);
}

export function AppProviders({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      // Layout changed after the preloader detached — re-measure pins/triggers.
      const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
      return () => cancelAnimationFrame(raf);
    }
  }, [loading]);

  return (
    <LoadingContext.Provider value={loading}>
      <SmoothScroll />
      <Preloader onComplete={() => setLoading(false)} />
      <BackgroundFX />
      {children}
      <Cursor />
    </LoadingContext.Provider>
  );
}
