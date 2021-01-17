import * as React from 'react';
import Link from 'next/link';
import { Highlight } from 'react-instantsearch-dom';

function SearchHit({ hit }) {
  return (
    <Link href={`/products/${hit.handle}`}>
      <a className="flex items-center px-8 py-2 -mx-4 focus:outline-none focus:bg-gray-200 hover:bg-gray-100">
        <img
          src={hit.image}
          alt=""
          width={44}
          height={44}
          className="object-contain bg-white h-11 w-11"
        />
        <span className="ml-2">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </span>
      </a>
    </Link>
  );
}

export { SearchHit };
