/* eslint-disable sonarjs/no-duplicate-string */
const defaultTheme = require('tailwindcss/defaultTheme');
const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const tailwindFilters = require('tailwindcss-filters');

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.\d+?)0+$/, '$1')
    .replace(/\.0$/, '');

const em = (px, base) => `${round(px / base)}em`;

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backdropFilter: {
      none: 'none',
      blur: 'blur(8px)',
      grayscale: 'grayscale(1)',
    },
    extend: {
      colors: {
        green: {
          dark: '#0f5128',
        },
        yellow: {
          DEFAULT: '#fef200',
        },
        gray: {
          dark: '#3a474f',
          light: '#f2f4f3',
        },
        red: {
          DEFAULT: '#c3272b',
        },
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: `${theme('fontFamily.sans')} !important`,
            img: {
              width: `${theme('width.auto')} !important`,
            },
          },
        },
        'on-dark': {
          css: [
            {
              color: theme('colors.white'),
              a: {
                color: theme('colors.gray.200'),
              },
              strong: {
                color: theme('colors.gray.200'),
              },
              'ol > li::before': {
                color: theme('colors.gray.200'),
                fontSize: em(20, 16),
                fontWeight: theme('fontWeight.bold'),
              },
              'ul > li::before': {
                backgroundColor: theme('colors.gray.200'),
              },
              h2: {
                color: theme('colors.gray.200'),
              },
            },
            {
              h2: {
                fontSize: em(20, 16),
                marginTop: em(32, 20),
                marginBottom: em(12, 20),
                lineHeight: round(32 / 20),
              },
            },
          ],
        },
      }),
    },
  },
  variants: {
    extend: {
      borderColor: ['disabled'],
      cursor: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [
    // Apect ratio plugin docs: https://github.com/tailwindlabs/tailwindcss-aspect-ratio#readme
    aspectRatio,

    // Forms plugin docs: https://github.com/tailwindlabs/tailwindcss-forms#readme
    forms,

    // Forms plugin docs: https://github.com/tailwindlabs/tailwindcss-typography#readme
    typography,

    // Filters plugin docs: https://github.com/benface/tailwindcss-filters#readme
    tailwindFilters,
  ],
};
