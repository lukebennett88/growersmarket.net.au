import * as React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure, Hits } from 'react-instantsearch-dom';
import { Results } from './search/results';
import { SearchHit } from './search/search-hit';
import { Query } from './search/query';
import { SearchBox } from './search/search-box';
import { ResultsWrapper } from './search/results-wrapper';

const searchClient = algoliasearch(
  'V259T7DYJV',
  '9fc1d234897020d7151c5a2afeab15e7'
);

function Searchbar() {
  return (
    <InstantSearch
      indexName="products_recently_ordered_count_desc"
      searchClient={searchClient}
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
