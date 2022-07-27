import React from 'react'
import { Modal } from '~/components/Modal'
import { isEnglishDomain } from '~/components/utils'
import { Link } from '../../Link'
import GoogleTranslateLogo from './assets/google-translate-logo.svg'
import { googleTranslateUrl } from './utils'

type Props = {
  visible: boolean
  domain: string
}

export const EnglishLanguageModal: React.FC<Props> = ({ visible, domain }) => {
  if (!visible) return null
  if (!domain) return null

  if (!isEnglishDomain(domain)) return null

  // Guard SSR
  const isBrowser = typeof window !== 'undefined'
  if (!isBrowser) return null

  const translateUrl = googleTranslateUrl(window.location)

  return (
    <Modal title="Translate page" className="print:hidden">
      <p className="mb-4">
        This page is avaliable in German only but can be translated with Google
        Translate.
      </p>
      <div className="space-x-3">
        <Link
          to={translateUrl}
          external
          button
          lang="en"
          title="Open page current in Google Translate"
          className="flex flex-row items-center gap-0.5"
        >
          <GoogleTranslateLogo className="mt-0.5 mr-1 h-4 w-4 object-contain" />{' '}
          Translate page
        </Link>{' '}
        <Link
          to={`https://www.radwege-check.de${window.location.pathname}${window.location.search}`}
        >
          Don&apos;t show again
        </Link>
      </div>
    </Modal>
  )
}
