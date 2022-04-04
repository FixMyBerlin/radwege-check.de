import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

type Props = { currentPage: string; name: string; to: string };

export const NavigationMenuItemDesktop: React.FC<Props> = ({
  currentPage,
  name,
  to,
}) => {
  const active = currentPage === to;

  return (
    <Link
      to={to}
      className={classNames(
        { 'border-orange-500 text-slate-900': active },
        {
          'border-transparent text-slate-500 hover:border-emerald-300 hover:text-slate-700':
            !active,
        },
        'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium'
      )}
    >
      {name}
    </Link>
  );
};
