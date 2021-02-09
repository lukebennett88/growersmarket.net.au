import * as React from 'react';

interface IQuantityPicker {
  increment: () => void;
  decrement: () => void;
  quantity: number;
}

function QuantityPicker({
  increment,
  decrement,
  quantity,
}: IQuantityPicker): React.ReactElement {
  return (
    <span className="relative z-0 inline-flex rounded-full">
      <button
        type="button"
        onClick={decrement}
        className="relative inline-flex items-center py-2 pl-3 pr-2 text-white rounded-l-full bg-green-dark focus:z-10 focus:outline-none focus:ring-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 12H6"
          />
        </svg>
      </button>
      <span className="relative inline-flex items-center w-12 px-4 py-2 -ml-px text-sm font-medium text-gray-700 border border-transparent bg-gray-light hover:bg-gray-50 focus:z-10 focus:outline-none">
        <span className="flex-1 font-bold text-center text-green-dark">
          {quantity}
        </span>
      </span>
      <button
        type="button"
        onClick={increment}
        className="relative inline-flex items-center py-2 pl-2 pr-3 -ml-px text-sm font-medium text-white border border-transparent rounded-r-full bg-green-dark focus:z-10 focus:outline-none focus:ring-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </span>
  );
}

export { QuantityPicker };
