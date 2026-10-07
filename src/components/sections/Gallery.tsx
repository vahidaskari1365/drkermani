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
    <section id="gallery" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <SectionHeader
          index="03"
          label="نمونه‌کارها"
          title="نمونه جراحی‌های انجام شده"
          lead="گزیده‌ای از نتایج درمانی؛ برای مشاهده جزئیات، تصویر را لمس یا نگه دارید."
        />

        {/* floating glass-framed stills over the film */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-12">
          {ITEMS.map((it, i) => (
            <Reveal
              key={it.src + i}
              delay={(i % 3) * 90}
              className={`group relative ${it.span}`}
            >
              <figure className="glass-18 rounded-2xl p-2 transition-transform duration-700 group-hover:-translate-y-1">
                <div className={`${it.ratio} overflow-hidden rounded-xl`}>
                  <img
                    src={it.src}
                    alt={it.cap}
                    loading="lazy"
                    className="cine-img h-full w-full object-cover"
                  />
                </div>
                <figcaption className="pointer-events-none absolute inset-x-3 bottom-3 flex items-center justify-between rounded-xl bg-black/45 px-4 py-2.5 text-[11px] font-light tracking-wider text-white/90 opacity-0 backdrop-blur-md transition-opacity duration-700 group-hover:opacity-100">
                  <span>{it.cap}</span>
                  <span className="label-num text-white/55">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 text-[11px] font-light leading-6 text-white/45">
            تصاویر گالری صرفاً جهت نمایش الگوی نتایج درمانی است؛ نتیجه هر جراحی به
            شرایط فردی بیمار بستگی دارد و پس از معاینه تعیین می‌شود.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
