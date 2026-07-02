import type { NextConfig } from 'next';
import withExportImages from 'next-export-optimize-images';
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin();

const baseConfig: NextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/u,
});

export default async (): Promise<NextConfig> => {
  return withExportImages(withNextIntl(withMDX(baseConfig)));
};
