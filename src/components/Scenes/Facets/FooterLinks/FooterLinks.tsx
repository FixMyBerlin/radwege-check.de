import React from 'react';
import { footerLegalLinks } from '~/components/Layout/Footer/FooterLinks/footerLinks.const';
import { Link } from '~/components/Link';

export const FooterLinks: React.FC = () => {
  return (
    <section className="mx-3 mt-10 flex gap-3 border-t border-gray-300 py-3">
      {footerLegalLinks.map((line) => (
        <Link
          key={line.name}
          className="whitespace-nowrap text-gray-500"
          to={line.to}
        >
          {line.name}
        </Link>
      ))}
    </section>
  );
};
