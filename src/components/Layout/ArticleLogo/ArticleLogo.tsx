import React from 'react';
import { Link } from '~/components/Link';

export const ArticleLogo: React.FC = () => {
  return (
    <section className="flex w-full flex-col items-center bg-gradient-to-b from-brand-light-yellow via-brand-light-yellow to-white pb-20 text-gray-700">
      <Link to="/" classNameOverwrite="">
        <img
          className="my-5 h-12 lg:my-8"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </Link>
    </section>
  );
};
