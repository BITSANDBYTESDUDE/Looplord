"use client";

import { useEffect, useRef } from "react";
import { SectionHeading } from "@/components/layout/section-heading";
import { SKILLS } from "@/lib/data";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  held: boolean;
}

/**
 * A zero-library physics playground: skill orbs drift with soft wander,
 * bounce off walls, and flee the cursor. Hovering an orb freezes it.
 */
export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const nodesRef = useRef<Array<HTMLDivElement | null>>([]);
  const pointerRef = useRef<{ x: number; y: number; inside: boolean }>({
    x: -9999,
    y: -9999,
    inside: false,
  });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || reducedMotion) return;

    const init = () => {
      const { width, height } = container.getBoundingClientRect();
      orbsRef.current = SKILLS.map((skill) => {
        const size = 72 + skill.weight * 56;
        return {
          x: Math.random() * Math.max(width - size, 1),
          y: Math.random() * Math.max(height - size, 1),
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          size,
          held: false,
        };
      });
    };
    init();

    let raf = 0;
    const step = () => {
      const { width, height } = container.getBoundingClientRect();
      const p = pointerRef.current;

      orbsRef.current.forEach((orb, i) => {
        const node = nodesRef.current[i];
        if (!node) return;

        if (!orb.held) {
          // soft wander
          orb.vx += (Math.random() - 0.5) * 0.028;
          orb.vy += (Math.random() - 0.5) * 0.028;

          // cursor repulsion
          const cx = orb.x + orb.size / 2;
          const cy = orb.y + orb.size / 2;
          const dx = cx - p.x;
          const dy = cy - p.y;
          const dist = Math.hypot(dx, dy);
          const radius = 160;
          if (p.inside && dist < radius && dist > 0.001) {
            const force = ((radius - dist) / radius) * 0.55;
            orb.vx += (dx / dist) * force;
            orb.vy += (dy / dist) * force;
          }

          // damping + speed clamp
          orb.vx *= 0.94;
          orb.vy *= 0.94;
          const speed = Math.hypot(orb.vx, orb.vy);
          const max = 1.6;
          if (speed > max) {
            orb.vx = (orb.vx / speed) * max;
            orb.vy = (orb.vy / speed) * max;
          }
          // never fully stall — keep the field alive
          if (speed < 0.12) {
            orb.vx += (Math.random() - 0.5) * 0.12;
            orb.vy += (Math.random() - 0.5) * 0.12;
          }

          orb.x += orb.vx;
          orb.y += orb.vy;

          // walls
          if (orb.x < 0) {
            orb.x = 0;
            orb.vx *= -0.9;
          } else if (orb.x > width - orb.size) {
            orb.x = width - orb.size;
            orb.vx *= -0.9;
          }
          if (orb.y < 0) {
            orb.y = 0;
            orb.vy *= -0.9;
          } else if (orb.y > height - orb.size) {
            orb.y = height - orb.size;
            orb.vy *= -0.9;
          }
        }

        node.style.transform = `translate3d(${orb.x}px, ${orb.y}px, 0)`;
      });

      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    const onPointer = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        inside: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.inside = false;
    };

    container.addEventListener("pointermove", onPointer, { passive: true });
    container.addEventListener("pointerdown", onPointer, { passive: true });
    container.addEventListener("pointerleave", onLeave);

    const resizeObserver = new ResizeObserver(init);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onPointer);
      container.removeEventListener("pointerdown", onPointer);
      container.removeEventListener("pointerleave", onLeave);
      resizeObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        eyebrow="// SKILLS"
        title={
          <>
            No progress bars.{" "}
            <span className="text-gradient">Just playground physics.</span>
          </>
        }
        description="The stack I reach for when building serious products. Chase the orbs — they're shy."
      />

      <div
        ref={containerRef}
        className="glass relative h-[440px] overflow-hidden rounded-3xl md:h-[500px]"
        data-cursor
        aria-label="Interactive cloud of technology skills"
      >
        <p className="font-mono pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.35em] text-mute/60">
          move your cursor through the field
        </p>
        {SKILLS.map((skill, i) => (
          <div
            key={skill.label}
            ref={(el) => {
              nodesRef.current[i] = el;
            }}
            onMouseEnter={() => {
              if (orbsRef.current[i]) orbsRef.current[i].held = true;
            }}
            onMouseLeave={() => {
              if (orbsRef.current[i]) orbsRef.current[i].held = false;
            }}
            className="group absolute left-0 top-0 flex items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md transition-[border-color,box-shadow] duration-300 will-change-transform hover:border-white/30"
            style={
              {
                width: 72 + skill.weight * 56,
                height: 72 + skill.weight * 56,
                "--orb": skill.color,
              } as React.CSSProperties
            }
          >
            <span
              className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
              style={{ backgroundColor: skill.color }}
              aria-hidden
            />
            <span
              className="absolute inset-1.5 rounded-full opacity-25"
              style={{
                background: `radial-gradient(circle at 32% 28%, ${skill.color}55, transparent 62%)`,
              }}
              aria-hidden
            />
            <span className="font-display relative text-sm font-semibold tracking-wide text-white transition-transform duration-300 group-hover:scale-110 md:text-base">
              {skill.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
