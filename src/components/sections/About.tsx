import Reveal from '@/components/Reveal';

const FACTS = [
  'ارتوسرجری و جراحی دو فک',
  'فلوشیپ جراحی‌های کرانیوفیشال',
  'پروتز و جراحی مفاصل گیجگاهی',
  'ایمپلنت و بازسازی فک',
];

export default function About() {
  return (
    <section id="about" className="relative bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-8">
          {/* text column */}
          <div className="lg:col-span-5 lg:pt-10">
            <Reveal>
              <div className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-ink/45">
                <span className="label-num">01</span>
                <span className="h-px w-12 bg-ink/25" />
                <span>درباره</span>
              </div>
            </Reveal>
            <Reveal delay={90}>
              <h2 className="display text-[clamp(2rem,5.2vw,4.25rem)] text-ink">
                جراحی فک و صورت،
                <br />
                در نقطه تلاقی
                <br />
                علم و زیبایی
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-9 max-w-md text-sm font-light leading-8 text-ink/65">
                دکتر حامد کرمانی، متخصص جراحی فک و صورت و فلوشیپ‌دیده جراحی‌های
                کرانیوفیشال، درمان‌های پیچیده فک، صورت و دندان را با نگاهی دقیق به
                تقارن، عملکرد و هارمونی چهره انجام می‌دهد؛ از ارتوگناتیک سرجری و
                بایمکس تا ایمپلنت و بازسازی کامل فک.
              </p>
            </Reveal>
            <Reveal delay={260}>
              <blockquote className="mt-12 border-r border-accent pr-6">
                <p className="max-w-md text-lg font-light leading-9 text-ink/80">
                  «انجام درمان موفق منوط به تجربیات آکادمیک و میدانی مناسب، پایداری
                  به اصول علمی، و فارغ از توجه به زوایای مالی می‌باشد.»
                </p>
              </blockquote>
            </Reveal>
            <Reveal delay={340}>
              <ul className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
                {FACTS.map((f) => (
                  <li
                    key={f}
                    className="group flex items-center justify-between py-4 text-[13px] text-ink/70 transition-colors duration-500 hover:text-ink"
                  >
                    <span>{f}</span>
                    <span className="h-1.5 w-1.5 rotate-45 border border-ink/30 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* floating image composition */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <Reveal delay={150}>
              <figure className="group relative z-10 ml-auto w-[82%] overflow-hidden">
                <img
                  src="/img/doctor-1.jpg"
                  alt="دکتر حامد کرمانی، متخصص جراحی فک و صورت"
                  loading="lazy"
                  className="cine-img aspect-[3/4] w-full object-cover"
                />
                <figcaption className="absolute bottom-0 right-0 bg-ink/85 px-4 py-2 text-[10px] tracking-[0.2em] text-white/80 backdrop-blur-sm">
                  DR. HAMED KERMANI
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={300}>
              <figure className="group relative z-20 -mt-16 w-[52%] overflow-hidden border-[6px] border-paper shadow-2xl md:-mt-24">
                <img
                  src="/img/clinic-interior.jpg"
                  alt="فضای درمانی مطب"
                  loading="lazy"
                  className="cine-img aspect-[4/3] w-full object-cover"
                />
              </figure>
            </Reveal>
            <span className="absolute -left-2 top-10 hidden text-[10px] tracking-[0.45em] text-ink/30 lg:block">
              TEHRAN — OMFS CLINIC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
