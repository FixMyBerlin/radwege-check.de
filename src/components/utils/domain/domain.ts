import { canonicalOrigin } from './canonicalOrigin.const'
import { primaryDomain } from './domains.const'
import { isEnglishDomain } from './isEnglishDomain'

function siteOriginFromAstroConfig(): string | undefined {
  if (typeof import.meta === 'undefined' || !import.meta.env?.SITE) {
    return undefined
  }
  try {
    return new URL(String(import.meta.env.SITE)).origin
  } catch {
    return undefined
  }
}

/** Netlify deploy metadata — only exists in the Node SSR bundle, never in the browser. */
function netlifyDeployOrigin(): string | undefined {
  if (typeof process === 'undefined' || !process.env) {
    return undefined
  }
  const { CONTEXT: context, URL: prodUrl, DEPLOY_PRIME_URL: primeUrl } = process.env
  const raw = context === 'production' ? prodUrl : primeUrl
  if (!raw) {
    return undefined
  }
  try {
    return new URL(raw).origin
  } catch {
    return undefined
  }
}

export const domain = (): string => {
  // Browser first — never touch `process` in the client bundle (Vite does not polyfill it).
  if (typeof window !== 'undefined') {
    const browserDomain = window.location.origin
    const canonicalBrowserDomain = isEnglishDomain(window.location.host)
      ? canonicalOrigin
      : browserDomain
    return canonicalBrowserDomain || siteOriginFromAstroConfig() || primaryDomain
  }

  return netlifyDeployOrigin() || siteOriginFromAstroConfig() || primaryDomain
}
