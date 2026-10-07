import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const SERVICES = [
  {
    num: '01',
    title: 'جراحی یک فک',
    en: 'SINGLE JAW',
    desc: 'ارتوسرجری فک بالا یا پایین برای اصلاح گازگیر، تقارن و تنفس.',
    img: '/img/jaw-2.jpg',
  },
  {
    num: '02',
    title: 'جراحی دو فک',
    en: 'BIMAX SURGERY',
    desc: 'جراحی هم‌زمان دو فک برای بازسازی کامل تعادل چهره و عملکرد.',
    img: '/img/jaw-3.jpg',
  },
  {
    num: '03',
    title: 'جنیوپلاستی',
    en: 'GENIOPLASTY',
    desc: 'جراحی چانه برای هارمونی خط پروفایل و فرم پایین صورت.',
    img: '/img/jaw-4.jpg',
  },
  {
    num: '04',
    title: 'بلفاروپلاستی',
    en: 'BLEPHAROPLASTY',
    desc: 'جوان‌سازی و فرم‌دهی پلک‌ها با ظریف‌ترین خطوط جراحی.',
    img: '/img/blepharo-1.jpg',
  },
  {
    num: '05',
    title: 'ایمپلنت دندان',
    en: 'IMPLANT',
    desc: 'کاشت دندان با سیستم‌های اشترومن، SPI، BICON، DXL و Cis.',
    img: '/img/implant-1.jpg',
  },
  {
    num: '06',
    title: 'بازسازی فک',
    en: 'RECONSTRUCTION',
    desc: 'بازسازی ساختاری فک با گرافت استخوانی و پروتزهای سفارشی.',
    img: '/img/implant-4.jpg',
  },
];

const MINOR = [
  'پروتز و جراحی مفاصل گیجگاهی (TMJ)',
  'سینوس لیفت باز',
  'GBR',
  'جراحی دندان عقل',
  'جراحی اکسپوز دندان نهفته',
];

export default function Services() {
  return (
    <section id="services" className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <SectionHeader
          index="02"
          label="خدمات"
          title="هر جراحی، یک تصمیم سینمایی درباره چهره شماست"
          lead="فهرست زیر، نقشه کامل درمان‌های تخصصی مطب است؛ از اصلاح اسکلتی فک تا ظریف‌ترین جزئیات اطراف چشم."
        />

        {/* editorial index list — floating rows, no cards */}
        <div className="border-t border-ink/10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 60}>
              <a
                href="#pricing"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 border-b border-ink/10 py-8 transition-colors duration-500 md:grid-cols-[80px_1fr_1fr_180px] md:gap-x-10 md:py-10"
              >
                <span className="label-num text-xs text-ink/35 transition-colors duration-500 group-hover:text-accent">
                  {s.num}
                </span>
                <span className="flex flex-col">
                  <span className="display text-2xl text-ink transition-transform duration-700 group-hover:-translate-x-2 md:text-4xl">
                    {s.title}
                  </span>
                  <span className="label-num mt-2 text-[10px] tracking-[0.35em] text-ink/30">
                    {s.en}
                  </span>
                </span>
                <span className="col-span-3 max-w-sm text-[13px] font-light leading-7 text-ink/55 md:col-span-1">
                  {s.desc}
                </span>
                <span className="pointer-events-none relative hidden h-24 w-[180px] overflow-hidden md:block">
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-0 grayscale transition-all duration-700 ease-out group-hover:opacity-100 group-hover:grayscale-0 md:scale-110"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* secondary treatments — quiet inline flow */}
        <Reveal delay={120}>
          <div className="mt-16 flex flex-wrap items-center gap-x-3 gap-y-4 text-[12px] font-light text-ink/45">
            <span className="tracking-[0.25em] text-ink/35">همچنین:</span>
            {MINOR.map((m) => (
              <span key={m} className="flex items-center gap-3">
                <span>{m}</span>
                <span className="h-1 w-1 rotate-45 bg-ink/25" />
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
