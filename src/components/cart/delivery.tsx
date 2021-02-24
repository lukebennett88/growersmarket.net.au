import { useCartContext } from '@lib/cart-provider';
import { useCart } from '@lib/index';
import { copyFileSync } from 'fs';
import * as React from 'react';

import { DeliveryOrPickup } from './delivery-or-pickup';
import { DeliveryZone } from './delivery-zone';
import { PaginationLinks } from './pagination-links';
import { PickupDay } from './pickup-day';
import { PickupTime } from './pickup-time';
import { ShipOrPlane } from './ship-or-plane';

function Delivery(): React.ReactElement {
  const { state, setState } = useCartContext();

  const cart = useCart();

  const cartTotal = Number(cart?.totalPrice || 0).toFixed(2);

  if (Number(cartTotal) < 15) {
    setState((prevState) => ({ ...prevState, step: 1 }));
  }

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
