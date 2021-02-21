import { useAddToCart } from '@lib/hooks';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { Toast } from './toast';
import { OnSaleBadge } from './vectors';

interface IProductCard {
  product: {
    node: {
      handle: string;
      id: string;
      images: {
        edges: {
          node: {
            altText?: string;
            originalSrc: string;
          };
        }[];
      };
      compareAtPriceRange: {
        minVariantPrice: {
          amount: string;
        };
      };
      priceRange: {
        minVariantPrice: {
          amount: string | number;
        };
      };
      title: string;
      variants: {
        edges: {
          node: {
            id: string;
          };
        }[];
      };
    };
  };
}

function ProductCard({ product }: IProductCard) {
  // ID padded to addItemToCart function
  const variantId = product.node.variants.edges[0].node.id;

  // Number of items to add to cart
  const QUANTITY = 1;

  // State for showing add to cart toast notifications
  const [showDialog, setShowDialog] = React.useState(false);

  // Function to add products to cart
  const { addToCart } = useAddToCart({
    variantId,
    quantity: QUANTITY,
    setShowDialog,
  });

  // State for showing loading spinner while waiting for handleAddToCart to fire
  const [isLoading, setIsLoading] = React.useState(false);

  // Wrapper function to handle loading state
  async function handleAddToCart() {
    try {
      setIsLoading(true);
      await addToCart();
    } catch (error) {
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  const price = Number(product.node.priceRange.minVariantPrice.amount);

  const comparePrice = Number(
    product.node.compareAtPriceRange.minVariantPrice.amount
  );

  const isOnSale = comparePrice !== 0 && comparePrice > price;

  return (
    <li className="flex flex-col">
      <Link href={`/products/${product.node.handle}`}>
        <a aria-hidden tabIndex={-1} className="relative inline-block">
          <div className="relative h-0 aspect-w-4 aspect-h-3">
            <div className="absolute inset-0 flex">
              {product.node.images?.edges?.[0]?.node?.originalSrc && (
                <Image
                  width={600}
                  height={400}
                  src={product.node.images.edges[0]?.node?.originalSrc}
                  alt={product.node.images.edges[0]?.node?.altText || ''}
                  className="flex-1 object-cover"
                />
              )}
            </div>
          </div>
          {isOnSale && (
            <OnSaleBadge className="absolute w-10 h-10 -top-4 -right-4" />
          )}
        </a>
      </Link>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link href={`/products/${product.node.handle}`}>
          <a className="relative inline-block focus:z-10">
            <h3 className="text-sm">{product.node.title}</h3>
          </a>
        </Link>
        <div className="text-2xl text-right">
          <sup className="text-sm">$</sup>
          <span>{price.toFixed(2)}</span>
        </div>
      </div>
      <div className="pt-3 mt-auto">
        <button
          type="button"
          onClick={handleAddToCart}
          className={`inline-flex items-center justify-center w-full space-x-3 cta${
            isLoading ? ' opacity-75' : ''
          }`}
        >
          <span>Add to Cart</span>
          {isLoading ? (
            <FaSpinner className="w-6 opacity-50 h-7 animate-spin" />
          ) : (
            <HiOutlineShoppingCart className="w-7 h-7" />
          )}
        </button>
      </div>
      <Toast
        title={product.node.title}
        image={product.node.images?.edges?.[0]?.node}
        quantity={QUANTITY}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </li>
  );
}

export { ProductCard };
