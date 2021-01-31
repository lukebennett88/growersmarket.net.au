import Link from 'next/link';
import { HiChevronRight } from 'react-icons/hi';

import { HorizontalPadding } from './horizontal-padding';

interface IBreadcrumbs {
  productType: {
    title: string;
    handle: string;
  };
  collection?: {
    title: string;
    handle: string;
  };
  product?: {
    title: string;
    handle: string;
  };
}

function Breadcrumbs({ productType, collection, product }: IBreadcrumbs) {
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
          <li>
            <div className="flex items-center">
              <HiChevronRight className="flex-shrink-0 w-5 h-5" />
              {/* // TODO: Fix this link */}
              <Link href={`/${productType.handle}`}>
                <a className="ml-4 text-sm font-medium">{productType.title}</a>
              </Link>
            </div>
          </li>
          {collection && (
            <li>
              <div className="flex items-center">
                <HiChevronRight className="flex-shrink-0 w-5 h-5" />
                {/* // TODO: Fix this link */}
                <Link href={`/${collection.handle}`}>
                  <a aria-current="page" className="ml-4 text-sm font-medium">
                    {collection.title}
                  </a>
                </Link>
              </div>
            </li>
          )}
          {product && (
            <li>
              <div className="flex items-center">
                <HiChevronRight className="flex-shrink-0 w-5 h-5" />
                <Link href={`/products/${product.handle}`}>
                  <a aria-current="page" className="ml-4 text-sm font-bold">
                    {product.title}
                  </a>
                </Link>
              </div>
            </li>
          )}
        </ol>
      </HorizontalPadding>
    </nav>
  );
}
export { Breadcrumbs };
