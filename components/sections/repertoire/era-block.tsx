import type { RepertoireEra } from '@/lib/types/content';

interface EraBlockProps {
  readonly era: RepertoireEra;
}

export function EraBlock({ era }: EraBlockProps) {
  return (
    <article className="border-t border-border pt-8 first:border-t-0 first:pt-0">
      <h3 className="mb-4 font-serif text-xl md:text-2xl">{era.title}</h3>
      <ul className="space-y-2">
        {era.works.map((work) => 
          { return <li key={work} className="text-sm leading-relaxed text-foreground/70 md:text-base">
            {work}
          </li> }
        )}
      </ul>
    </article>
  );
}
