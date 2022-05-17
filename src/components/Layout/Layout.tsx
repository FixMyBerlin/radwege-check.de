import classNames from 'classnames';
import React from 'react';
import { Footer } from '.';

type Props = {
  className?: string;
  /** @description to access the current location; see links in readme. */
  location?: any; // TODO: define type
};

// TODO: Maybe we need to prevent the layout from unmounting, see https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Layout: React.FC<Props> = ({
  className,
  location: _location, // TODO later… or remove
  children,
}) => {
  return (
    <div className="flex h-full flex-col">
      <main
        className={classNames(
          className,
          'z-0 flex-grow bg-green-50 shadow-md shadow-green-900/20'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
