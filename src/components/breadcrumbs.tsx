import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

interface IPage {
  title: string;
  handle: string;
}

interface IBreadcrumbs {
  navigation: IPage[];
}

function Breadcrumbs({ navigation }: IBreadcrumbs): React.ReactElement {
  return (
    <nav
      className="flex py-2 overflow-hidden text-white bg-green-dark"
      aria-label="Breadcrumb navigation"
    >
      <Container>
        <HorizontalPadding>
          <ol className="flex items-center space-x-4 overflow-x-auto">
            <li>
              <div>
                <Link href="/">
                  <a className="text-sm font-medium">Home</a>
                </Link>
              </div>
            </li>
            {navigation.map(
              ({ title, handle }) =>
                title &&
                handle && (
                  <li key={handle}>
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
                          className="ml-4 text-sm font-medium whitespace-nowrap"
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
      </Container>
    </nav>
  );
}
export { Breadcrumbs };
