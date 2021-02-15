import * as React from 'react';

enum Variant {
  GRAY,
  GREEN,
  WHITE,
  BLACK,
  TRANSPARENT,
}

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.GRAY]: 'bg-gray-light',
  [Variant.GREEN]: 'bg-green-dark text-white',
  [Variant.WHITE]: 'bg-white',
  [Variant.BLACK]: 'bg-gray-900 text-white',
  [Variant.TRANSPARENT]: 'bg-transparent',
};

interface IHorizontalPadding {
  as?: string;
  children: React.ReactNode;
  variant?: Variant;
}

function HorizontalPadding({
  children,
  as = 'div',
  variant = Variant.TRANSPARENT,
}: IHorizontalPadding): React.ReactElement {
  return React.createElement(
    as,
    {
      className: `${VARIANT_MAPS[variant]} relative px-4 sm:px-6 lg:px-8`,
    },
    children
  );
}

HorizontalPadding.variant = Variant;

export { HorizontalPadding };
