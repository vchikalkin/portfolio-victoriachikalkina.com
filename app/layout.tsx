import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Source_Sans_3 } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { routing } from '@/i18n/routing';

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin', 'cyrillic'],
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin', 'cyrillic'],
});

export const metadata: Metadata = {
  title: 'Victoria Chikalkina | Pianist',
  description: 'Official website of pianist Victoria Chikalkina.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang={routing.defaultLocale}
      className={`${sourceSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
