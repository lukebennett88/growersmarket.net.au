import {
  ITopSellingProductNode,
  ITopSellingProducts,
  useHandleAddToCart,
} from '@lib/index';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import slugify from 'slugify';

import { HorizontalPadding } from './horizontal-padding';
import { Toast } from './toast';
import { OnSaleBadge } from './vectors';

interface TopSellingProductsProps {
  topSelling: ITopSellingProducts;
  productType?: string;
}

function TopSellingProducts({
  topSelling,
  productType,
}: TopSellingProductsProps): React.ReactElement {
  return (
    <div className="bg-gray-light">
      <div className="py-16 lg:sticky lg:top-44 lg:max-w-lg">
        <HorizontalPadding>
          <h2 className="text-2xl font-bold">
            Our Top Selling {productType || 'Products'}
          </h2>
          <ul className="grid gap-8 mt-4">
            {topSelling.edges.map(({ node }) => (
              <TopSellingProduct key={node.id} node={node} />
            ))}
          </ul>
          {productType && (
            <div className="mt-16 text-center">
              <Link
                // TODO: use slugify in getStaticProps so we don't need to ship the 6kb bundle on the frontend
                href={`/${slugify(productType, {
                  lower: true,
                })}`}
              >
                <a className="inline-block px-16 py-2 text-sm font-bold border rounded-full text-green-dark border-green-dark hover:bg-white focus:bg-white">
                  See More
                </a>
              </Link>
            </div>
          )}
        </HorizontalPadding>
      </div>
    </div>
  );
}

interface TopSellingProductProps {
  node: ITopSellingProductNode;
}

function TopSellingProduct({
  node,
}: TopSellingProductProps): React.ReactElement {
  const variantId = node.variants.edges[0].node.id;

  // State for showing add to cart toast notifications
  const [showDialog, setShowDialog] = React.useState(false);

  const { handleAddToCart } = useHandleAddToCart({
    variantId,
    quantity: 1,
    setShowDialog,
  });

  const addToCart = () => {
    setShowDialog(true);
    handleAddToCart();
  };

  const price = Number(node.priceRange.minVariantPrice.amount);

  const comparePrice = Number(node.compareAtPriceRange.minVariantPrice.amount);

  const [isOnSale, setisOnSale] = React.useState(false);

  React.useEffect(() => {
    if (comparePrice !== 0 && comparePrice > price) {
      setisOnSale(true);
    }
  }, [comparePrice, price]);

  return (
    <li className="grid grid-cols-2 gap-6">
      <div className="relative bg-white">
        {node.images?.edges?.[0]?.node?.originalSrc && (
          <Link href={`/products/${node.handle}`}>
            <a aria-hidden tabIndex={-1} className="block bg-white">
              <Image
                width={480}
                height={360}
                layout="responsive"
                src={node.images?.edges?.[0]?.node.originalSrc}
                alt={node.images?.edges?.[0]?.node.altText || ''}
                className="object-cover"
              />
            </a>
          </Link>
        )}
        {isOnSale && (
          <OnSaleBadge className="absolute w-10 h-10 -top-4 -right-4" />
        )}
      </div>
      <div className="flex flex-col col-start-2">
        <div className="font-bold">
          <Link href={`/products/${node.handle}`}>
            <a className="block">
              <h3 className="text-sm">{node.title}</h3>
            </a>
          </Link>
          <div className="text-2xl">
            <sup className="text-sm">$</sup>
            <span>{price.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4 mt-auto">
          <button
            type="button"
            onClick={addToCart}
            className="inline-flex items-center justify-center px-6 py-1 space-x-3 text-sm whitespace-nowrap cta"
          >
            <span>Add to Cart</span>
            <HiOutlineShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
      <Toast
        title={node.title}
        image={node.images?.edges?.[0]?.node}
        quantity={1}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </li>
  );
}

export { TopSellingProducts };
