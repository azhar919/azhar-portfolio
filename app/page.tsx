import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <FloatingNav />
      <Hero />
      <About />
      <Skills />
      <SelectedWork />
      <FAQ />
      <Contact />
    </main>
  );
}
