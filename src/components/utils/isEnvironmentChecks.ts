import { englishDomainHost, primaryDomainHost } from './domain'

export const isDev =
  (typeof import.meta !== 'undefined' && import.meta.env?.DEV) ||
  (typeof window !== 'undefined' && window.location.host.includes('localhost'))

function netlifyContextIsProduction(): boolean {
  if (typeof process === 'undefined' || !process.env) {
    return false
  }
  return process.env.CONTEXT === 'production'
}

// ☝️ It is not enough to check the SSR state, because rehydration will than bypass this check.
//   we also need to check the production state inside the browser…
// CONTEXT: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
export const isProduction =
  !isDev &&
  (netlifyContextIsProduction() ||
    (typeof window !== 'undefined' &&
      (window.location.host === primaryDomainHost || window.location.host === englishDomainHost)))

/** Debug logging for filters / titles — off in Vitest when `DISABlE_DEBUG_FOR_JEST` is set. */
export const allowVerboseDebug =
  typeof process !== 'undefined' && process.env?.DISABlE_DEBUG_FOR_JEST ? false : isDev
