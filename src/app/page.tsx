'use client';

import { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import ScrollVideoHero from '@/components/ScrollVideoHero';
import ServicePage from '@/components/ServicePage';
import Footer from '@/components/Footer';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Gallery from '@/components/sections/Gallery';
import Pricing from '@/components/sections/Pricing';
import Team from '@/components/sections/Team';
import Contact from '@/components/sections/Contact';
import { instantTop, parseRoute, type Route } from '@/lib/router';

/**
 * ============================================================================
 *  HOME SHELL + tiny hash router.
 *  · '/' renders the full cinematic scroll (film behind, glass sections).
 *  · '#/services/<slug>' renders one category page — same film layer keeps
 *    running behind it (frames are never reloaded, scrub continuity holds).
 *  · Plain anchors (#about …) always mean "home + scroll to section".
 * ============================================================================
 */
export default function Home() {
  const [route, setRoute] = useState<Route>({ view: 'home' });
  const prevView = useRef<'home' | 'service'>('home');

  useEffect(() => {
    const apply = () => {
      const next = parseRoute();
      setRoute(next);

      if (next.view === 'service') {
        // entering a category page → always land at its top, instantly
        instantTop();
      } else if (prevView.current === 'service') {
        // back home from a category → top (unless a section anchor follows)
        const anchor = /^#\w/.test(window.location.hash)
          ? window.location.hash.slice(1)
          : null;
        if (anchor) {
          setTimeout(() => {
            document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
          }, 140);
        } else {
          instantTop();
        }
      }
      prevView.current = next.view;
    };

    window.addEventListener('hashchange', apply);
    apply(); // deep-link support on first load
    return () => window.removeEventListener('hashchange', apply);
  }, []);

  return (
    <>
      <Navbar />
      {/* the scrubbed film is a fixed full-page layer (z-0) inside ScrollVideoHero;
          every view below floats above it (z-10) as glass panels — one single
          page scroll drives frames 1→151 across the whole document. */}
      <main className="relative min-h-screen">
        <ScrollVideoHero heroCopy={route.view === 'home'} />
        {route.view === 'service' ? (
          <ServicePage slug={route.slug} />
        ) : (
          <>
            <About />
            <Services />
            <Gallery />
            <Pricing />
            <Team />
            <Contact />
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
