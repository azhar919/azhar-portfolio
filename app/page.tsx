import FloatingNav from "@/components/FloatingNav";
import MobileActionBar from "@/components/MobileActionBar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import Skills from "@/components/Skills";
import SelectedWork from "@/components/SelectedWork";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main>
      <FloatingNav />
      <MobileActionBar />
      <Hero />
      <About />
      <Skills />
      <TrustStrip />
      <SelectedWork />
      <FAQ />
      <Contact />
    </main>
  );
}
