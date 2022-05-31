import React from 'react';
import { FooterSocialIcons } from '.';
import { BuildWithLove } from './BuildWithLove';
import { FooterLinks } from './FooterLinks/FooterLinks';
import { footerLinks } from './FooterLinks/footerLinks.const';

export const Footer: React.FC = () => {
  return (
    <footer className="z-0 bg-stone-600" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="md:grid md:grid-cols-2 md:gap-8 xl:col-span-2">
            <FooterLinks title="Ergebnisse" linkList={footerLinks.results} />
            <FooterLinks
              title="Formales"
              linkList={footerLinks.formal}
              className="mt-12 md:mt-0"
            />
          </div>
        </div>
        <div className="mt-8 border-t border-stone-900 pt-8 md:flex md:items-center md:justify-between">
          <FooterSocialIcons />
          <p className="mt-8 text-base text-stone-400 md:order-1 md:mt-0">
            <BuildWithLove />
          </p>
        </div>
      </div>
    </footer>
  );
};
