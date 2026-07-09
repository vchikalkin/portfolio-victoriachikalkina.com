import { useEffect } from 'react';

interface BodyStyleSnapshot {
  overflow: string;
  paddingRight: string;
  position: string;
  top: string;
  width: string;
}

function lockBodyScroll(): () => void {
  const { scrollY, innerWidth } = window;
  const { style } = document.body;
  const { clientWidth } = document.documentElement;
  const scrollbarWidth = innerWidth - clientWidth;

  const previousStyles: BodyStyleSnapshot = {
    overflow: style.overflow,
    paddingRight: style.paddingRight,
    position: style.position,
    top: style.top,
    width: style.width,
  };

  style.overflow = 'hidden';
  style.position = 'fixed';
  style.top = `-${String(scrollY)}px`;
  style.width = '100%';

  if (scrollbarWidth > 0) {
    style.paddingRight = `${String(scrollbarWidth)}px`;
  }

  return () => {
    const { overflow, paddingRight, position, top, width } = previousStyles;

    style.overflow = overflow;
    style.paddingRight = paddingRight;
    style.position = position;
    style.top = top;
    style.width = width;
    window.scrollTo(0, scrollY);
  };
}

interface UseScrollLockOptions {
  readonly enabled?: boolean;
}

export function useScrollLock({ enabled = true }: UseScrollLockOptions = {}) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    return lockBodyScroll();
  }, [enabled]);
}
