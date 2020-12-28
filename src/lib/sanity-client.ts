import SanityClient from '@sanity/client';
import sanityImage from '@sanity/image-url';

const options = {
  // Find your project ID and dataset in `sanity.json` in your studio project
  dataset: 'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: process.env.NODE_ENV === 'production',
  // useCdn == true gives fast, cheap responses using a globally distributed cache.
  // Set this to false if your application require the freshest possible
  // data always (potentially slightly slower and a bit more expensive).
};

const sanityClient = SanityClient(options);

const imageBuilder = sanityImage(sanityClient);

const previewClient = SanityClient({
  ...options,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

// async function getSanityContent({ query, variables = {} }) {
//   const { data } = await fetch(
//     'https://l3fqvsnn.api.sanity.io/v1/graphql/production/default',
//     {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         query,
//         variables,
//       }),
//     }
//   ).then((response) => response.json());

//   return data;
// }

export {
  sanityClient,
  imageBuilder,
  previewClient,
  // getSanityContent
};
