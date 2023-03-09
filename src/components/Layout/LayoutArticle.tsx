import clsx from 'clsx'
import { PageProps } from 'gatsby'
import React from 'react'
import { Layout } from '~/components/Layout/Layout'
import { ArticleLogo } from './ArticleLogo'

type Props = {
  location: PageProps['location']
  showEnglishLanguageTeaser?: boolean
  maxWidthClass?: string
  prose?: boolean
  printHideHeader?: boolean
  children: React.ReactNode
}

export const LayoutArticle: React.FC<Props> = ({
  location,
  showEnglishLanguageTeaser,
  maxWidthClass,
  prose = true,
  printHideHeader = false,
  children,
}) => {
  return (
    <Layout
      location={location}
      showEnglishLanguageTeaser={showEnglishLanguageTeaser}
      className="bg-white"
    >
      <ArticleLogo printHideHeader={printHideHeader} />
      <article
        className={clsx(
          maxWidthClass ?? 'max-w-prose',
          prose &&
            'prose prose-headings:scroll-my-5 prose-li:marker:text-gray-800',
          'mx-auto max-w-2xl bg-white p-3 pt-8 sm:p-5 lg:rounded-md lg:p-10',
          { '-mt-20 mb-20': !printHideHeader }
        )}
      >
        {children}
      </article>
    </Layout>
  )
}
