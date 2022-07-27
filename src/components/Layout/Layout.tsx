import classNames from 'classnames'
import { PageProps } from 'gatsby'
import React from 'react'
import { Footer } from '.'
import { EnglishLanguageModal, EnglishLanguageButton } from './EnglishLanguage'
import { TailwindResponsiveHelper } from './TailwindResponsiveHelper'

type Props = {
  className?: string
  location: PageProps['location']
  showEnglishLanguageTeaser?: boolean
  children: React.ReactNode
}

// TODO: Maybe we need to prevent the layout from unmounting, see https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Layout: React.FC<Props> = ({
  className,
  location,
  showEnglishLanguageTeaser = true,
  children,
}) => {
  return (
    <>
      <main className={classNames(className, 'z-0 flex-grow')}>{children}</main>
      <Footer />
      <EnglishLanguageButton visible={showEnglishLanguageTeaser} />
      <EnglishLanguageModal
        visible={showEnglishLanguageTeaser}
        domain={location?.host}
      />
      <TailwindResponsiveHelper />
    </>
  )
}
