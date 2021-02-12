interface IStep {
  children: React.ReactNode;
  index: number;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function Step({ index, children, step, setStep }: IStep) {
  return (
    <li className="relative grid">
      <button
        type="button"
        onClick={() => setStep(index)}
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
  setStep,
}: {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <ol className="grid mt-4 text-center sm:grid-cols-4">
      <Step index={1} step={step} setStep={setStep}>
        1. Summary
      </Step>
      <Step index={2} step={step} setStep={setStep}>
        2. Login
      </Step>
      <Step index={3} step={step} setStep={setStep}>
        3. Delivery
      </Step>
      <Step index={4} step={step} setStep={setStep}>
        4. Confirm Order
      </Step>
    </ol>
  );
}

export { ProgressIndicator };
