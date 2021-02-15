import {
  Breadcrumbs,
  Carousel,
  Container,
  DeliverySchedule,
  HorizontalPadding,
  QuantityPicker,
  Toast,
  TopSellingProducts,
} from '@components/index';
import {
  getAllProducts,
  getAllSlides,
  getProduct,
  getTopSelling,
  IProduct,
  ISlide,
  ITopSellingProducts,
  useHandleAddToCart,
} from '@lib/index';
import Head from 'next/head';
import Image from 'next/image';
import * as React from 'react';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import slugify from 'slugify';

interface IProductPage {
  product: IProduct;
  topSelling: ITopSellingProducts;
  carouselSlides: Array<ISlide>;
}

function ProductPage({
  product,
  topSelling,
  carouselSlides,
}: IProductPage): React.ReactElement {
  // Number of items to add to cart
  const [quantity, setQuantity] = React.useState(1);

  // Variant to add to cart
  const variantId = product.variants.edges[0].node.id;

  // Increment quantity
  const decrement = (): void =>
    setQuantity((prevQty) => (prevQty > 1 ? prevQty - 1 : prevQty));

  // Decrement quantity
  const increment = (): void => setQuantity((prevQty) => prevQty + 1);

  // State for showing add to cart toast notifications
  const [showDialog, setShowDialog] = React.useState(false);

  // Function to add item to cart
  const { handleAddToCart } = useHandleAddToCart({
    variantId,
    quantity,
    setShowDialog,
  });

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
      <Head>
        <title>{product.title}</title>
      </Head>
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
                    <span className="uppercase"> / each</span>
                  </div>
                  <div className="flex justify-between mt-12">
                    <QuantityPicker
                      increment={increment}
                      decrement={decrement}
                      quantity={quantity}
                    />
                    <button
                      type="button"
                      className="inline-flex items-center justify-center space-x-3 cta"
                      onClick={handleAddToCart}
                    >
                      <span>Add to Cart</span>
                      <HiOutlineShoppingCart className="w-7 h-7" />
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
        <DeliverySchedule />
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

async function getStaticPaths() {
  const products = await getAllProducts();
  return {
    paths: products.map(
      ({ node }: { node: IProduct }) => `/products/${node.handle}`
    ),
    fallback: false,
  };
}

interface IParams {
  params: {
    handle: string;
  };
}

async function getStaticProps({ params }: IParams) {
  const product: IProduct = await getProduct({
    handle: params.handle,
  });

  const topSelling: ITopSellingProducts = await getTopSelling({
    query: `${
      product.productType && `product_type:${product.productType}, `
    }available_for_sale:true`,
  });

  const carouselSlides = await getAllSlides();

  return {
    props: {
      carouselSlides,
      product,
      topSelling,
    },
    revalidate: 60,
  };
}

export { ProductPage as default, getStaticPaths, getStaticProps };
