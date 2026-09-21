"use client";

import { useRef, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, ExternalLink, FlaskConical } from "lucide-react";
import { GithubIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/layout/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import { PROJECTS, type Project } from "@/lib/data";

export function Projects() {
  return (
    <section id="work" className="relative mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-40">
      <SectionHeading
        eyebrow="// SELECTED WORK"
        title={
          <>
            Things I&apos;ve built,{" "}
            <span className="text-gradient">things I&apos;m building</span>.
          </>
        }
        description="Every project starts as a problem I couldn't leave alone. These are the ones that made it out of the lab."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal key={project.title} delay={0.08 * (i % 2)}>
            <ProjectCard project={project} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  priority,
}: {
  project: Project;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const springRX = useSpring(rotateX, { stiffness: 180, damping: 20 });
  const springRY = useSpring(rotateY, { stiffness: 180, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(560px circle at ${glowX}% ${glowY}%, ${project.accent}1F, transparent 45%)`;

  const onMove = (e: MouseEvent) => {
    if (!ref.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * 9);
    rotateX.set((0.5 - py) * 9);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        data-cursor
        style={{ rotateX: springRX, rotateY: springRY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-panel shadow-card transition-colors duration-500 hover:border-white/20"
      >
        {/* cursor glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: glow }}
        />

        {/* image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-panel via-panel/25 to-transparent" />
          <span className="font-mono absolute left-5 top-5 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[11px] tracking-[0.25em] text-white/80 backdrop-blur-md">
            {project.index}
          </span>
          {project.soon && (
            <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full border border-accent-cyan/40 bg-accent-cyan/15 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-200 backdrop-blur-md">
              <FlaskConical className="size-3" /> In the lab
            </span>
          )}
        </div>

        {/* body */}
        <div className="relative z-10 -mt-8 p-6 sm:p-8" style={{ transform: "translateZ(28px)" }}>
          <h3 className="font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
            {project.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-mute sm:text-[15px]">
            {project.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <div className="mt-7 flex items-center gap-3">
            <a
              href={project.demo}
              target={project.demo.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              onClick={project.demo.startsWith("#") ? (e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              } : undefined}
              className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-accent hover:shadow-glow"
            >
              <ExternalLink className="size-4" />
              {project.soon ? "Get notified" : "Live demo"}
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} on GitHub`}
              className="glass inline-flex size-11 items-center justify-center rounded-full text-mute transition-all duration-300 hover:-translate-y-1 hover:text-white"
            >
              <GithubIcon className="size-4" />
            </a>
            <ArrowUpRight className="ml-auto size-5 text-mute opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-cyan group-hover:opacity-100" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
