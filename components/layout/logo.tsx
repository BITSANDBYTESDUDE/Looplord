import { cn } from "@/lib/utils";

interface LogoProps {
  /** "mark" = icon only, "full" = icon + wordmark */
  variant?: "mark" | "full";
  className?: string;
  glow?: boolean;
}

/** The Loop Lord ∞ mark. */
export function Logo({ variant = "full", className, glow = false }: LogoProps) {
  const mark = (
    <svg
      viewBox="0 0 64 40"
      fill="none"
      className={cn("h-8 w-12", glow && "drop-shadow-[0_0_18px_rgba(59,130,246,0.65)]")}
      aria-hidden
    >
      <defs>
        <linearGradient id="logo-g" x1="0" y1="0" x2="64" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3B82F6" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <path
        d="M32 20C32 13 39 8 46 8C55 8 60 13.5 60 20C60 26.5 55 32 46 32C39 32 32 27 32 20C32 13 25 8 18 8C9 8 4 13.5 4 20C4 26.5 9 32 18 32C25 32 32 27 32 20Z"
        stroke="url(#logo-g)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (variant === "mark") {
    return <span className={cn("inline-flex", className)}>{mark}</span>;
  }

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {mark}
      <span className="font-display text-base font-bold tracking-tight text-white">
        LOOP<span className="text-gradient">LORD</span>
      </span>
    </span>
  );
}
