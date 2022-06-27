import classNames from 'classnames'
import React from 'react'
import { Layout } from '~/components/Layout/Layout'
import { ArticleLogo } from './ArticleLogo'

type Props = {
  location?: any // TODO: define type
  showEnglishLanguageTeaser?: boolean
  maxWidthClass?: string
}

export const LayoutArticle: React.FC<Props> = ({
  location,
  showEnglishLanguageTeaser,
  maxWidthClass,
  children,
}) => {
  return (
    <Layout
      location={location}
      showEnglishLanguageTeaser={showEnglishLanguageTeaser}
      className="bg-white"
    >
      <ArticleLogo />
      <article
        className={classNames(
          maxWidthClass ?? 'prose',
          'mx-auto -mt-20 mb-20 max-w-2xl bg-white p-5 pt-8 lg:rounded-md lg:p-10'
        )}
      >
        {children}
      </article>
    </Layout>
  )
}
