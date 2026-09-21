import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import { AppProviders } from "@/components/providers/app-providers";
import { SITE } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Loop Lord — Full Stack Developer | BITSANDBYTESDUDE",
    template: "%s | Loop Lord",
  },
  description:
    "Loop Lord — Full-Stack Developer and founder of BITSANDBYTESDUDE. I build modern web applications, AI tools, SaaS products, and immersive digital experiences.",
  keywords: [
    "Loop Lord",
    "BITSANDBYTESDUDE",
    "Full Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "SaaS",
    "AI tools",
    "Web Development",
    "Portfolio",
  ],
  authors: [{ name: "Loop Lord", url: SITE.url }],
  creator: "Loop Lord",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    siteName: "Loop Lord — Digital World",
    title: "Loop Lord — Full Stack Developer | BITSANDBYTESDUDE",
    description:
      "Not just a portfolio — the digital world of Loop Lord. Web apps, AI tools, SaaS products, and premium digital experiences.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop Lord — Full Stack Developer",
    description:
      "Building modern web applications, AI tools, SaaS products, and digital experiences. Founder of BITSANDBYTESDUDE.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: "Loop Lord",
      jobTitle: "Full Stack Developer",
      url: SITE.url,
      email: `mailto:${SITE.email}`,
      sameAs: [SITE.socials.github, SITE.socials.linkedin],
      worksFor: {
        "@type": "Organization",
        name: "BITSANDBYTESDUDE",
        url: SITE.socials.github,
      },
      knowsAbout: [
        "Next.js",
        "React",
        "TypeScript",
        "Node.js",
        "Artificial Intelligence",
        "SaaS",
      ],
    },
    {
      "@type": "WebSite",
      name: "Loop Lord — Digital World",
      url: SITE.url,
      author: { "@type": "Person", name: "Loop Lord" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.noscript-hidden { display: none !important; }`}</style>
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
