export const isDev =
  typeof window !== 'undefined' && window.location.host.includes('localhost')

// ☝️ It is not enough to check the SSR state, because rehydration will than bypass this check.
//   we also need to check the production state inside the browser…
// CONTEXT: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
export const isProduction =
  !isDev &&
  (process.env.CONTEXT === 'production' ||
    (typeof window !== 'undefined' &&
      window.location.host === 'radwege-check.de'))
