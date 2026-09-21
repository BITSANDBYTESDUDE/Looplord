"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/data";
import { scrollToTarget } from "@/components/providers/smooth-scroll";
import { useLoading } from "@/components/providers/app-providers";
import { cn } from "@/lib/utils";

export function Navbar() {
  const loading = useLoading();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (href: string) => {
    setOpen(false);
    window.setTimeout(() => scrollToTarget(href), open ? 350 : 0);
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={loading ? { y: -80, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-b border-white/[0.06] bg-[#080808]/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        {/* scroll progress */}
        <motion.div
          className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-accent to-accent-cyan"
          style={{ scaleX: progress }}
        />

        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          <button
            onClick={() => go("#home")}
            aria-label="Back to top"
            className="transition-transform duration-300 hover:scale-105"
          >
            <Logo />
          </button>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => go(link.href)}
                  data-cursor
                  className={cn(
                    "rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active === link.href
                      ? "text-white"
                      : "text-mute hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "mx-auto mt-0.5 block h-px bg-gradient-to-r from-accent to-accent-cyan transition-all duration-300",
                      active === link.href ? "w-full" : "w-0"
                    )}
                  />
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <Magnetic className="hidden sm:block">
              <Button size="sm" onClick={() => go("#contact")}>
                Let&apos;s Talk
                <ArrowUpRight />
              </Button>
            </Magnetic>

            <button
              className="glass flex size-11 items-center justify-center rounded-full text-ink md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-center bg-[#050506]/90 px-8 backdrop-blur-2xl md:hidden"
            data-lenis-prevent
          >
            <ul className="space-y-2">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -32 }}
                  transition={{ delay: 0.06 * i, duration: 0.45 }}
                >
                  <button
                    onClick={() => go(link.href)}
                    className="font-display group flex items-baseline gap-4 py-2 text-5xl font-bold tracking-tight text-ink"
                  >
                    <span className="font-mono text-sm text-accent-cyan">
                      0{i + 1}
                    </span>
                    <span className="transition-colors group-hover:text-gradient">
                      {link.label}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono mt-12 text-xs uppercase tracking-[0.3em] text-mute"
            >
              {SITE.studio} — {SITE.email}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
