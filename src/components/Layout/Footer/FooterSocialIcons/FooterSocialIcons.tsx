import clsx from 'clsx'
import React from 'react'
import { Link } from '~/components/Link'
import { footerSocialIcons } from './footerSocialIcons.const'

type Props = { className?: string }

export const FooterSocialIcons: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        'flex space-x-6 lg:flex-col lg:space-x-0 lg:space-y-4',
        className,
      )}
    >
      {footerSocialIcons.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          external
          blank
          classNameOverwrite="text-stone-100 hover:text-yellow-100"
        >
          <span className="sr-only">{item.name}</span>
          <item.icon className="h-6 w-6" aria-hidden="true" />
        </Link>
      ))}
    </div>
  )
}
