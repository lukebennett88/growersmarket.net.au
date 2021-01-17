import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiSearch } from 'react-icons/hi';
import { useThrottle } from '@lib/index';
import { matchSorter } from 'match-sorter';
import { gql, useQuery } from '@apollo/client';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

function useProductMatch(products, term) {
  const throttledTerm = useThrottle(term, 100);
  return React.useMemo(
    () =>
      term.trim() === ''
        ? null
        : matchSorter(products, term, {
            keys: ['node.title'],
          }),
    [throttledTerm]
  );
}

function Searchbar() {
  const { data } = useQuery(gql`
    {
      products(first: 250) {
        edges {
          node {
            id
            handle
            images(first: 1) {
              edges {
                node {
                  altText
                  id
                  originalSrc
                }
              }
            }
            title
          }
        }
      }
    }
  `);

  const [term, setTerm] = React.useState('');

  const results = useProductMatch(data?.products?.edges, term);

  const inputRef = React.useRef(null);

  function handleChange(event) {
    setTerm(event.target.value);
  }

  function handleSelect(value) {
    setTerm(value);
  }

  return (
    <Combobox
      openOnFocus
      onSelect={handleSelect}
      aria-label="Product search"
      className="relative flex flex-1"
    >
      <div className="relative hidden sm:block">
        <ComboboxInput
          ref={inputRef}
          value={term}
          onChange={handleChange}
          type="text"
          placeholder="Search all products"
          className="pl-5 rounded-full"
        />
        <span className="absolute inset-y-0 inline-flex items-center right-4">
          <HiSearch className="w-5 h-5" />
        </span>
      </div>
      {results && (
        <ComboboxPopover
          portal={false}
          className="absolute right-0 z-30 mt-16 overflow-hidden text-left bg-white border-t rounded-b-lg shadow-2xl w-96 top-1 md:border-none md:rounded-t-lg"
        >
          <div className="p-4 shadow-sm">
            <h3 className="font-bold">Products</h3>
            <ComboboxList className="bg-white">
              {results.slice(0, 6).map(({ node }) => (
                <ComboboxOption
                  key={node.handle}
                  value={node.title}
                  className="rounded-lg odd:bg-gray-50"
                >
                  <Link href={`/products/${node.handle}`}>
                    <a className="relative flex items-center px-4 py-2 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:bg-gray-100 focus:z-10">
                      <Image
                        width={44}
                        height={44}
                        src={node.images.edges[0].node.originalSrc}
                        alt={node.images.edges[0].node.altText}
                        className="object-contain bg-white rounded h-11 w-11"
                      />
                      <span className="ml-2">{node.title}</span>
                    </a>
                  </Link>
                </ComboboxOption>
              ))}
            </ComboboxList>
            <hr className="mt-4 border-gray-100" />
            <div className="p-4 pb-0 text-sm">
              Searching for: “<em>{term}</em>”
            </div>
          </div>
        </ComboboxPopover>
      )}
    </Combobox>
  );
}

export { Searchbar };
