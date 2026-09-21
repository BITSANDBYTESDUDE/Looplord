"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { SNIPPETS } from "@/lib/data";
import { pointer, trackPointer } from "@/lib/pointer";
import { scrollToTarget } from "@/components/providers/smooth-scroll";
import { useLoading } from "@/components/providers/app-providers";

const HeroScene = dynamic(() => import("@/components/three/hero-scene"), {
  ssr: false,
});

const TITLE = ["L", "O", "O", "P", " ", "L", "O", "R", "D"];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const rise: Variants = {
  hidden: { y: 48, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const letter: Variants = {
  hidden: { y: "115%", rotate: 4 },
  show: {
    y: "0%",
    rotate: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const loading = useLoading();
  const started = !loading;
  const parallaxRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Pointer parallax for the floating snippet cards + ambient glow.
  useEffect(() => {
    const stopTracking = trackPointer(window);
    let raf = 0;
    const smooth = { x: 0, y: 0 };

    const loop = () => {
      smooth.x += (pointer.x - smooth.x) * 0.045;
      smooth.y += (pointer.y - smooth.y) * 0.045;

      parallaxRef.current
        ?.querySelectorAll<HTMLElement>("[data-depth]")
        .forEach((el) => {
          const depth = Number(el.dataset.depth ?? 0);
          el.style.transform = `translate3d(${smooth.x * depth}px, ${
            -smooth.y * depth * 0.7
          }px, 0)`;
        });

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${
          (smooth.x + 1) * 50 - 50
        }%, ${(-smooth.y + 1) * 50 - 50}%, 0)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      stopTracking();
      cancelAnimationFrame(raf);
    };
  }, []);

  const waveRobot = () => window.dispatchEvent(new Event("robot:wave"));

  return (
    <section
      id="home"
      className="relative flex min-h-svh items-center overflow-hidden"
    >
      {/* ambient glow that follows the cursor */}
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[46rem] w-[46rem] rounded-full bg-accent/[0.1] blur-[140px]"
      />

      {/* 3D layer */}
      <HeroScene active={started} />

      {/* readability veil behind the copy */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_30%_55%,rgba(8,8,8,0.55),transparent_70%)]"
      />

      {/* floating code snippets */}
      <div ref={parallaxRef} className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
        <div data-depth="46" className="absolute left-[52%] top-[16%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.1, duration: 1 }}
            className="animate-float"
          >
            <SnippetCard index={0} />
          </motion.div>
        </div>
        <div data-depth="70" className="absolute bottom-[26%] left-[6%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.35, duration: 1 }}
            className="animate-float"
            style={{ animationDelay: "-2.4s" }}
          >
            <SnippetCard index={1} />
          </motion.div>
        </div>
        <div data-depth="58" className="absolute bottom-[10%] right-[7%]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.55, duration: 1 }}
            className="animate-float"
            style={{ animationDelay: "-4.6s" }}
          >
            <SnippetCard index={2} />
          </motion.div>
        </div>
      </div>

      {/* copy */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={started ? "show" : "hidden"}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-24 pt-32 sm:px-8 lg:pb-16"
      >
        <motion.div variants={rise} className="mb-7 flex">
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-xs text-ink/90">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-cyan opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-cyan" />
            </span>
            Available for new projects
            <Sparkles className="size-3.5 text-accent-cyan" />
          </span>
        </motion.div>

        <h1 className="font-display text-[clamp(3.4rem,13vw,11rem)] font-extrabold leading-[0.94] tracking-[-0.04em] text-white">
          {TITLE.map((char, i) => (
            <span key={i} className="inline-block overflow-hidden pb-[0.09em] align-bottom">
              <motion.span
                variants={letter}
                className={`inline-block ${
                  i >= 5
                    ? "bg-gradient-to-br from-accent via-accent-cyan to-cyan-200 bg-clip-text text-transparent"
                    : ""
                }`}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          variants={rise}
          className="font-display mt-7 text-xl font-medium text-ink sm:text-2xl"
        >
          Full Stack Developer
          <span className="mx-3 text-accent-cyan">/</span>
          <span className="text-mute">Builder • Creator • Problem Solver</span>
        </motion.p>

        <motion.p
          variants={rise}
          className="mt-5 max-w-xl text-base leading-relaxed text-mute sm:text-lg"
        >
          I build modern web applications, AI tools, SaaS products, and digital
          experiences — engineered to feel alive.
        </motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <Magnetic>
            <Button size="lg" onClick={() => scrollToTarget("#work")}>
              Explore Work
              <ArrowUpRight />
            </Button>
          </Magnetic>
          <Magnetic>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => scrollToTarget("#contact")}
              onMouseEnter={waveRobot}
            >
              Contact Me
            </Button>
          </Magnetic>
        </motion.div>
      </motion.div>

      {/* side rail */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 1.8, duration: 1 }}
        className="font-mono absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[10px] uppercase tracking-[0.5em] text-mute/70 xl:block"
      >
        BITSANDBYTESDUDE — 2026
      </motion.div>

      {/* scroll cue */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={started ? { opacity: 1 } : {}}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => scrollToTarget("#about")}
        aria-label="Scroll to about section"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-mute transition-colors hover:text-white"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <span className="glass flex size-9 items-center justify-center rounded-full">
          <ArrowDown className="size-4 animate-bounce" />
        </span>
      </motion.button>
    </section>
  );
}

function SnippetCard({ index }: { index: number }) {
  const snippet = SNIPPETS[index % SNIPPETS.length];
  return (
    <div className="glass w-72 rounded-2xl p-4 shadow-card">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <span className="font-mono ml-2 text-[10px] lowercase tracking-wider text-mute">
          {snippet.title}
        </span>
      </div>
      <pre className="font-mono overflow-hidden text-[11px] leading-relaxed text-accent-cyan/90">
        {snippet.code}
      </pre>
    </div>
  );
}
