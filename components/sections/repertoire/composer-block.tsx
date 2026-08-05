import type { RepertoireComposer } from '@/lib/types/content';

interface ComposerBlockProps {
  readonly composer: RepertoireComposer;
}

export function ComposerBlock({ composer }: ComposerBlockProps) {
  return (
    <div>
      <h4 className="mb-2 font-serif text-base text-balance text-foreground md:text-lg">
        {composer.name}
      </h4>
      <ul className="space-y-2 border-l border-border pl-4 md:pl-5">
        {composer.works.map((work) => {
          return (
            <li
              key={work}
              className="text-sm leading-relaxed text-pretty text-foreground/70 md:text-base"
            >
              {work}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
