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

function envBag(keys: string[]) {
  return Object.fromEntries(keys.map((key) => [key, process.env[key]]));
}

const publicEnv = publicEnvSchema.parse(
  envBag(['NEXT_PUBLIC_SANITY_PROJECT_ID', 'NEXT_PUBLIC_SANITY_DATASET']),
);

export const projectId = publicEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = publicEnv.NEXT_PUBLIC_SANITY_DATASET;

export function getWriteEnv() {
  return writeEnvSchema.parse(
    envBag([
      'NEXT_PUBLIC_SANITY_PROJECT_ID',
      'NEXT_PUBLIC_SANITY_DATASET',
      'SANITY_API_WRITE_TOKEN',
    ]),
  );
}

export function getRevalidateSecret() {
  return revalidateSecretSchema.parse(envBag(['SANITY_REVALIDATE_SECRET']))
    .SANITY_REVALIDATE_SECRET;
}
