import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

type Props = {
  to: string;
  blank?: boolean;
  external?: boolean;
} & (
  | { classNameOverwrite: string; button?: false }
  | { classNameOverwrite?: undefined; button?: boolean }
);

export const Link: React.FC<Props> = ({
  to,
  classNameOverwrite,
  blank = false,
  external = false,
  button = false,
  children,
}) => {
  const linkStyles =
    'text-emerald-500 hover:text-emerald-600 hover:underline active:underline';
  const buttonStyles =
    'inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500';
  const classes = classNameOverwrite || (button ? buttonStyles : linkStyles);

  type NewWindowProps = {
    target?: string;
    rel?: string;
  };

  const newWindowProps: NewWindowProps = {
    target: blank ? '_blank' : undefined,
    rel: external ? 'noopener noreferrer' : undefined,
  };

  if (blank) {
    return (
      <a href={to} className={classes} {...newWindowProps}>
        {children}
      </a>
    );
  }

  return (
    <GatsbyLink to={to} className={classes}>
      {children}
    </GatsbyLink>
  );
};
