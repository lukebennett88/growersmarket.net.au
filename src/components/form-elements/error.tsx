import * as React from 'react';

interface ErrorProps {
  message: string;
}

function Error({ message }: ErrorProps) {
  return (
    <p
      role="alert"
      className="mt-1 text-xs font-bold tracking-widest uppercase text-green-dark"
    >
      {message}
    </p>
  );
}

export { Error };
