import { MARQUEE_ITEMS } from "@/lib/data";

/** Infinite tech ticker separating the hero from the rest of the story. */
export function Marquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      aria-hidden
      className="relative overflow-hidden border-y border-white/[0.06] bg-coal/60 py-5 backdrop-blur-sm"
    >
      <div className="animate-marquee flex w-max items-center gap-8 pr-8">
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-display flex items-center gap-8 text-lg font-semibold tracking-[0.2em] text-white/35"
          >
            {item}
            <span className="text-sm text-accent-cyan/70">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#080808] to-transparent" />
    </div>
  );
}
