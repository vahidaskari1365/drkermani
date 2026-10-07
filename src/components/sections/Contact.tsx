import Reveal from '@/components/Reveal';

const HOURS = [
  ['شنبه', 'دکتر رستم‌خانی', '۱۵:۰۰ تا ۱۹:۰۰'],
  ['یکشنبه', 'دکتر کرمانی', '۱۵:۰۰ تا ۱۹:۰۰'],
  ['دوشنبه', 'دکتر رستم‌خانی', '۱۵:۰۰ تا ۱۹:۰۰'],
  ['سه‌شنبه', 'دکتر کرمانی', '۱۵:۰۰ تا ۱۹:۰۰'],
  ['چهارشنبه', 'دکتر کرمانی', '۱۵:۰۰ تا ۱۹:۰۰'],
  ['پنجشنبه و جمعه', '—', 'تعطیل'],
];

const CHANNELS = [
  { label: 'رزرو نوبت', value: '021 6692 1500', href: 'tel:02166921500', ltr: true },
  { label: 'تماس و واتساپ', value: '0938 208 0270', href: 'tel:09382080270', ltr: true },
  { label: 'اینستاگرام', value: '@dr.hamedkermani.omfs', href: 'https://instagram.com/dr.hamedkermani.omfs', ltr: true },
  { label: 'آپارات', value: 'aparat.com/dromfs', href: 'https://www.aparat.com/dromfs', ltr: true },
];

export default function Contact() {
  return (
    <section id="contact" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <Reveal>
          <div className="mb-10 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/55">
            <span className="label-num">06</span>
            <span className="h-px w-12 bg-white/30" />
            <span>تماس</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="display text-[clamp(2.4rem,7vw,6rem)] text-white">
            گفت‌وگو را شروع کنید
          </h2>
        </Reveal>

        {/* booking — the golden glass moment */}
        <Reveal delay={160}>
          <div className="glass-gold mt-10 inline-flex flex-wrap items-center gap-x-7 rounded-2xl p-7 md:p-9">
            <a
              href="tel:02166921500"
              className="label-num text-[clamp(1.6rem,5vw,4.2rem)] font-bold leading-none text-white transition-colors duration-500 hover:text-white/85"
              dir="ltr"
            >
              021 6692 1500
            </a>
            <span className="text-xs font-light tracking-[0.3em] text-white/70">
              BOOKING
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* hours */}
          <Reveal delay={100} className="lg:col-span-5">
            <div className="glass-28 h-full rounded-2xl p-6 md:p-8">
              <h3 className="mb-5 flex items-baseline justify-between text-lg font-medium text-white">
                ساعات کاری
                <span className="label-num text-[10px] tracking-[0.35em] text-white/45">
                  HOURS
                </span>
              </h3>
              <ul className="border-t border-white/15">
                {HOURS.map(([day, doctor, time]) => (
                  <li
                    key={day}
                    className="grid grid-cols-2 items-baseline gap-2 border-b border-white/12 py-3.5 text-[13px] font-light last:border-b-0 md:grid-cols-3"
                  >
                    <span className="text-white/85">{day}</span>
                    <span className="hidden text-white/50 md:inline">{doctor}</span>
                    <span
                      className={`text-left ${
                        time === 'تعطیل' ? 'text-white/40' : 'text-white/75'
                      }`}
                    >
                      {time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* channels */}
          <Reveal delay={180} className="lg:col-span-4">
            <div className="glass-28 h-full rounded-2xl p-6 md:p-8">
              <h3 className="mb-5 flex items-baseline justify-between text-lg font-medium text-white">
                راه‌های ارتباطی
                <span className="label-num text-[10px] tracking-[0.35em] text-white/45">
                  CONTACT
                </span>
              </h3>
              <ul className="border-t border-white/15">
                {CHANNELS.map((c) => (
                  <li key={c.label} className="border-b border-white/12 last:border-b-0">
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="row-blur group flex items-baseline justify-between gap-4 rounded-lg px-2 py-3.5"
                    >
                      <span className="text-[12px] font-light text-white/50 transition-colors duration-500 group-hover:text-white/85">
                        {c.label}
                      </span>
                      <span
                        dir={c.ltr ? 'ltr' : undefined}
                        className={`text-[13px] text-white/90 transition-colors duration-500 group-hover:text-gold ${
                          c.ltr ? 'label-num' : ''
                        }`}
                      >
                        {c.value}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* address */}
          <Reveal delay={260} className="lg:col-span-3">
            <div className="glass-28 h-full rounded-2xl p-6 md:p-8">
              <h3 className="mb-5 flex items-baseline justify-between text-lg font-medium text-white">
                آدرس
                <span className="label-num text-[10px] tracking-[0.35em] text-white/45">
                  VISIT
                </span>
              </h3>
              <p className="text-[13px] font-light leading-8 text-white/75">
                بلوار کشاورز، تقاطع جمالزاده،
                <br />
                ساختمان پزشکان کوثر،
                <br />
                طبقه ۳، واحد ۱۲
              </p>
              <a
                href="https://g.co/kgs/5VU5kZq"
                target="_blank"
                rel="noreferrer"
                className="u-link mt-7 inline-block text-[13px] text-gold"
              >
                مشاهده روی نقشه
              </a>
              <p className="mt-9 text-[11px] font-light leading-6 text-white/45">
                مشاوره تلفنی در تمام ایام هفته پاسخ‌گوی شماست.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
