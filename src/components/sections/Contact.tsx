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
    <section id="contact" className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <Reveal>
          <div className="mb-10 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/45">
            <span className="label-num">06</span>
            <span className="h-px w-12 bg-white/25" />
            <span>تماس</span>
          </div>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="display text-[clamp(2.4rem,7vw,6rem)]">
            گفت‌وگو را شروع کنید
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <a
            href="tel:02166921500"
            className="label-num group mt-10 inline-flex flex-wrap items-baseline gap-x-6 text-[clamp(1.8rem,6vw,5rem)] font-bold leading-none text-white transition-colors duration-500 hover:text-accent-soft"
            dir="ltr"
          >
            <span>021 6692 1500</span>
            <span className="text-sm font-light tracking-[0.3em] text-white/40 transition-colors duration-500 group-hover:text-accent-soft/70">
              BOOKING
            </span>
          </a>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* hours */}
          <Reveal delay={100} className="lg:col-span-5">
            <div>
              <h3 className="mb-6 flex items-baseline justify-between text-lg font-medium">
                ساعات کاری
                <span className="label-num text-[10px] tracking-[0.35em] text-white/35">
                  HOURS
                </span>
              </h3>
              <ul className="border-t border-white/10">
                {HOURS.map(([day, doctor, time]) => (
                  <li
                    key={day}
                    className="grid grid-cols-2 items-baseline gap-2 border-b border-white/10 py-4 text-[13px] font-light md:grid-cols-3"
                  >
                    <span className="text-white/85">{day}</span>
                    <span className="hidden text-white/45 md:inline">{doctor}</span>
                    <span
                      className={`text-left ${
                        time === 'تعطیل' ? 'text-white/35' : 'text-white/70'
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
            <div>
              <h3 className="mb-6 flex items-baseline justify-between text-lg font-medium">
                راه‌های ارتباطی
                <span className="label-num text-[10px] tracking-[0.35em] text-white/35">
                  CONTACT
                </span>
              </h3>
              <ul className="border-t border-white/10">
                {CHANNELS.map((c) => (
                  <li key={c.label} className="border-b border-white/10">
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-4 py-4"
                    >
                      <span className="text-[12px] font-light text-white/45 transition-colors duration-500 group-hover:text-white/80">
                        {c.label}
                      </span>
                      <span
                        dir={c.ltr ? 'ltr' : undefined}
                        className={`text-[13px] text-white/85 transition-colors duration-500 group-hover:text-accent-soft ${
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
            <div>
              <h3 className="mb-6 flex items-baseline justify-between text-lg font-medium">
                آدرس
                <span className="label-num text-[10px] tracking-[0.35em] text-white/35">
                  VISIT
                </span>
              </h3>
              <p className="text-[13px] font-light leading-8 text-white/70">
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
                className="u-link mt-8 inline-block text-[13px] text-accent-soft"
              >
                مشاهده روی نقشه
              </a>
              <p className="mt-10 text-[11px] font-light leading-6 text-white/35">
                مشاوره تلفنی در تمام ایام هفته پاسخ‌گوی شماست.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
