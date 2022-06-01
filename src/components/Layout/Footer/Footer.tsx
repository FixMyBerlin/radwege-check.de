import React from 'react'
import Logo from '~/components/assets/radwegecheck-logo.svg'
import { Link } from '~/components/Link'
import { FooterSocialIcons } from '.'
import { footerLinks } from './const'
import { FooterLinkList } from './FooterLinks/FooterLinkList'

export const Footer: React.FC = () => {
  return (
    <footer className="z-0 bg-stone-600 p-6" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="flex flex-col items-start justify-between lg:flex-row">
        <section className="flex w-full flex-row justify-between lg:w-auto lg:flex-col">
          <div>
            <Link to="/" classNameOverwrite="" title="Zur Startseite…">
              <Logo className="h-12 fill-white" alt="Radwege-Check" />
            </Link>
            <Link
              external
              to="https://www.fixmycity.de"
              classNameOverwrite="text-xxs text-stone-300 ml-[58px] -mt-0.5 block hover:underline"
            >
              Erstellt durch FixMyCity
            </Link>
          </div>

          <div className="mt-2 lg:ml-14 lg:mt-10">
            <FooterSocialIcons />
          </div>
        </section>
        <section>
          <div className="mt-8 flex flex-col gap-10 lg:mt-1 lg:flex-row lg:gap-12">
            <div className="lg:w-[14rem]">
              <h3 className="mb-3 text-stone-300">Woher stammen die Daten?</h3>
              <FooterLinkList linkList={footerLinks.report} />
            </div>
            <div className="lg:w-[14rem]">
              <h3 className="mb-3 text-stone-300">Ergebnisse</h3>
              <FooterLinkList linkList={footerLinks.results} />
            </div>
            <div className="lg:w-[14rem]">
              <FooterLinkList linkList={footerLinks.formal} />
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}
