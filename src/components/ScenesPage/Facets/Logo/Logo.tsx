import React from 'react'
import LogoImage from '~/components/assets/radwegecheck-logo.svg'
import { Link } from '~/components/Link'

type Props = {
  visible: boolean
}

export const Logo: React.FC<Props> = ({ visible }) => {
  if (!visible) return null

  return (
    <Link
      to="/"
      classNameOverwrite="h-8"
      className="focus:text-yellow-900 focus:outline-none"
      title="Zur Startseite…"
    >
      <LogoImage
        className="h-8 w-auto hover:text-yellow-900 "
        alt="Radwege-Check"
      />
    </Link>
  )
}
