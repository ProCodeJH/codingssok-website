import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import MouseTracker from "@/components/effects/MouseTracker";

export default function Home() {
  return (
    <MouseTracker>
      <Navbar />
      <Hero />
      <Footer />
    </MouseTracker>
  );
}
