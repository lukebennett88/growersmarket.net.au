import { useCartContext } from '@lib/cart-context';

interface IStep {
  children: React.ReactNode;
  index: number;
}

function Step({ index, children }: IStep): React.ReactElement {
  const { state, setState } = useCartContext();
  return (
    <li className="relative grid">
      <button
        type="button"
        onClick={() => setState((prevState) => ({ ...prevState, step: index }))}
        className={`px-3 py-4 relative focus:z-10 ${
          state.step === index
            ? 'bg-green-dark text-white font-bold'
            : 'bg-gray-light'
        }`}
      >
        {children}
      </button>
    </li>
  );
}

function ProgressIndicator(): React.ReactElement {
  return (
    <ol className="grid mt-4 text-center sm:grid-cols-4">
      <Step index={1}>1. Summary</Step>
      <Step index={2}>2. Login</Step>
      <Step index={3}>3. Delivery</Step>
      <Step index={4}>4. Confirm Order</Step>
    </ol>
  );
}

export { ProgressIndicator };
