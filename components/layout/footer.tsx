import { Mail, ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Logo } from "@/components/layout/logo";
import { NAV_LINKS, SITE } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-coal/60">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="font-mono mt-4 text-xs uppercase tracking-[0.3em] text-mute">
              {SITE.studio}
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">
              Building products, experiences, and technology at a professional
              level — one loop at a time.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-mute transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center gap-3">
              {[
                { icon: GithubIcon, href: SITE.socials.github, label: "GitHub" },
                { icon: LinkedinIcon, href: SITE.socials.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={label}
                  className="glass flex size-10 items-center justify-center rounded-full text-mute transition-all duration-300 hover:-translate-y-1 hover:text-white hover:shadow-glow"
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-mute sm:flex-row sm:items-center">
          <p>
            © {year} Loop Lord. Crafted with Next.js 15, Three.js, GSAP & an
            unreasonable amount of care.
          </p>
          <a
            href="#home"
            className="font-mono inline-flex items-center gap-2 uppercase tracking-[0.25em] transition-colors hover:text-white"
          >
            Back to top <ArrowUp className="size-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
