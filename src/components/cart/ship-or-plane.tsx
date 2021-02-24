import { DeliveryIcon } from '@components/vectors';
import { TShippingType, useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

const shippingTypes = [
  {
    title: 'Ship',
    icon: DeliveryIcon,
    // minSpend: '15',
  },
  {
    title: 'Plane',
    icon: DeliveryIcon,
    // minSpend: '40',
  },
];

function ShipOrPlane(): React.ReactElement {
  const { state, setState } = useCartContext();

  if (state.deliveryZone !== 'Lord Howe Island') {
    return null;
  }

  const property = 'shippingType';

  return (
    <Section heading="Shipping type: Ship or Plane?" colsClass="grid-cols-2">
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
          <method.icon className="h-12 mx-auto" />
          <h3 className="font-bold">{method.title}</h3>
          {/* <p>(${method.minSpend} minimum spend)</p> */}
        </Button>
      ))}
    </Section>
  );
}

export { ShipOrPlane };
