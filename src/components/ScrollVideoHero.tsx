'use client';

/**
 * ============================================================================
 * FULL-PAGE SCROLL-SCRUBBED VIDEO LAYER — single source of truth for scrub.
 * ----------------------------------------------------------------------------
 * · The film is a `fixed inset-0` layer BEHIND all page content (z-0):
 *   the video stays visible for the ENTIRE page scroll, frame 1 → 151.
 * · Overall document scroll position (0→1) maps linearly onto the frames;
 *   a rAF loop lerps the rendered frame toward the scroll target so the
 *   scrub feels cinematic and butter-smooth on wheel, touch and keyboard.
 * · Progress is exported to the document root as `--p` (whole page) and
 *   `--hp` (hero-local 0→1) so overlay copy can fade/rise WITHOUT React
 *   re-renders during scrolling.
 * · All sections float above the film as glass panels (see globals.css):
 *   glass-28 text panels, glass-18 cards, glass-gold feature card and
 *   row-blur hover rows. No opaque section backgrounds anywhere.
 * ⚠ Nothing outside this component should mutate its DOM or scroll behavior.
 * ============================================================================
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 151;
const frameSrc = (i: number) => `/frames/f_${String(i + 1).padStart(3, '0')}.jpg`;

/* Backing-store pixel budget: the source frames are only 1152×648 (~0.75MP),
   so rendering at full DPR² on a phone or a 1440p display just burns GPU
   time upscaling them. The cap keeps every real pixel of detail at a
   fraction of the composite cost. */
const MAX_CANVAS_PIXELS = 1_500_000; // ~1.5MP (≈ 1550×965)

export default function ScrollVideoHero({
  heroCopy = true,
}: {
  heroCopy?: boolean;
}) {
  const heroRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetRef = useRef(0); // scroll target  0..1 (whole page)
  const currentRef = useRef(0); // rendered frame position 0..(N-1)
  const drawnRef = useRef(-1);

  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);

  /* ---------------- canvas drawing (cover fit, DPR-aware) --------------- */
  const draw = useCallback((idx: number) => {
    const canvas = canvasRef.current;
    const img = imagesRef.current[idx];
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const s = Math.max(w / iw, h / ih); // cover — preserves aspect ratio
    const dw = iw * s;
    const dh = ih * s;
    ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
  }, []);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = Math.round(canvas.clientWidth * dpr);
    let h = Math.round(canvas.clientHeight * dpr);
    const px = w * h;
    if (px > MAX_CANVAS_PIXELS) {
      const k = Math.sqrt(MAX_CANVAS_PIXELS / px);
      w = Math.round(w * k);
      h = Math.round(h * k);
    }
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (ctx) ctx.imageSmoothingQuality = 'medium';
      drawnRef.current = -1; // force redraw after resize
    }
  }, []);

  /* ------- frame preloading — progressive, in two waves (runs once) -----
     Wave 1 loads every 4th frame so the whole scroll range can scrub
     immediately (31 requests instead of 151 — the loader clears fast and
     mobile decoding pressure drops). Wave 2 fills the gaps in idle time,
     in small chunks, so the main thread never stalls. */
  useEffect(() => {
    if (imagesRef.current.length) return; // images already queued
    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    imagesRef.current = imgs;
    let done = 0;

    const mark = () => {
      done++;
      setPct(Math.round((done / FRAME_COUNT) * 100));
    };
    const load = (i: number) => {
      const im = new Image();
      im.decoding = 'async';
      im.onload = im.onerror = mark;
      im.src = frameSrc(i);
      imgs[i] = im;
    };

    const idle = (cb: () => void) => {
      const w = window as unknown as {
        requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      };
      if (typeof w.requestIdleCallback === 'function')
        w.requestIdleCallback(cb, { timeout: 1200 });
      else setTimeout(cb, 120);
    };

    // --- wave 1: stride 4, parallel -------------------------------------
    const stride = 4;
    let wave1Left = 0;
    for (let i = 0; i < FRAME_COUNT; i += stride) {
      wave1Left++;
      load(i);
    }
    const onWave1 = () => {
      wave1Left--;
      if (wave1Left === 0) {
        setReady(true); // full-range scrub available — hide the loader
        // --- wave 2: the gaps, chunked in idle time ---------------------
        const gaps: number[] = [];
        for (let i = 0; i < FRAME_COUNT; i++) if (!imgs[i]) gaps.push(i);
        let k = 0;
        const pump = () => {
          const end = Math.min(k + 8, gaps.length);
          for (; k < end; k++) load(gaps[k]);
          if (k < gaps.length) idle(pump);
        };
        idle(pump);
      }
    };
    for (let i = 0; i < FRAME_COUNT; i += stride) {
      const im = imgs[i];
      if (im.complete) onWave1();
      else im.addEventListener('load', onWave1, { once: true });
    }

    // first paint as soon as the opening frame is available
    const boot = () => {
      if (drawnRef.current === -1) {
        drawnRef.current = 0;
        draw(0);
      }
    };
    if (imgs[0].complete) boot();
    else imgs[0].addEventListener('load', boot, { once: true });
  }, [draw]);

  /* ------------- scrub engine (page scroll → frame mapping) -------------
     Idle-aware: the rAF loop runs only while the frame is still gliding
     toward the scroll target and parks itself once settled, so reading
     any section costs zero animation work (no battery drain, no jank).
     Scroll/resize kick it back to life. */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduced ? 1 : 0.18; // lerp factor (1 = direct, no smoothing)

    let raf = 0;
    const loop = () => {
      const t = targetRef.current * (FRAME_COUNT - 1);
      const c = currentRef.current;
      const n = Math.abs(t - c) < 0.01 ? t : c + (t - c) * ease;
      currentRef.current = n;
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(n)));
      if (idx !== drawnRef.current) {
        drawnRef.current = idx;
        draw(idx);
      }
      if (n === t) {
        raf = 0; // settled — park the loop until the next scroll
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const compute = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      targetRef.current = p;
      doc.style.setProperty('--p', p.toFixed(4));

      // hero-local progress (0 → 1 while the first viewport scrolls away)
      const hero = heroRef.current;
      if (hero) {
        const top = hero.getBoundingClientRect().top;
        const hp = Math.min(1, Math.max(0, -top / Math.max(1, window.innerHeight)));
        doc.style.setProperty('--hp', hp.toFixed(4));
      }
    };

    const onScroll = () => {
      compute();
      kick();
    };
    const onResize = () => {
      sizeCanvas();
      compute();
      kick();
    };

    sizeCanvas();
    compute();
    drawnRef.current = Math.round(currentRef.current);
    draw(drawnRef.current); // immediate first paint
    kick();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [draw, sizeCanvas]);

  return (
    <>
      {/* ================= fixed film layer — visible on every scroll ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 select-none"
      >
        {/* SSR first paint */}
        <img
          src="/frames/poster.jpg"
          alt=""
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* scrubbed video surface */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* barely-there cinematic treatment — never an opaque cover */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 50% 45%, transparent 55%, rgba(0,0,0,0.26) 100%)',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />

        {/* minimal film-style loader */}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-end justify-center pb-7 transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex w-56 flex-col items-center gap-3">
            <div className="h-px w-full bg-white/25">
              <div
                className="h-px bg-white transition-[width] duration-300 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="label-num text-[10px] tracking-[0.3em] text-white/70">
              {pct}%
            </span>
          </div>
        </div>
      </div>

      {/* ================= hero copy — floats over the film ============== */}
      {/* rendered on the home view only; the film layer itself always stays */}
      {heroCopy ? (
      <section
        ref={heroRef}
        id="hero"
        aria-label="نمایش سینمایی جراحی‌های فک و صورت دکتر حامد کرمانی — ویدیو با اسکرول صفحه کنترل می‌شود"
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-white"
      >
        <div
          className="flex flex-col items-center"
          style={{
            opacity: 'calc(1 - var(--hp, 0) * 1.25)',
            transform: 'translateY(calc(var(--hp, 0) * -10vh))',
          }}
        >
          <p className="glass-18 mb-7 rounded-full px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] text-white/90 md:text-xs">
            فلوشیپ جراحی‌های کرانیوفیشال
          </p>
          <h1 className="display text-[clamp(2.6rem,8.5vw,7.5rem)] text-white">
            دکتر حامد کرمانی
          </h1>
          <div className="mt-6 flex items-center gap-4 md:gap-6">
            <span className="hidden h-px w-10 bg-white/60 md:block" />
            <p className="text-lg font-light text-white/95 md:text-2xl">
              متخصص جراحی فک و صورت
            </p>
            <span className="hidden h-px w-10 bg-white/60 md:block" />
          </div>
          <p className="mt-8 max-w-xl text-[13px] font-normal leading-7 text-white/90 md:text-sm">
            ارتوسرجری · جراحی دو فک · جنیوپلاستی · بلفاروپلاستی · ایمپلنت و بازسازی فک
          </p>

          <div className="mt-12 flex flex-col items-center gap-5 sm:flex-row">
            <a
              href="tel:02166921500"
              className="ts-none rounded-full bg-white px-9 py-3.5 text-sm font-medium text-ink transition-all duration-500 hover:bg-gold hover:text-white"
            >
              رزرو نوبت
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById('services')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="glass-18 rounded-full px-8 py-3.5 text-sm text-white transition-all duration-500 hover:border-white/35 hover:bg-white/15"
            >
              مشاهده خدمات
            </a>
          </div>
        </div>

        {/* vertical editorial side label (desktop) */}
        <div
          className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{ opacity: 'calc(0.55 - var(--hp, 0) * 0.55)' }}
        >
          <span
            className="block text-[10px] tracking-[0.5em] text-white/75"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            HAMED KERMANI — ORAL &amp; MAXILLOFACIAL SURGERY
          </span>
        </div>

        {/* scroll cue */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-4"
          style={{ opacity: 'calc(1 - var(--hp, 0) * 1.6)' }}
        >
          <span className="text-[11px] tracking-[0.35em] text-white/80">اسکرول</span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>
      </section>
      ) : null}
    </>
  );
}
