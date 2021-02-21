import * as React from 'react';

import { DeliveryOrPickup } from './delivery-or-pickup';
import { DeliveryZone } from './delivery-zone';
import { PaginationLinks } from './pagination-links';
import { PickupDay } from './pickup-day';
import { PickupTime } from './pickup-time';

function Delivery(): React.ReactElement {
  return (
    <div className="grid gap-8 mt-8">
      <DeliveryOrPickup />
      <DeliveryZone />
      <PickupDay />
      <PickupTime />
      <PaginationLinks />
    </div>
  );
}

export { Delivery };
