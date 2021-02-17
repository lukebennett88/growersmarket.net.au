interface IStep {
  children: React.ReactNode;
  index: number;
  step: number;
  setState: React.Dispatch<
    React.SetStateAction<{
      step: number;
    }>
  >;
}

function Step({ index, children, step, setState }: IStep): React.ReactElement {
  return (
    <li className="relative grid">
      <button
        type="button"
        onClick={() => setState((prevState) => ({ ...prevState, step: index }))}
        className={`px-3 py-4 relative focus:z-10 ${
          step === index
            ? 'bg-green-dark text-white font-bold'
            : 'bg-gray-light'
        }`}
      >
        {children}
      </button>
    </li>
  );
}

function ProgressIndicator({
  step,
  setState,
}: {
  step: number;
  setState: React.Dispatch<
    React.SetStateAction<{
      step: number;
    }>
  >;
}): React.ReactElement {
  return (
    <ol className="grid mt-4 text-center sm:grid-cols-4">
      <Step index={1} step={step} setState={setState}>
        1. Summary
      </Step>
      <Step index={2} step={step} setState={setState}>
        2. Login
      </Step>
      <Step index={3} step={step} setState={setState}>
        3. Delivery
      </Step>
      <Step index={4} step={step} setState={setState}>
        4. Confirm Order
      </Step>
    </ol>
  );
}

export { ProgressIndicator };
