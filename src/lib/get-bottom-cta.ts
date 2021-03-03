import { gql } from '@apollo/client';

import { apolloClient } from './apollo-client';

const GET_BOTTOM_CTA = gql`
  query FAQsQuery {
    BottomCta(id: "bottomCta") {
      _id
      heading
      ctaLabel
      ctaSlug
      backgroundImage {
        altText
        asset {
          _id
        }
      }
    }
  }
`;

interface IBottomCta {
  heading: Array<string>;
  ctaLabel?: string;
  ctaSlug?: string;
  backgroundImage: {
    altText?: string;
    asset: {
      _id: string;
    };
  };
}

async function getBottomCta() {
  const { data } = await apolloClient.query({
    query: GET_BOTTOM_CTA,
    context: {
      clientName: 'SANITY',
    },
  });
  return data.BottomCta;
}

export { getBottomCta };
export type { IBottomCta };
