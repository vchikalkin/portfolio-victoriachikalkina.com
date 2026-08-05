import { getTranslations } from 'next-intl/server';

export async function SkipLink() {
  const t = await getTranslations('Navigation');

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow focus:ring-2 focus:ring-ring focus:outline-none"
    >
      {t('skipToContent')}
    </a>
  );
}
