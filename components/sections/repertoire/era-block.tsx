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

export function EraBlock({ title, composers }: EraBlockProps) {
  return (
    <article className="border-t border-border pt-8">
      <h3 className="mb-4 font-serif text-xl md:text-2xl">{title}</h3>
      <div className="space-y-6 pl-4 md:pl-5">
        {composers.map((composer) => (
          <ComposerBlock key={composer.id} composer={composer} />
        ))}
      </div>
    </article>
  );
}
