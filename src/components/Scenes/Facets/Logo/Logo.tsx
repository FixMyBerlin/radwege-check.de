import React from 'react';
import { Link } from '~/components/Link';

type Props = {
  visible: boolean;
};

export const Logo: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="relative flex h-14 items-center bg-yellow-50 py-1 px-3 shadow-md">
      <Link to="/" classNameOverwrite="h-8">
        <img
          className="h-full"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
          alt="Workflow"
        />
      </Link>
    </div>
  );
};
