import Link from 'next/link';
import { Container } from './container';
import { HorizontalPadding } from './horizontal-padding';

// TODO: source this data from Sanity
const slides = [
  {
    heading: 'Get Christmas Ready with us',
    cta: {
      label: 'Shop Christmas Essentials now',
      slug: '/',
    },
    backgroundImage: '',
  },
];

function Carousel() {
  return (
    <ul>
      {slides.map((slide) => (
        <li key={slide.heading} className="relative py-12 bg-gray-light">
          <Container as="article">
            <HorizontalPadding variant={HorizontalPadding.variant.GRAY}>
              <div className="max-w-lg">
                <h2 className="text-5xl italic text-green-dark">
                  <span className="inline-block max-w-prose">
                    {slide.heading}
                  </span>
                </h2>
                <p className="mt-8">
                  <Link href={slide.cta.slug}>
                    <a className="cta">{slide.cta.label}</a>
                  </Link>
                </p>
              </div>
            </HorizontalPadding>
          </Container>
        </li>
      ))}
    </ul>
  );
}

export { Carousel };
