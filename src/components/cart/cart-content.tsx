import { useCartContext } from '@lib/cart-provider';
import { useAuthUser } from 'next-firebase-auth';
import * as React from 'react';

import { ConfirmOrder } from './confirm-order';
import { Delivery } from './delivery';
import { Login } from './login';
import { ProgressIndicator } from './progress-indicator';
import { Summary } from './summary';

function CartContent() {
  const { state, setState } = useCartContext();
  const authUser = useAuthUser();
  return (
    <>
      <ProgressIndicator step={state.step} setState={setState} />
      {state.step === 1 && <Summary setState={setState} />}
      {state.step === 2 && <Login setState={setState} authUser={authUser} />}
      {state.step === 3 && <Delivery />}
      {state.step === 4 && (
        <ConfirmOrder state={state} setState={setState} authUser={authUser} />
      )}
    </>
  );
}

export { CartContent };
