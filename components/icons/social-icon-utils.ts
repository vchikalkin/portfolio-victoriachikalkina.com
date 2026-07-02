import { cn } from '@/lib/utils';

interface SocialIconClassNameOptions {
  className?: string;
}

export function socialIconClassName({ className }: SocialIconClassNameOptions = {}) {
  return cn('size-5', className);
}
