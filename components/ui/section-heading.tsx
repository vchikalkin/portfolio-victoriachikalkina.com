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
      <h2 className="font-serif text-3xl text-balance text-foreground md:text-4xl lg:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-sm font-medium text-pretty text-foreground/60">{subtitle}</p>
      ) : null}
    </header>
  );
}
