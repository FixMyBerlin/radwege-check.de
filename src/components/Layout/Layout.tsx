import classNames from 'classnames'
import React from 'react'
import { Footer } from '.'
import { BetaModal } from './BetaModal'
import { EnglishLanguageTeaser } from './EnglishLanguageTeaser'
import { TailwindResponsiveHelper } from './TailwindResponsiveHelper'

type Props = {
  className?: string
  /** @description to access the current location; see links in readme. */
  location?: any // TODO: define type
  showBetaModal?: boolean
  showEnglishLanguageTeaser?: boolean
  children: React.ReactNode
}

// TODO: Maybe we need to prevent the layout from unmounting, see https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Layout: React.FC<Props> = ({
  className,
  location: _location, // TODO later… or remove
  showBetaModal = false,
  showEnglishLanguageTeaser = true,
  children,
}) => {
  return (
    <>
      {showBetaModal && <BetaModal />}
      <main className={classNames(className, 'z-0 flex-grow')}>{children}</main>
      <Footer />
      {showEnglishLanguageTeaser && <EnglishLanguageTeaser />}
      <TailwindResponsiveHelper />
    </>
  )
}
