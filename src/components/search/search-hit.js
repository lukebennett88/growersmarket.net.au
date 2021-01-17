import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Highlight } from 'react-instantsearch-dom';

function SearchHit({ hit }) {
  return (
    <Link href={`/products/${hit.handle}`}>
      <a className="flex items-center px-8 py-2 -mx-4 focus:outline-none focus:bg-gray-200 hover:bg-gray-100">
        <div className="bg-white h-11 w-11">
          <Image
            width={44}
            height={44}
            layout="responsive"
            src={hit.image}
            alt=""
            className="object-contain"
          />
        </div>
        <span className="ml-2">
          <Highlight attribute="title" hit={hit} tagName="mark" />
        </span>
      </a>
    </Link>
  );
}

export { SearchHit };
