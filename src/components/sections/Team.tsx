import Reveal from '@/components/Reveal';
import SectionHeader from '@/components/SectionHeader';

const TEAM = [
  {
    name: 'دکتر حامد کرمانی',
    role: 'متخصص جراحی فک و صورت — فلوشیپ جراحی‌های کرانیوفیشال',
    img: '/img/dr-kermani-white.jpg',
  },
  {
    name: 'دکتر فاطمه رستم‌خانی',
    role: 'متخصص پروتزهای دندانی',
    initial: 'ر',
  },
  {
    name: 'خانم منیره کاظمی',
    role: 'سوپروایزر مطب',
    initial: 'ک',
  },
  {
    name: 'آقای پوریا هاشم‌پور',
    role: 'تولید محتوا و رسانه',
    initial: 'ه',
  },
];

export default function Team() {
  return (
    <section id="team" className="relative z-10">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-40">
        <SectionHeader
          index="05"
          label="تیم"
          title="کسانی که مسیر درمان را کنار شما می‌سازند"
        />

        <div className="border-t border-white/15">
          {TEAM.map((m, i) => (
            <Reveal key={m.name} delay={i * 70}>
              <div className="row-blur group flex items-center gap-6 rounded-xl px-3 py-6 md:gap-10 md:py-7">
                {m.img ? (
                  <span className="glass-18 relative block h-16 w-16 shrink-0 overflow-hidden rounded-xl md:h-20 md:w-20">
                    <img
                      src={m.img}
                      alt={m.name}
                      loading="lazy"
                      className="cine-img h-full w-full object-cover object-top"
                    />
                  </span>
                ) : (
                  <span className="glass-18 flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-light text-white/60 transition-colors duration-500 group-hover:text-gold md:h-20 md:w-20">
                    {m.initial}
                  </span>
                )}
                <div className="flex flex-1 flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <span className="display text-xl text-white transition-transform duration-700 group-hover:-translate-x-2 md:text-3xl">
                    {m.name}
                  </span>
                  <span className="text-[12px] font-normal text-white/75">
                    {m.role}
                  </span>
                </div>
                <span className="label-num hidden text-[11px] text-white/50 md:inline">
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
