"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { JOURNEY } from "@/lib/data";
import { useLoading } from "@/components/providers/app-providers";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/** Interactive journey — a glowing spine draws itself as you scroll. */
export function Journey() {
  const rootRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const loading = useLoading();
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (loading || reducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".journey-list",
            start: "top 62%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        }
      );

      gsap.utils.toArray<HTMLElement>(".journey-item").forEach((item) => {
        const side = item.dataset.side === "right" ? 1 : -1;
        gsap.fromTo(
          item,
          { autoAlpha: 0, y: 70, x: 56 * side },
          {
            autoAlpha: 1,
            y: 0,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 78%" },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>(".journey-node").forEach((node) => {
        ScrollTrigger.create({
          trigger: node,
          start: "top 62%",
          onEnter: () => node.classList.add("journey-node-lit"),
          onLeaveBack: () => node.classList.remove("journey-node-lit"),
        });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [loading, reducedMotion]);

  return (
    <section
      id="journey"
      ref={rootRef}
      className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40"
    >
      <SectionHeading
        eyebrow="// THE JOURNEY"
        align="center"
        title={
          <>
            Every loop makes me{" "}
            <span className="text-gradient">a better builder</span>.
          </>
        }
        description="Three years, three chapters — from first <div> to founder."
      />

      <div className="journey-list relative mx-auto max-w-4xl">
        {/* spine */}
        <div
          aria-hidden
          className="absolute left-5 top-0 h-full w-px bg-white/[0.08] md:left-1/2"
        />
        <div
          ref={lineRef}
          aria-hidden
          className="absolute left-5 top-0 h-full w-px origin-top bg-gradient-to-b from-accent via-accent-cyan to-accent md:left-1/2"
        />

        <div className="space-y-16 md:space-y-24">
          {JOURNEY.map((entry, i) => {
            const right = i % 2 === 1;
            return (
              <div
                key={entry.year}
                data-side={right ? "right" : "left"}
                className={cn(
                  "journey-item relative pl-16 md:w-1/2 md:pl-0",
                  right ? "md:ml-auto md:pl-16" : "md:pr-16"
                )}
              >
                {/* node */}
                <span
                  aria-hidden
                  className={cn(
                    "journey-node absolute left-5 top-2 size-4 -translate-x-1/2 rounded-full border-2 border-accent-cyan/50 bg-[#080808] transition-all duration-500",
                    right ? "md:left-0" : "md:left-full"
                  )}
                />

                <article className="glass group rounded-3xl p-7 transition-all duration-500 hover:border-white/20 hover:shadow-glow sm:p-9">
                  <p className="font-display text-4xl font-extrabold tracking-tight text-white/15 transition-colors duration-500 group-hover:text-gradient md:text-5xl">
                    {entry.year}
                  </p>
                  <h3 className="font-display mt-3 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {entry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-mute">
                    {entry.description}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {entry.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-2.5 text-sm text-ink/80"
                      >
                        <span className="flex size-4 items-center justify-center rounded-full bg-accent/20">
                          <Check className="size-2.5 text-accent-cyan" />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
