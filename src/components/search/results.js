import * as React from 'react';
import { connectStateResults } from 'react-instantsearch-dom';

import { ResultsWrapper } from './results-wrapper';

const Results = connectStateResults(
  ({ searchState, searchResults, children, error }) => {
    if (!searchResults) return null;
    if (error) {
      console.error(error);
      return null;
    }
    if (!searchState || !searchState.query) return null;
    if (searchResults && searchResults.nbHits === 0)
      return (
        <ResultsWrapper>
          No results have been found for "{searchState.query}"
        </ResultsWrapper>
      );
    if (searchResults && searchResults.nbHits !== 0) return children;
  }
);

export { Results };
