import * as React from 'react';
import { InstantSearch, Configure, Hits } from 'react-instantsearch-dom';
import { Results } from './search/results';
import { SearchHit } from './search/search-hit';
import { Query } from './search/query';
import { SearchBox } from './search/search-box';
import { ResultsWrapper } from './search/results-wrapper';
import { algoliaClient } from '@lib/algolia-client';

function Searchbar() {
  return (
    <InstantSearch
      indexName="products_recently_ordered_count_desc"
      searchClient={algoliaClient}
    >
      <Configure hitsPerPage={6} />
      <SearchBox />
      <div className="relative">
        <Results>
          <ResultsWrapper>
            <h3 className="px-4 py-4 text-base text-left uppercase border-b">
              Products
            </h3>
            <Hits hitComponent={SearchHit} />
            <Query />
          </ResultsWrapper>
        </Results>
      </div>
    </InstantSearch>
  );
}

export { Searchbar };
