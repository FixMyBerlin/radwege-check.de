import classNames from 'classnames';
import React from 'react';

type Props = { href: string; className?: string; newWindow?: boolean };

export const ExternalLink: React.FC<Props> = ({
  href,
  children,
  className = '',
  newWindow = true,
}) => {
  const props = newWindow && {
    target: '_blank',
  };

  return (
    <a
      href={href}
      rel="noopener noreferrer"
      {...props}
      className={classNames(className, 'hover:underline active:underline')}
    >
      {children}
    </a>
  );
};
