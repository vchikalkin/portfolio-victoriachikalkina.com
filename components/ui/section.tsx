import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface SectionProps extends PropsWithChildren {
  readonly id: string;
  readonly className?: string;
  readonly variant?: 'default' | 'muted';
}

export function Section({ id, children, className, variant = 'default' }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 py-20 md:py-28',
        variant === 'muted' && 'bg-secondary/40',
        className,
      )}
    >
      {children}
    </section>
  );
}
