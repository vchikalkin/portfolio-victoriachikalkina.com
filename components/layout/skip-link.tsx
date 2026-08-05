import { getTranslations } from 'next-intl/server';

export async function SkipLink() {
  const t = await getTranslations('Navigation');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-[max(1rem,env(safe-area-inset-top))] focus:left-[max(1rem,env(safe-area-inset-left))] focus:z-skip focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow focus:ring-2 focus:ring-ring focus:outline-none"
    >
      {t('skipToContent')}
    </a>
  );
}
