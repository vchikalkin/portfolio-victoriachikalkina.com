import type { RepertoireEra } from '@/lib/types/content';

interface EraBlockProps {
  readonly era: RepertoireEra;
}

export function EraBlock({ era }: EraBlockProps) {
  return (
    <article className="border-border border-t pt-8">
      <h3 className="mb-4 font-serif text-xl md:text-2xl">{era.title}</h3>
      <ul className="space-y-2">
        {era.works.map((work) => {
          return (
            <li key={work} className="text-foreground/70 text-sm leading-relaxed md:text-base">
              {work}
            </li>
          );
        })}
      </ul>
    </article>
  );
}
