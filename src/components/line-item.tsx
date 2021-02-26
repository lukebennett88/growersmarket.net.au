import { useRemoveItemFromCart } from '@lib/hooks/use-remove-item-from-cart';
import { useUpdateItemQuantity } from '@lib/hooks/use-update-item-quantity';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { QuantityPicker } from './quantity-picker';
import { OnSaleBadge } from './vectors/on-sale-badge';

type TLineItem = {
  id: string;
  title: string;
  variant: {
    id: string;
    compareAtPrice: string;
    image?: {
      src: string;
    };
    price: string;
    product: {
      handle: string;
    };
  };
  quantity: number;
};

interface ILineItem {
  lineItem: TLineItem;
}

function LineItem({ lineItem }: ILineItem): React.ReactElement {
  // Function to update quantity of a line item in the cart
  const updateQuantity = useUpdateItemQuantity();

  // Function to remove a line item from the cart
  const removeFromCart = useRemoveItemFromCart();

  const { id, quantity, title, variant } = lineItem;

  // Variant to add to cart
  const variantId = variant.id;

  // Increment quantity
  const [isIncrementLoading, setIsIncrementLoading] = React.useState(false);
  const increment = async () => {
    setIsIncrementLoading(true);
    try {
      await updateQuantity(variantId, quantity + 1);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsIncrementLoading(false);
    }
  };

  // Decrement quantity
  const [isDecrementLoading, setIsDecrementLoading] = React.useState(false);
  const decrement = async () => {
    setIsDecrementLoading(true);
    try {
      await (quantity <= 0
        ? removeFromCart(variantId)
        : updateQuantity(variantId, quantity - 1));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsDecrementLoading(false);
    }
  };

  const price = Number(variant.price);

  const comparePrice = Number(variant.compareAtPrice);

  const isOnSale = comparePrice !== 0 && comparePrice > price;

  return (
    <li key={id} className="grid max-w-md grid-cols-2 gap-6">
      <div className="relative bg-white">
        {variant.image?.src && (
          <Link href={`/products/${variant.product.handle}`}>
            <a aria-hidden tabIndex={-1} className="block bg-white">
              <Image
                src={variant.image.src}
                height={360}
                width={480}
                layout="responsive"
                alt=""
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
          <Link href={`/products/${variant.product.handle}`}>
            <a className="block">
              <h3 className="text-sm">{title}</h3>
            </a>
          </Link>
          <div className="text-2xl">
            <sup className="text-sm">$</sup>
            <span>{price.toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4 mt-auto">
          <QuantityPicker
            increment={increment}
            isIncrementLoading={isIncrementLoading}
            decrement={decrement}
            isDecrementLoading={isDecrementLoading}
            quantity={quantity}
            showDelete
          />
        </div>
      </div>
    </li>
  );
}

export { LineItem };
