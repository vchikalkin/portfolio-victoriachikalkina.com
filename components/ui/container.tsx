import type { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends PropsWithChildren {
  readonly className?: string;
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-6 lg:px-8', className)}>
      {children}
    </div>
  );
}
