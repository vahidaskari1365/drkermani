import Navbar from '@/components/Navbar';
import ScrollVideoHero from '@/components/ScrollVideoHero';
import Footer from '@/components/Footer';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Pricing from '@/components/sections/Pricing';
import Team from '@/components/sections/Team';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      {/* the scrubbed film is a fixed full-page layer (z-0) inside ScrollVideoHero;
          every section below floats above it (z-10) as glass panels — one single
          page scroll drives frames 1→151 across the whole document. */}
      <main className="relative min-h-screen">
        <ScrollVideoHero />
        <About />
        <Services />
        <Gallery />
        <Pricing />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
