import React from 'react';
import { Link } from '~/components/Link';
import { footerMenuItemProps } from './footerLinks.const';

type Props = {
  title: string;
  linkList: footerMenuItemProps[];
  className?: string;
};

export const FooterLinks: React.FC<Props> = ({
  title,
  linkList,
  className = '',
}) => {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
        {title}
      </h3>
      <ul className="mt-4 space-y-4">
        {linkList.map((item) => (
          <li key={item.name}>
            <Link
              to={item.to}
              className="text-base text-slate-300 hover:text-white"
              external={item.external}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
