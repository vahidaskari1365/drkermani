import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';
import { WorksWheel } from '@/components/ui/works-wheel';

/**
 * نمونه‌کارها — the real clinical index, built as a wheel you turn.
 * Every card is an authentic case from dromfs.com (before/after and
 * intraoperative frames) and links to its matching category page,
 * so the drum doubles as the entry point to each service view.
 */
const WORKS = [
  {
    title: 'جراحی دو فک (بایمکس)',
    image: '/img/ba-bimax-after.jpg',
    href: '#/services/jaw-two',
  },
  {
    title: 'بلفاروپلاستی',
    image: '/img/ba-blepharo-after.jpg',
    href: '#/services/blepharoplasty',
  },
  {
    title: 'بازسازی فک بالا با ایمپلنت',
    image: '/img/work-upper-recon.jpg',
    href: '#/services/implant',
  },
  {
    title: 'ایمپلنت موازی (پارالل)',
    image: '/img/work-implant-parallel.jpg',
    href: '#/services/implant',
  },
  {
    title: 'ایمپلنت ناحیه قدام',
    image: '/img/work-implant-front.jpg',
    href: '#/services/implant',
  },
  {
    title: 'ایمپلنت بدون برش (فلپلس)',
    image: '/img/work-implant-flapless.jpg',
    href: '#/services/implant',
  },
  {
    title: 'لیفت سینوس',
    image: '/img/work-sinus-lift.jpg',
    href: '#/services/implant',
  },
  {
    title: 'در اتاق عمل',
    image: '/img/dr-kermani-or.jpg',
    href: '#/services/jaw-one',
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <SectionHeader
          index="03"
          label="نمونه‌کارها"
          title="نمونه جراحی‌های انجام شده"
          lead="چرخ نمونه‌کارها را بچرخانید؛ هر کارت یک مورد درمانی واقعی است و به صفحه همان دسته‌بندی وصل می‌شود."
        />

        {/* the wheel — a framed stage floating over the film; the drum's cards
            run off the top/bottom of the frame by design, so the frame clips
            them (no backdrop blur here: 3D transforms stay crisp) */}
        <Reveal delay={100}>
          <div className="relative mt-10 h-[74vh] overflow-hidden rounded-2xl border border-white/15 bg-black/25 shadow-[0_40px_120px_-40px_rgb(0_0_0/0.8)] md:h-[88vh]">
            <WorksWheel items={WORKS} label="نمونه‌کارها" action="مشاهده" />
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] font-normal leading-6 text-white/65">
              با چرخ ماوس یا کشیدن، چرخ را بچرخانید؛ با کلیک روی هر کارت، صفحه
              همان دسته‌بندی باز می‌شود.
            </p>
            <p className="max-w-md text-[11px] font-normal leading-6 text-white/65">
              تصاویر صرفاً جهت نمایش الگوی نتایج درمانی است؛ نتیجه هر جراحی به
              شرایط فردی بیمار بستگی دارد و پس از معاینه تعیین می‌شود.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
