const facebook = 'https://www.facebook.com/GrowersMarketPortMacquarie/';

const config = {
  title: 'Growers Market',
  description:
    'Retail and wholesale specialists. Direct from the farm to you, some of the freshest in fruits and vegetables, with friendly personal service. Heaps of parking at the Growers Market Complex. For all your fruit and vegetables shop at Growers Market Port Macquarie.',
  siteUrl: 'https://www.growersmarket.net.au',
  phone: '(02) 6583 4111',
  address: {
    line1: '138 Gordon St',
    line2: 'Port Macquarie, NSW, 2444',
    googleMaps: {
      link: 'https://goo.gl/maps/Ufvdnt7zpQMZkuAv9',
      embed:
        // eslint-disable-next-line no-secrets/no-secrets
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3404.2250157702606!2d152.8999106162319!3d-31.435471704323067!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b9dff234469c8b1%3A0xc3e1b59b93b39765!2sGrowers%20Market!5e0!3m2!1sen!2sau!4v1607553583065!5m2!1sen!2sau',
    },
  },
  facebook,
  siteNavigation: {
    fruits: {
      label: 'Fruits',
      slug: 'fruits',
      submenu: [
        {
          label: 'Apples',
          slug: 'apples',
        },
      ],
    },
    vegetables: {
      label: 'Vegetables',
      slug: 'vegetables',
    },
    'fridge-and-pantry': {
      label: 'Fridge & Pantry',
      slug: 'fridge-and-pantry',
    },
    'pre-packed-boxes': {
      label: 'Pre-Packed Boxes',
      slug: 'pre-packed-boxes',
    },
    specials: {
      label: 'Specials',
      slug: 'specials',
    },
    faq: {
      label: 'FAQ',
      slug: 'faq',
    },
    'about-us': {
      label: 'About',
      slug: 'about-us',
    },
    delivery: {
      label: 'Delivery',
      slug: 'delivery',
    },
    contact: {
      label: 'Contact',
      slug: 'contact',
    },
  },
  footerMenu: {
    categories: [
      {
        label: 'Fruit',
        slug: 'fruit',
      },
      {
        label: 'Vegetables',
        slug: 'vegetables',
      },
      {
        label: 'Fridge & Pantry',
        slug: 'fridge-and-pantry',
      },
      {
        label: 'Pre-Packed Boxes',
        slug: 'pre-packed-boxes',
      },
      {
        label: 'Specials',
        slug: 'specials',
      },
    ],
    information: [
      {
        label: 'FAQ',
        slug: 'pages/faq',
      },
      {
        label: 'About Us',
        slug: 'pages/about-us',
      },
      {
        label: 'Delivery Schedule',
        slug: 'pages/delivery-schedule',
      },
      {
        label: 'Contact Us',
        slug: 'pages/contact-us',
      },
    ],
    myAccount: [
      {
        label: 'Account',
        slug: 'account',
      },
      {
        label: 'Privacy Policy',
        slug: 'pages/privacy-policy',
      },
      {
        label: 'Terms of Service',
        slug: 'pages/terms-of-service',
      },
    ],
    followUs: [
      {
        label: 'Facebook',
        slug: facebook,
      },
    ],
  },
};

export { config };
