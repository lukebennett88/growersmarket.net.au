import * as React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { gql, useMutation } from '@apollo/client';

import { apolloClient } from '@lib/apollo-client';
import { HorizontalPadding } from '@components/index';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { SANITY_DATA } from '@queries/index';

function ProductPage({ product }) {
  // Number of items to add to cart
  const [quantity, setQuantity] = React.useState(1);

  // Currently selected image
  const [activeImage, setActiveImage] = React.useState(
    product.images?.edges[0]?.node
  );
  // Variant to add to cart
  const variantId = product.variants.edges[0].node.id;

  // Mutation to run
  const CREATE_CHECKOUT = gql`
    mutation($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
          lineItems(first: 250) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  // Mutation to create a new checkout
  const [createCheckout, { data }] = useMutation(CREATE_CHECKOUT);

  function handleCreateCheckout() {
    createCheckout({
      variables: {
        input: {
          lineItems: [
            {
              variantId,
              quantity,
            },
          ],
        },
      },
    });
  }

  return (
    <>
      <Head>
        <title>{product.title}</title>
      </Head>
      <div className="relative py-16 bg-gray-light">
        <HorizontalPadding>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto text-lg max-w-prose">
              <h1>
                <span className="block text-base font-semibold tracking-wide text-center uppercase text-green-dark">
                  {product.title}
                </span>
                <span className="block mt-2 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900 sm:text-4xl">
                  $
                  {Number(product.priceRange?.minVariantPrice?.amount).toFixed(
                    2
                  )}
                </span>
              </h1>
            </div>
          </div>
          <div className="grid w-full gap-8 mt-16 lg:grid-cols-2">
            <div className="grid gap-4 lg:grid-cols-5">
              {product.images.edges.length > 1 && (
                <div className="grid grid-flow-row gap-4">
                  {product.images?.edges?.map(({ node }) => (
                    <div
                      key={node.id}
                      className="relative h-0 aspect-w-1 aspect-h-1"
                    >
                      <button
                        type="button"
                        onClick={() => setActiveImage(node)}
                        className="absolute inset-0 rounded-lg focus:z-10"
                      >
                        <Image
                          width={400}
                          height={400}
                          src={node.originalSrc}
                          alt={node.altText}
                          className="object-cover h-full bg-green-100 rounded-lg"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="lg:col-span-4">
                {activeImage?.originalSrc && (
                  <Image
                    width={600}
                    height={400}
                    src={activeImage.originalSrc}
                    alt={activeImage.altText}
                    className="object-cover mx-auto rounded-lg"
                  />
                )}
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <span className="block font-semibold tracking-wider uppercase text-green-dark">
                  Quantity
                </span>
                <span className="relative z-0 inline-flex rounded-full shadow-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((prevCount) =>
                        prevCount > 1 ? prevCount - 1 : 1
                      )
                    }
                    className="relative inline-flex items-center py-2 pl-3 pr-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-full hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-dark focus:border-green-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M18 12H6"
                      />
                    </svg>
                  </button>
                  <span className="relative inline-flex items-center w-12 px-4 py-2 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-dark focus:border-green-dark">
                    <span className="flex-1 text-center">{quantity}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((prevCount) => prevCount + 1)}
                    className="relative inline-flex items-center py-2 pl-2 pr-3 -ml-px text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-full hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-green-dark focus:border-green-dark"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              {product.options.map(
                (option) =>
                  option.name !== 'Title' && (
                    <label
                      key={option.id}
                      htmlFor={option.name}
                      className="block w-full max-w-xs"
                    >
                      <span className="block font-semibold tracking-wider uppercase text-green-dark">
                        {option.name}
                      </span>
                      <select
                        name={option.name}
                        id={option.name}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-1 focus:ring-green-dark focus:border-green-dark"
                      >
                        {option.values.map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    </label>
                  )
              )}
              <div>
                <button
                  className="inline-flex items-center justify-center w-full max-w-xs space-x-3 cta"
                  onClick={handleCreateCheckout}
                >
                  <span>Add to Cart</span>
                  <HiOutlineShoppingCart className="w-7 h-7" />
                </button>
              </div>
              {data?.checkoutCreate?.checkout?.webUrl && (
                <div>
                  <a
                    href={data?.checkoutCreate?.checkout?.webUrl}
                    className="inline-flex items-center justify-center w-full max-w-xs px-4 py-2 text-base font-bold text-center text-green-700 duration-150 ease-in-out transform border border-transparent rounded-full bg-yellow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-dark hover:-translate-y-px hover:shadow"
                  >
                    Checkout
                  </a>
                </div>
              )}
            </div>
          </div>
        </HorizontalPadding>
      </div>
      <div className="py-16 bg-white">
        <HorizontalPadding>
          <div
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            className="mt-8 prose-lg text-gray-500 max-w-prose"
          />
        </HorizontalPadding>
      </div>
    </>
  );
}

async function getStaticPaths() {
  let cursor = {};
  const { data } = await apolloClient.query({
    query: gql`
      query GetProducts {
        products(first: 250) {
          pageInfo {
            hasNextPage
          }
          edges {
            cursor
            node {
              handle
            }
          }
        }
      }
    `,
    variables: { cursor },
  });

  cursor = data.products?.edges[data.products.edges.length - 1].cursor;

  return {
    paths: data.products.edges.map(({ node }) => `/products/${node.handle}`),
    fallback: false,
  };
}

async function getStaticProps({ params }) {
  const { data } = await apolloClient.query({
    query: gql`
      query ProductQuery($handle: String!) {
        productByHandle(handle: $handle) {
          availableForSale
          descriptionHtml
          id
          images(first: 250) {
            edges {
              node {
                id
                altText
                originalSrc
              }
            }
          }
          options {
            id
            name
            values
          }
          priceRange {
            minVariantPrice {
              amount
            }
          }
          title
          variants(first: 250) {
            edges {
              node {
                id
              }
            }
          }
        }
      }
    `,
    variables: { handle: params.handle },
    context: {
      clientName: 'SHOPIFY',
    },
  });

  const sanityData = await apolloClient.query({
    query: SANITY_DATA,
    context: {
      clientName: 'SANITY',
    },
  });

  return {
    props: {
      product: data.productByHandle,
      siteNavigation: sanityData.data.SiteNavigation,
      siteSettings: sanityData.data.SiteSettings,
    },
  };
}

export { ProductPage as default, getStaticProps, getStaticPaths };
