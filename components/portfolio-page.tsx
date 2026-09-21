"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

import { CustomCursor } from "@/components/custom-cursor";
import { Loader } from "@/components/loader";
import { MagneticButton } from "@/components/magnetic-button";
import { Particles } from "@/components/particles";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const MascotScene = dynamic(
  () => import("@/components/mascot-scene").then((mod) => mod.MascotScene),
  { ssr: false },
);

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "TypeScript",
  "Python",
  "AI",
  "Tailwind",
  "Docker",
];

const projects = [
  {
    title: "PDF Contact Extractor",
    description:
      "AI-assisted extraction pipeline that detects names, emails, phone numbers, and entities from raw PDF documents.",
    stack: ["Next.js", "TypeScript", "AI", "Node.js"],
    image: "/projects/pdf-contact-extractor.svg",
    demo: "#",
    github: "#",
  },
  {
    title: "AI Document → Action System",
    description:
      "Transforms long-form documents into actionable workflows, automations, and execution-ready tasks.",
    stack: ["Python", "LLM", "FastAPI", "Vector DB"],
    image: "/projects/ai-document-action.svg",
    demo: "#",
    github: "#",
  },
  {
    title: "Website Health Checker",
    description:
      "Performance and SEO diagnostics suite with insight scoring, issue snapshots, and recommendation streams.",
    stack: ["Node.js", "Lighthouse", "Next.js"],
    image: "/projects/website-health-checker.svg",
    demo: "#",
    github: "#",
  },
  {
    title: "Future SaaS Products",
    description:
      "A product lab to validate, prototype, and launch modern SaaS ideas at startup speed.",
    stack: ["SaaS", "Product", "AI", "Cloud"],
    image: "/projects/future-saas.svg",
    demo: "#",
    github: "#",
  },
];

const storylines = [
  "I Don\'t Just Write Code",
  "I Build Products",
  "I Create Digital Experiences",
  "Turning Ideas Into Reality",
];

const milestones = [
  { year: "2024", text: "Started Learning Development" },
  { year: "2025", text: "Full Stack Development" },
  { year: "2026", text: "Building Products & BITSANDBYTESDUDE" },
];

export function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [sent, setSent] = useState(false);

  const heroX = useMotionValue(0);
  const heroY = useMotionValue(0);
  const springX = useSpring(heroX, { damping: 28, stiffness: 220 });
  const springY = useSpring(heroY, { damping: 28, stiffness: 220 });

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), 1900);
    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.3,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    gsap.utils.toArray<HTMLElement>(".story-item").forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0.2, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 72%",
            end: "bottom 42%",
            scrub: true,
          },
        },
      );
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const onHeroMove = (event: React.MouseEvent<HTMLElement>) => {
    const { innerWidth, innerHeight } = window;
    const x = (event.clientX / innerWidth - 0.5) * 2;
    const y = (event.clientY / innerHeight - 0.5) * 2;

    heroX.set(x * 18);
    heroY.set(y * 12);
    setCursor({ x, y });
  };

  const skillMotion = useMemo(
    () =>
      skills.map((_, index) => ({
        x: index % 2 === 0 ? [0, 15, -10, 0] : [0, -12, 18, 0],
        y: [0, -8, 12, 0],
        duration: 4 + (index % 4),
      })),
    [],
  );

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <>
      <Loader show={loading} />
      <CustomCursor />
      <div className="relative overflow-hidden bg-[#080808] text-white">
        <section
          id="hero"
          onMouseMove={onHeroMove}
          className="relative flex min-h-screen items-center px-6 pt-20 md:px-12"
        >
          <Particles />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_40%),radial-gradient(circle_at_80%_30%,rgba(6,182,212,0.16),transparent_45%)]" />
          <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div style={{ x: springX, y: springY }} className="space-y-8">
              <p className="w-fit rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-zinc-300">
                BITSANDBYTESDUDE
              </p>
              <h1 className="text-5xl font-black leading-[0.9] tracking-tight sm:text-7xl">
                LOOP LORD
              </h1>
              <p className="text-xl text-zinc-300 sm:text-2xl">
                Full Stack Developer
                <br />
                Builder • Creator • Problem Solver
              </p>
              <p className="max-w-xl text-base text-zinc-400 sm:text-lg">
                I build modern web applications, AI tools, SaaS products, and digital
                experiences.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton>
                  <Button size="lg">Explore Work</Button>
                </MagneticButton>
                <MagneticButton>
                  <Button variant="ghost" size="lg">
                    Contact Me
                  </Button>
                </MagneticButton>
              </div>
            </motion.div>
            <div className="relative h-[380px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:h-[460px]">
              <MascotScene cursor={cursor} />
              <div className="absolute left-5 top-5 rounded-xl border border-cyan-300/20 bg-black/40 px-3 py-2 text-xs text-zinc-300">
                AI • Development • Creativity
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <div className="grid gap-6 md:grid-cols-3">
            {["Full Stack Developer", "Founder of BITSANDBYTESDUDE", "Building SaaS, AI, and web products"].map(
              (item, index) => (
                <motion.article
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: index * 0.12 }}
                >
                  <p className="text-sm text-cyan-300">0{index + 1}</p>
                  <h2 className="mt-3 text-xl font-semibold">{item}</h2>
                </motion.article>
              ),
            )}
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              ["Projects Built", "20+"],
              ["Years Building", "3+"],
              ["SaaS Prototypes", "12"],
              ["Client Satisfaction", "100%"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5"
              >
                <p className="text-2xl font-bold text-cyan-300">{value}</p>
                <p className="mt-1 text-sm text-zinc-400">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <div className="mb-12 flex items-end justify-between gap-6">
            <h2 className="text-3xl font-bold sm:text-4xl">Skills</h2>
            <p className="max-w-lg text-sm text-zinc-400 sm:text-base">
              Floating skill objects with motion-driven depth and subtle glow interactions.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                drag
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                whileHover={{ scale: 1.08 }}
                animate={skillMotion[index]}
                transition={{ repeat: Infinity, duration: skillMotion[index].duration }}
                className="cursor-grab rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-6 text-center text-sm font-semibold text-cyan-100 shadow-[0_0_35px_rgba(6,182,212,0.16)]"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-24 md:px-12">
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">Selected Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <motion.article
                key={project.title}
                whileHover={{ scale: 1.015, rotateX: 1.2, rotateY: -1.2 }}
                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.4)]"
              >
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={640}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="mt-5 text-2xl font-semibold">{project.title}</h3>
                <p className="mt-2 text-zinc-400">{project.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-5 text-sm">
                  <Link href={project.demo} className="inline-flex items-center gap-1 text-cyan-300">
                    Live Demo <ArrowUpRight size={14} />
                  </Link>
                  <Link href={project.github} className="inline-flex items-center gap-1 text-zinc-300">
                    GitHub <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="bg-[#0d0d0d] px-6 py-24 md:px-12">
          <div className="mx-auto flex max-w-5xl flex-col gap-16 text-center">
            {storylines.map((line) => (
              <p
                key={line}
                className="story-item text-3xl font-semibold tracking-tight text-zinc-200 sm:text-5xl"
              >
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-24 md:px-12">
          <h2 className="mb-12 text-3xl font-bold sm:text-4xl">Journey Timeline</h2>
          <ol className="relative border-l border-cyan-300/30 pl-7">
            {milestones.map((item) => (
              <motion.li
                key={item.year}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                className="mb-10"
              >
                <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_18px_rgba(6,182,212,0.75)]" />
                <p className="text-sm uppercase tracking-[0.25em] text-cyan-300">{item.year}</p>
                <p className="mt-2 text-xl text-zinc-200">{item.text}</p>
              </motion.li>
            ))}
          </ol>
        </section>

        <section className="relative overflow-hidden px-6 py-24 md:px-12">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.2),transparent_45%)]" />
          <div className="relative mx-auto max-w-4xl rounded-3xl border border-white/10 bg-black/45 p-10 text-center backdrop-blur-lg">
            <p className="text-sm uppercase tracking-[0.45em] text-cyan-300">Have an Idea?</p>
            <h2 className="mt-4 text-3xl font-black sm:text-5xl">
              LET&apos;S BUILD SOMETHING AMAZING.
            </h2>
            <form onSubmit={onSubmit} className="mx-auto mt-10 grid max-w-2xl gap-4 text-left">
              <input
                required
                placeholder="Your name"
                className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-cyan-300"
              />
              <input
                required
                type="email"
                placeholder="Your email"
                className="h-12 rounded-xl border border-white/15 bg-white/5 px-4 text-sm outline-none placeholder:text-zinc-500 focus:border-cyan-300"
              />
              <textarea
                required
                placeholder="Tell me about your project"
                rows={5}
                className="rounded-xl border border-white/15 bg-white/5 p-4 text-sm outline-none placeholder:text-zinc-500 focus:border-cyan-300"
              />
              <Button className="mt-2 justify-self-center" size="lg" type="submit">
                Send Message
              </Button>
              {sent && <p className="text-center text-sm text-cyan-300">Thanks! I&apos;ll reply soon.</p>}
            </form>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-zinc-300">
              <Link href="https://github.com" className="inline-flex items-center gap-2 hover:text-cyan-300">
                <Github size={18} /> GitHub
              </Link>
              <Link
                href="https://linkedin.com"
                className="inline-flex items-center gap-2 hover:text-cyan-300"
              >
                <Linkedin size={18} /> LinkedIn
              </Link>
              <Link href="mailto:hello@looplord.dev" className="inline-flex items-center gap-2 hover:text-cyan-300">
                <Mail size={18} /> Email
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
