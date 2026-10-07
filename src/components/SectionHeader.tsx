import Reveal from '@/components/Reveal';

export default function SectionHeader({
  index,
  label,
  title,
  lead,
  dark = false,
}: {
  index: string;
  label: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-16 md:mb-24">
      <Reveal>
        <div
          className={`mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] ${
            dark ? 'text-white/45' : 'text-ink/45'
          }`}
        >
          <span className="label-num">{index}</span>
          <span className={`h-px w-12 ${dark ? 'bg-white/25' : 'bg-ink/25'}`} />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2
          className={`display max-w-3xl text-[clamp(2rem,5.2vw,4.25rem)] ${
            dark ? 'text-white' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={180}>
          <p
            className={`mt-7 max-w-xl text-sm font-light leading-8 ${
              dark ? 'text-white/60' : 'text-ink/60'
            }`}
          >
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
