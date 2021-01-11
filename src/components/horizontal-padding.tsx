import * as React from 'react';

enum Variant {
  GRAY,
  GREEN,
  WHITE,
  BLACK,
  TRANSPARENT,
}

interface HorizontalPaddingProps {
  as?: string;
  children: React.ReactNode;
  variant?: Variant;
}

const VARIANT_MAPS: Record<Variant, string> = {
  [Variant.GRAY]: 'bg-gray-light',
  [Variant.GREEN]: 'bg-green-dark text-white',
  [Variant.WHITE]: 'bg-white',
  [Variant.BLACK]: 'bg-gray-900 text-white',
  [Variant.TRANSPARENT]: 'bg-transparent',
};

function HorizontalPadding({
  children,
  as,
  variant = Variant.TRANSPARENT,
}: HorizontalPaddingProps) {
  return React.createElement(
    as || 'div',
    {
      className: `${VARIANT_MAPS[variant]} relative px-4 sm:px-6 lg:px-8`,
    },
    children
  );
}

HorizontalPadding.variant = Variant;

export { HorizontalPadding };
