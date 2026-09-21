import type { ReactNode } from "react";
import { Reveal } from "@/components/effects/reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "mb-14 md:mb-20",
        centered && "flex flex-col items-center text-center",
        className
      )}
    >
      <Reveal>
        <p className="font-mono flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent-cyan">
          <span className="inline-block h-px w-8 bg-gradient-to-r from-accent to-accent-cyan" />
          {eyebrow}
          {centered && (
            <span className="inline-block h-px w-8 bg-gradient-to-l from-accent to-accent-cyan" />
          )}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5 max-w-3xl text-[clamp(2.2rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-white">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.16}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
