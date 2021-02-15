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

  return data.Carousel;
}

export { getAllSlides };
