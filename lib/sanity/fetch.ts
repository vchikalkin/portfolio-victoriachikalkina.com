import type { QueryParams } from 'next-sanity';
import { client, isSanityConfigured } from './client';

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = ['sanity'],
}: SanityFetchOptions): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  return client.fetch<T>(query, params, {
    next: {
      tags,
      // Avoid sticky empty cache in `next dev` after seed.
      ...(process.env.NODE_ENV === 'development' ? { revalidate: 0 } : {}),
    },
  });
}
