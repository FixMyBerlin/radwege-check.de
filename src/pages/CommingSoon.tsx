import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'
import { NewsletterWidget } from '~/components/NewsletterWidget'

const CommingSoon: React.FC = () => {
  return (
    <LayoutArticle>
      <MetaTags
        noindex
        title="Radwege-Check | Diese Seite ist noch in Arbeit."
      />

      <div className="sm:flex">
        <p className="text-4xl font-extrabold text-orange-400 sm:text-5xl">
          404
        </p>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Diese Seite ist noch in Arbeit.
            </h1>
            <p className="mt-1 mb-5 text-base text-slate-500">
              Bitte abonniere unseren Newsletter. Wir informieren dich, sobald
              neue Funktionen verfügbar sind.
            </p>
            <NewsletterWidget className="w-full" />
          </div>
          <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
            <Link button to="/">
              Startseite
            </Link>
          </div>
        </div>
      </div>
    </LayoutArticle>
  )
}

export default CommingSoon
