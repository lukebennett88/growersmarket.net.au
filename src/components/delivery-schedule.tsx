import Image from 'next/image';
import Link from 'next/link';

import { HorizontalPadding } from './horizontal-padding';

function DeliverySchedule() {
  return (
    <HorizontalPadding>
      <div className="relative py-8">
        <HorizontalPadding variant={HorizontalPadding.variant.BLACK}>
          <Image
            src="https://burst.shopifycdn.com/photos/red-apple-against-white-background.jpg?width=1472&amp;format=pjpg&amp;exif=0&amp;iptc=0"
            layout="fill"
            objectFit="cover"
            quality={100}
          />
          <div className="relative py-8">
            <h2 className="space-y-3">
              <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
                Check Out Our
              </span>
              <br />
              <span className="inline-block px-4 text-3xl font-bold leading-loose uppercase text-green-dark bg-yellow">
                Delivery Schedule
              </span>
            </h2>
            <div className="mt-5">
              <Link href="/pages/delivery-schedule/">
                <a className="text-white bg-green-dark cta">Find Out More</a>
              </Link>
            </div>
          </div>
        </HorizontalPadding>
      </div>
    </HorizontalPadding>
  );
}

export { DeliverySchedule };
