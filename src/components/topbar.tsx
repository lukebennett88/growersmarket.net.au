import * as React from 'react';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

function Topbar() {
  return (
    <div className="font-bold text-white bg-green-dark">
      <Container>
        <HorizontalPadding variant={HorizontalPadding.variant.GREEN}>
          <div className="flex items-center justify-end py-3 space-x-3">
            <span className="hidden sm:block">
              <a
                // href={siteSettings.address?.googleMaps.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* {siteSettings.address?.streetAddress},{' '}
                {siteSettings.address?.suburb} */}
              </a>
            </span>
            <span aria-hidden className="hidden sm:block">
              |
            </span>
            {/* <span>
              <a href={`tel:${siteSettings.phoneNumber}`}>
                Contact: {siteSettings.phoneNumber}
              </a>
            </span> */}
          </div>
        </HorizontalPadding>
      </Container>
    </div>
  );
}

export { Topbar };
