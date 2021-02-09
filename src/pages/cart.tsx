import { Carousel, Container, HorizontalPadding } from '@components/index';
import {
  getSiteNavigation,
  getSiteSettings,
  useCartCount,
  useCartItems,
} from '@lib/index';
import Image from 'next/image';
import Link from 'next/link';
import { NextSeo } from 'next-seo';
import * as React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';

function CartPage() {
  const count = useCartCount();
  return (
    <>
      <NextSeo title="Cart" />
      <Carousel />
      {/* <Breadcrumbs
        productType={product.productType}
        collection={product.collections?.edges?.[0]?.node.title}
        title={product.title}
        handle={product.handle}
      /> */}
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <h1 className="text-2xl font-bold">Checkout</h1>
              <p>
                Your shopping cart{' '}
                <strong>
                  {count > 0
                    ? `contains ${count as number} ${
                        count === 1 ? 'product' : 'products'
                      }`
                    : 'is empty'}
                </strong>
              </p>
            </HorizontalPadding>
          </div>
          <CartSummary />
        </div>
      </Container>
    </>
  );
}

function CartSummary() {
  const lineItems = useCartItems();
  return (
    <div className="bg-gray-light">
      <div className="py-16 lg:sticky lg:top-44 lg:max-w-lg">
        <HorizontalPadding>
          <h2 className="text-2xl font-bold">Shopping Cart Summary</h2>
          <ul className="grid gap-8 mt-4">
            {lineItems.map((lineItem) => (
              <LineItem key={lineItem.id} lineItem={lineItem} />
            ))}
          </ul>
        </HorizontalPadding>
      </div>
    </div>
  );
}

function LineItem({ lineItem }) {
  return (
    <li key={lineItem.id} className="grid grid-cols-2 gap-4">
      <div className="bg-white">
        {lineItem.variant.image?.src && (
          <Link
            href=""
            // href={`/products/${getHandleForVariant(item.variant.id)}`}
          >
            <a aria-hidden tabIndex={-1} className="block bg-white">
              <Image
                src={lineItem.variant.image.src}
                height={360}
                width={480}
                layout="responsive"
                alt=""
                className="object-cover"
              />
            </a>
          </Link>
        )}
      </div>
      <div className="flex flex-col col-start-2">
        <div className="font-bold">
          <Link
            href=""
            // href={`/products/${getHandleForVariant(item.variant.id)}`}
          >
            <a className="block">
              <h3 className="text-sm">{lineItem.title}</h3>
            </a>
          </Link>
          <div className="text-2xl">
            <sup className="text-sm">$</sup>
            <span>{Number(lineItem.variant.price).toFixed(2)}</span>
          </div>
        </div>
        <div className="pt-4 mt-auto">
          <button
            type="button"
            className="inline-flex items-center justify-center px-6 py-1 space-x-3 text-sm whitespace-nowrap cta"
          >
            <span>Add to Cart</span>
            <HiOutlineShoppingCart className="w-6 h-6" />
          </button>
        </div>
      </div>
    </li>
  );
}

async function getStaticProps() {
  const siteNavigation = await getSiteNavigation();
  const siteSettings = await getSiteSettings();

  return {
    props: {
      siteNavigation,
      siteSettings,
    },
    revalidate: 60,
  };
}

export { CartPage as default, getStaticProps };
