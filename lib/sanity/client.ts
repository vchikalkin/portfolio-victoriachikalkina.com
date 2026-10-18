import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '@/sanity/env';

export const isSanityConfigured = Boolean(projectId);

/**
 * Server-only client. Dataset may hide most types from anonymous API —
 * always send a Viewer/Editor read token from the server.
 */
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: false,
  perspective: 'published',
  token: process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN,
});
