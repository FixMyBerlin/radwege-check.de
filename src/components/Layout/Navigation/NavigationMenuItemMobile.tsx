import { Disclosure } from '@headlessui/react';
import classNames from 'classnames';
import React from 'react';

type Props = { currentPage: string; name: string; to: string };

export const NavigationMenuItemMobile: React.FC<Props> = ({
  currentPage,
  name,
  to,
}) => {
  const active = currentPage === to;

  // TODO: Find a way to use the Gatsby <Link to={to}> component here; or onClick={navigate(to)} so we take advantage of Gatsby's internal preloading.
  return (
    <Disclosure.Button
      as="a"
      href={to}
      className={classNames(
        { 'border-indigo-500 bg-indigo-50 text-indigo-700': active },
        {
          'border-transparent text-slate-500 hover:border-gray-300 hover:bg-gray-50 hover:text-slate-700':
            !active,
        },
        'block border-l-4 py-2 pl-3 pr-4 text-base font-medium'
      )}
    >
      {name}
    </Disclosure.Button>
  );
};
