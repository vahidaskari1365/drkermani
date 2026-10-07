'use client';

import { useEffect, useState } from 'react';
import { goSection } from '@/lib/router';

const LINKS = [
  { href: '#about', label: 'درباره', num: '01' },
  { href: '#services', label: 'خدمات', num: '02' },
  { href: '#gallery', label: 'نمونه‌کارها', num: '03' },
  { href: '#pricing', label: 'هزینه‌ها', num: '04' },
  { href: '#team', label: 'تیم', num: '05' },
  { href: '#contact', label: 'تماس', num: '06' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? 'border-b border-white/12 bg-ink/45 backdrop-blur-2xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
          {/* wordmark */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              goSection('hero');
            }}
            className="group flex items-baseline gap-2 text-white"
          >
            <span className="display text-lg md:text-xl">دکتر حامد کرمانی</span>
            <span className="hidden text-[10px] tracking-[0.25em] text-white/50 md:inline">
              OMFS
            </span>
          </a>

          {/* desktop links */}
          <div className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  goSection(l.href.slice(1));
                }}
                className="u-link text-[13px] text-white/85 transition-colors duration-300 hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:02166921500"
              dir="ltr"
              className="label-num hidden border border-white/25 px-5 py-2.5 text-xs text-white transition-all duration-500 hover:border-white hover:bg-white hover:text-ink md:inline-block"
            >
              021 6692 1500
            </a>
            {/* burger */}
            <button
              onClick={() => setOpen(true)}
              aria-label="باز کردن منو"
              className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] text-white lg:hidden"
            >
              <span className="h-px w-7 bg-current" />
              <span className="h-px w-5 bg-current transition-all duration-300" />
            </button>
          </div>
        </nav>
      </header>

      {/* fullscreen editorial menu (mobile) */}
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink/95 text-white backdrop-blur-2xl transition-all duration-700 lg:hidden ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className="flex h-[72px] items-center justify-between px-5">
          <span className="display text-lg">دکتر حامد کرمانی</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="بستن منو"
            className="relative h-11 w-11"
          >
            <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 rotate-45 bg-current" />
            <span className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -rotate-45 bg-current" />
          </button>
        </div>
        <nav className="flex flex-1 flex-col justify-center px-8">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                goSection(l.href.slice(1));
              }}
              className={`group flex items-baseline gap-5 border-b border-white/10 py-5 transition-all duration-700 ${
                open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
              style={{ transitionDelay: `${120 + i * 60}ms` }}
            >
              <span className="label-num text-[11px] text-white/60">{l.num}</span>
              <span className="display text-3xl transition-colors duration-300 group-hover:text-accent-soft">
                {l.label}
              </span>
            </a>
          ))}
        </nav>
        <div className="px-8 pb-10">
          <a href="tel:02166921500" dir="ltr" className="label-num text-sm text-white/70">
            021 6692 1500 — <span dir="rtl">رزرو نوبت</span>
          </a>
        </div>
      </div>
    </>
  );
}
