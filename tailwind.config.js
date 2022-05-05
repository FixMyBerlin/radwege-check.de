/* eslint-disable global-require */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        inner: 'inset 1px 1px 4px 0 rgba(0, 0, 0, 0.5);',
      },
      typography: ({ theme }) => ({
        pink: {
          css: {
            '--tw-prose-body': theme('colors.slate[800]'),
            '--tw-prose-headings': theme('colors.slate[900]'),
            '--tw-prose-lead': theme('colors.slate[700]'),
            '--tw-prose-links': theme('colors.emerald[400]'),
            '--tw-prose-bold': theme('colors.slate[900]'),
            '--tw-prose-counters': theme('colors.slate[600]'),
            '--tw-prose-bullets': theme('colors.slate[400]'),
            '--tw-prose-hr': theme('colors.slate[300]'),
            '--tw-prose-quotes': theme('colors.slate[900]'),
            '--tw-prose-quote-borders': theme('colors.emerald[400]'),
            '--tw-prose-captions': theme('colors.slate[700]'),
            '--tw-prose-code': theme('colors.slate[900]'),
            '--tw-prose-pre-code': theme('colors.slate[100]'),
            '--tw-prose-pre-bg': theme('colors.slate[900]'),
            '--tw-prose-th-borders': theme('colors.slate[300]'),
            '--tw-prose-td-borders': theme('colors.slate[200]'),
          },
        },
      }),
    },
    fontFamily: {
      sans: ['Open Sans', 'Segoe UI', 'Tahoma', 'sans-serif'],
      condensed: ['Open Sans Condensed', 'sans-serif'],
      slap: ['Roboto Slab', 'serif'],
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
