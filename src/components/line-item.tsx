import { useRemoveItemFromCart } from '@lib/hooks/use-remove-item-from-cart';
import { useUpdateItemQuantity } from '@lib/hooks/use-update-item-quantity';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { QuantityPicker } from './quantity-picker';
import { OnSaleBadge } from './vectors';

function LineItem({ lineItem }) {
  // Variant to add to cart
  const variantId = lineItem.variant.id;

  // Number of items in cart
  const [quantity, setQuantity] = React.useState<number>(lineItem.quantity);

  // Increment quantity
  const decrement = (): void => {
    if (quantity > 0) {
      setQuantity((prevQty) => prevQty - 1);
    }
  };

  // Decrement quantity
  const increment = (): void => setQuantity((prevQty) => prevQty + 1);

  const removeFromCart = useRemoveItemFromCart();
  const updateQuantity = useUpdateItemQuantity();

  React.useEffect(() => {
    if (quantity <= 0) {
      removeFromCart(variantId);
      return;
    }
    updateQuantity(variantId, quantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variantId, quantity]);

  const price = Number(lineItem.variant.price);

  const comparePrice = Number(lineItem.variant.compareAtPrice);

  const isOnSale = comparePrice !== 0 && comparePrice > price;

  return (
    <li key={lineItem.id} className="grid max-w-md grid-cols-2 gap-6">
      <div className="relative bg-white">
        {lineItem.variant.image?.src && (
          <Link href={`/products/${lineItem.variant.product.handle as string}`}>
            <a aria-hidden tabIndex={-1} className="block bg-white">
              <Image
                src={lineItem.variant.image.src}
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
          <Link href={`/products/${lineItem.variant.product.handle as string}`}>
            <a className="block">
              <h3 className="text-sm">{lineItem.title}</h3>
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
            decrement={decrement}
            quantity={quantity}
            showDelete
          />
        </div>
      </div>
    </li>
  );
}

export { LineItem };
