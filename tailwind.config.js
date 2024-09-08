/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    typography: theme => ({}),
    extend: {
      typography: theme => ({
        dark: {
          css: {
            color: 'white',
          },
        },
      }),
      fontFamily: {
        Montserrat: ['Montserrat', 'sans-serif'],
        Poppins: ['Poppins', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
    colors: {
      'light-bg': {
        start: 'hsl(216,33%,97%)',
        end: 'hsl(216,33%,79%)',
      },
      'dark-bg': {
        start: 'hsl(219,58%,10%)',
        end: 'hsl(218,58%,38%)',
      },

      'light-primary-hl': colors.red['500'],
      'dark-primary-hl': colors.yellow['200'],

      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.neutral,
      indigo: colors.indigo,
      red: colors.rose,
      yellow: colors.amber,
      blue: colors.blue,
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [require('@tailwindcss/typography')],
}
