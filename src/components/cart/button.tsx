import * as React from 'react';

interface IButton {
  children: React.ReactNode;
  isActive: boolean;
  setActive: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isDisabled?: boolean;
}

function Button({
  children,
  isActive,
  setActive,
  isDisabled,
}: IButton): React.ReactElement {
  return (
    <button
      type="button"
      onClick={setActive}
      disabled={isDisabled}
      className={`p-4 border rounded transition duration-150 ease-in-out disabled:border-transparent disabled:opacity-75 disabled:cursor-not-allowed ${
        isActive
          ? ' bg-green-dark text-white'
          : ' bg-white hover:border-green-dark'
      }`}
    >
      {children}
    </button>
  );
}

export { Button };
export type { IButton };
