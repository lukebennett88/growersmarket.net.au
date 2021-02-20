import * as React from 'react';

// Interface for `state` object inside of cart
interface IState {
  step: number;
  deliveryMethod: string;
  deliveryArea: string;
  deliveryDate: string;
}

// Declare value of state as a seperate variable so we can use it in
// initialState and as initial value for useState in CartContextProvider
const stateObject: IState = {
  step: 1,
  deliveryMethod: '',
  deliveryArea: '',
  deliveryDate: '',
};

// Initial state of CartContext
const initialState = {
  state: stateObject,
  setState: () => null,
};

// Interface for initial state of CartContext
interface ICartContext {
  state: IState;
  setState: (state: IState) => void;
}

// Create context for cart state
const CartContext = React.createContext<ICartContext>(initialState);

// Create React Provider for cart state
interface ICartContextProvider {
  children: React.ReactNode;
}

// Create Context Provider and set up useState
function CartContextProvider({ children }: ICartContextProvider) {
  const [state, setState] = React.useState(stateObject);

  return (
    <CartContext.Provider
      value={{
        state,
        setState,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Create useCartContext to make using values from Context easier
function useCartContext() {
  return React.useContext(CartContext);
}

// Export everything
export { CartContext, CartContextProvider, useCartContext };
