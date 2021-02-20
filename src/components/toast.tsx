import { DialogContent, DialogOverlay } from '@reach/dialog';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';

const AnimatedDialogOverlay = motion.custom(DialogOverlay);
const AnimatedDialogContent = motion.custom(DialogContent);

const transition = { min: 0, max: 100, bounceDamping: 9 };

function Toast({ showDialog, setShowDialog, image, title, quantity }) {
  const { pathname } = useRouter();

  const close = () => setShowDialog(false);

  if (pathname === '/cart') {
    return null;
  }

  return (
    <AnimatePresence>
      {showDialog && (
        <AnimatedDialogOverlay
          onDismiss={close}
          initial="closed"
          animate="open"
          exit="closed"
          variants={{ open: { opacity: 1 }, closed: { opacity: 0 } }}
          transition={transition}
          className="fixed inset-0 z-10 flex flex-col px-4 py-32 bg-black bg-opacity-25 sm:px-6 backdrop-blur"
        >
          <div className="flex items-end justify-end flex-1 w-full mx-auto pointer-events-none max-w-screen-2xl">
            <AnimatedDialogContent
              aria-label="New item added to cart"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{ open: { y: 0 }, closed: { y: '0.5rem' } }}
              transition={transition}
              className="w-full max-w-sm bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
            >
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="w-10 h-10">
                      {image && (
                        <Image
                          width={40}
                          height={40}
                          layout="responsive"
                          src={image.originalSrc}
                          alt={image.altText || ''}
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 w-0 ml-3">
                    <p className="text-sm font-medium text-gray-900">{title}</p>
                    <p className="mt-1 text-sm text-gray-500">
                      <abbr title="Quantity" style={{ textDecoration: 'none' }}>
                        Qty
                      </abbr>
                      : {quantity}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">Added to cart.</p>
                    <div className="flex mt-4 space-x-3">
                      <button
                        type="button"
                        onClick={close}
                        className="inline-flex items-center px-5 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm whitespace-nowrap hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark"
                      >
                        Continue Shopping
                      </button>
                      <Link href="/cart">
                        <a className="inline-flex items-center px-5 py-2 text-sm font-medium leading-4 text-white border border-transparent rounded-full shadow-sm whitespace-nowrap bg-green-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark">
                          Go to cart
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 ml-4">
                    <button
                      type="button"
                      onClick={close}
                      className="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark"
                    >
                      <span className="sr-only">Close</span>
                      {/* Heroicon name: x */}
                      <svg
                        className="w-5 h-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedDialogContent>
          </div>
        </AnimatedDialogOverlay>
      )}
    </AnimatePresence>
  );
}

export { Toast };
