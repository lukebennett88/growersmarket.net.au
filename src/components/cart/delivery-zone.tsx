import { useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { Button } from './button';
import { Section } from './section';

function DeliveryZone(): React.ReactElement {
  const { state, setState } = useCartContext();

  const propertyName = 'deliveryZone';

  if (
    !(state.deliveryMethod === 'Pickup' || state.deliveryMethod === 'Delivery')
  ) {
    return null;
  }

  return (
    <Section heading="Delivery Zone">
      <Button
        isActive={state[propertyName] === 'Port Macquarie'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: 'Port Macquarie',
          }))
        }
      >
        <h3 className="font-bold">Port Macquarie</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={state[propertyName] === 'Wauchope'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: 'Wauchope',
          }))
        }
      >
        <h3 className="font-bold">Wauchope</h3>
        <p>Delivered on: Monday, Wednesday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={state[propertyName] === 'Laurieton'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: 'Laurieton',
          }))
        }
      >
        <h3 className="font-bold">
          Laurieton / Lake Cathie / North Haven / Bonny Hills
        </h3>
        <p>Delivered on: Tuesday and Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      <Button
        isActive={state[propertyName] === 'Kempsey'}
        setActive={() =>
          setState((prevState) => ({ ...prevState, [propertyName]: 'Kempsey' }))
        }
      >
        <h3 className="font-bold">Kempsey/Crescent Head</h3>
        <p>Delivered on: Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
      {/* // TODO: Check if Lord Howe Island should be listed here */}
      <Button
        isActive={state[propertyName] === 'Lord Howe Island'}
        setActive={() =>
          setState((prevState) => ({
            ...prevState,
            [propertyName]: 'Lord Howe Island',
          }))
        }
      >
        <h3 className="font-bold">Lord Howe Island</h3>
        <p>Delivered on: Monday, Tuesday, Wednesday, Thursday, Friday.</p>
        <p>Please place your order before 10am the day prior to delivery.</p>
      </Button>
    </Section>
  );
}

export { DeliveryZone };
