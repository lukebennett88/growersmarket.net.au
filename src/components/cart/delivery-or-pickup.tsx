import { BagIcon, DeliveryIcon } from '@components/vectors';
import { TDeliveryMethod, useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

const deliveryMethods = [
  {
    title: 'Pickup',
    icon: BagIcon,
    minSpend: '15',
  },
  {
    title: 'Delivery',
    icon: DeliveryIcon,
    minSpend: '40',
  },
];

function DeliveryOrPickup(): React.ReactElement {
  const { state, setState } = useCartContext();

  const property = 'deliveryMethod';

  return (
    <Section heading="Delivery or Pick Up?" colsClass="grid-cols-2">
      {deliveryMethods.map((method) => (
        <Button
          isActive={state[property] === method.title}
          setActive={() =>
            setState((prevState) => ({
              ...prevState,
              [property]: method.title as TDeliveryMethod,
            }))
          }
        >
          <method.icon className="h-12 mx-auto" />
          <h3 className="font-bold">{method.title}</h3>
          <p>(${method.minSpend} minimum spend)</p>
        </Button>
      ))}
    </Section>
  );
}

export { DeliveryOrPickup };
