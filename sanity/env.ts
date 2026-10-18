import { z } from 'zod';

export const apiVersion = '2025-01-01';

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().default(''),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
});

const writeEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_SANITY_DATASET: z.string().min(1).default('production'),
  SANITY_API_WRITE_TOKEN: z.string().min(1),
});

const revalidateSecretSchema = z.object({
  SANITY_REVALIDATE_SECRET: z.string().min(1),
});

const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
});

export const projectId = publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = publicEnv.NEXT_PUBLIC_SANITY_DATASET;

export function getWriteEnv() {
  return writeEnvSchema.parse({
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    SANITY_API_WRITE_TOKEN: process.env.SANITY_API_WRITE_TOKEN,
  });
}

export function getRevalidateSecret() {
  return revalidateSecretSchema.parse({
    SANITY_REVALIDATE_SECRET: process.env.SANITY_REVALIDATE_SECRET,
  }).SANITY_REVALIDATE_SECRET;
}
