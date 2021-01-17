import algoliasearch from 'algoliasearch/lite';

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_APPLICATION_ID,
  process.env.NEXT_PUBLIC_SEARCH_ONLY_API_KEY
);

export { algoliaClient };
