const defaultTheme = require('tailwindcss/defaultTheme')
const aspectRatio = require('@tailwindcss/aspect-ratio');
const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const tailwindFilters = require('tailwindcss-filters');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(8px)',
    },
    extend: {
      colors: {
        "green": {
          dark: '#0f5128',
        },
        "yellow": {
          DEFAULT: "#fef200"
        },
        gray: {
          "dark": "#3a474f",
          "light": "#f2f4f3",
        },
        "red": {
          DEFAULT: "#c3272b"
        },
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans]
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            fontFamily: `${theme('fontFamily.sans')} !important`,
            img: {
              width: `${theme('width.auto')} !important`,
            }
          },
        },
      }),
    }
  },
  variants: {
    extend: {}
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
  ]
};
