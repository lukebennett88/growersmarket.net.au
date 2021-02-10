/* eslint-disable @typescript-eslint/no-explicit-any */
import { algoliaClient } from '@lib/algolia-client';
import type {
  ComboboxOptionProps as ReachComboboxOptionProps,
  ComboboxProps as ReachComboboxProps,
} from '@reach/combobox';
import {
  Combobox as ReachCombobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption as ReachComboboxOption,
  ComboboxPopover,
} from '@reach/combobox';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiOutlineSearch, HiOutlineX } from 'react-icons/hi';
import {
  Configure,
  connectSearchBox,
  connectStateResults,
  Highlight,
  InstantSearch,
} from 'react-instantsearch-dom';

function Searchbar() {
  return (
    <InstantSearch
      indexName="products_recently_ordered_count_desc"
      searchClient={algoliaClient}
    >
      <SearchBox />
    </InstantSearch>
  );
}

const SearchBox = connectSearchBox(({ currentRefinement, refine }) => {
  const router = useRouter();
  const inputRef = React.useRef(null);
  return (
    <Combobox
      openOnFocus
      onSelect={(_, data) => {
        router.push(`/products/${data.handle as string}`);
        refine('');
        inputRef.current.blur();
      }}
      aria-label="Search for products"
      className="relative z-40"
    >
      <Configure hitsPerPage={6} />
      <div className="relative">
        <ComboboxInput
          ref={inputRef}
          value={currentRefinement}
          onChange={(event) => {
            refine(event.currentTarget.value);
          }}
          type="text"
          placeholder="Search all products"
          className="w-full pl-5 rounded-full sm:w-auto"
        />
        <span className="absolute inset-y-0 inline-flex items-center text-gray-500 right-4">
          {currentRefinement ? (
            <button
              type="button"
              onClick={() => {
                refine('');
                inputRef.current.focus();
              }}
            >
              <span className="sr-only">Clear</span>
              <HiOutlineX aria-hidden className="w-5 h-5" />
            </button>
          ) : (
            <HiOutlineSearch aria-hidden className="w-5 h-5" />
          )}
        </span>
      </div>
      <div className="relative -mx-4 sm:mx-0">
        <Results refine={refine} />
      </div>
    </Combobox>
  );
});

const Query = connectStateResults(({ searchState }) =>
  searchState && searchState.query ? (
    <p className="px-4 py-4 text-base text-left border-t">
      Searching for: &ldquo;{searchState.query}&rdquo;
    </p>
  ) : null
);

function ResultsWrapper({ children }) {
  return (
    <ComboboxPopover
      portal={false}
      className="absolute right-0 z-30 w-full mt-6 overflow-hidden text-left bg-white rounded-b-lg shadow-2xl sm:w-96 md:rounded-t-lg"
    >
      {children}
    </ComboboxPopover>
  );
}

const ComboboxContext = React.createContext<ComboboxContextValue>({} as any);

function Combobox({ onSelect: onSelectProp, ...props }: ComboboxProps) {
  const {
    addOptionData,
    getOptionData,
    removeOptionData,
  } = useOptionDataFactory();

  const onSelectRef = React.useRef(onSelectProp);
  React.useEffect(() => {
    onSelectRef.current = onSelectProp;
  });

  const onSelect = React.useCallback(
    (value: string) => {
      onSelectRef.current?.(value, getOptionData(value));
    },
    [getOptionData]
  );

  const context: ComboboxContextValue = React.useMemo(
    () => ({
      addOptionData,
      getOptionData,
      removeOptionData,
      onSelect,
    }),
    [onSelect, addOptionData, getOptionData, removeOptionData]
  );

  return (
    <ComboboxContext.Provider value={context}>
      <ReachCombobox {...props} as="div" onSelect={onSelect} />
    </ComboboxContext.Provider>
  );
}

function ComboboxOption({ selectData, ...props }: ComboboxOptionProps) {
  const { addOptionData, removeOptionData } = React.useContext(ComboboxContext);
  React.useEffect(() => {
    addOptionData(props.value, selectData);
    return () => removeOptionData(props.value);
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.value, selectData, addOptionData, removeOptionData]);

  return <ReachComboboxOption {...props} as="li" />;
}

type ComboboxDOMProps = Omit<
  React.ComponentPropsWithoutRef<'div'>,
  keyof ReachComboboxProps
>;

type ComboboxOptionDOMProps = Omit<
  React.ComponentPropsWithoutRef<'li'>,
  keyof ReachComboboxOptionProps
>;

interface ComboboxProps extends ReachComboboxProps, ComboboxDOMProps {
  onSelect?(value: string, data?: any): void;
}

interface ComboboxOptionProps
  extends ReachComboboxOptionProps,
    ComboboxOptionDOMProps {
  /**
   * Custom data that will be passed to the `onSelect` of the `Combobox` as a
   * second argument.
   */
  selectData?: any;
}

/**
 * Uses a ref object which stores the index as a key and custom data as value
 * for each ComboboxOption. Hides the ref so that we can only mutate it through
 * the returned functions. 🙈
 */
function useOptionDataFactory(): {
  addOptionData: AddOptionData;
  getOptionData: GetOptionData;
  removeOptionData: RemoveOptionData;
} {
  const optionData = React.useRef<OptionData>({});

  const addOptionData = React.useCallback<AddOptionData>(
    // eslint-disable-next-line no-return-assign
    (value: string, data: any) => (optionData.current[value] = data),
    []
  );

  const getOptionData = React.useCallback<GetOptionData>(
    (value: string) => optionData.current[value],
    []
  );

  const removeOptionData = React.useCallback<RemoveOptionData>(
    (value: string) => delete optionData.current[value],
    []
  );

  return {
    addOptionData,
    getOptionData,
    removeOptionData,
  };
}

type OptionData = Record<string, any>;

type AddOptionData = (value: string, data: any) => void;

type GetOptionData = (value: string) => any | undefined;

type RemoveOptionData = (value: string) => void;

interface ComboboxContextValue {
  onSelect(value: string, data?: any): any;
  getOptionData: GetOptionData;
  addOptionData: AddOptionData;
  removeOptionData: RemoveOptionData;
}

const Results = connectStateResults(
  // eslint-disable-next-line consistent-return
  ({ searchState, searchResults, error, refine }) => {
    const router = useRouter();

    if (!searchResults) {
      return null;
    }

    if (error) {
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    }

    if (!searchState || !searchState.query) {
      return null;
    }

    if (searchResults && searchResults.nbHits === 0)
      return (
        <ResultsWrapper>
          <p className="px-8 py-2 -mx-4">
            No results have been found for &ldquo;{searchState.query}&rdquo;
          </p>
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
              <ComboboxOption
                key={hit.id}
                value={hit.title}
                selectData={{
                  handle: hit.handle,
                }}
              >
                <a
                  href={`/products/${hit.handle as string}`}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push(`/products/${hit.handle as string}`);
                    refine('');
                  }}
                  className="flex items-center px-8 py-2 -mx-4 focus:outline-none focus:bg-gray-200 hover:bg-gray-100"
                >
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
              </ComboboxOption>
            ))}
          </ComboboxList>
          <Query />
        </ResultsWrapper>
      );
    }
  }
);

export { Searchbar };
