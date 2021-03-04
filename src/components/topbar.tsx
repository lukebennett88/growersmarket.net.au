/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { DialogContent, DialogOverlay } from '@reach/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { HiArrowLeft, HiChevronRight, HiMenu, HiX } from 'react-icons/hi';

import siteNavigation from '../data/site-navigation.json';
import siteSettings from '../data/site-settings.json';
import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { Logo } from './vectors/logo';

function Topbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const toggle = () => setIsOpen((prev) => !prev);
  return (
    <div className="relative z-10 text-sm font-bold text-white bg-green-dark">
      <Container>
        <HorizontalPadding variant={HorizontalPadding.variant.GREEN}>
          <div className="flex items-center justify-end py-2 space-x-6">
            <span className="hidden md:block">
              <a
                href={siteSettings.address.googleMaps.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteSettings.address.streetAddress},{' '}
                {siteSettings.address.suburb}
              </a>
            </span>
            <span aria-hidden className="hidden md:block">
              |
            </span>
            <span>
              {siteSettings && (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <a
                  href={`tel:${siteSettings?.phoneNumber}`}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={{
                    __html: `Contact: ${(siteSettings?.phoneNumber)
                      .split(' ')
                      .join('&nbsp;')}`,
                  }}
                />
              )}
            </span>
            <button
              type="button"
              onClick={toggle}
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              className="flex items-center p-2 mr-auto space-x-2 font-bold rounded-md lg:hidden"
            >
              <span>Menu</span>
              <HiMenu className="w-5 h-5" />
            </button>
          </div>
        </HorizontalPadding>
      </Container>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

function MobileMenu({ isOpen, setIsOpen }) {
  const router = useRouter();
  const MotionDialogOverlay = motion.custom(DialogOverlay);
  const MotionDialogContent = motion.custom(DialogContent);
  const transition = { min: 0, max: 100, bounceDamping: 9 };
  const [navigation, setNavigation] = React.useState(
    siteNavigation.mainNavigation
  );
  const [productType, setProductType] = React.useState(null);
  const close = () => {
    setIsOpen(false);
    setProductType(null);
    setNavigation(siteNavigation.mainNavigation);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <MotionDialogOverlay
          onDismiss={close}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
          transition={transition}
          id="mobile-menu"
          className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-75 pl-14"
        >
          <MotionDialogContent
            aria-label="Site navigation"
            initial="closed"
            animate="open"
            exit="closed"
            variants={{ open: { x: 0 }, closed: { x: '100%' } }}
            transition={transition}
            className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-green-dark"
          >
            <div className="absolute top-0 left-0 p-1 -ml-14">
              <button
                type="button"
                onClick={close}
                className="flex items-center justify-center w-12 h-12 rounded-full focus:outline-none focus:bg-gray-600"
              >
                <HiX className="w-6 h-6 text-white" aria-hidden />
                <span className="sr-only">Close sidebar</span>
              </button>
            </div>
            <div className="grid items-center grid-cols-2">
              <Link href="/">
                <a className="px-4">
                  <Logo className="w-auto h-16" />
                  <span className="sr-only">Growers Market</span>
                </a>
              </Link>
              {productType && (
                <button
                  type="button"
                  aria-label="Back to browse categories"
                  onClick={() => {
                    setProductType(null);
                    setNavigation(siteNavigation.mainNavigation);
                  }}
                  className="flex items-center space-x-2 font-medium text-white"
                >
                  <HiArrowLeft className="text-base" />
                  <span aria-hidden>Back</span>
                </button>
              )}
            </div>
            <div className="flex-1 h-0 mt-5 overflow-y-auto">
              {productType && (
                <Link href={productType.route}>
                  <a
                    onClick={close}
                    className={`w-full flex items-center px-4 py-2 text-base font-medium text-white transition duration-150 ease-in-out border-l-4 border-transparent hover:border-yellow hover:bg-gray-50 hover:text-gray-900 group ${
                      router.route === `/${String(productType.route)}`
                        ? 'border-yellow bg-gray-50 text-gray-900'
                        : ''
                    }`}
                  >
                    View all {productType.title}
                  </a>
                </Link>
              )}
              <nav className="flex flex-col h-full">
                <div className="space-y-1">
                  {navigation.map((navItem) =>
                    navItem.subMenu ? (
                      <NavButton
                        key={navItem.id}
                        navItem={navItem}
                        setNavigation={setNavigation}
                        setProductType={setProductType}
                      />
                    ) : (
                      <NavLink
                        key={navItem.id}
                        navItem={navItem}
                        productType={productType}
                        close={close}
                      />
                    )
                  )}
                </div>
                <div className="pt-10 mt-auto space-y-1">
                  <Link href="/account">
                    <a
                      onClick={close}
                      className="flex items-center px-4 py-2 text-sm font-medium text-white rounded-md group hover:text-gray-900 hover:bg-gray-50"
                    >
                      Account
                    </a>
                  </Link>
                </div>
              </nav>
            </div>
          </MotionDialogContent>
        </MotionDialogOverlay>
      )}
    </AnimatePresence>
  );
}

function NavButton({ navItem, setNavigation, setProductType }) {
  const router = useRouter();
  const handleClick = () => {
    setProductType(navItem);
    setNavigation(navItem.subMenu);
  };
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`w-full flex justify-between space-x-2 items-center px-4 py-2 text-base font-medium text-white transition duration-150 ease-in-out border-l-4 border-transparent hover:border-yellow hover:bg-gray-50 hover:text-gray-900 group ${
        router.route === `/${String(navItem.route)}`
          ? 'border-yellow bg-gray-50 text-gray-900'
          : ''
      }`}
    >
      <span>{navItem.title}</span>
      <HiChevronRight />
    </button>
  );
}

function NavLink({ navItem, productType, close }) {
  const router = useRouter();
  return (
    <Link
      href={
        productType
          ? `/collections/${String(navItem.handle)}`
          : `/${String(navItem.route)}`
      }
    >
      <a
        onClick={close}
        className={`flex items-center px-4 py-2 text-base font-medium text-white transition duration-150 ease-in-out border-l-4 border-transparent hover:border-yellow hover:bg-gray-50 hover:text-gray-900 group ${
          router.route === `/${String(navItem.route)}`
            ? 'border-yellow bg-gray-50 text-gray-900'
            : ''
        }`}
      >
        {navItem.title}
      </a>
    </Link>
  );
}

export { Topbar };
