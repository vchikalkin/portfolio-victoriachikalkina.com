import { ChevronDown } from 'lucide-react';
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

const MAX_PREVIEW_COMPOSERS = 2;

export function EraBlock({ title, composers }: EraBlockProps) {
  const sortedComposers = composers.toSorted((a, b) => b.works.length - a.works.length);
  const previewNames = sortedComposers
    .slice(0, MAX_PREVIEW_COMPOSERS)
    .map((composer) => composer.name);
  const composerNames =
    sortedComposers.length > MAX_PREVIEW_COMPOSERS
      ? `${previewNames.join(', ')}…`
      : previewNames.join(', ');

  return (
    <article className="border-t border-border pt-8">
      <details className="group">
        <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden">
          <div className="min-w-0 flex-1">
            <h3 className="font-serif text-xl md:text-2xl">{title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/60 md:text-base">
              {composerNames}
            </p>
          </div>
          <ChevronDown
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-foreground/50 transition-transform group-open:rotate-180"
          />
        </summary>
        <div className="mt-4 grid grid-cols-1 gap-6 pl-4 md:grid-cols-2 md:gap-8 md:pl-5">
          {sortedComposers.map((composer) => (
            <ComposerBlock key={composer.id} composer={composer} />
          ))}
        </div>
      </details>
    </article>
  );
}
