import sanityClient from '@sanity/client';

const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2021-03-25', // use a UTC date string
  useCdn: true,
});

export { configuredSanityClient };
