import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { Hero } from "../sections/Hero";
import { Features } from "../sections/Features";
import { Pricing } from "../sections/Pricing";
import { Testimonials } from "../sections/Testimonials";

export function LandingPage() {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
