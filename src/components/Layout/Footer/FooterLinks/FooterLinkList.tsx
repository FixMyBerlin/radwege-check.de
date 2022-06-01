import classNames from 'classnames'
import React from 'react'
import { Link } from '~/components/Link'
import { footerMenuItemProps } from '../const/footerLinks.const'

type Props = {
  linkList: footerMenuItemProps[]
  className?: string
}

export const FooterLinkList: React.FC<Props> = ({ linkList, className }) => {
  return (
    <ul className={classNames('space-y-3', className)}>
      {linkList.map((item) => (
        <li key={item.name}>
          <Link
            to={item.to}
            className="block text-base leading-5 text-stone-50 hover:text-white"
            external={item.external}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  )
}
