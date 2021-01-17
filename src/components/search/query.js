import * as React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

const Query = connectStateResults(({ searchState }) => {
  return searchState && searchState.query ? (
    <p className="px-4 py-4 text-base text-left border-t">
      Searching for: "{searchState.query}"
    </p>
  ) : null;
});

export { Query };
