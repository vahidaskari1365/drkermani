import Reveal from '@/components/Reveal';

const FACTS = [
  'ارتوسرجری و جراحی دو فک',
  'فلوشیپ جراحی‌های کرانیوفیشال',
  'پروتز و جراحی مفاصل گیجگاهی',
  'ایمپلنت و بازسازی فک',
];

export default function About() {
  return (
    <section id="about" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          {/* floating glass text panel */}
          <div className="lg:col-span-5 lg:pt-6">
            <Reveal>
              <div className="glass-28 rounded-2xl p-7 md:p-11">
                <div className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/55">
                  <span className="label-num">01</span>
                  <span className="h-px w-12 bg-white/30" />
                  <span>درباره</span>
                </div>
                <h2 className="display text-[clamp(1.9rem,4.4vw,3.4rem)] text-white">
                  جراحی فک و صورت،
                  <br />
                  در نقطه تلاقی
                  <br />
                  علم و زیبایی
                </h2>
                <p className="mt-8 text-sm font-light leading-8 text-white/70">
                  دکتر حامد کرمانی، متخصص جراحی فک و صورت و فلوشیپ‌دیده جراحی‌های
                  کرانیوفیشال، درمان‌های پیچیده فک، صورت و دندان را با نگاهی دقیق به
                  تقارن، عملکرد و هارمونی چهره انجام می‌دهد؛ از ارتوگناتیک سرجری و
                  بایمکس تا ایمپلنت و بازسازی کامل فک.
                </p>
                <blockquote className="mt-10 border-r border-gold pr-6">
                  <p className="text-[15px] font-light leading-9 text-white/85">
                    «انجام درمان موفق منوط به تجربیات آکادمیک و میدانی مناسب،
                    پایداری به اصول علمی، و فارغ از توجه به زوایای مالی می‌باشد.»
                  </p>
                </blockquote>
              </div>
            </Reveal>

            {/* facts — guide rows with hover blur */}
            <Reveal delay={200}>
              <ul className="mt-5">
                {FACTS.map((f) => (
                  <li
                    key={f}
                    className="row-blur group flex items-center justify-between rounded-lg px-4 py-4 text-[13px] text-white/75 last:border-b-0 hover:text-white"
                  >
                    <span>{f}</span>
                    <span className="h-1.5 w-1.5 rotate-45 border border-white/30 transition-colors duration-500 group-hover:border-gold group-hover:bg-gold" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* floating glass-framed image composition */}
          <div className="relative lg:col-span-6 lg:col-start-7">
            <Reveal delay={150}>
              <figure className="glass-18 group relative z-10 ml-auto w-[82%] rounded-2xl p-2">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/img/doctor-1.jpg"
                    alt="دکتر حامد کرمانی، متخصص جراحی فک و صورت"
                    loading="lazy"
                    className="cine-img aspect-[3/4] w-full object-cover"
                  />
                </div>
                <figcaption className="absolute bottom-5 right-5 rounded-full bg-black/45 px-4 py-2 text-[10px] tracking-[0.2em] text-white/85 backdrop-blur-md">
                  DR. HAMED KERMANI
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={300}>
              <figure className="glass-18 group relative z-20 -mt-14 w-[52%] rounded-2xl p-2 md:-mt-20">
                <div className="overflow-hidden rounded-xl">
                  <img
                    src="/img/clinic-interior.jpg"
                    alt="فضای درمانی مطب"
                    loading="lazy"
                    className="cine-img aspect-[4/3] w-full object-cover"
                  />
                </div>
              </figure>
            </Reveal>
            <span className="absolute -left-2 top-10 hidden text-[10px] tracking-[0.45em] text-white/40 lg:block">
              TEHRAN — OMFS CLINIC
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
