/* eslint-disable no-underscore-dangle */

/*
  Matomo Docs: https://developer.matomo.org/guides/tracking-javascript-guide#tracking-content-impressions-and-actions-manually
*/

type ImpressionProps = {
  /** @desc "Content Name" */
  id: string
  /** @desc "Content Piece" */
  representation: string
  /** @desc "Content Target" */
  url: string
}

export const trackContentImpression = ({
  id,
  representation,
  url,
}: ImpressionProps) => {
  if (typeof window === 'undefined') return

  window._paq = window._paq || []
  window._paq.push(['trackContentImpression', id, representation])
  if (window.dev === true) {
    // eslint-disable-next-line no-console
    console.debug({
      MATOMO: 'trackContentImpression',
      id,
      representation,
      url,
    })
  }
}

type InteractionProps = {
  /** @desc "contentInteraction" eg 'tabActivated' */
  action: string
} & ImpressionProps

export const trackContentInteraction = ({
  action,
  id,
  representation,
  url,
}: InteractionProps) => {
  if (typeof window === 'undefined') return

  window._paq = window._paq || []
  window._paq.push(['trackContentImpression', action, id, representation])
  if (window.dev === true) {
    // eslint-disable-next-line no-console
    console.debug({
      MATOMO: 'trackContentImpression',
      action,
      id,
      representation,
      url,
    })
  }
}
