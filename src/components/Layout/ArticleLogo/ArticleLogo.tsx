import clsx from 'clsx'
import React from 'react'
import LogoColor from '~/components/assets/radwegecheck-logo-mehrfarbig.svg'
import { Link } from '~/components/Link'

type Props = { printHideHeader?: boolean }

export const ArticleLogo: React.FC<Props> = ({ printHideHeader }) => {
  return (
    <section
      className={clsx(
        'flex h-48 w-full flex-col items-center bg-gradient-to-b from-brand-light-yellow via-brand-light-yellow to-white text-gray-700 print:from-white print:via-white',
        { 'print:hidden': printHideHeader },
      )}
    >
      <Link to="/" classNameOverwrite="" title="Zur Startseite…">
        <LogoColor className="mt-6 h-16" alt="Radwege-Check" />
      </Link>
    </section>
  )
}
