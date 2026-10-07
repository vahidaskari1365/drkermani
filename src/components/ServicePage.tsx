'use client';

import Reveal from '@/components/Reveal';
import { SERVICES, SERVICE_ORDER } from '@/lib/services-data';
import { goSection, goService } from '@/lib/router';

/**
 * ============================================================================
 *  SERVICE CATEGORY PAGE — one cinematic view per treatment category.
 *  Same design language as the homepage: the scrubbed film stays visible
 *  behind everything, content floats as glass panels (28px text panels,
 *  18px cards, golden CTA) and every text keeps the global text-shadow.
 * ============================================================================
 */

export default function ServicePage({ slug }: { slug: string }) {
  const s = SERVICES[slug];

  if (!s) {
    return (
      <section className="relative z-10 flex min-h-screen items-center justify-center px-6">
        <Reveal>
          <div className="glass-28 rounded-2xl p-10 text-center">
            <p className="display text-3xl text-white">صفحه‌ای که دنبالش بودید پیدا نشد</p>
            <button
              onClick={() => {
                window.location.hash = '#/';
              }}
              className="ts-none mt-8 rounded-full bg-white px-8 py-3 text-sm font-medium text-ink transition-colors duration-500 hover:bg-gold hover:text-white"
            >
              بازگشت به صفحه اصلی
            </button>
          </div>
        </Reveal>
      </section>
    );
  }

  const related = s.related
    .filter((r) => SERVICES[r])
    .map((r) => SERVICES[r]);

  return (
    <article className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-28 md:px-10 md:pb-32 md:pt-36">
        {/* ---------------- breadcrumb ---------------- */}
        <Reveal>
          <nav
            aria-label="مسیر صفحه"
            className="mb-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] tracking-[0.2em] text-white/65"
          >
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                window.location.hash = '#/';
              }}
              className="u-link transition-colors duration-300 hover:text-white"
            >
              خانه
            </a>
            <span className="h-1 w-1 rotate-45 bg-white/40" />
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                goSection('services');
              }}
              className="u-link transition-colors duration-300 hover:text-white"
            >
              خدمات
            </a>
            <span className="h-1 w-1 rotate-45 bg-white/40" />
            <span className="text-white/90">{s.title}</span>
          </nav>
        </Reveal>

        {/* ---------------- headline ---------------- */}
        <Reveal delay={80}>
          <div className="flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/60">
            <span className="label-num">{s.num}</span>
            <span className="h-px w-12 bg-white/35" />
            <span className="label-num">{s.en}</span>
          </div>
        </Reveal>
        <Reveal delay={140}>
          <h1 className="display mt-6 text-[clamp(2.6rem,7.5vw,6.5rem)] text-white">
            {s.title}
          </h1>
        </Reveal>
        <Reveal delay={200}>
          <p className="mt-6 max-w-2xl text-[15px] font-normal leading-9 text-white/90 md:text-base">
            {s.tagline}
          </p>
        </Reveal>

        {/* ---------------- intro + image ---------------- */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <Reveal delay={120} className="lg:col-span-7">
            <div className="glass-28 h-full rounded-2xl p-7 md:p-10">
              <p className="text-sm font-normal leading-9 text-white/85 md:text-[15px] md:leading-10">
                {s.intro}
              </p>

              {/* quick facts */}
              <div className="mt-9 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {s.facts.map((f) => (
                  <div
                    key={f.v}
                    className="glass-18 rounded-xl px-4 py-4 text-center sm:text-right"
                  >
                    <span className="label-num display block text-xl text-gold md:text-2xl">
                      {f.k}
                    </span>
                    <span className="mt-2 block text-[11px] font-normal leading-6 text-white/80">
                      {f.v}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={220} className="lg:col-span-5">
            <figure className="glass-18 h-full rounded-2xl p-2">
              <div className="relative h-full min-h-[260px] overflow-hidden rounded-xl">
                <img
                  src={s.img}
                  alt={s.imgAlt}
                  className="cine-img absolute inset-0 h-full w-full object-cover"
                />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-xl bg-black/55 px-4 py-2.5 text-[11px] tracking-wider text-white/90 backdrop-blur-md">
                  {s.imgCap}
                </figcaption>
              </div>
            </figure>
          </Reveal>
        </div>

        {/* ---------------- body + prices ---------------- */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* body sections */}
          <div className="flex flex-col gap-6 lg:col-span-7">
            {s.body.map((b, i) => (
              <Reveal key={b.h} delay={i * 90}>
                <div className="glass-28 rounded-2xl p-7 md:p-9">
                  <h2 className="display text-xl text-white md:text-2xl">{b.h}</h2>
                  <p className="mt-5 text-sm font-normal leading-9 text-white/85">
                    {b.p}
                  </p>
                </div>
              </Reveal>
            ))}

            {/* care — before/after */}
            {s.care ? (
              <Reveal delay={120}>
                <div className="glass-28 rounded-2xl p-7 md:p-9">
                  <div className="mb-7 flex items-baseline justify-between">
                    <h2 className="display text-xl text-white md:text-2xl">
                      مراقبت‌های قبل و بعد از جراحی
                    </h2>
                    <span className="label-num text-[10px] tracking-[0.3em] text-white/55">
                      CARE GUIDE
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {(
                      [
                        ['قبل از جراحی', s.care.before],
                        ['بعد از جراحی', s.care.after],
                      ] as const
                    ).map(([label, items]) => (
                      <div key={label}>
                        <h3 className="mb-4 flex items-center gap-3 text-[13px] font-medium text-gold">
                          <span className="h-px w-8 bg-gold/60" />
                          {label}
                        </h3>
                        <ul className="space-y-3">
                          {items.map((it) => (
                            <li
                              key={it}
                              className="flex items-start gap-3 text-[12.5px] font-normal leading-7 text-white/85"
                            >
                              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold/70" />
                              <span>{it}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <p className="mt-8 border-t border-white/15 pt-5 text-[11px] font-normal leading-6 text-white/65">
                    ارتباط در هفته اول پس از جراحی از طریق واتساپ و تلگرام با شماره{' '}
                    <span className="label-num" dir="ltr">
                      ۰۹۳۸۲۰۸۰۲۷۰
                    </span>{' '}
                    پاسخ‌گوست.
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>

          {/* sticky price rail */}
          <div className="lg:col-span-5">
            <div className="flex flex-col gap-6 lg:sticky lg:top-24">
              <Reveal delay={140}>
                <div className="glass-18 rounded-2xl p-7">
                  <div className="mb-6 flex items-baseline justify-between">
                    <h2 className="text-lg font-medium text-white">هزینه‌های این بخش</h2>
                    <span className="label-num text-[10px] tracking-[0.3em] text-white/55">
                      PRICES
                    </span>
                  </div>
                  <ul className="border-t border-white/15">
                    {s.prices.map(([name, price]) => (
                      <li
                        key={name}
                        className="flex items-baseline justify-between gap-4 border-b border-white/12 py-3.5 last:border-b-0"
                      >
                        <span className="text-[12.5px] font-normal leading-7 text-white/85">
                          {name}
                        </span>
                        <span className="shrink-0 text-[12.5px] font-medium text-white">
                          {price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-[11px] font-normal leading-6 text-white/65">
                    {s.priceNote}
                  </p>
                </div>
              </Reveal>

              {/* golden CTA */}
              <Reveal delay={220}>
                <div className="glass-gold rounded-2xl p-7 text-center">
                  <p className="text-[13px] font-normal leading-7 text-white/95">
                    برای طرح درمان اختصاصی و برآورد دقیق، مشاوره رزرو کنید.
                  </p>
                  <a
                    href="tel:02166921500"
                    dir="ltr"
                    className="ts-none mt-5 inline-block w-full rounded-full bg-white py-3 text-sm font-medium text-ink transition-colors duration-500 hover:bg-ink hover:text-white"
                  >
                    021 6692 1500
                  </a>
                  <p className="mt-4 text-[10px] tracking-[0.25em] text-white/75">
                    مشاوره تلفنی در تمام ایام هفته
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ---------------- related categories ---------------- */}
        <Reveal delay={100}>
          <div className="mt-16">
            <div className="mb-6 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/60">
              <span className="h-px w-12 bg-white/35" />
              <span>دسته‌بندی‌های دیگر</span>
            </div>
            <div className="border-t border-white/15">
              {related.map((r) => (
                <a
                  key={r.slug}
                  href={`#/services/${r.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goService(r.slug);
                  }}
                  className="row-blur group flex items-center justify-between gap-6 px-3 py-5"
                >
                  <span className="flex items-baseline gap-5">
                    <span className="label-num text-[11px] text-white/50 transition-colors duration-500 group-hover:text-gold">
                      {r.num}
                    </span>
                    <span className="display text-lg text-white md:text-2xl">
                      {r.title}
                    </span>
                  </span>
                  <span className="text-[12px] font-normal text-white/70 transition-all duration-500 group-hover:-translate-x-1 group-hover:text-white">
                    مشاهده صفحه
                    <span className="mr-2 inline-block">←</span>
                  </span>
                </a>
              ))}
            </div>

            {/* full services index */}
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                goSection('services');
              }}
              className="u-link mt-8 inline-block text-[13px] font-normal text-gold"
            >
              مشاهده همه خدمات در صفحه اصلی
            </a>
          </div>
        </Reveal>
      </div>
    </article>
  );
}

/** small helper for grids that need ordered access */
export function orderedServices() {
  return SERVICE_ORDER.map((slug) => SERVICES[slug]);
}
