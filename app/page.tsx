import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Marquee } from "@/components/layout/marquee";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Story } from "@/components/sections/story";
import { Journey } from "@/components/sections/journey";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Story />
        <Projects />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
