import 'keen-slider/keen-slider.min.css';

import { ISlide } from '@lib/get-all-slides';
import { configuredSanityClient } from '@lib/sanity-client';
import KeenSlider, { useKeenSlider } from 'keen-slider/react';
import Image from 'next/image';
import Link from 'next/link';
import { useNextSanityImage } from 'next-sanity-image';
import * as React from 'react';

import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

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

interface IProductSlider {
  children: React.ReactNode;
}

function ProductSlider({ children }: IProductSlider): React.ReactElement {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isMounted, setIsMounted] = React.useState(false);
  const [pause, setPause] = React.useState(false);
  const sliderContainerRef = React.useRef<HTMLDivElement>(null);
  const timer = React.useRef(null);

  const [sliderRef, slider] = useKeenSlider<HTMLUListElement>({
    loop: true,
    slidesPerView: 1,
    duration: 1500,
    mounted: () => setIsMounted(true),
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
    dragStart: () => {
      setPause(true);
    },
    dragEnd: () => {
      setPause(false);
    },
  });

  // Stop the history navigation gesture on touch devices
  React.useEffect(() => {
    sliderContainerRef.current?.addEventListener(
      'touchstart',
      preventNavigation,
      { passive: true }
    );
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      sliderContainerRef.current?.removeEventListener(
        'touchstart',
        preventNavigation
      );
    };
  }, []);

  // Automatically slide through CTAs
  React.useEffect(() => {
    timer.current = window.setInterval(() => {
      if (!pause && slider) {
        slider.next();
      }
    }, 3500);
    return () => {
      clearInterval(timer.current);
    };
  }, [pause, slider]);

  // Pause slider when hovering over
  React.useEffect(() => {
    sliderRef.current.addEventListener('mouseover', () => {
      setPause(true);
    });
    sliderRef.current.addEventListener('mouseout', () => {
      setPause(false);
    });
  }, [sliderRef]);

  // Allow control of carousel with keyboard when focused
  function handleKeyDown(e) {
    if (e.key === 'ArrowLeft') slider.prev();
    if (e.key === 'ArrowRight') slider.next();
  }

  return (
    <div ref={sliderContainerRef} className="relative">
      <ul
        ref={sliderRef}
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
                  child.props.className
                    ? `${child.props.className as string} `
                    : ''
                }${isMounted ? 'block' : 'hidden'} keen-slider__slide`,
              },
            };
          }
          return child;
        })}
      </ul>
      {slider && <PagingDots slider={slider} currentSlide={currentSlide} />}
    </div>
  );
}

interface IPagingDots {
  slider: KeenSlider;
  currentSlide: number;
}

function PagingDots({ slider, currentSlide }: IPagingDots): React.ReactElement {
  return (
    <div className="absolute inset-x-0 transform bottom-2">
      <ul className="relative flex items-center justify-center space-x-1">
        {[...new Array(slider.details().size).keys()].map((index) => (
          <li key={index}>
            <button
              type="button"
              aria-label={`Move to slide ${index + 1}`}
              onClick={() => {
                slider.moveToSlideRelative(index);
              }}
              className="p-0.5 rounded-full"
            >
              <span
                aria-hidden
                className={`${
                  currentSlide !== index ? 'bg-opacity-0' : 'bg-opacity-100'
                } bg-white block h-2.5 w-2.5 rounded-full border border-white transition duration-150 ease-in-out shadow-md pointer-events-auto`}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Slide({ slide, className }: { slide: ISlide; className: string }) {
  const { src, loader } = useNextSanityImage(
    configuredSanityClient,
    slide.backgroundImage.asset
  );
  return (
    <li className={className}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 lg:left-auto lg:w-1/2">
          <Image
            src={src}
            loader={loader}
            layout="fill"
            objectFit="contain"
            sizes="(min-width: 1920px) 1920px, 100vw"
            alt={slide.backgroundImage?.altText || ''}
            className="w-full h-full mix-blend-mode-multiply filter-grayscale"
          />
        </div>
      </div>
      <Container>
        <HorizontalPadding variant={HorizontalPadding.variant.TRANSPARENT}>
          <div className="w-full max-w-lg py-12">
            <h2 className="text-5xl italic text-white">
              <span className="inline-block max-w-prose">{slide.heading}</span>
            </h2>
            {slide.ctaSlug && slide.ctaLabel && (
              <p className="mt-8">
                <Link href={slide.ctaSlug}>
                  <a className="text-gray-900 cta bg-yellow">
                    {slide.ctaLabel}
                  </a>
                </Link>
              </p>
            )}
          </div>
        </HorizontalPadding>
      </Container>
    </li>
  );
}

function Carousel({ slides }: { slides: ISlide[] }): React.ReactElement {
  return (
    <ProductSlider>
      {slides.map((slide) =>
        slide.isHidden ? null : (
          <Slide
            key={slide._key}
            slide={slide}
            className="relative bg-green-dark"
          />
        )
      )}
    </ProductSlider>
  );
}

export { Carousel };
