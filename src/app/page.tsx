import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Curriculum from "@/components/sections/Curriculum";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div id="main-content" style={{ width: '100%', maxWidth: '100%', display: 'block' }}>
      <Navbar />
      <Hero />
      <Curriculum />
      <Services />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
