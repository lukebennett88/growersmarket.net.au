import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  useTabsContext,
} from '@reach/tabs';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { useGlobalContext } from '@lib/index';
import { useOnClickOutside } from '@lib/hooks/index';

function Nav() {
  const { siteNavigation } = useGlobalContext();

  const [tabIndex, setTabIndex] = React.useState(
    () => siteNavigation?.items.filter((navItem) => navItem.subMenu).length
  );

  function closeTab() {
    setTabIndex(
      siteNavigation?.items.filter((navItem) => navItem.subMenu).length
    );
  }

  const ref = React.useRef();
  useOnClickOutside(ref, closeTab);

  return (
    <Tabs
      ref={ref}
      index={tabIndex}
      onChange={(index) => setTabIndex(index)}
      className="relative text-white bg-green-dark"
    >
      <div className="relative z-20 shadow">
        <Container>
          <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
            <HorizontalPadding as="nav">
              <TabList as="ul" className="flex -mx-4">
                {siteNavigation?.items.map((navItem) =>
                  navItem.subMenu ? (
                    <NavButton
                      key={navItem._key}
                      navItem={navItem}
                      tabIndex={tabIndex}
                      closeTab={closeTab}
                    />
                  ) : (
                    <NavLink key={navItem._key} navItem={navItem} />
                  )
                )}
              </TabList>
            </HorizontalPadding>
          </div>
        </Container>
      </div>
      <TabPanels>
        {siteNavigation?.items.map(
          (navItem, index) =>
            navItem.subMenu && (
              <TabPanel key={navItem._key}>
                <SubMenu
                  siteNavigation={siteNavigation}
                  isActive={index === tabIndex}
                />
              </TabPanel>
            )
        )}
      </TabPanels>
      {/* Mobile menu, show/hide based on mobile menu state.
          Entering: "duration-200 ease-out"
            From: "opacity-0 scale-95"
            To: "opacity-100 scale-100"
          Leaving: "duration-100 ease-in"
            From: "opacity-100 scale-100"
            To: "opacity-0 scale-95"
      */}
    </Tabs>
  );
}

interface NavButtonProps {
  navItem: {
    title: string;
  };
  tabIndex: number;
  closeTab: () => void;
  isSelected?: boolean;
}

function NavButton({
  navItem,
  tabIndex,
  closeTab,
  isSelected,
}: NavButtonProps) {
  const { pathname } = useRouter();
  const { focusedIndex, selectedIndex } = useTabsContext();

  return (
    <Tab className="relative z-10 inline-block px-4 py-2 font-bold">
      {navItem.title}
    </Tab>
  );
}

function NavLink({ navItem }) {
  const { pathname } = useRouter();
  return (
    <li>
      <Link href={`/${navItem.route}`}>
        <a
          className={`${
            pathname === navItem.route ? 'bg-yellow text-green-800' : ''
          } inline-block px-4 py-2 font-bold`}
        >
          {navItem.title}
        </a>
      </Link>
    </li>
  );
}

function SubMenu({ siteNavigation, isActive }) {
  return (
    <Transition
      show={isActive}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 -translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 -translate-y-1"
    >
      <div className="absolute inset-x-0 z-10 hidden transform shadow-lg lg:block">
        <div className="absolute inset-0 flex">
          <div aria-hidden className="w-1/2 bg-gray-light" />
          <div aria-hidden className="w-1/2 bg-white" />
        </div>
        <div className="relative grid grid-cols-2 mx-auto max-w-screen-2xl">
          <div className="py-8 bg-gray-light sm:py-12">
            <HorizontalPadding as="nav">
              <ul className="grid grid-flow-col grid-cols-3 grid-rows-6 gap-6">
                {siteNavigation?.items.map(
                  (navItem) =>
                    navItem.subMenu &&
                    navItem.subMenu.map((subMenu) => (
                      <li key={subMenu._key}>
                        <Link href={`/products/${subMenu.route}`}>
                          <a className="flex items-center p-3 -m-3 text-base font-bold rounded-md text-green-dark hover:bg-white">
                            {subMenu.title}
                          </a>
                        </Link>
                      </li>
                    ))
                )}
              </ul>
            </HorizontalPadding>
          </div>
          <div className="py-12 pl-6 pr-8 bg-white">
            <div>
              <ul className="grid grid-cols-2 gap-12">
                {Array(2)
                  .fill('')
                  .map((_, index) => (
                    <li key={index} className="space-y-8">
                      <div className="relative h-0 aspect-w-4 aspect-h-3">
                        <a href="#" className="block">
                          <Image
                            src="https://burst.shopifycdn.com/photos/red-apple-against-white-background.jpg?width=373&amp;format=pjpg&amp;exif=0&amp;iptc=0"
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            className="absolute inset-0 object-contain w-full h-full"
                          />
                        </a>
                      </div>
                      <div>
                        <Link href="/">
                          <a className="w-full text-center cta">Shop Apples</a>
                        </Link>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export { Nav };
