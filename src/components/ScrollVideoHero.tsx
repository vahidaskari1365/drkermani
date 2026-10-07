'use client';

/**
 * ============================================================================
 * SCROLL-SCRUBBED VIDEO HERO  —  single source of truth for the scrub logic.
 * ----------------------------------------------------------------------------
 * · The outer <section> is the scrub track (h-[320vh] / md:h-[430vh]).
 * · The inner viewport is `sticky top-0 h-screen` — it NEVER scrolls on its
 *   own; there is no nested scroll container anywhere in the Hero.
 * · Page scroll position (0→1) maps linearly onto video frames 1→151.
 * · A rAF loop lerps the rendered frame toward the scroll target so the
 *   scrub feels cinematic and butter-smooth on wheel, touch and keyboard.
 * · Progress is exported to CSS as `--p` on the section element so overlay
 *   copy can fade/rise WITHOUT React re-renders during scrolling.
 * ⚠ Nothing outside this component should mutate its DOM or scroll behavior.
 * ============================================================================
 */

import { useCallback, useEffect, useRef, useState } from 'react';

const FRAME_COUNT = 151;
const frameSrc = (i: number) => `/frames/f_${String(i + 1).padStart(3, '0')}.jpg`;

export default function ScrollVideoHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetRef = useRef(0); // scroll target  0..(N-1)
  const currentRef = useRef(0); // rendered frame
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
    const w = Math.round(canvas.clientWidth * dpr);
    const h = Math.round(canvas.clientHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      drawnRef.current = -1; // force redraw after resize
    }
  }, []);

  /* ---------------- frame preloading (guarded, runs once) -------------- */
  useEffect(() => {
    if (imagesRef.current.length) return; // images already queued
    let done = 0;

    const imgs: HTMLImageElement[] = new Array(FRAME_COUNT);
    const mark = () => {
      done++;
      setPct(Math.round((done / FRAME_COUNT) * 100));
      if (done >= FRAME_COUNT) setReady(true);
    };
    for (let i = 0; i < FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = 'async';
      im.src = frameSrc(i);
      if (im.complete) mark();
      else {
        im.onload = mark;
        im.onerror = mark;
      }
      imgs[i] = im;
    }
    imagesRef.current = imgs;

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

  /* ---------------- scrub engine (scroll → frame mapping) -------------- */
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduced ? 1 : 0.14; // lerp factor (1 = direct, no smoothing)

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
      raf = requestAnimationFrame(loop);
    };

    const compute = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      targetRef.current = p;
      el.style.setProperty('--p', p.toFixed(4));
    };

    const onResize = () => {
      sizeCanvas();
      compute();
    };

    sizeCanvas();
    compute();
    draw(Math.round(currentRef.current)); // immediate first paint

    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', onResize);
    };
  }, [draw, sizeCanvas]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="نمایش سینمایی جراحی‌های فک و صورت دکتر حامد کرمانی — ویدیو با اسکرول صفحه کنترل می‌شود"
      style={{ '--p': 0 } as React.CSSProperties}
      className="relative h-[320vh] md:h-[430vh]"
    >
      {/* sticky viewport — the only full-screen surface, never scrolls itself */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-ink">
        {/* SSR first paint */}
        <img
          src="/frames/poster.jpg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        {/* scrubbed video surface */}
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className="absolute inset-0 h-full w-full"
        />

        {/* cinematic scrims */}
        <div className="pointer-events-none absolute inset-0 bg-ink/25" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.42)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/55 via-black/20 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* ---- overlay copy (floats with the scene, driven by --p) ---- */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white"
          style={{
            opacity: 'calc(1 - min(1, var(--p) * 2.4))',
            transform: 'translateY(calc(var(--p) * -9vh))',
          }}
        >
          <p className="mb-7 border border-white/30 bg-white/5 px-4 py-2 text-[11px] font-medium tracking-[0.18em] text-white/85 backdrop-blur-sm md:text-xs">
            فلوشیپ جراحی‌های کرانیوفیشال
          </p>
          <h1 className="display text-[clamp(2.6rem,8.5vw,7.5rem)] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.35)]">
            دکتر حامد کرمانی
          </h1>
          <div className="mt-6 flex items-center gap-4 md:gap-6">
            <span className="hidden h-px w-10 bg-white/50 md:block" />
            <p className="text-lg font-light text-white/90 md:text-2xl">
              متخصص جراحی فک و صورت
            </p>
            <span className="hidden h-px w-10 bg-white/50 md:block" />
          </div>
          <p className="mt-8 max-w-xl text-[13px] font-light leading-7 text-white/65 md:text-sm">
            ارتوسرجری · جراحی دو فک · جنیوپلاستی · بلفاروپلاستی · ایمپلنت و بازسازی فک
          </p>

          <div
            className="mt-12 flex flex-col items-center gap-5 sm:flex-row"
            style={{ opacity: 'calc(1 - min(1, var(--p) * 3.2))' }}
          >
            <a
              href="tel:02166921500"
              className="bg-white px-9 py-3.5 text-sm font-medium text-ink transition-colors duration-500 hover:bg-accent hover:text-white"
            >
              رزرو نوبت
            </a>
            <a
              href="#services"
              className="u-link px-2 py-3 text-sm text-white/85"
            >
              مشاهده خدمات
            </a>
          </div>
        </div>

        {/* vertical editorial side label (desktop) */}
        <div
          className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 lg:block"
          style={{
            opacity: 'calc(0.55 - min(0.55, var(--p) * 1.4))',
          }}
        >
          <span
            className="block text-[10px] tracking-[0.5em] text-white/70"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            HAMED KERMANI — ORAL &amp; MAXILLOFACIAL SURGERY
          </span>
        </div>

        {/* scroll cue */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-4"
          style={{
            opacity: 'calc(1 - min(1, var(--p) * 14))',
          }}
        >
          <span className="text-[11px] tracking-[0.35em] text-white/70">اسکرول</span>
          <span className="scroll-cue" aria-hidden="true" />
        </div>

        {/* minimal film-style loader */}
        <div
          className={`pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-center pb-8 transition-opacity duration-700 ${
            ready ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="flex w-56 flex-col items-center gap-3">
            <div className="h-px w-full bg-white/20">
              <div
                className="h-px bg-white transition-[width] duration-300 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="label-num text-[10px] tracking-[0.3em] text-white/60">
              {pct}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
