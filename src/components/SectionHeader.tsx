import Reveal from '@/components/Reveal';

export default function SectionHeader({
  index,
  label,
  title,
  lead,
}: {
  index: string;
  label: string;
  title: string;
  lead?: string;
}) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-8 flex items-center gap-4 text-[11px] tracking-[0.3em] text-white/60">
          <span className="label-num">{index}</span>
          <span className="h-px w-12 bg-white/35" />
          <span>{label}</span>
        </div>
      </Reveal>
      <Reveal delay={90}>
        <h2 className="display max-w-3xl text-[clamp(2rem,5.2vw,4.25rem)] text-white">
          {title}
        </h2>
      </Reveal>
      {lead ? (
        <Reveal delay={180}>
          <p className="mt-7 max-w-xl text-sm font-light leading-8 text-white/70">
            {lead}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
