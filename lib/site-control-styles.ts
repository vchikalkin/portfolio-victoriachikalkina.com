import { cn } from '@/lib/utils';

export type SiteControlVariant = 'default' | 'overlay';

export function siteControlShellClassName(variant: SiteControlVariant) {
  return cn(
    'flex gap-1 rounded-full border p-1 text-sm',
    variant === 'overlay'
      ? 'border-white/20 bg-white/10 text-white'
      : 'border-border bg-background/95',
  );
}

interface SiteControlItemOptions {
  variant: SiteControlVariant;
  isActive: boolean;
}

export function siteControlItemClassName({ variant, isActive }: SiteControlItemOptions) {
  if (variant !== 'overlay') {
    return undefined;
  }

  return isActive
    ? 'bg-white text-zinc-950 hover:bg-white/90'
    : 'text-white hover:bg-white/15 hover:text-white';
}

export function siteControlButtonVariant({
  variant,
  isActive,
}: SiteControlItemOptions): 'default' | 'ghost' {
  if (variant === 'overlay') {
    return 'ghost';
  }

  return isActive ? 'default' : 'ghost';
}
