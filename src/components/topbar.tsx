import * as React from 'react';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';
import { useGlobalContext } from '@lib/index';
import { HiMenu } from 'react-icons/hi';

function Topbar() {
  const { siteSettings } = useGlobalContext();
  return (
    <div className="text-sm font-bold text-white bg-green-dark">
      <Container>
        <HorizontalPadding variant={HorizontalPadding.variant.GREEN}>
          <div className="flex items-center justify-end py-2 space-x-6">
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
                <a
                  href={`tel:${siteSettings?.phoneNumber}`}
                  dangerouslySetInnerHTML={{
                    __html: `Contact: ${siteSettings?.phoneNumber
                      .split(' ')
                      .join('&nbsp;')}`,
                  }}
                />
              )}
            </span>
            <button
              type="button"
              className="flex items-center p-2 mr-auto space-x-2 font-bold rounded-md md:hidden"
            >
              <span>Menu</span>
              <HiMenu className="w-5 h-5" />
            </button>
          </div>
        </HorizontalPadding>
      </Container>
    </div>
  );
}

export { Topbar };
