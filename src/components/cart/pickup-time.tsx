import { useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

function PickupTime(): React.ReactElement {
  const { state, setState } = useCartContext();

  if (
    state.deliveryMethod === '' ||
    state.deliveryMethod === 'Delivery' ||
    state.deliveryDate === ''
  ) {
    return null;
  }

  const propertyName = 'pickupTime';

  return (
    <Section heading="Pickup Time">
      <Button
        isActive={state.pickupTime === '9am – 11am'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: '9am – 11am',
          }))
        }
      >
        <h3 className="font-bold">Morning</h3>
        <p>9am – 11am</p>
      </Button>
      <Button
        isActive={state.pickupTime === '11am – 2pm'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: '11am – 2pm',
          }))
        }
      >
        <h3 className="font-bold">Midday</h3>
        <p>11am – 2pm</p>
      </Button>
      <Button
        isActive={state.pickupTime === '2pm – 6pm'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: '2pm – 6pm',
          }))
        }
      >
        <h3 className="font-bold">Afternoon</h3>
        <p>2pm – 6pm</p>
      </Button>
    </Section>
  );
}

export { PickupTime };
