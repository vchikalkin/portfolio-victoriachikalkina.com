'use client';

import { useLayoutEffect } from 'react';

interface SetHtmlLangProps {
  readonly locale: string;
}

/** Keeps html[lang] in sync on client navigations between locales. */
export function SetHtmlLang({ locale }: SetHtmlLangProps) {
  useLayoutEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
