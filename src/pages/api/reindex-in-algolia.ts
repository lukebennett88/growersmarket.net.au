import { getAllProductsForAlgolia } from '@lib/get-all-products-for-algolia';
import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';

const {
  NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
  ALGOLIA_ADMIN_API_KEY,
} = process.env;

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID,
    ALGOLIA_ADMIN_API_KEY
  );

  const products = await getAllProductsForAlgolia();

  const index = client.initIndex('all_shopify_products');

  index
    .replaceAllObjects(products, { autoGenerateObjectIDIfNotExist: true })
    // eslint-disable-next-line no-console
    .then(({ objectIDs }) => console.log(objectIDs))
    // eslint-disable-next-line no-console
    .catch((error) =>
      error.status(405).json({
        message: `Error:
        ${String(error)}`,
      })
    );
  return res.status(200).json({
    message: `Success:
    NEXT_PUBLIC_ALGOLIA_APPLICATION_ID: ${typeof NEXT_PUBLIC_ALGOLIA_APPLICATION_ID}
    ALGOLIA_ADMIN_API_KEY: ${typeof ALGOLIA_ADMIN_API_KEY}`,
  });
}
