'use client';

import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { LocaleSwitcher } from '@/components/locale-switcher';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { navigationItems, siteConfig } from '@/config/site';
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
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-300',
        isSolid
          ? 'border-b border-border/60 bg-background/90 text-foreground backdrop-blur-md'
          : 'bg-transparent text-white',
      )}
    >
      <Container className="flex h-16 items-center justify-between md:h-20">
        <a href="#hero" className="font-serif text-lg tracking-wide md:text-xl">
          {siteConfig.name}
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navigationItems.map(({ id, labelKey }) => 
            { return <a
              key={id}
              href={`#${id}`}
              className={cn(
                'text-sm tracking-wide transition-colors',
                isSolid
                  ? 'text-foreground/70 hover:text-foreground'
                  : 'text-white/70 hover:text-white',
              )}
            >
              {t(labelKey)}
            </a> }
          )}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeSwitcher />
          <LocaleSwitcher />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={cn('md:hidden', !isSolid && 'text-white hover:bg-white/10')}
          aria-expanded={isOpen}
          aria-label={isOpen ? t('close') : t('menu')}
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </Container>

      {isOpen ? (
        <div className="border-t border-border/60 bg-background md:hidden">
          <Container className="flex flex-col gap-1 py-6">
            {navigationItems.map(({ id, labelKey }) => 
              { return <a
                key={id}
                href={`#${id}`}
                className="py-3 font-serif text-2xl text-foreground"
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                {t(labelKey)}
              </a> }
            )}
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
