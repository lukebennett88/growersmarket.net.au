import * as React from 'react';

interface ISection {
  heading: string;
  children: React.ReactNode;
  colsClass?: string;
}

function Section({
  heading,
  children,
  colsClass = 'grid-cols-1',
}: ISection): React.ReactElement {
  return (
    <div className="bg-gray-light">
      <h2 className="py-4 font-bold text-center">{heading}</h2>
      <div
        className={`grid px-8 py-4 text-center border-t gap-y-4 gap-x-8 ${colsClass}`}
      >
        {children}
      </div>
    </div>
  );
}

export { Section };
export type { ISection };
