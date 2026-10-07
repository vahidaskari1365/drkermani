import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const TEAM = [
  {
    name: 'دکتر حامد کرمانی',
    role: 'متخصص جراحی فک و صورت — فلوشیپ جراحی‌های کرانیوفیشال',
    img: '/img/doctor-1.jpg',
  },
  {
    name: 'دکتر فاطمه رستم‌خانی',
    role: 'متخصص پروتزهای دندانی',
    initial: 'ر',
  },
  {
    name: 'خانم منیره کاظمی',
    role: 'همکار مطب',
    initial: 'ک',
  },
  {
    name: 'آقای پوریا هاشم‌پور',
    role: 'همکار مطب',
    initial: 'ه',
  },
];

export default function Team() {
  return (
    <section id="team" className="relative border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-[1440px] px-5 py-28 md:px-10 md:py-44">
        <SectionHeader
          index="05"
          label="تیم"
          title="کسانی که مسیر درمان را کنار شما می‌سازند"
        />

        <div className="border-t border-ink/10">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 70}>
              <div className="group flex items-center gap-6 border-b border-ink/10 py-7 transition-colors duration-500 md:gap-10 md:py-9">
                {m.img ? (
                  <span className="relative block h-16 w-16 shrink-0 overflow-hidden md:h-20 md:w-20">
                    <img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      className="cine-img h-full w-full object-cover object-top"
                    />
                  </span>
                ) : (
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center border border-ink/20 text-xl font-light text-ink/50 transition-colors duration-500 group-hover:border-accent group-hover:text-accent md:h-20 md:w-20">
                    {m.initial}
                  </span>
                )}
                <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <span className="display text-xl text-ink transition-transform duration-700 group-hover:-translate-x-2 md:text-3xl">
                    {m.name}
                  </span>
                  <span className="text-[12px] font-light text-ink/50">
                    {m.role}
                  </span>
                </div>
                <span className="label-num hidden text-[11px] text-ink/30 md:inline">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
