"use client";

import dynamic from "next/dynamic";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Mail, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/effects/reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/data";

const MiniScene = dynamic(() => import("@/components/three/mini-scene"), {
  ssr: false,
});

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Project inquiry from ${name || "a visitor"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name}\n${email}`
    );
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setSent(true);
    window.setTimeout(() => setSent(false), 6000);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(SITE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the address is visible on screen anyway
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/[0.06]"
    >
      {/* the robot keeps you company down here */}
      <MiniScene />

      <div
        aria-hidden
        className="absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-accent/[0.12] blur-[120px]"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-28 sm:px-8 md:py-36">
        <div className="max-w-3xl">
          <Reveal>
            <p className="font-mono flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent-cyan">
              <span className="inline-block h-px w-8 bg-gradient-to-r from-accent to-accent-cyan" />
              // CONTACT
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display mt-6 text-[clamp(2.8rem,8vw,6rem)] font-extrabold leading-[0.98] tracking-tight text-white">
              HAVE AN IDEA?
              <span className="mt-2 block text-gradient">
                LET&apos;S BUILD SOMETHING AMAZING.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-mute">
              A product to ship, a problem to solve, a vision that needs an
              engineer — my inbox is open.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          {/* form */}
          <Reveal delay={0.1}>
            <form
              onSubmit={submit}
              className="glass relative space-y-5 rounded-3xl p-7 sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-mute">
                    Your name
                  </span>
                  <Input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ada Lovelace"
                    autoComplete="name"
                  />
                </label>
                <label className="block">
                  <span className="font-mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-mute">
                    Your email
                  </span>
                  <Input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@future.dev"
                    autoComplete="email"
                  />
                </label>
              </div>
              <label className="block">
                <span className="font-mono mb-2 block text-[11px] uppercase tracking-[0.25em] text-mute">
                  The idea
                </span>
                <Textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me what we're building…"
                />
              </label>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <Magnetic>
                  <Button size="lg" type="submit">
                    <Send />
                    Send it over
                  </Button>
                </Magnetic>
                {sent && (
                  <motion.p
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-accent-cyan"
                  >
                    Your email client should open — or write me directly below.
                  </motion.p>
                )}
              </div>
            </form>
          </Reveal>

          {/* direct channels */}
          <Reveal delay={0.2}>
            <div className="flex h-full flex-col gap-4">
              <button
                onClick={copyEmail}
                data-cursor
                className="glass group flex items-center justify-between rounded-3xl p-6 text-left transition-all duration-300 hover:border-white/25 hover:shadow-glow"
              >
                <div className="flex items-center gap-4">
                  <span className="glass flex size-12 items-center justify-center rounded-2xl text-accent-cyan">
                    <Mail className="size-5" />
                  </span>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
                      Email
                    </p>
                    <p className="mt-1 font-medium text-white">{SITE.email}</p>
                  </div>
                </div>
                {copied ? (
                  <Check className="size-5 text-accent-cyan" />
                ) : (
                  <Copy className="size-5 text-mute transition-colors group-hover:text-white" />
                )}
              </button>

              {[
                {
                  icon: GithubIcon,
                  label: "GitHub",
                  value: "BITSANDBYTESDUDE",
                  href: SITE.socials.github,
                },
                {
                  icon: LinkedinIcon,
                  label: "LinkedIn",
                  value: "BITSANDBYTESDUDE",
                  href: SITE.socials.linkedin,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor
                  className="glass group flex items-center justify-between rounded-3xl p-6 transition-all duration-300 hover:border-white/25 hover:shadow-glow"
                >
                  <div className="flex items-center gap-4">
                    <span className="glass flex size-12 items-center justify-center rounded-2xl text-accent-cyan">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-mute">
                        {label}
                      </p>
                      <p className="mt-1 font-medium text-white">{value}</p>
                    </div>
                  </div>
                  <Send className="size-4 -rotate-45 text-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </a>
              ))}

              <p className="font-mono mt-auto px-2 pt-4 text-[11px] uppercase tracking-[0.3em] text-mute/70">
                Usually replies within 24 hours
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
