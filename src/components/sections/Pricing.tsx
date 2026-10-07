import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const SURGERY = [
  ['جراحی چانه (جنیوپلاستی)', '۹۰ تا ۱۱۰ میلیون تومان'],
  ['جراحی یک فک', '۱۷۰ تا ۱۸۰ میلیون تومان'],
  ['جراحی یک فک و چانه (مونو مکس + جنیوپلاستی)', '۱۸۰ تا ۱۹۰ میلیون تومان'],
  ['جراحی دو فک (بایمکس)', '۱۹۰ تا ۲۰۰ میلیون تومان'],
  ['جراحی دو فک و چانه (بایمکس + جنیوپلاستی)', '۲۱۰ تا ۲۴۰ میلیون تومان'],
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
      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="text-xl font-medium text-ink">{title}</h3>
          <span className="label-num text-[10px] tracking-[0.35em] text-ink/35">
            {en}
          </span>
        </div>
        <ul className="border-t border-ink/10">
          {rows.map(([name, price]) => (
            <li
              key={name}
              className="group flex items-baseline justify-between gap-6 border-b border-ink/10 py-5 transition-colors duration-500 hover:border-accent/40"
            >
              <span className="text-[13px] font-light leading-7 text-ink/70 transition-colors duration-500 group-hover:text-ink">
                {name}
              </span>
              <span className="shrink-0 text-[13px] font-medium text-ink">
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
    <section id="pricing" className="relative bg-paper-dim">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <SectionHeader
          index="04"
          label="هزینه‌ها"
          title="شفافیت مالی، بخشی از مسیر درمان است"
          lead="هزینه‌های تقریبی جراحی‌های فک و صورت و ایمپلنت بر اساس آخرین اطلاعات مطب؛ قیمت نهایی پس از معاینه اعلام می‌شود."
        />

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-12">
          <PriceList title="جراحی‌های فک و صورت" en="JAW SURGERY" rows={SURGERY} />
          <PriceList title="ایمپلنت و جراحی‌های دندانی" en="IMPLANT & DENTAL" rows={IMPLANT} delay={120} />
        </div>

        <Reveal delay={200}>
          <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-ink/15 pt-10 md:flex-row md:items-center">
            <p className="max-w-xl text-sm font-light leading-8 text-ink/60">
              برای دریافت برآورد دقیق و طرح درمان اختصاصی، یک نوبت مشاوره رزرو
              کنید؛ مشاوره تلفنی در تمام ایام هفته پاسخ‌گوست.
            </p>
            <a
              href="tel:02166921500"
              className="u-link shrink-0 text-sm font-medium text-ink"
            >
              رزرو مشاوره — 021 6692 1500
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
