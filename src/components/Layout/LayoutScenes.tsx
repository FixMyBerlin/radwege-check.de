import React from 'react'

import type { SiteLocation } from '~/lib/site-location'

import { EnglishLanguageButton, EnglishLanguageModal } from './EnglishLanguage'
import { TailwindResponsiveHelper } from './TailwindResponsiveHelper'

type Props = {
  location: SiteLocation
  showEnglishLanguageTeaser?: boolean
  children: React.ReactNode
}

export const LayoutScenes = ({ location, showEnglishLanguageTeaser = true, children }: Props) => {
  return (
    <>
      <main className="h-screen w-screen">{children}</main>
      <EnglishLanguageButton visible={showEnglishLanguageTeaser} positionBottom />
      <EnglishLanguageModal visible={showEnglishLanguageTeaser} domain={location?.host} />
      <TailwindResponsiveHelper />
    </>
  )
}
