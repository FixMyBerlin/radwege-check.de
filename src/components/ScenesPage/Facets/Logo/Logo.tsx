import React from 'react'
import LogoImage from '~/components/assets/radwegecheck-logo.svg'
import { Link } from '~/components/Link'

type Props = {
  visible: boolean
}

export const Logo: React.FC<Props> = ({ visible }) => {
  if (!visible) return null

  return (
    <div className="relative flex h-14 items-center bg-brand-light-yellow py-1 px-3 shadow-md">
      <Link to="/" classNameOverwrite="h-8" title="Zur Startseite…">
        <LogoImage className="h-8 w-auto" alt="Radwege-Check" />
      </Link>
    </div>
  )
}
