import { useCartContext } from '@lib/cart-context';
import * as React from 'react';

import { ConfirmOrder } from './confirm-order';
import { Delivery } from './delivery';
import { ProgressIndicator } from './progress-indicator';
import { Summary } from './summary';

function CartContent() {
  const { state } = useCartContext();
  return (
    <>
      <ProgressIndicator />
      {state.step === 1 && <Summary />}
      {state.step === 2 && <Delivery />}
      {state.step === 3 && <ConfirmOrder />}
    </>
  );
}

export { CartContent };
