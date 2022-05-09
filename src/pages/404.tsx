import { PageProps } from 'gatsby';
import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { ButtonLink } from '~/components/links';

const NotFound: React.FC<PageProps> = () => {
  return (
    <Layout>
      <MetaTags noindex title="404 | Seite nicht gefunden." />
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
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
                <ButtonLink to="/">Startseite</ButtonLink>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};
export default NotFound;
