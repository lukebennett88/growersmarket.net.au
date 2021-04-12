import { getAllProductsForAlgolia } from '@lib/get-all-products-for-algolia';
import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    process.env.NEXT_PUBLIC_APPLICATION_ID,
    process.env.ALGOLIA_ADMIN_API_KEY
  );

  const products = await getAllProductsForAlgolia();

  const index = client.initIndex('all_shopify_products');

  index
    .replaceAllObjects(products, { autoGenerateObjectIDIfNotExist: true })
    // eslint-disable-next-line no-console
    .then(({ objectIDs }) => console.log(objectIDs))
    // eslint-disable-next-line no-console
    .catch((error) => console.error({ error }));
  return res.status(200).json({
    message: 'Success',
  });
}
