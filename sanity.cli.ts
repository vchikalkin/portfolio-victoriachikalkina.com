import { defineCliConfig } from 'sanity/cli';
import { dataset, projectId } from './sanity/env';

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
  studioHost: 'victoria-chikalkina',
  // Studio Vite only injects SANITY_STUDIO_* — bake Next public env for the browser bundle.
  vite: (config) => ({
    ...config,
    define: {
      ...config.define,
      'process.env.NEXT_PUBLIC_SANITY_DATASET': JSON.stringify(
        process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,
      ),
      'process.env.NEXT_PUBLIC_SANITY_PROJECT_ID': JSON.stringify(
        process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
      ),
    },
  }),
});
