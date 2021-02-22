import { useCartContext } from '@lib/cart-provider';
import * as React from 'react';

import { ConfirmOrder } from './confirm-order';
import { Delivery } from './delivery';
import { Login } from './login';
import { ProgressIndicator } from './progress-indicator';
import { Summary } from './summary';

function CartContent() {
  const { state } = useCartContext();
  return (
    <>
      <ProgressIndicator />
      {state.step === 1 && <Summary />}
      {state.step === 2 && <Login />}
      {state.step === 3 && <Delivery />}
      {state.step === 4 && <ConfirmOrder />}
    </>
  );
}

export { CartContent };
