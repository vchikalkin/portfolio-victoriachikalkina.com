import { ChevronDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { ComposerBlock } from './composer-block';

interface RepertoireComposerItem {
  readonly id: string;
  readonly name: string;
  readonly works: string[];
}

interface EraBlockProps {
  readonly title: string;
  readonly composers: RepertoireComposerItem[];
}

export async function EraBlock({ title, composers }: EraBlockProps) {
  const t = await getTranslations('Repertoire');
  const worksCount = composers.reduce((total, composer) => total + composer.works.length, 0);
  const composerNames = composers.map((composer) => composer.name).join(', ');

  return (
    <article className="border-t border-border pt-8">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl md:text-2xl">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/60 md:text-base">
              {composerNames}
              <span aria-hidden="true"> · </span>
              {t('worksCount', { count: worksCount })}
            </p>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-foreground/50 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="mt-4 space-y-6 pl-4 md:pl-5">
          {composers.map((composer) => (
            <ComposerBlock key={composer.id} composer={composer} />
          ))}
        </div>
      </details>
    </article>
  );
}
