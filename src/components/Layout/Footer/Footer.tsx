import React from 'react'
import Logo from '~/components/assets/radwegecheck-logo.svg'
import { Link } from '~/components/Link'
import { FooterSocialIcons } from '.'
import LogoFmc from './assets/fixmycity-logo.svg'
import { footerLinks } from './const'
import { FooterLinkList } from './FooterLinks/FooterLinkList'

export const Footer: React.FC = () => {
  return (
    <footer
      className="z-0 bg-stone-600 p-6 print:hidden lg:pb-8"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <FooterSocialIcons className="justify-end pb-5 lg:hidden" />
      <div className="flex flex-col items-stretch justify-between lg:h-32 lg:flex-row">
        <section className="flex flex-col justify-between pb-3 lg:w-auto lg:pb-0">
          <div>
            <Link to="/" classNameOverwrite="" title="Zur Startseite…">
              <Logo className="h-12 fill-white" alt="Radwege-Check" />
            </Link>
          </div>
          <div>
            <Link
              external
              blank
              to="https://www.fixmycity.de"
              classNameOverwrite="text-xs text-stone-300 ml-[58px] -mt-0.5 block hover:underline -mb-1.5"
            >
              Konzept &amp; Entwicklung FixMyCity{' '}
              <LogoFmc className="ml-0.5 inline-block h-7 w-7" />
            </Link>
          </div>
        </section>
        <section>
          <div className="mt-8 flex flex-col gap-10 lg:mt-1 lg:flex-row lg:gap-12">
            <div className="lg:w-[26rem]">
              <h3 className="mb-3 font-semibold text-stone-100">
                Über die Daten:
              </h3>
              <FooterLinkList linkList={footerLinks.report} />
            </div>
            <div className="lg:w-[8rem]">
              <h3 className="mb-3 font-semibold text-stone-100">Ergebnisse:</h3>
              <FooterLinkList linkList={footerLinks.results} />
            </div>
            <div className="mb-5 lg:mb-0 lg:w-[11rem]">
              <FooterLinkList linkList={footerLinks.formal} />
            </div>

            <FooterSocialIcons className="hidden lg:flex" />
          </div>
        </section>
      </div>
    </footer>
  )
}
