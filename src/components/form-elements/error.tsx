import * as React from 'react';

interface IError {
  message: string;
}

function Error({ message }: IError) {
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
