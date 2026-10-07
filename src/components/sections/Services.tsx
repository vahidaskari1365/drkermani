import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { goService } from '@/lib/router';

const SERVICES = [
  {
    num: '01',
    slug: 'jaw-one',
    title: 'جراحی یک فک',
    en: 'SINGLE JAW',
    desc: 'ارتوسرجری فک بالا یا پایین برای اصلاح گازگیر، تقارن و تنفس.',
    img: '/img/jaw-2.jpg',
  },
  {
    num: '02',
    slug: 'jaw-two',
    title: 'جراحی دو فک',
    en: 'BIMAX SURGERY',
    desc: 'جراحی هم‌زمان دو فک برای بازسازی کامل تعادل چهره و عملکرد.',
    img: '/img/profile-f.jpg',
  },
  {
    num: '03',
    slug: 'genioplasty',
    title: 'جنیوپلاستی',
    en: 'GENIOPLASTY',
    desc: 'جراحی چانه برای هارمونی خط پروفایل و فرم پایین صورت.',
    img: '/img/chin.jpg',
  },
  {
    num: '04',
    slug: 'blepharoplasty',
    title: 'بلفاروپلاستی',
    en: 'BLEPHAROPLASTY',
    desc: 'جوان‌سازی و فرم‌دهی پلک‌ها با ظریف‌ترین خطوط جراحی.',
    img: '/img/eyes.jpg',
  },
  {
    num: '05',
    slug: 'implant',
    title: 'ایمپلنت دندان',
    en: 'IMPLANT',
    desc: 'کاشت دندان با سیستم‌های اشترومن، SPI، BICON، DXL و Cis.',
    img: '/img/implant-hand.jpg',
  },
  {
    num: '06',
    slug: 'reconstruction',
    title: 'بازسازی فک',
    en: 'RECONSTRUCTION',
    desc: 'بازسازی ساختاری فک با گرافت استخوانی و پروتزهای سفارشی.',
    img: '/img/implant-macro.jpg',
  },
];

const MINOR: { label: string; slug: string }[] = [
  { label: 'پروتز و جراحی مفاصل گیجگاهی (TMJ)', slug: 'reconstruction' },
  { label: 'سینوس لیفت باز', slug: 'implant' },
  { label: 'GBR', slug: 'reconstruction' },
  { label: 'جراحی دندان عقل', slug: 'implant' },
  { label: 'جراحی اکسپوز دندان نهفته', slug: 'implant' },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <SectionHeader
          index="02"
          label="خدمات"
          title="هر جراحی، یک تصمیم سینمایی درباره چهره شماست"
          lead="فهرست زیر، نقشه کامل درمان‌های تخصصی مطب است؛ برای دیدن جزئیات، مراقبت‌ها و هزینه هر دسته، روی آن کلیک کنید."
        />

        {/* editorial index — transparent rows that take glass blur on hover */}
        <div className="border-t border-white/15">
          {SERVICES.map((s, i) => (
            <Reveal key={s.num} delay={i * 60}>
              <a
                href={`#/services/${s.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  goService(s.slug);
                }}
                aria-label={`صفحه ${s.title}`}
                className="row-blur group relative grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-3 px-3 py-8 md:grid-cols-[80px_1fr_1fr_180px] md:gap-x-10 md:py-9"
              >
                <span className="label-num text-xs text-white/55 transition-colors duration-500 group-hover:text-gold">
                  {s.num}
                </span>
                <span className="flex flex-col">
                  <span className="display text-2xl text-white transition-transform duration-700 group-hover:-translate-x-2 md:text-4xl">
                    {s.title}
                  </span>
                  <span className="label-num mt-2 text-[10px] tracking-[0.35em] text-white/55">
                    {s.en}
                  </span>
                </span>
                <span className="col-span-3 max-w-sm text-[13px] font-normal leading-7 text-white/80 md:col-span-1">
                  {s.desc}
                  <span className="mt-2 block text-[11px] font-medium text-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    مشاهده صفحه ←
                  </span>
                </span>
                <span className="pointer-events-none relative hidden h-24 w-[180px] overflow-hidden rounded-xl border border-white/15 md:block">
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
          <div className="glass-28 mt-8 flex flex-wrap items-center gap-x-3 gap-y-4 rounded-2xl px-6 py-5 text-[12px] font-normal text-white/85">
            <span className="tracking-[0.25em] text-white/60">همچنین:</span>
            {MINOR.map((m) => (
              <a
                key={m.label}
                href={`#/services/${m.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  goService(m.slug);
                }}
                className="row-blur flex items-center gap-3 rounded-lg px-2 py-1 transition-colors duration-500 hover:text-gold"
              >
                <span>{m.label}</span>
                <span className="h-1 w-1 rotate-45 bg-white/35" />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
