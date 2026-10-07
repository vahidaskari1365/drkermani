import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const SURGERY = [
  ['جراحی چانه (جنیوپلاستی)', '۹۰ تا ۱۱۰ میلیون تومان'],
  ['جراحی یک فک', '۱۷۰ تا ۱۸۰ میلیون تومان'],
  ['جراحی یک فک و چانه (مونو مکس + جنیوپلاستی)', '۱۸۰ تا ۱۹۰ میلیون تومان'],
  ['جراحی دو فک (بایمکس)', '۱۹۰ تا ۲۰۰ میلیون تومان'],
  ['جراحی دو فک و چانه (بایمکس + جنیوپلاستی)', '۲۱۰ تا ۲۴۰ میلیون تومان'],
  ['جراحی رویژن (مجدد) فک', 'پس از بررسی و مشاوره'],
];

const IMPLANT = [
  ['ایمپلنت Cis کره — هر واحد', '۲۴ میلیون تومان'],
  ['ایمپلنت DXL آلمان — هر واحد', '۳۱ میلیون تومان'],
  ['ایمپلنت SPI سوئیس — هر واحد', '۸۵ میلیون تومان'],
  ['ایمپلنت BICON آمریکا — هر واحد', '۱۱۰ میلیون تومان'],
  ['سینوس لیفت باز', '۲۵ تا ۳۵ میلیون تومان'],
  ['جراحی دندان عقل', '۱۸ تا ۲۳ میلیون تومان'],
  ['جراحی اکسپوز دندان نهفته', '۱۷ تا ۲۹ میلیون تومان'],
];

function PriceList({
  title,
  en,
  rows,
  delay = 0,
}: {
  title: string;
  en: string;
  rows: string[][];
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="glass-28 rounded-2xl p-6 md:p-9">
        <div className="mb-5 flex items-baseline justify-between px-2">
          <h3 className="text-xl font-medium text-white">{title}</h3>
          <span className="label-num text-[10px] tracking-[0.35em] text-white/60">
            {en}
          </span>
        </div>
        <ul className="border-t border-white/15">
          {rows.map(([name, price]) => (
            <li
              key={name}
              className="group flex items-baseline justify-between gap-6 rounded-lg border-b border-white/12 px-3 py-4 transition-colors duration-500 last:border-b-0 hover:bg-white/10"
            >
              <span className="text-[13px] font-normal leading-7 text-white/85 transition-colors duration-500 group-hover:text-white">
                {name}
              </span>
              <span className="shrink-0 text-[13px] font-medium text-white">
                {price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <SectionHeader
          index="04"
          label="هزینه‌ها"
          title="شفافیت مالی، بخشی از مسیر درمان است"
          lead="هزینه‌های تقریبی جراحی‌های فک و صورت و ایمپلنت بر اساس آخرین اطلاعات مطب؛ قیمت نهایی پس از معاینه اعلام می‌شود."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PriceList title="جراحی‌های فک و صورت" en="JAW SURGERY" rows={SURGERY} />
          <PriceList title="ایمپلنت و جراحی‌های دندانی" en="IMPLANT & DENTAL" rows={IMPLANT} delay={120} />
        </div>

        {/* special offer — golden glass */}
        <Reveal delay={200}>
          <div className="glass-gold mt-8 flex flex-col items-start justify-between gap-7 rounded-2xl p-7 md:flex-row md:items-center md:p-10">
            <p className="max-w-xl text-sm font-normal leading-8 text-white/95">
              برای دریافت برآورد دقیق و طرح درمان اختصاصی، یک نوبت مشاوره رزرو
              کنید؛ مشاوره تلفنی در تمام ایام هفته پاسخ‌گوست.
            </p>
            <a
              href="tel:02166921500"
              className="u-link shrink-0 text-sm font-medium text-white"
            >
              رزرو مشاوره — <span className="label-num" dir="ltr">021 6692 1500</span>
            </a>
            <a
              href="#/services/jaw-one"
              className="row-blur mt-6 inline-block w-full rounded-xl px-4 py-3 text-[13px] font-normal text-white/85 md:mt-0 md:w-auto"
            >
              جزئیات و مراقبت‌های جراحی فک ←
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
