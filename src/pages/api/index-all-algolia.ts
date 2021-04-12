import { getAllProductsForAlgolia } from '@lib/get-all-products-for-algolia';
import algoliasearch from 'algoliasearch';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const client = algoliasearch(
    'V259T7DYJV',
    '85d12cbf86544a63bcc15863065928b8'
  );
  const products = await getAllProductsForAlgolia();

  const index = client.initIndex('all_shopify_products');
  index
    .replaceAllObjects(products, { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => console.log(objectIDs))
    .catch((error) => console.log('ERROR:', error));
  return res.status(200).json({
    message: 'Success',
  });
}
