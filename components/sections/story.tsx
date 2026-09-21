"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { STORY_LINES } from "@/lib/data";
import { useLoading } from "@/components/providers/app-providers";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

/**
 * Cinematic pinned storytelling — four statements scrub through the
 * viewport while the section stays pinned, like title cards in a film.
 */
export function Story() {
  const rootRef = useRef<HTMLDivElement>(null);
  const loading = useLoading();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (loading || reducedMotion) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>(".story-line");
      const dots = gsap.utils.toArray<HTMLElement>(".story-dot");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: `+=${STORY_LINES.length * 90}%`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      lines.forEach((line, i) => {
        tl.fromTo(
          line,
          { autoAlpha: 0, y: 90, filter: "blur(10px)" },
          { autoAlpha: 1, y: 0, filter: "blur(0px)", duration: 1 }
        );
        if (dots[i]) {
          tl.to(dots[i], { scale: 1, opacity: 1, duration: 0.3 }, "<");
        }
        if (i < lines.length - 1) {
          tl.to(line, { autoAlpha: 0, y: -90, filter: "blur(10px)", duration: 1 }, "+=0.35");
          if (dots[i]) {
            tl.to(dots[i], { scale: 0.6, opacity: 0.3, duration: 0.3 }, "<");
          }
        }
      });
      // hold on the last line a beat before release
      tl.to({}, { duration: 0.6 });
    }, rootRef);

    return () => ctx.revert();
  }, [loading, reducedMotion]);

  return (
    <section
      ref={rootRef}
      aria-label="Philosophy"
      className="relative flex h-svh flex-col items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.07] blur-[130px]"
      />

      <p className="font-mono absolute left-1/2 top-24 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-mute/70">
        // THE PHILOSOPHY
      </p>

      {reducedMotion ? (
        <div className="space-y-14 px-6 text-center">
          {STORY_LINES.map((line, i) => (
            <StoryLine key={i} {...line} />
          ))}
        </div>
      ) : (
        STORY_LINES.map((line, i) => (
          <div
            key={i}
            className="story-line absolute inset-x-0 px-6 text-center opacity-0"
          >
            <StoryLine {...line} />
          </div>
        ))
      )}

      {/* progress dots */}
      {!reducedMotion && (
        <div className="absolute bottom-20 left-1/2 flex -translate-x-1/2 gap-2.5">
          {STORY_LINES.map((_, i) => (
            <span
              key={i}
              className="story-dot size-2 rounded-full bg-accent-cyan opacity-30"
              style={{ transform: "scale(0.6)" }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function StoryLine({
  text,
  accent,
  tail,
}: {
  text: string;
  accent: string;
  tail?: string;
}) {
  return (
    <h2 className="font-display text-[clamp(2.4rem,7.5vw,6.5rem)] font-extrabold leading-[1.04] tracking-tight text-white">
      {text} <span className="text-gradient">{accent}</span>
      {tail && (
        <span className="mt-2 block text-[0.55em] font-semibold text-mute">
          {tail}
        </span>
      )}
    </h2>
  );
}
