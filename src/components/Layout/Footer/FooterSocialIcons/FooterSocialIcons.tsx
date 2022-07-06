import classNames from 'classnames'
import React from 'react'
import { Link } from '~/components/Link'
import { footerSocialIcons } from './footerSocialIcons.const'

type Props = { className?: string }

export const FooterSocialIcons: React.FC<Props> = ({ className }) => {
  return (
    <div className={classNames('flex space-x-6 md:order-2', className)}>
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
