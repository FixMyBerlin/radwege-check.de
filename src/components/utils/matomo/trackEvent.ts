/* eslint-disable no-underscore-dangle */

import { isDev } from '../isEnvironmentChecks'

type Props = {
  category: string
  action: string
  label?: string
}

export const trackEvent = ({ category, action, label = null }: Props) => {
  if (typeof window === 'undefined') return

  window._paq = window._paq || []
  window._paq.push(['trackEvent', category, action])
  if (window.dev === true) {
    // eslint-disable-next-line no-console
    console.debug({
      MATOMO: 'trackEvent',
      category,
      action,
      label,
      _paq: window._paq,
    })
  }
}
