'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { useEffect, useId, useState, useSyncExternalStore } from 'react';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { navigationItems } from '@/config/site';
import type { SiteControlVariant } from '@/lib/site-control-styles';
import { useIsClientMounted } from '@/lib/use-client-mounted';
import { cn } from '@/lib/utils';

const SCROLL_THRESHOLD = 24;

function subscribeToScroll(onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true });

  return () => {
    window.removeEventListener('scroll', onStoreChange);
  };
}

function getScrollSnapshot() {
  return window.scrollY > SCROLL_THRESHOLD;
}

function getScrollServerSnapshot() {
  return false;
}

export function Header() {
  const t = useTranslations('Navigation');
  const tSite = useTranslations('Site');
  const { resolvedTheme } = useTheme();
  const isThemeMounted = useIsClientMounted();
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const isScrolled = useSyncExternalStore(
    subscribeToScroll,
    getScrollSnapshot,
    getScrollServerSnapshot,
  );

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const isSolid = isScrolled || isOpen;
  const controlVariant: SiteControlVariant =
    isSolid || (isThemeMounted && resolvedTheme !== 'light') ? 'default' : 'overlay';

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-header pt-[env(safe-area-inset-top)]',
        isSolid
          ? 'border-b border-border/60 bg-background/95 text-foreground'
          : 'bg-transparent text-white',
      )}
    >
      <Container className="flex h-16 items-center gap-3 lg:h-20 lg:gap-4">
        <a
          href="#hero"
          className="shrink-0 pr-4 font-serif text-lg lg:pr-6 lg:text-xl xl:pr-8 2xl:pr-12"
        >
          {tSite('name')}
        </a>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-start gap-2 lg:flex lg:gap-3 2xl:gap-5"
          aria-label={t('mainNav')}
        >
          {navigationItems.map(({ id, labelKey }) => {
            return (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'text-sm whitespace-nowrap',
                  isSolid
                    ? 'text-foreground/70 hover:text-foreground'
                    : 'text-white/70 hover:text-white',
                )}
              >
                {t(labelKey)}
              </a>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:ml-2 lg:flex 2xl:ml-4">
          <ThemeSwitcher variant={controlVariant} />
          <LocaleSwitcher variant={controlVariant} />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn('ml-auto lg:hidden', !isSolid && 'text-white hover:bg-white/10')}
          aria-expanded={isOpen}
          aria-controls={menuId}
          aria-label={isOpen ? t('close') : t('menu')}
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </Container>

      {isOpen ? (
        <div
          id={menuId}
          className="border-t border-border/60 bg-background pb-[env(safe-area-inset-bottom)] lg:hidden"
        >
          <Container className="flex flex-col gap-1 py-6">
            {navigationItems.map(({ id, labelKey }) => {
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  className="py-3 font-serif text-2xl text-balance text-foreground"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {t(labelKey)}
                </a>
              );
            })}
            <div className="mt-6 flex items-center gap-2 border-t border-border pt-6">
              <ThemeSwitcher />
              <LocaleSwitcher />
            </div>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
