import { useCartContext } from '@lib/cart-context';
import { useCart } from '@lib/hooks/use-cart';
import * as React from 'react';

import { DeliveryOrPickup } from './delivery-or-pickup';
import { DeliveryZone } from './delivery-zone';
import { PaginationLinks } from './pagination-links';
import { PickupDay } from './pickup-day';
import { PickupTime } from './pickup-time';
import { ShipOrPlane } from './ship-or-plane';

function Delivery(): React.ReactElement {
  const { setState } = useCartContext();

  const cart = useCart();

  const cartTotal = Number(cart?.totalPrice || 0).toFixed(2);

  React.useEffect(() => {
    if (Number(cartTotal) < 15) {
      setState((prevState) => ({ ...prevState, step: 1 }));
    }
  }, [cartTotal, setState]);

  // Scroll to top of page
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="grid gap-8 mt-8">
      <DeliveryOrPickup />
      <DeliveryZone />
      <ShipOrPlane />
      <PickupDay />
      <PickupTime />
      <PaginationLinks />
    </div>
  );
}

export { Delivery };
