import { Breadcrumbs } from '@components/breadcrumbs';
import { Carousel } from '@components/carousel';
import { Container } from '@components/container';
import { DeliverySchedule } from '@components/delivery-schedule';
import { HorizontalPadding } from '@components/horizontal-padding';
import { QuantityPicker } from '@components/quantity-picker';
import { Toast } from '@components/toast';
import { TopSellingProducts } from '@components/top-selling-products';
import { getAllSlides, ISlide } from '@lib/get-all-slides';
import { getBottomCta, IBottomCta } from '@lib/get-bottom-cta';
import { getProduct, IProduct } from '@lib/get-product';
import { getTopSelling, ITopSellingProducts } from '@lib/get-top-selling';
import { useAddToCart } from '@lib/hooks/use-add-to-cart';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextSeo, ProductJsonLd } from 'next-seo';
import * as React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import slugify from 'slugify';

interface IProductPage {
  bottomCta: IBottomCta;
  carouselSlides: Array<ISlide>;
  product: IProduct;
  topSelling: ITopSellingProducts;
}

function ProductPage({
  bottomCta,
  carouselSlides,
  product,
  topSelling,
}: IProductPage): React.ReactElement {
  const router = useRouter();
  // Number of items to add to cart
  const [quantity, setQuantity] = React.useState(1);

  // Variant to add to cart
  const variantId = product.variants.edges[0].node.id;

  // Increment quantity
  const increment = (): void => setQuantity((prevQty) => prevQty + 1);

  // Decrement quantity
  const decrement = (): void =>
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));

  // State for showing add to cart toast notifications
  const [showDialog, setShowDialog] = React.useState(false);

  // Function to add item to cart
  const { addToCart } = useAddToCart({
    variantId,
    quantity,
    setShowDialog,
  });

  // State for showing loading spinner while waiting for handleAddToCart to fire
  const [isLoading, setIsLoading] = React.useState(false);

  // Wrapper function to handle loading state
  async function handleAddToCart() {
    try {
      setIsLoading(true);
      await addToCart();
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    } finally {
      setIsLoading(false);
    }
  }

  // Product type for breadcrumb navigation
  const productType = {
    title: product.productType,
    handle: slugify(product.productType, {
      lower: true,
    }),
  };

  // Collection for breadcrumb navigation
  const collection = {
    title: product.collections?.edges?.[0]?.node.title,
    handle: `collections/${product.collections?.edges?.[0]?.node.handle}`,
  };

  // Current page for breadcrumb navigation
  const currentPage = {
    title: product.title,
    handle: product.handle,
  };

  // Complete breadcrumb navigation
  const navigation = [productType, collection, currentPage];

  return (
    <>
      <NextSeo
        title={product.title}
        description={product.description.replace(/["“]/g, "'")}
        openGraph={{
          images: product.images.edges.length > 0 && [
            {
              url: product.images.edges[0].node.originalSrc,
            },
          ],
        }}
      />
      <ProductJsonLd
        productName={product.title}
        images={
          product.images.edges.length > 0 &&
          product.images.edges.map(({ node }) => node.originalSrc)
        }
        description={product.description.replace(/["“]/g, "'")}
        offers={[
          {
            price:
              product.priceRange?.minVariantPrice?.amount &&
              Number(product.priceRange.minVariantPrice.amount).toFixed(2),
            priceCurrency: 'AUD',
            availability: product.availableForSale,
            url: `https://www.growersmarket.net.au${router.asPath}`,
            seller: {
              name: 'Growers Market',
            },
          },
        ]}
      />
      <Carousel slides={carouselSlides} />
      <Breadcrumbs navigation={navigation} />
      <Container>
        <div className="relative grid lg:grid-cols-3">
          <div className="py-16 lg:col-span-2">
            <HorizontalPadding>
              <div className="grid gap-12 lg:grid-cols-3">
                <div>
                  <h1 className="text-2xl font-bold">{product.title}</h1>
                  {product.images?.edges?.[0] && (
                    <div className="mt-4">
                      <Image
                        width={600}
                        height={400}
                        layout="responsive"
                        src={product.images.edges[0].node.originalSrc}
                        alt={product.images.edges[0].node.altText}
                        className="object-cover mx-auto"
                      />
                    </div>
                  )}
                </div>
                <div className="lg:col-span-2">
                  <div className="text-2xl">
                    <span className="font-bold">
                      $
                      {Number(
                        product.priceRange?.minVariantPrice?.amount
                      ).toFixed(2)}{' '}
                    </span>
                    {/* <span className="uppercase"> / each</span> */}
                  </div>
                  <div className="flex justify-between mt-12">
                    <QuantityPicker
                      increment={increment}
                      decrement={decrement}
                      quantity={quantity}
                    />
                    <button
                      type="button"
                      disabled={isLoading}
                      className={`inline-flex items-center justify-center space-x-3 cta${
                        isLoading ? ' opacity-75' : ''
                      }`}
                      onClick={handleAddToCart}
                    >
                      <span>Add to Cart</span>
                      {isLoading ? (
                        <FaSpinner className="w-6 opacity-50 h-7 animate-spin" />
                      ) : (
                        <HiOutlineShoppingCart className="w-7 h-7" />
                      )}
                    </button>
                  </div>
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: product.descriptionHtml,
                    }}
                    className="mt-4 prose border-t max-w-prose border-gray-dark"
                  />
                </div>
              </div>
            </HorizontalPadding>
          </div>
          <TopSellingProducts
            topSelling={topSelling}
            productType={product.productType}
          />
        </div>
        <DeliverySchedule bottomCta={bottomCta} />
      </Container>
      <Toast
        title={product.title}
        image={product.images?.edges?.[0]?.node}
        quantity={quantity}
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
    </>
  );
}

interface IParams {
  params: {
    handle: string;
  };
}

async function getServerSideProps({ params }: IParams) {
  const product: IProduct = await getProduct({
    handle: params.handle,
  });

  const topSelling: ITopSellingProducts = await getTopSelling({
    query: `${
      product.productType && `product_type:${product.productType}, `
    }available_for_sale:true`,
  });

  const carouselSlides = await getAllSlides();

  const bottomCta = await getBottomCta();

  return {
    props: {
      bottomCta,
      carouselSlides,
      product,
      topSelling,
    },
  };
}

export { ProductPage as default, getServerSideProps };
