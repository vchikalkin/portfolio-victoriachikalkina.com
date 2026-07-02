import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  readonly title: string;
  readonly subtitle?: string;
  readonly className?: string;
  readonly align?: 'left' | 'center';
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <header
      className={cn(
        'mb-12 md:mb-16',
        align === 'center' && 'text-center',
        className,
      )}
    >
      {subtitle ? (
        <p className="mb-3 text-sm font-medium tracking-[0.2em] text-foreground/60 uppercase">
          {subtitle}
        </p>
      ) : null}
      <h2 className="font-serif text-3xl tracking-tight text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
    </header>
  );
}
