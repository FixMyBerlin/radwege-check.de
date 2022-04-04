import classNames from 'classnames';
import React from 'react';
import { Footer, Navigation } from '.';

type Props = {
  className?: string;
  location?: any; // TODO: define type
  padding?: boolean;
  navigation?: boolean;
};

// TODO: Maybe we need to prevent the layout from unmounting, see https://www.gatsbyjs.com/docs/how-to/routing/layout-components/#how-to-prevent-layout-components-from-unmounting
export const Layout: React.FC<Props> = ({
  className = '',
  navigation = true,
  location,
  padding = true,
  children,
}) => {
  return (
    <div className="flex h-full flex-col">
      {navigation && <Navigation location={location} />}
      <main
        className={classNames(
          className,
          { 'p-5 pt-14': padding },
          'z-0 flex-grow bg-green-50 shadow-md shadow-green-900/20'
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};
