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
      <main className="min-h-screen">
        {/* scroll-scrubbed cinematic video — the single scrub system of the page */}
        <ScrollVideoHero />
        {/* editorial content flows below; no nested scroll containers anywhere */}
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
