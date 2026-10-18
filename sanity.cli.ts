import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
    dataset: process.env.SANITY_STUDIO_DATASET!,
  },
  studioHost: 'victoria-chikalkina',
  deployment: {
    appId: 'nw0fyu3ww4nitrcb055rg20n',
  },
});
