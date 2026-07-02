import type { BiographySectionContent } from '@/lib/types/biography';

interface BiographyBlockProps {
  readonly section: BiographySectionContent;
}

export function BiographyBlock({ section }: BiographyBlockProps) {
  return (
    <article className="space-y-4">
      <h3 className="font-serif text-xl text-foreground md:text-2xl">{section.title}</h3>
      {section.paragraphs.map((paragraph) => 
        { return <p
          key={paragraph.slice(0, 40)}
          className="text-base leading-relaxed text-foreground/80 md:text-lg"
        >
          {paragraph}
        </p> }
      )}
      {section.listIntro ? (
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">
          {section.listIntro}
        </p>
      ) : null}
      {section.items && section.items.length > 0 ? (
        <ul className="space-y-2 border-l border-border pl-5">
          {section.items.map((item) => 
            { return <li key={item.slice(0, 40)} className="text-base leading-relaxed text-foreground/80 md:text-lg">
              {item}
            </li> }
          )}
        </ul>
      ) : null}
      {section.closing ? (
        <p className="text-base leading-relaxed text-foreground/80 md:text-lg">{section.closing}</p>
      ) : null}
    </article>
  );
}
