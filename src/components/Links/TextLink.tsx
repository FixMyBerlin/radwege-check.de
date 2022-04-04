import classNames from 'classnames';
import { Link } from 'gatsby';
import React from 'react';

type Props = { to: string; className?: string; newWindow?: boolean };

export const TextLink: React.FC<Props> = ({
  to,
  className = '',
  newWindow = false,
  children,
}) => {
  const styles = classNames(
    className,
    'text-emerald-500 hover:text-emerald-600 hover:underline active:underline'
  );

  if (newWindow) {
    return (
      <a href={to} className={styles} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={styles}>
      {children}
    </Link>
  );
};
