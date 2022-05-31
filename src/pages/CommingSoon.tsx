import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { Link } from '~/components/Link';
import { NewsletterWidget } from '~/components/NewsletterWidget';

const CommingSoon: React.FC = () => {
  return (
    <Layout hideBetaModal>
      <MetaTags noindex title="Diese Seite ist noch in Arbeit." />
      <div className="min-h-full bg-white px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
        <div className="mx-auto max-w-max">
          <main className="sm:flex">
            <p className="text-4xl font-extrabold text-orange-400 sm:text-5xl">
              404
            </p>
            <div className="sm:ml-6">
              <div className="sm:border-l sm:border-gray-200 sm:pl-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
                  Diese Seite ist noch in Arbeit.
                </h1>
                <p className="mt-1 mb-5 text-base text-slate-500">
                  Bitte abonniere unseren Newsletter. Wir informieren dich,
                  sobald neue Funktionen verfügbar sind.
                </p>
                <NewsletterWidget />
              </div>
              <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
                <Link button to="/">
                  Startseite
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default CommingSoon;
