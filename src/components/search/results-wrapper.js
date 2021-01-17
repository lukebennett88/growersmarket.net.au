import * as React from 'react';

function ResultsWrapper({ children }) {
  return (
    <div className="absolute right-0 z-30 mt-6 overflow-hidden text-left bg-white rounded-b-lg shadow-2xl w-96 md:rounded-t-lg">
      {children}
    </div>
  );
}

export { ResultsWrapper };
