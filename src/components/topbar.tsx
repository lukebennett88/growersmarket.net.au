import * as React from 'react';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { useGlobalContext } from '@lib/index';
import { HiMenu } from 'react-icons/hi';

function Topbar() {
  const { siteSettings } = useGlobalContext();
  return (
    <div className="font-bold text-white bg-green-dark">
      <Container>
        <HorizontalPadding variant={HorizontalPadding.variant.GREEN}>
          <div className="flex items-center justify-end py-3 space-x-3">
            <button
              type="button"
              className="flex flex-col items-center mr-auto font-bold md:hidden"
            >
              <HiMenu className="w-5 h-5" />
              <span className="sr-only">Menu</span>
            </button>
            <span className="hidden md:block">
              {siteSettings && (
                <a
                  href={siteSettings?.address?.googleMaps.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {siteSettings?.address?.streetAddress},{' '}
                  {siteSettings?.address?.suburb}
                </a>
              )}
            </span>
            <span aria-hidden className="hidden md:block">
              |
            </span>
            <span>
              {siteSettings && (
                <a href={`tel:${siteSettings?.phoneNumber}`}>
                  Contact: {siteSettings?.phoneNumber}
                </a>
              )}
            </span>
          </div>
        </HorizontalPadding>
      </Container>
    </div>
  );
}

export { Topbar };
