import { TDeliveryZone, useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

const deliveryZones = [
  {
    zone: 'Port Macquarie',
    deliveryDays: 'Monday, Tuesday, Wednesday, Thursday, Friday.',
  },
  {
    zone: 'Wauchope',
    heading: 'Wauchope / Sancrox / Thrumster / Sovereign Hills',
    deliveryDays: 'Monday, Wednesday, Friday.',
  },
  {
    zone: 'Laurieton',
    heading: 'Laurieton / Lake Cathie / North Haven / Bonny Hills',
    deliveryDays: 'Tuesday and Friday.',
  },
  {
    zone: 'Kempsey',
    heading: 'Kempsey/Crescent Head',
    deliveryDays: 'Friday.',
  },
  {
    zone: 'Lord Howe Island',
    deliveryDays: 'Monday, Tuesday, Wednesday, Thursday, Friday.',
  },
];

function DeliveryZone(): React.ReactElement {
  const { state, setState } = useCartContext();

  const propertyName = 'deliveryZone';

  if (state.deliveryMethod === '' || state.deliveryMethod === 'Pickup') {
    return null;
  }

  return (
    <Section heading="Delivery Zone">
      {deliveryZones.map(({ zone, heading, deliveryDays }) => (
        <Button
          key={zone}
          isActive={state[propertyName] === zone}
          setActive={() =>
            setState((prevState) => ({
              ...prevState,
              [propertyName]: zone as TDeliveryZone,
            }))
          }
        >
          <h3 className="font-bold">{heading || zone}</h3>
          <p>Delivered on: {deliveryDays}</p>
          <p>Please place your order before 10am the day prior to delivery.</p>
        </Button>
      ))}
    </Section>
  );
}

export { DeliveryZone };
