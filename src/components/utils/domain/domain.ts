import { canonicalOrigin } from './canonicalOrigin.const'
import { isEnglishDomain } from './isEnglishDomain'

export const domain = () => {
  // Docs:
  // Using Environment Variables https://www.netlify.com/blog/2021/07/05/easy-access-environment-variables/#using-environment-variables
  // CONTEXT https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
  //   > name of the build’s deploy context. It can be `production`, `deploy-preview` or `branch-deploy`.
  // URL vs. DEPLOY_PRIME_URL https://docs.netlify.com/configure-builds/environment-variables/#deploy-urls-and-metadata
  // NETLIFY https://docs.netlify.com/configure-builds/environment-variables/#build-metadata
  const ssrDomain =
    process.env.CONTEXT === 'production'
      ? process.env.URL
      : process.env.DEPLOY_PRIME_URL
  const ssrFallback = 'https://radwege-check.de'

  // We do this, to get the SSR domain. However, rehydration will use this utility as well,
  // so for that case, we need to take the current hostname.
  if (typeof window === 'undefined') {
    return ssrDomain || ssrFallback
  }

  const browserDomain = window.location.origin

  // Prevent duplicate content due to the english domain.
  const canonicalBrowserDomain = isEnglishDomain(window.location.host)
    ? canonicalOrigin
    : browserDomain

  return canonicalBrowserDomain || ssrDomain || ssrFallback
}
