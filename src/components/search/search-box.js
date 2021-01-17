import * as React from 'react';
import { HiSearch } from 'react-icons/hi';

import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = connectSearchBox(
  ({ currentRefinement, refine }) => (
    <form noValidate action="" role="search" className="relative hidden sm:block">
      <input
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        type="text"
        placeholder="Search all products"
        className="pl-5 rounded-full"
      />
      <span className="absolute inset-y-0 inline-flex items-center right-4">
          <HiSearch className="w-5 h-5" />
        </span>
    </form>
  )
);

export { SearchBox };
