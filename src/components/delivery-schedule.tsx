import { IBottomCta } from '@lib/get-bottom-cta';
import { configuredSanityClient } from '@lib/sanity-client';
import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import * as React from 'react';

import { HorizontalPadding } from './horizontal-padding';

function DeliverySchedule({ bottomCta }: { bottomCta: IBottomCta }) {
  const { backgroundImage, ctaLabel, ctaSlug, heading } = bottomCta;
  const { src, loader } = useNextSanityImage(
    configuredSanityClient,
    backgroundImage.asset
  );
  return (
    <HorizontalPadding>
      <div className="relative py-8">
        <HorizontalPadding variant={HorizontalPadding.variant.BLACK}>
          <Image
            loader={loader}
            src={src}
            layout="fill"
            sizes="(min-width: 902px) 902px, 100vw"
            objectFit="cover"
            alt={backgroundImage?.altText || ''}
          />
          <div className="relative py-8">
            <h2 className="space-y-3">
              {heading.map((line, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <React.Fragment key={index}>
                  <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
                    {line}{' '}
                  </span>
                  {index !== heading.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h2>
            {ctaSlug && ctaLabel && (
              <div className="mt-5">
                <Link href={ctaSlug}>
                  <a className="text-white bg-green-dark cta">{ctaLabel}</a>
                </Link>
              </div>
            )}
          </div>
        </HorizontalPadding>
      </div>
    </HorizontalPadding>
  );
}

export { DeliverySchedule };
