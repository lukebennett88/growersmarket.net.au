import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_ALL_SLIDES = gql`
  query SanityQuery {
    Carousel(id: "carousel") {
      slides {
        _key
        heading
        ctaLabel
        ctaSlug
        isHidden
        backgroundImage {
          altText
          asset {
            _id
          }
        }
      }
    }
  }
`;

async function getAllSlides() {
  const { data } = await apolloClient.query({
    query: GET_ALL_SLIDES,
    context: {
      clientName: 'SANITY',
    },
  });

  return data.Carousel.slides;
}

interface ISlide {
  _key: string;
  heading: string;
  ctaLabel: string;
  ctaSlug: string;
  isHidden?: boolean;
  backgroundImage: {
    altText: string | null;
    asset: {
      _id: string;
    };
  };
}

export { getAllSlides };
export type { ISlide };
