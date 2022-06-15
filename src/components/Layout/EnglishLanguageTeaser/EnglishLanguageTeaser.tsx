import classNames from 'classnames'
import React from 'react'
import { Link } from '../../Link'
import GoogleTranslateLogo from './assets/google-translate-logo.svg'

type Props = { positionBottom?: boolean }

export const EnglishLanguageTeaser: React.FC<Props> = ({ positionBottom }) => {
  // Guard SSR
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return null

  // Show only if user does not speak German
  // … but show always on DEV.
  const speaksDe = navigator.languages.some((l) => l.includes('de'))
  const isDev = window.location.host.includes('localhost')
  if (speaksDe && !isDev) return null

  // Build translations URL and keep existing params
  const translateUrl = new URL(
    `https://radwege--check-de.translate.goog${window.location.pathname}`
  )
  const currentParams = new URLSearchParams(window.location.search)
  currentParams.forEach((v, k) => translateUrl.searchParams.set(k, v))
  translateUrl.searchParams.set('_x_tr_sl', 'de') // Source
  translateUrl.searchParams.set('_x_tr_tl', 'en') // Target
  translateUrl.searchParams.set('_x_tr_hl', 'en') // UI
  translateUrl.searchParams.set('_x_tr_pto', 'wapp')

  return (
    <Link
      to={translateUrl.toString()}
      external
      button
      lang="en"
      title="Open page current in Google Translate"
      className={classNames(
        'absolute right-5 flex flex-row items-center gap-0.5 shadow-md',
        positionBottom ? 'bottom-5' : 'top-5'
      )}
    >
      <GoogleTranslateLogo className="mt-0.5 mr-1 h-4 w-4 object-contain" />{' '}
      Translate page
    </Link>
  )
}
