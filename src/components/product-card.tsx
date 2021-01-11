import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineShoppingCart } from 'react-icons/hi';

import { useAddItemToCart } from '@lib/hooks';

interface ProductCardProps {
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

function ProductCard({ product }: ProductCardProps) {
  const variantId = product.node.variants.edges[0].node.id;

  const addItemToCart = useAddItemToCart();

  async function addToCart() {
    const quantity = 1;

    try {
      await addItemToCart(variantId, quantity);
      alert('Successfully added that item to your cart!');
    } catch (error) {
      alert(error);
    }
  }

  return (
    <li className="flex flex-col">
      <Link href={`/products/${product.node.handle}`}>
        <a aria-hidden tabIndex={-1} className="inline-block">
          <div className="relative h-0 aspect-w-4 aspect-h-3">
            <div className="absolute inset-0 flex">
              <Image
                width={600}
                height={400}
                src={product.node.images.edges[0].node.originalSrc}
                alt={product.node.images.edges[0].node.altText}
                className="flex-1 object-cover"
              />
            </div>
          </div>
        </a>
      </Link>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <Link href={`/products/${product.node.handle}`}>
          <a className="relative inline-block focus:z-10">
            <h3 className="text-sm">{product.node.title}</h3>
          </a>
        </Link>
        <div className="text-2xl">
          <sup className="text-sm">$</sup>
          <span>
            {Number(product.node.priceRange.minVariantPrice.amount).toFixed(2)}
          </span>
        </div>
      </div>
      <div className="pt-3 mt-auto">
        <button
          className="inline-flex items-center justify-center w-full space-x-3 cta"
          onClick={addToCart}
        >
          <span>Add to Cart</span>
          <HiOutlineShoppingCart className="w-7 h-7" />
        </button>
      </div>
    </li>
  );
}

export { ProductCard };
