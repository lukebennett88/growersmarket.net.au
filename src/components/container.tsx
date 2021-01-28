import * as React from 'react';

interface IContainer {
  as?: string;
  children: React.ReactNode;
}

function Container({ children, as }: IContainer) {
  return React.createElement(
    'div' || as,
    {
      className: 'w-full mx-auto max-w-screen-2xl',
    },
    children
  );
}

export { Container };
