import React from 'react'
import { LayoutArticle, MetaTags } from '~/components/Layout'
import { Link } from '~/components/Link'

const NotFound: React.FC = () => {
  return (
    <LayoutArticle>
      <MetaTags noindex title="404 | Seite nicht gefunden." />

      <div className="sm:flex">
        <p className="text-4xl font-extrabold text-orange-400 sm:text-5xl">
          404
        </p>
        <div className="sm:ml-6">
          <div className="sm:border-l sm:border-gray-200 sm:pl-6">
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-1 text-base text-slate-500">
              Please check the URL in the address bar and try again.
            </p>
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

export default NotFound
