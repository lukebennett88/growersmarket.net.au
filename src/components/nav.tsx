import { Transition } from '@headlessui/react';
import { useOnClickOutside } from '@lib/hooks/use-onclick-outside';
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@reach/tabs';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

import siteNavigation from '../data/site-navigation.json';
import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

function Nav() {
  const [tabIndex, setTabIndex] = React.useState(
    () =>
      siteNavigation?.mainNavigation.filter((navItem) => navItem.subMenu).length
  );

  const closeTab = () =>
    setTabIndex(
      siteNavigation?.mainNavigation.filter((navItem) => navItem.subMenu).length
    );

  const ref = React.useRef();

  useOnClickOutside(ref, closeTab);

  return (
    <>
      <Tabs
        ref={ref}
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        className="relative text-white bg-green-dark"
      >
        <div className="relative z-10">
          <Container>
            <div className="hidden lg:flex-1 lg:flex lg:items-center lg:justify-between">
              <HorizontalPadding as="nav">
                <TabList as="ul" className="relative z-10 flex -mx-4">
                  {siteNavigation?.mainNavigation.map((navItem) =>
                    navItem.subMenu ? (
                      <NavButton key={navItem.id} navItem={navItem} />
                    ) : (
                      <NavLink
                        key={navItem.id}
                        navItem={navItem}
                        closeTab={closeTab}
                      />
                    )
                  )}
                </TabList>
              </HorizontalPadding>
            </div>
          </Container>
        </div>
        <TabPanels>
          {siteNavigation?.mainNavigation.map(
            (navItem, index) =>
              navItem.subMenu && (
                <TabPanel key={navItem.id}>
                  <SubMenu
                    subMenu={navItem.subMenu}
                    isActive={index === tabIndex}
                    closeTab={closeTab}
                    productType={{
                      title: navItem.title,
                      route: navItem.route,
                      image: navItem.image,
                    }}
                  />
                </TabPanel>
              )
          )}
        </TabPanels>
      </Tabs>
    </>
  );
}

interface INavButton {
  navItem: {
    title: string;
  };
}

function NavButton({ navItem }: INavButton) {
  return (
    <Tab className="relative z-10 inline-block px-4 py-2 font-bold">
      {navItem.title}
    </Tab>
  );
}

function NavLink({ navItem, closeTab }) {
  const { pathname } = useRouter();
  return (
    <li>
      <Link href={`/${navItem.route as string}`}>
        <a
          onClick={closeTab}
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

interface CTAProps {
  closeTab: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  href: string;
  label: string;
  src: string;
}

function CTA({ closeTab, href, label, src }: CTAProps): React.ReactElement {
  return (
    <li className="grid">
      <div className="relative aspect-w-1 aspect-h-1">
        <div className="absolute inset-0 flex flex-col">
          <Link href={href}>
            <a
              tabIndex={-1}
              onClick={closeTab}
              className="relative flex-1 block"
            >
              <Image src={src} layout="fill" objectFit="cover" alt="" />
            </a>
          </Link>
          <div className="relative flex mt-8">
            <Link href={href}>
              <a onClick={closeTab} className="w-full text-center cta">
                {label}
              </a>
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

function SubMenu({ subMenu, isActive, closeTab, productType }) {
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
      <Transition.Child
        aria-hidden
        onClick={closeTab}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        className="fixed inset-0 bg-black bg-opacity-50 top-44"
      />
      <div className="absolute inset-x-0 z-10 hidden transform shadow-lg lg:block">
        <div className="absolute inset-0 flex">
          <div aria-hidden className="w-1/2 bg-gray-light" />
          <div aria-hidden className="w-1/2 bg-white" />
        </div>
        <div className="relative grid grid-cols-2 mx-auto max-w-screen-2xl">
          <div className="py-8 bg-gray-light sm:py-12">
            <HorizontalPadding as="nav">
              <ul className="grid grid-cols-3 gap-6">
                {subMenu.map((menu) => (
                  <li key={menu.id} className="grid">
                    <Link href={`/collections/${menu.handle as string}`}>
                      <a
                        onClick={closeTab}
                        className="flex items-start p-3 -m-3 text-base font-bold rounded-md text-green-dark hover:bg-white"
                      >
                        {menu.title}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </HorizontalPadding>
          </div>
          <div className="grid py-12 pl-6 pr-8 bg-white">
            <ul style={{ minHeight: 120 }} className="grid grid-cols-2 gap-8">
              <CTA
                closeTab={closeTab}
                href={`/${productType.route as string}`}
                label={`Shop ${productType.title as string}`}
                src={productType.image}
              />
              <CTA
                closeTab={closeTab}
                href="/collections/specials"
                label="Shop Specials"
                src="/product-type/specials.jpg"
              />
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  );
}

export { Nav };
