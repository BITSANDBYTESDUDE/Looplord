export const SITE = {
  name: "Loop Lord",
  role: "Full Stack Developer",
  studio: "BITSANDBYTESDUDE",
  tagline: "Builder • Creator • Problem Solver",
  description:
    "I build modern web applications, AI tools, SaaS products, and digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://looplord.dev",
  email: "hello@looplord.dev",
  socials: {
    github: "https://github.com/BITSANDBYTESDUDE",
    linkedin: "https://www.linkedin.com/company/bitsandbytesdude",
  },
} as const;

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
] as const;

export const MARQUEE_ITEMS = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "THREE.JS",
  "GSAP",
  "AI SYSTEMS",
  "SAAS",
  "MONGODB",
  "PYTHON",
  "DOCKER",
  "TAILWIND",
] as const;

export interface Skill {
  label: string;
  color: string;
  /** relative visual weight 0..1 — drives orb size */
  weight: number;
}

export const SKILLS: Skill[] = [
  { label: "React", color: "#61DAFB", weight: 1 },
  { label: "Next.js", color: "#FFFFFF", weight: 1 },
  { label: "TypeScript", color: "#3178C6", weight: 0.95 },
  { label: "Node.js", color: "#5FA04E", weight: 0.9 },
  { label: "AI", color: "#3B82F6", weight: 0.95 },
  { label: "Python", color: "#FFD343", weight: 0.8 },
  { label: "MongoDB", color: "#47A248", weight: 0.8 },
  { label: "Express", color: "#CFCFCF", weight: 0.72 },
  { label: "Tailwind", color: "#38BDF8", weight: 0.85 },
  { label: "Docker", color: "#2496ED", weight: 0.72 },
] as const;

export interface Project {
  index: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demo: string;
  github: string;
  soon?: boolean;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    index: "01",
    title: "PDF Contact Extractor",
    description:
      "Upload any PDF and watch names, emails, and phone numbers surface instantly. Smart parsing meets a frictionless, privacy-first workflow.",
    image: "/projects/pdf-extractor.jpg",
    tags: ["Next.js", "TypeScript", "PDF Parsing", "Tailwind"],
    demo: SITE.socials.github,
    github: SITE.socials.github,
    accent: "#3B82F6",
  },
  {
    index: "02",
    title: "AI Document → Action System",
    description:
      "Documents in, actions out. An AI pipeline that reads, understands, and converts raw files into tasks, drafts, and decisions — automatically.",
    image: "/projects/ai-actions.jpg",
    tags: ["AI", "Python", "Node.js", "Automation"],
    demo: SITE.socials.github,
    github: SITE.socials.github,
    accent: "#06B6D4",
  },
  {
    index: "03",
    title: "Website Health Checker",
    description:
      "A full-body scan for any website — performance, SEO, accessibility and security scored in seconds, with fixes you can actually act on.",
    image: "/projects/health-checker.jpg",
    tags: ["Lighthouse", "Next.js", "APIs", "Analytics"],
    demo: SITE.socials.github,
    github: SITE.socials.github,
    accent: "#22D3EE",
  },
  {
    index: "04",
    title: "Future SaaS Products",
    description:
      "The lab is running. New SaaS products are being designed, engineered, and hardened inside BITSANDBYTESDUDE — shipping soon.",
    image: "/projects/saas-lab.jpg",
    tags: ["SaaS", "Product", "Stealth", "2026"],
    demo: "#contact",
    github: SITE.socials.github,
    soon: true,
    accent: "#818CF8",
  },
];

export const STORY_LINES = [
  { text: "I Don't Just Write", accent: "Code." },
  { text: "I Build", accent: "Products." },
  { text: "I Create Digital", accent: "Experiences." },
  { text: "Turning", accent: "Ideas", tail: "Into Reality." },
] as const;

export interface JourneyEntry {
  year: string;
  title: string;
  description: string;
  points: string[];
}

export const JOURNEY: JourneyEntry[] = [
  {
    year: "2024",
    title: "Started Learning Development",
    description:
      "Fell in love with the web. HTML, CSS, JavaScript — and the realization that code can turn ideas into real, living things.",
    points: ["First lines of code", "Deep JS fundamentals", "Small tools & experiments"],
  },
  {
    year: "2025",
    title: "Full Stack Development",
    description:
      "Levelled up into full-stack engineering — React, Next.js, Node, databases and deployment. Started shipping tools people actually use.",
    points: ["React & Next.js mastery", "Node, Express & MongoDB", "Shipped real products"],
  },
  {
    year: "2026",
    title: "Building Products & BITSANDBYTESDUDE",
    description:
      "Founded BITSANDBYTESDUDE to build at a higher level — SaaS products, AI systems, and digital experiences engineered to last.",
    points: ["AI-powered product systems", "SaaS architecture at scale", "A studio of my own"],
  },
];

export const STATS = [
  { value: 25, suffix: "+", label: "Projects & Experiments" },
  { value: 15, suffix: "+", label: "Technologies Mastered" },
  { value: 3, suffix: "", label: "Products Shipped" },
  { value: 100, suffix: "%", label: "Obsession With Craft" },
] as const;

export const ROLES = [
  "Full Stack Developer",
  "Founder @ BITSANDBYTESDUDE",
  "SaaS & AI Builder",
  "Digital Experience Designer",
] as const;

export const SNIPPETS = [
  {
    title: "looplord.config.ts",
    code: 'export const looplord = {\n  stack: ["Next.js", "AI", "SaaS"],\n  ship: "fast",\n  quality: "obsessive",\n};',
  },
  {
    title: "build.ts",
    code: "while (alive) {\n  ideate();\n  build();\n  ship();\n  learn();\n}",
  },
  {
    title: "api/experience.ts",
    code: 'export async function GET() {\n  return Response.json({\n    vibe: "premium",\n    motion: "buttery",\n  });\n}',
  },
] as const;
