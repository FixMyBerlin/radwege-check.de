import React from 'react';

export const FixedLayout: React.FC = ({ children }) => {
  return <main className="h-screen w-screen">{children}</main>;
};
