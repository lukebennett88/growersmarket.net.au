/* eslint-disable sonarjs/no-identical-functions */
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
        backgroundImage {
          altText
          asset {
            url
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
  backgroundImage: {
    altText: string | null;
    asset: {
      url: string;
    };
  };
}

export { getAllSlides };
export type { ISlide };
