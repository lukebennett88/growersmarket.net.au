import Link from 'next/link';
import { NextSeo } from 'next-seo';
import { HiChevronLeft } from 'react-icons/hi';

function NotFoundPage() {
  return (
    <>
      <NextSeo title="404: Page Not Found" />
      <article className="py-48 space-y-6 text-center">
        <h1 className="text-2xl font-bold">404: Page not found</h1>
        <p>Sorry! The page you were looking for could not be found.</p>
        <p>
          <Link href="/">
            <a className="inline-flex bg-white border cta text-green-dark border-green-dark">
              <span className="inline-flex items-center justify-center -ml-2 space-x-1 leading-none">
                <HiChevronLeft />
                <span>Return Home</span>
              </span>
            </a>
          </Link>
        </p>
      </article>
    </>
  );
}

export { NotFoundPage as default };
