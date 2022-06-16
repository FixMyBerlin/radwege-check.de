export const isDev =
  typeof window !== 'undefined' && window.location.host.includes('localhost')

// CONTEXT: https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
export const isProduction = !isDev && process.env.CONTEXT === 'production'
