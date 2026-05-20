/**
 * Tailwind class strings aligned with `Link` / `buttonStyles` for use in `.astro` templates.
 */
const linkShared = 'underline underline-offset-2'

export const linkProseClass = `${linkShared} decoration-2 decoration-brand-yellow hover:text-yellow-800 hover:decoration-yellow-500`

export const linkInvertedClass = `${linkShared} decoration-1 text-stone-50 decoration-stone-400 hover:text-white hover:decoration-white`

export const buttonLinkClass =
  'inline-flex items-center px-4 py-2 border border-transparent font-semibold rounded-md shadow-sm text-gray-800 bg-brand-yellow hover:bg-yellow-400 group-hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow'
