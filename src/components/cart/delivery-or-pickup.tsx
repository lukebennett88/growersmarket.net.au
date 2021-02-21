import { BagIcon, DeliveryIcon } from '@components/vectors';
import { useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

function DeliveryOrPickup(): React.ReactElement {
  const { state, setState } = useCartContext();

  const property = 'deliveryMethod';

  return (
    <Section heading="Delivery or Pick Up?" colsClass="grid-cols-2">
      <Button
        isActive={state[property] === 'Pickup'}
        setActive={() =>
          setState((prevState) => ({ ...prevState, [property]: 'Pickup' }))
        }
      >
        <BagIcon className="h-12 mx-auto" />
        <h3 className="font-bold">Pick Up</h3>
        <p>($15 minimum spend)</p>
      </Button>
      <Button
        isActive={state[property] === 'Delivery'}
        setActive={() =>
          setState((prevState) => ({ ...prevState, [property]: 'Delivery' }))
        }
      >
        <DeliveryIcon className="h-12 mx-auto" />
        <h3 className="font-bold">Delivery</h3>
        <p>($40 minimum spend)</p>
      </Button>
    </Section>
  );
}

export { DeliveryOrPickup };
