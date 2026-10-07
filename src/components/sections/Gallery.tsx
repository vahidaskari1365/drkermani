import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const ITEMS = [
  { src: '/img/profile-m.jpg', cap: 'ارتوسرجری — قبل و بعد', span: 'md:col-span-7', ratio: 'aspect-[16/10]' },
  { src: '/img/profile-f.jpg', cap: 'جراحی دو فک', span: 'md:col-span-5', ratio: 'aspect-[4/5]' },
  { src: '/img/chin.jpg', cap: 'اصلاح پروفایل', span: 'md:col-span-5', ratio: 'aspect-[4/5]' },
  { src: '/img/or-surgery.jpg', cap: 'در اتاق عمل', span: 'md:col-span-7', ratio: 'aspect-[16/10]' },
  { src: '/img/eyes.jpg', cap: 'بلفاروپلاستی', span: 'md:col-span-4', ratio: 'aspect-square' },
  { src: '/img/implant-macro.jpg', cap: 'ایمپلنت و بازسازی', span: 'md:col-span-4', ratio: 'aspect-square' },
  { src: '/img/implant-3.jpg', cap: 'کاشت دندان', span: 'md:col-span-4', ratio: 'aspect-square' },
];

export default function Gallery() {
  return (
    <section id="gallery" className="relative bg-ink text-white">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <SectionHeader
          index="03"
          label="نمونه‌کارها"
          title="نمونه جراحی‌های انجام شده"
          lead="گزیده‌ای از نتایج درمانی؛ برای مشاهده جزئیات، تصویر را لمس یا نگه دارید."
          dark
        />

        {/* hairline asymmetric grid — gaps read as fine dividers */}
        <div className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 md:grid-cols-12">
          {ITEMS.map((it, i) => (
            <Reveal
              key={it.src + i}
              delay={(i % 3) * 90}
              className={`group relative overflow-hidden bg-ink ${it.span}`}
            >
              <figure className="relative">
                <div className={`${it.ratio} overflow-hidden`}>
                  <img
                    src={it.src}
                    alt={it.cap}
                    loading="lazy"
                    className="cine-img h-full w-full object-cover"
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent px-5 pb-4 pt-14 text-[11px] font-light tracking-wider text-white/85 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <span>{it.cap}</span>
                  <span className="label-num text-white/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-[11px] font-light leading-6 text-white/35">
            تصاویر گالری صرفاً جهت نمایش الگوی نتایج درمانی است؛ نتیجه هر جراحی به
            شرایط فردی بیمار بستگی دارد و پس از معاینه تعیین می‌شود.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
