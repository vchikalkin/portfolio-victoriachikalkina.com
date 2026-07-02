'use client';

import { useLocale, useTranslations } from 'next-intl';
import { buttonVariants } from '@/components/ui/button';
import { Link, usePathname } from '@/i18n/navigation';
import { type Locale, routing } from '@/i18n/routing';
import {
  siteControlButtonVariant,
  siteControlItemClassName,
  siteControlShellClassName,
  type SiteControlVariant,
} from '@/lib/site-control-styles';
import { cn } from '@/lib/utils';

interface LocaleSwitcherProps {
  readonly variant?: SiteControlVariant;
}

export function LocaleSwitcher({ variant = 'default' }: LocaleSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('LocaleSwitcher');

  return (
    <nav aria-label={t('label')} className={siteControlShellClassName(variant)}>
      {routing.locales.map((nextLocale) => {
        const isActive = locale === nextLocale;

        return (
          <Link
            replace
            key={nextLocale}
            href={pathname}
            locale={nextLocale}
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: siteControlButtonVariant({ variant, isActive }),
              }),
              'rounded-full',
              siteControlItemClassName({ variant, isActive }),
            )}
          >
            {t(nextLocale)}
          </Link>
        );
      })}
    </nav>
  );
}
