"use client";

import MouseTracker from "@/components/effects/MouseTracker";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import WhyUs from "@/components/sections/WhyUs";
import Curriculum from "@/components/sections/Curriculum";
import Testimonials from "@/components/sections/Testimonials";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <MouseTracker>
      <main>
        <Navbar />
        <Hero />
        <WhyUs />
        <Curriculum />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </MouseTracker>
  );
}
