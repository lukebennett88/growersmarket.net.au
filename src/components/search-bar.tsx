import * as React from 'react';
import {
  InstantSearch,
  Configure,
  connectStateResults,
  connectSearchBox,
  Highlight,
} from 'react-instantsearch-dom';
import { algoliaClient } from '@lib/algolia-client';
import Link from 'next/link';
import Image from 'next/image';
import { HiSearch } from 'react-icons/hi';
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';

function Searchbar() {
  return (
    <InstantSearch
      indexName="products_recently_ordered_count_desc"
      searchClient={algoliaClient}
    >
      <Combobox aria-label="Search for products">
        <Configure hitsPerPage={6} />
        <SearchBox />
        <div className="relative">
          <Results />
        </div>
      </Combobox>
    </InstantSearch>
  );
}

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  return (
    <div className="relative hidden sm:block">
      <ComboboxInput
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        type="text"
        placeholder="Search all products"
        className="pl-5 rounded-full"
      />
      <span className="absolute inset-y-0 inline-flex items-center right-4">
        <HiSearch className="w-5 h-5" />
      </span>
    </div>
  );
});

const Query = connectStateResults(({ searchState }) => {
  return searchState && searchState.query ? (
    <p className="px-4 py-4 text-base text-left border-t">
      Searching for: "{searchState.query}"
    </p>
  ) : null;
});

function ResultsWrapper({ children }) {
  return (
    <ComboboxPopover
      portal={false}
      className="absolute right-0 z-30 mt-6 overflow-hidden text-left bg-white rounded-b-lg shadow-2xl w-96 md:rounded-t-lg"
    >
      {children}
    </ComboboxPopover>
  );
}

const Results = connectStateResults(({ searchState, searchResults, error }) => {
  if (!searchResults) {
    return null;
  }

  if (error) {
    console.error(error);
    return null;
  }

  if (!searchState || !searchState.query) {
    return null;
  }

  if (searchResults && searchResults.nbHits === 0)
    return (
      <ResultsWrapper>
        No results have been found for "{searchState.query}"
      </ResultsWrapper>
    );

  if (searchResults && searchResults.nbHits !== 0) {
    return (
      <ResultsWrapper>
        <h3 className="px-4 py-4 text-base text-left uppercase border-b">
          Products
        </h3>
        <ComboboxList>
          {searchResults.hits.map((hit) => (
            <ComboboxOption key={hit.id} value={hit.title}>
              <Link href={`/products/${hit.handle}`}>
                <a className="flex items-center px-8 py-2 -mx-4 focus:outline-none focus:bg-gray-200 hover:bg-gray-100">
                  <div className="bg-white h-11 w-11">
                    {hit.image && (
                      <Image
                        width={44}
                        height={44}
                        layout="responsive"
                        src={hit.image}
                        alt=""
                        className="object-contain"
                      />
                    )}
                  </div>
                  <div className="ml-2">
                    <Highlight attribute="title" hit={hit} tagName="mark" />
                  </div>
                </a>
              </Link>
            </ComboboxOption>
          ))}
        </ComboboxList>
        <Query />
      </ResultsWrapper>
    );
  }
});

export { Searchbar };
