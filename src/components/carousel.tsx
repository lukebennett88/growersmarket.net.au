import * as React from 'react';
import Link from 'next/link';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

const ProductSlider: React.FC = ({ children }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const sliderContainerRef = React.useRef<HTMLDivElement>(null);

  const [ref, slider] = useKeenSlider<HTMLUListElement>({
    loop: true,
    slidesPerView: 1,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  // Stop the history navigation gesture on touch devices
  React.useEffect(() => {
    const preventNavigation = (event: TouchEvent) => {
      // Center point of the touch area
      const touchXPosition = event.touches[0].pageX;
      // Size of the touch area
      const touchXRadius = event.touches[0].radiusX || 0;

      // We set a threshold (10px) on both sizes of the screen,
      // if the touch area overlaps with the screen edges
      // it's likely to trigger the navigation. We prevent the
      // touchstart event in that case.
      if (
        touchXPosition - touchXRadius < 10 ||
        touchXPosition + touchXRadius > window.innerWidth - 10
      )
        event.preventDefault();
    };

    sliderContainerRef.current?.addEventListener(
      'touchstart',
      preventNavigation
    );

    return () => {
      sliderContainerRef.current?.removeEventListener(
        'touchstart',
        preventNavigation
      );
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') slider.prev();
    if (e.key === 'ArrowRight') slider.next();
  }

  return (
    <div ref={sliderContainerRef} className="relative">
      <ul
        ref={ref}
        role="region"
        tabIndex={0}
        onKeyDown={(e) => handleKeyDown(e)}
        className="h-full transition-opacity duration-150 keen-slider"
        style={{ opacity: isMounted ? 1 : 0 }}
      >
        {React.Children.map(children, (child) => {
          // Add the keen-slider__slide className to children
          if (React.isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className} ` : ''
                }keen-slider__slide`,
              },
            };
          }
          return child;
        })}
      </ul>
      {slider && (
        <div className="absolute inset-x-0 transform bottom-2">
          <ul className="relative flex items-center justify-center space-x-2">
            {[...Array(slider.details().size).keys()].map((index) => {
              return (
                <li key={index}>
                  <button
                    type="button"
                    aria-label={`Move to slide ${index + 1}`}
                    onClick={() => {
                      slider.moveToSlideRelative(index);
                    }}
                    className={`${
                      currentSlide !== index ? 'bg-opacity-0' : 'bg-opacity-100'
                    } bg-white h-2.5 w-2.5 rounded-full border border-white transition duration-150 ease-in-out shadow-md pointer-events-auto`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

// TODO: source this data from Sanity
const slides = [
  {
    id: '8578fa57-a117-41ec-ac4c-beedf4930f7e',
    heading: 'Get Christmas Ready with us',
    cta: {
      label: 'Shop Christmas Essentials now',
      slug: '/',
    },
    backgroundImage:
      'https://images.unsplash.com/photo-1557844352-761f2565b576?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80',
  },
  {
    id: 'cb39e877-ee28-4f6c-a5ce-4b67b7780fa4',
    heading: 'Get Christmas Ready with us',
    cta: {
      label: 'Shop Christmas Essentials now',
      slug: '/',
    },
    backgroundImage:
      'https://images.unsplash.com/photo-1592201426550-83c4be24a0a7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2389&q=80',
  },
];

function Carousel() {
  return (
    <ProductSlider>
      {slides.map((slide) => (
        <li key={slide.id} className="relative py-12 bg-green-dark">
          <img
            src={slide.backgroundImage}
            alt=""
            style={{
              filter: 'grayscale(1)',
              mixBlendMode: 'multiply',
              transform: 'scaleX(-1)',
            }}
            className="absolute inset-0 object-cover"
          />
          <Container as="article">
            <HorizontalPadding variant={HorizontalPadding.variant.TRANSPARENT}>
              <div className="max-w-lg">
                <h2 className="text-5xl italic text-white">
                  <span className="inline-block max-w-prose">
                    {slide.heading}
                  </span>
                </h2>
                <p className="mt-8">
                  <Link href={slide.cta.slug}>
                    <a className="text-gray-900 cta bg-yellow">
                      {slide.cta.label}
                    </a>
                  </Link>
                </p>
              </div>
            </HorizontalPadding>
          </Container>
        </li>
      ))}
    </ProductSlider>
  );
}

export { Carousel };
