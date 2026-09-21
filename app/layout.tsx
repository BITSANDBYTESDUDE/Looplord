import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://looplord.dev"),
  title: "Loop Lord | Full Stack Developer",
  description:
    "Loop Lord is a Full-Stack Developer and founder of BITSANDBYTESDUDE, building modern web apps, AI tools, and SaaS products.",
  keywords: [
    "Loop Lord",
    "Full Stack Developer",
    "BITSANDBYTESDUDE",
    "Next.js Portfolio",
    "AI Developer",
    "SaaS Builder",
  ],
  openGraph: {
    title: "Loop Lord | Digital World",
    description:
      "A premium interactive portfolio focused on product development, AI systems, and modern digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Lord | Full Stack Developer",
    description: "Building products, experiences, and technology at a professional level.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#080808] text-white antialiased">{children}</body>
    </html>
  );
}
