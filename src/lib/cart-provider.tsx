// Based off of this article:
// https://reacttraining.com/blog/react-context-with-typescript/

import * as React from 'react';

interface InitialStateValues {
  // Step in `ProgressIndicator` component
  step: number;

  // How the customer wants to receive their order
  deliveryMethod: '' | 'Delivery' | 'Pickup';

  // Delivery Zone that the customer lives in
  deliveryZone:
    | ''
    | 'Port Macquarie'
    | 'Wauchope'
    | 'Laurieton'
    | 'Kempsey'
    | 'Lord Howe Island';

  // Date that customer wants to pick up their order or have it delivered
  deliveryDate: '';

  // Time window that the customer wants to collect their order
  pickupTime: '' | '9am – 11am' | '11am – 2pm' | '2pm – 6pm';
}

// Initial state to be used in useState call inside of CartContextProvider
const initialState: InitialStateValues = {
  step: 1,
  deliveryMethod: '',
  deliveryZone: '',
  deliveryDate: '',
  pickupTime: '',
};

type TSetState = React.Dispatch<React.SetStateAction<InitialStateValues>>;

interface IState {
  state: InitialStateValues;
  setState: undefined | TSetState;
}

const initialValue: IState = {
  state: initialState,
  setState: undefined,
};

// We explicitly allow `undefined` as a potential value here
// to tell the compiler we plan to deal with it.
const CartContext = React.createContext<IState>(initialValue);

function useCartContext() {
  const context = React.useContext(CartContext);
  // If context is undefined, we know we used a component that
  // receives state from CartContext outside of our provider
  // so we can throw a more helpful error!
  if (context === undefined) {
    throw new Error(
      'A component using the useCartContext hook was not a child of the CartContextProvider.'
    );
  }

  // Because of TypeScript's type narrowing, if we make it past
  // the error the compiler knows that context is always defined
  // at this point, so we don't need to do any conditional
  // checking on its values when we use this hook!
  return context;
}

// Provider to wrap around cart to share state
function CartContextProvider({ children }) {
  const [state, setState] = React.useState(initialState);
  return (
    <CartContext.Provider value={{ state, setState }}>
      {children}
    </CartContext.Provider>
  );
}

// Export everything
export { CartContext, CartContextProvider, useCartContext };
export type { IState, TSetState };

// Alistair's Code here: https://gist.github.com/mrhut10/dd6e1cb539e8f0b757125fc0c301284b
// interface InitialStateValues {
//   // Step in `ProgressIndicator` component
//   step: number;

//   // How the customer wants to receive their order
//   deliveryMethod: '' | 'Delivery' | 'Pickup';

//   // Delivery Zone that the customer lives in
//   deliveryZone:
//     | ''
//     | 'Port Macquarie'
//     | 'Wauchope'
//     | 'Laurieton'
//     | 'Kempsey'
//     | 'Lord Howe Island';

//   // Date that customer wants to pick up their order or have it delivered
//   deliveryDate: '';

//   // Time window that the customer wants to collect their order
//   pickupTime: '' | '9am – 11am' | '11am – 2pm' | '2pm – 6pm';
// }

// type CartContextReducerFunction = (
//   prevState: InitialStateValues
// ) => InitialStateValues;

// type CartContextUpdaterFunction = (
//   input: InitialStateValues | CartContextReducerFunction
// ) => void;

// type CartContextType = InitialStateValues & {
//   setState: CartContextUpdaterFunction;
// };

// // We explicitly allow `undefined` as a potential value here
// // to tell the compiler we plan to deal with it.
// const CartContext = React.createContext<CartContextType | undefined>(undefined);

// function useCartContext() {
//   const context = React.useContext(CartContext);
//   // If context is undefined, we know we used a component that
//   // receives state from CartContext outside of our provider
//   // so we can throw a more helpful error!
//   if (context === undefined) {
//     throw new Error(
//       'RadioGroupItem must be used inside of a RadioGroup, ' +
//         'otherwise it will not function correctly.'
//     );
//   }

//   // Because of TypeScript's type narrowing, if we make it past
//   // the error the compiler knows that context is always defined
//   // at this point, so we don't need to do any conditional
//   // checking on its values when we use this hook!
//   return context;
// }

// // Initial state to be used in useState call inside of CartContextProvider
// const initialState: InitialStateValues = {
//   step: 1,
//   deliveryMethod: '',
//   deliveryZone: '',
//   deliveryDate: '',
//   pickupTime: '',
// };

// interface ICartContextProvider {
//   children: React.ReactNode;
// }

// // Provider to wrap around cart to share state
// function CartContextProvider({
//   children,
// }: ICartContextProvider): React.ReactElement {
//   const [state, setState] = React.useState<InitialStateValues>(initialState);
//   return (
//     <CartContext.Provider
//       value={{
//         ...state,
//         setState,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // Export everything
// export { CartContext, CartContextProvider, useCartContext };
