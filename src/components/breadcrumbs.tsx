import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

import { HorizontalPadding } from './horizontal-padding';

interface IBreadcrumbs {
  navigation: IPage[];
}

interface IPage {
  title: string;
  handle: string;
}

function Breadcrumbs({ navigation }: IBreadcrumbs) {
  return (
    <nav className="flex py-2 text-white bg-green-dark" aria-label="Breadcrumb">
      <HorizontalPadding>
        <ol className="flex items-center space-x-4">
          <li>
            <div>
              <Link href="/">
                <a className="text-sm font-medium">Home</a>
              </Link>
            </div>
          </li>
          {navigation.map(
            ({ title, handle }, index) =>
              title &&
              handle && (
                <li key={index}>
                  <div className="flex items-center">
                    <HiChevronRight className="flex-shrink-0 w-5 h-5" />
                    {/* // TODO: Fix this link */}
                    <Link href={`/${handle}`}>
                      <a
                        // The last item in the breadcrumb list should always be the current page
                        aria-current={
                          handle === navigation[navigation.length - 1].handle
                            ? 'page'
                            : null
                        }
                        className="ml-4 text-sm font-medium"
                      >
                        {title}
                      </a>
                    </Link>
                  </div>
                </li>
              )
          )}
        </ol>
      </HorizontalPadding>
    </nav>
  );
}
export { Breadcrumbs };
