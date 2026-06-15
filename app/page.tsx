import Navbar from "@/components/layout/Navbar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import ScrollToSection from "@/components/ui/ScrollToSection";

export default function Home() {
  return (
    <>
      {/* Consumes sessionStorage scrollTo key set by Navbar cross-page navigation */}
      <ScrollToSection />
      <header>
        <Navbar />
      </header>
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <footer>
        <Contact />
      </footer>
    </>
  );
}