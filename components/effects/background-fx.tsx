/**
 * Global ambient backdrop: slow aurora gradients, a faint grid,
 * and an SVG-noise grain layer. Zero JS at runtime — pure CSS.
 */
export function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="bg-grid mask-fade-edges absolute inset-0 opacity-70" />

      <div className="animate-aurora absolute -top-[20%] left-[8%] h-[55vh] w-[55vw] rounded-full bg-accent/[0.13] blur-[130px]" />
      <div
        className="animate-aurora absolute -bottom-[25%] right-[4%] h-[50vh] w-[45vw] rounded-full bg-accent-cyan/[0.1] blur-[130px]"
        style={{ animationDelay: "-9s" }}
      />

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
