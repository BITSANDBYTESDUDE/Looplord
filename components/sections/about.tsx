"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { useRef } from "react";
import gsap from "gsap";
import { MapPin, Rocket, Building2, Code2 } from "lucide-react";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { ROLES, STATS } from "@/lib/data";

function useCountUp(target: number, start: boolean, duration = 1.8) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    const proxy = { v: 0 };
    const tween = gsap.to(proxy, {
      v: target,
      duration,
      ease: "power3.out",
      onUpdate: () => setValue(Math.round(proxy.v)),
    });
    return () => {
      tween.kill();
    };
  }, [start, target, duration]);
  return value;
}

function RotatingRole() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % ROLES.length),
      2600
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative block h-[1.5em] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: "105%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-105%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient absolute inset-x-0 font-semibold"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const FLOATING_TECH = [
  { label: "React", className: "left-[8%] top-[14%]", delay: "0s" },
  { label: "Next.js", className: "right-[10%] top-[20%]", delay: "-2.2s" },
  { label: "TypeScript", className: "left-[16%] bottom-[18%]", delay: "-4.4s" },
  { label: "AI", className: "right-[18%] bottom-[12%]", delay: "-1.1s" },
  { label: "Node", className: "left-[45%] top-[6%]", delay: "-3.3s" },
] as const;

export function About() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-120px" });

  return (
    <section id="about" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        eyebrow="// ABOUT"
        title={
          <>
            More than a developer —<br />
            a <span className="text-gradient">product mind</span>.
          </>
        }
        description="Full Stack Developer and founder of BITSANDBYTESDUDE — building SaaS, AI, and web products that people love to use."
      />

      <div className="grid gap-5 md:grid-cols-6">
        {/* identity card */}
        <Reveal className="md:col-span-4" delay={0}>
          <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-glow sm:p-10">
            <div className="absolute -right-20 -top-20 size-56 rounded-full bg-accent/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100" />
            <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-center">
              <div className="relative">
                <div className="absolute -inset-2 rounded-[1.8rem] bg-gradient-to-br from-accent to-accent-cyan opacity-40 blur-lg" />
                <Image
                  src="/robot.jpg"
                  alt="Loop Lord's robot mascot"
                  width={150}
                  height={150}
                  className="relative rounded-[1.6rem] border border-white/15 object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent-cyan">
                  The human behind the loop
                </p>
                <h3 className="font-display mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Loop Lord
                </h3>
                <div className="mt-2 text-xl text-mute sm:text-2xl">
                  <RotatingRole />
                </div>
              </div>
            </div>
            <p className="mt-8 max-w-2xl leading-relaxed text-mute">
              I don&apos;t wait for the future of the web — I build it. From
              pixel to protocol, I design and engineer products end-to-end:
              interfaces that feel alive, backends that scale, and AI that
              actually ships.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-ink">
                <Building2 className="size-3.5 text-accent-cyan" />
                Founder @ BITSANDBYTESDUDE
              </span>
              <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-ink">
                <MapPin className="size-3.5 text-accent" />
                Remote / Everywhere
              </span>
            </div>
          </div>
        </Reveal>

        {/* stats */}
        <Reveal className="md:col-span-2" delay={0.1}>
          <div
            ref={statsRef}
            className="glass grid h-full grid-cols-2 gap-px overflow-hidden rounded-3xl bg-white/[0.06]"
          >
            {STATS.map((stat, i) => (
              <StatCell key={stat.label} {...stat} start={statsInView} index={i} />
            ))}
          </div>
        </Reveal>

        {/* now card */}
        <Reveal className="md:col-span-2" delay={0.15}>
          <div className="glass group relative h-full overflow-hidden rounded-3xl p-8 transition-shadow duration-500 hover:shadow-glow-cyan">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-cyan opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-accent-cyan" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-mute">
                Now
              </p>
            </div>
            <p className="mt-6 text-lg font-medium leading-relaxed text-ink">
              Building AI-powered products at{" "}
              <span className="text-gradient font-semibold">BITSANDBYTESDUDE</span>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-mute">
              Turning caffeine and curiosity into shipped software, weekly.
            </p>
            <Rocket className="absolute -bottom-4 -right-4 size-24 text-white/[0.05] transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-6" />
          </div>
        </Reveal>

        {/* floating tech cloud */}
        <Reveal className="md:col-span-4" delay={0.2}>
          <div className="glass relative h-full min-h-[210px] overflow-hidden rounded-3xl p-8">
            <div className="relative z-10 max-w-sm">
              <p className="font-mono flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-mute">
                <Code2 className="size-4 text-accent-cyan" /> Everyday arsenal
              </p>
              <p className="font-display mt-4 text-2xl font-bold tracking-tight text-white">
                A full stack, sharpened daily — from the database to the last
                millisecond of motion.
              </p>
            </div>
            {FLOATING_TECH.map((tech) => (
              <span
                key={tech.label}
                style={{ animationDelay: tech.delay }}
                className={`animate-float font-mono absolute rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 text-xs text-ink/90 shadow-card backdrop-blur-md ${tech.className}`}
              >
                {tech.label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatCell({
  value,
  suffix,
  label,
  start,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
  index: number;
}) {
  const count = useCountUp(value, start, 1.6 + index * 0.2);
  return (
    <div className="flex flex-col items-center justify-center bg-[#0B0B0D] p-6 text-center">
      <p className="font-display text-4xl font-extrabold tracking-tight text-white">
        {count}
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="mt-2 text-[11px] leading-snug text-mute">{label}</p>
    </div>
  );
}
