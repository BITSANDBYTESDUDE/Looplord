import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#080808] px-6 text-center">
      <div className="bg-grid mask-fade-edges absolute inset-0" aria-hidden />
      <p className="font-mono text-sm tracking-[0.4em] text-accent-cyan">
        ERROR // 404
      </p>
      <h1 className="font-display mt-4 text-[clamp(4rem,18vw,12rem)] font-extrabold leading-none tracking-tighter">
        <span className="text-outline">LOST</span>
      </h1>
      <p className="mt-6 max-w-md text-mute">
        This loop doesn&apos;t exist. The page you&apos;re looking for drifted
        out of orbit.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex h-12 items-center rounded-full bg-accent px-8 text-sm font-medium text-white shadow-glow transition-transform duration-300 hover:scale-105"
      >
        Return to base
      </Link>
    </main>
  );
}
