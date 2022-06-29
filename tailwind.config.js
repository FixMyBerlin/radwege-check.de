/** @type {import('tailwindcss').Config} */
/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,svg}'],
  theme: {
    extend: {
      colors: {
        'brand-yellow': '#fabe28',
        'brand-light-yellow': '#fff8e8',
        'brand-pink': '#cf0a7d',
      },
      boxShadow: {
        innerYellow: 'inset 1px 1px 3px 0px rgb(180 155 0)',
        innerGray: 'inset 1px 1px 3px 0 rgb(209 213 219)', // gray-300
      },
      fontSize: { xxs: '0.7rem' },
      typography: {
        DEFAULT: {
          // Tell the plugin to not add any classes to anchor tags
          // since we always use the Link component which is styled already.
          css: { a: false },
        },
      },
    },
    fontFamily: {
      sans: ['Barlow', 'Segoe UI', 'Tahoma', 'sans-serif'],
      condensed: ['Barlow Condensed', 'sans-serif'],
      semi: ['Barlow Semi Condensed', 'sans-serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
}
