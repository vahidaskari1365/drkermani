'use client';

/**
 * Tiny hash router — the sandbox exposes only the `/` route, so category
 * pages live on hash paths:  #/services/<slug>  (deep-linkable, back-button
 * friendly). Plain anchors (#about, …) scroll to home sections as before.
 * The scrubbed film layer stays mounted across every view, so frames are
 * never reloaded and the cinematic scroll keeps its continuity.
 */

export type Route = { view: 'home' } | { view: 'service'; slug: string };

export function parseRoute(): Route {
  if (typeof window === 'undefined') return { view: 'home' };
  const m = window.location.hash.match(/^#\/services\/([\w-]+)/);
  return m ? { view: 'service', slug: m[1] } : { view: 'home' };
}

export function isServiceHash(): boolean {
  return typeof window !== 'undefined' && /^#\/services\//.test(window.location.hash);
}

/** jump to top without CSS smooth-scroll (so the scrub doesn't sweep) */
export function instantTop() {
  const el = document.documentElement;
  const prev = el.style.scrollBehavior;
  el.style.scrollBehavior = 'auto';
  window.scrollTo(0, 0);
  requestAnimationFrame(() => {
    el.style.scrollBehavior = prev;
  });
}

/** navigate to a home section from any view */
export function goSection(id: string) {
  const onHome = parseRoute().view === 'home';
  if (onHome) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    return;
  }
  window.location.hash = '#/';
  // wait for the home view to mount, then glide to the section
  setTimeout(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, 120);
}

/** navigate to a category page */
export function goService(slug: string) {
  window.location.hash = `#/services/${slug}`;
}
