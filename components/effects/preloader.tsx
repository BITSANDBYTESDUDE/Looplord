"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Logo } from "@/components/layout/logo";

const STATUS_LINES = [
  "Compiling shaders",
  "Waking the robot",
  "Fetching coffee",
  "Calibrating motion",
  "Polishing pixels",
] as const;

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [done, setDone] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const completedRef = useRef(onComplete);
  completedRef.current = onComplete;

  useEffect(() => {
    document.documentElement.style.overflow = "hidden";

    const progress = { value: 0 };
    let lineIndex = 0;

    const statusInterval = window.setInterval(() => {
      lineIndex = (lineIndex + 1) % STATUS_LINES.length;
      if (statusRef.current) {
        statusRef.current.textContent = STATUS_LINES[lineIndex];
      }
    }, 520);

    const finish = () => {
      window.clearInterval(statusInterval);
      const tl = gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          completedRef.current();
          setDone(true);
        },
      });

      tl.to(progress, {
        value: 100,
        duration: 0.45,
        ease: "power2.inOut",
        onUpdate: renderProgress,
      })
        .to(".preloader-panel", {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          stagger: 0.08,
        })
        .to(
          ".preloader-content",
          { opacity: 0, y: -30, duration: 0.4, ease: "power2.in" },
          "-=0.55"
        )
        .set(".preloader-panel", { display: "none" });
    };

    const renderProgress = () => {
      const v = Math.round(progress.value);
      if (counterRef.current) counterRef.current.textContent = String(v);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress.value / 100})`;
      }
    };

    // Ramp quickly to ~86%, then wait for the page to be truly ready.
    const ramp = gsap.to(progress, {
      value: 86,
      duration: 1.7,
      ease: "power2.out",
      onUpdate: renderProgress,
    });

    const ready = new Promise<void>((resolve) => {
      const minTime = new Promise<void>((r) => window.setTimeout(r, 1900));
      const loaded =
        document.readyState === "complete"
          ? Promise.resolve()
          : new Promise<void>((r) =>
              window.addEventListener("load", () => r(), { once: true })
            );
      Promise.all([minTime, loaded]).then(() => resolve());
    });

    ready.then(() => {
      ramp.kill();
      finish();
    });

    return () => {
      window.clearInterval(statusInterval);
      ramp.kill();
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="noscript-hidden fixed inset-0 z-[100]"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading portfolio"
    >
      <div className="preloader-panel absolute inset-0 bg-[#050506]" />
      <div className="preloader-panel absolute inset-0 bg-[#0B0B0D] [clip-path:polygon(0_0,100%_0,100%_100%,0_92%)]" />

      <div className="preloader-content relative z-10 flex h-full flex-col items-center justify-center px-6">
        <div className="animate-float-slow">
          <Logo variant="mark" className="h-16 w-16" glow />
        </div>

        <p className="font-mono mt-10 text-xs uppercase tracking-[0.35em] text-mute">
          Initializing Portfolio
          <span className="animate-pulse-dot inline-block">…</span>
        </p>

        <div className="mt-8 h-px w-64 overflow-hidden rounded-full bg-white/10 sm:w-80">
          <div
            ref={barRef}
            className="h-full w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-accent-cyan"
          />
        </div>

        <div className="mt-4 flex w-64 items-center justify-between font-mono text-xs text-mute sm:w-80">
          <p ref={statusRef}>{STATUS_LINES[0]}</p>
          <span>
            <span ref={counterRef}>0</span>%
          </span>
        </div>
      </div>
    </div>
  );
}
