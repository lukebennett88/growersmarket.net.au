import { PlaneIcon } from '@components/vectors/plane-icon';
import { ShipIcon } from '@components/vectors/ship-icon';
import { TShippingType, useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

const shippingTypes = [
  {
    title: 'Ship',
    icon: ShipIcon,
  },
  {
    title: 'Plane',
    icon: PlaneIcon,
  },
];

function ShipOrPlane(): React.ReactElement {
  const { state, setState } = useCartContext();

  if (state.deliveryZone !== 'Lord Howe Island') {
    return null;
  }

  const property = 'shippingType';

  return (
    <Section heading="Delivery Method" colsClass="grid-cols-2">
      {shippingTypes.map((method) => (
        <Button
          key={method.title}
          isActive={state[property] === method.title}
          setActive={() =>
            setState((prevState) => ({
              ...prevState,
              [property]: method.title as TShippingType,
            }))
          }
        >
          <method.icon aria-hidden className="h-12 mx-auto" />
          <h3 className="font-bold">{method.title}</h3>
        </Button>
      ))}
    </Section>
  );
}

export { ShipOrPlane };
