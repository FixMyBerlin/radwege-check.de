import React from 'react';
import { Helmet } from 'react-helmet';

export const FixedLayout: React.FC = ({ children }) => {
  /*
    About those Helmet `bodyAttributes`:
    - The classes prevent overscroll https://stackoverflow.com/a/24727206/729221
    - Helmet is the way to set classes in Gatsby https://stackoverflow.com/a/46405558/729221
  */
  return (
    <>
      <Helmet
        bodyAttributes={{
          class: 'lg:absolute overflow-hidden fixed',
        }}
      />
      <main className="h-screen w-screen">{children}</main>
    </>
  );
};
