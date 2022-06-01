import React from 'react';
import { Link } from '~/components/Link';
import { footerSocialIcons } from './footerSocialIcons.const';

export const FooterSocialIcons = () => {
  return (
    <div className="flex space-x-6 md:order-2">
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
  );
};
