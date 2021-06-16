import * as React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface IQuantityPicker {
  increment: () => void;
  decrement: () => void;
  quantity: number;
  showDelete?: boolean;
  isIncrementLoading?: boolean;
  isDecrementLoading?: boolean;
}

function Spinner() {
  return <FaSpinner aria-hidden className="w-5 h-5 animate-spin" />;
}

function QuantityPicker({
  increment,
  decrement,
  isIncrementLoading,
  isDecrementLoading,
  quantity,
  showDelete = false,
}: IQuantityPicker): React.ReactElement {
  return (
    <span className="relative z-0 inline-flex rounded-full">
      {showDelete && quantity === 1 ? (
        <button
          aria-label="Remove from cart"
          type="button"
          onClick={decrement}
          disabled={isIncrementLoading || isDecrementLoading}
          className={`relative inline-flex items-center py-2 pl-3 pr-2 text-white rounded-l-full bg-green-dark focus:z-10 focus:outline-none focus:ring-2${
            isDecrementLoading ? ' opacity-75' : ''
          }`}
        >
          {isDecrementLoading ? (
            <Spinner />
          ) : (
            <svg
              aria-hidden
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          )}
        </button>
      ) : (
        <button
          aria-label="Decrement quantity"
          type="button"
          onClick={decrement}
          disabled={isIncrementLoading || isDecrementLoading}
          className={`relative inline-flex items-center py-2 pl-3 pr-2 text-white rounded-l-full bg-green-dark focus:z-10 focus:outline-none focus:ring-2${
            isDecrementLoading ? ' opacity-75' : ''
          }`}
        >
          {isDecrementLoading ? (
            <Spinner />
          ) : (
            <svg
              aria-hidden
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
          )}
        </button>
      )}
      <span className="relative inline-flex items-center w-12 px-4 py-2 -ml-px text-sm font-medium text-gray-700 border border-transparent bg-gray-light hover:bg-gray-50 focus:z-10 focus:outline-none">
        <span className="flex-1 font-bold text-center text-green-dark">
          {quantity}
        </span>
      </span>
      <button
        aria-label="Increment quantity"
        type="button"
        onClick={increment}
        disabled={isIncrementLoading || isDecrementLoading}
        className={`relative inline-flex items-center py-2 pl-2 pr-3 -ml-px text-sm font-medium text-white border border-transparent rounded-r-full bg-green-dark focus:z-10 focus:outline-none focus:ring-2${
          isIncrementLoading ? ' opacity-75' : ''
        }`}
      >
        {isIncrementLoading ? (
          <Spinner />
        ) : (
          <svg
            aria-hidden
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
        )}
      </button>
    </span>
  );
}

export { QuantityPicker };
