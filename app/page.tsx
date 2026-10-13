import type { Metadata } from 'next';
import { routing } from '@/i18n/routing';
import LocaleLayout, {
  generateMetadata as generateLocaleMetadata,
} from './[locale]/layout';
import HomePage, {
  generateMetadata as generateHomeMetadata,
} from './[locale]/page';

const enParams = Promise.resolve({ locale: routing.defaultLocale });

/**
 * English at `/` with no redirect (static export cannot rewrite via middleware).
 * Prefixed `/en` still exists from `[locale]` for the language switcher.
 */
export async function generateMetadata(): Promise<Metadata> {
  const localeMetadata = await generateLocaleMetadata({ params: enParams });
  const homeMetadata = await generateHomeMetadata({ params: enParams });

  return {
    ...localeMetadata,
    ...homeMetadata,
    openGraph: {
      ...localeMetadata.openGraph,
      ...homeMetadata.openGraph,
    },
    twitter: {
      ...localeMetadata.twitter,
      ...homeMetadata.twitter,
    },
  };
}

export default function RootPage() {
  return (
    <LocaleLayout params={enParams}>
      <HomePage params={enParams} />
    </LocaleLayout>
  );
}
