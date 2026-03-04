"use client";


import SmoothScroll from "@/components/effects/SmoothScroll";
import ScrollProgress from "@/components/effects/ScrollProgress";
import PageLoader from "@/components/effects/PageLoader";

import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import VideoHighlight from "@/components/sections/VideoHighlight";
import TechMarquee from "@/components/sections/TechMarquee";
import WhyUs from "@/components/sections/WhyUs";
import PromoShowcase from "@/components/sections/PromoShowcase";
import Curriculum from "@/components/sections/Curriculum";
import Schedule from "@/components/sections/Schedule";
import Gallery from "@/components/sections/Gallery";
import Events from "@/components/sections/Events";
import Reviews from "@/components/sections/Reviews";
import Testimonials from "@/components/sections/Testimonials";

import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";


export default function Home() {
  return (
    <SmoothScroll>
      <>
        <PageLoader />
        <ScrollProgress />
        <main>
          {/* Content wrapper — sits above footer for reveal effect */}
          <div className="relative z-10 bg-white">
            <Navbar />
            <Hero />
            <VideoHighlight />
            <TechMarquee />
            <WhyUs />
            <PromoShowcase />
            <Curriculum />
            <Schedule />
            <Gallery />
            <Events />
            <Reviews />
            <Testimonials />

            <Pricing />
            <FAQ />
            <Contact />
          </div>

        </main>

      </>
    </SmoothScroll>
  );
}
