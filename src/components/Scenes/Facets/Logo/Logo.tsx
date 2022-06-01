import React from 'react';
import LogoIcon from '~/components/assets/radwegecheck-logo-bildmarke.svg';
import { Link } from '~/components/Link';

type Props = {
  visible: boolean;
};

export const Logo: React.FC<Props> = ({ visible }) => {
  if (!visible) return null;

  return (
    <div className="relative flex h-14 items-center bg-yellow-50 py-1 px-3 shadow-md">
      <Link to="/" classNameOverwrite="h-8">
        <LogoIcon className="h-8 w-8" alt="Radwege-Check" />
      </Link>
    </div>
  );
};
