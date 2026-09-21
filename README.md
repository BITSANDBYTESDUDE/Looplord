# LOOP LORD — Digital World

> Not just a portfolio. This is the digital world of **Loop Lord** — Full-Stack Developer & founder of **BITSANDBYTESDUDE**.

An immersive, cinematic developer portfolio: dark-futuristic aesthetic, a living 3D robot mascot, physics-driven skill orbs, pinned scroll storytelling, and buttery motion everywhere.

## Stack

| Layer          | Tech                                                       |
| -------------- | ---------------------------------------------------------- |
| Framework      | Next.js 15 (App Router, static prerender) + TypeScript     |
| Styling        | Tailwind CSS, glassmorphism utilities, custom design tokens|
| Motion         | GSAP + ScrollTrigger, Framer Motion, Lenis smooth scroll   |
| 3D             | React Three Fiber + Three.js + drei (procedural robot)     |
| UI primitives  | shadcn-style components (Button / Input / Textarea / Badge)|
| Fonts          | Space Grotesk, Inter, JetBrains Mono (self-hosted variable)|

## Experience map

- **Preloader** — logo, progress counter, status lines, curtain reveal
- **Hero** — particle nebula, parallax code-snippet cards, cursor-tracked ambient glow, staggered letter reveal, magnetic CTAs
- **3D Mascot** — fully procedural robot: walk-in entrance, idle breathing, blinking, antenna/core glow pulses, head follows the cursor, waves when you hover "Contact Me", waves again in the contact section
- **About** — bento grid: rotating role ticker, count-up stats, floating tech chips, "now" card
- **Skills** — no progress bars: a physics playground of drifting orbs with cursor repulsion and hover freeze
- **Story** — pinned GSAP storytelling: four cinematic statements scrubbed on scroll
- **Projects** — 3D-tilt cards with cursor-tracked glow, generated art, live/demo links
- **Journey** — scroll-drawn glowing timeline (2024 → 2026)
- **Contact** — giant CTA, working mailto composer, copy-email, socials, companion robot
- **Chrome** — custom layered cursor, magnetic buttons, glass navbar with scroll progress + active-section tracking, mobile overlay menu

## Run it

```bash
npm install
npm run dev      # develop on :3000
npm run build    # production build (fully static)
npm start        # serve the production build
```

## Structure

```
app/            routes, SEO metadata, sitemap/robots/manifest, OG image (generated at build)
components/
  layout/       navbar, footer, logo, marquee, section heading
  sections/     hero, about, skills, story, projects, journey, contact
  three/        robot (procedural), particles, hero + contact scenes
  effects/      preloader, custom cursor, magnetic, reveal, background FX
  providers/    Lenis smooth scroll, loading context
  ui/           shadcn-style primitives + brand icons
hooks/          media queries (touch, reduced motion)
lib/            site data, utils, shared pointer
public/         generated project art + mascot
```

## Notes

- **Placeholders to personalize**: email + social URLs live in `lib/data.ts` (`SITE`), and the canonical domain is `NEXT_PUBLIC_SITE_URL`.
- The contact form composes a `mailto:` — swap in a route handler (e.g. Resend) when a backend is desired.
- Heavy WebGL mounts lazily per section and unmounts offscreen; touch devices get reduced particle counts, and `prefers-reduced-motion` disables smooth-scroll hijacking and the pinned story.
- Accessibility: semantic landmarks, skip link, focus rings, aria labels on all icon-level controls.
