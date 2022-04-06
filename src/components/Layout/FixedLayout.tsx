import React from 'react';

export const FixedLayout: React.FC = ({ children }) => {
  return (
    <div className="flex h-screen w-screen flex-col">
      <main className="flex-grow">{children}</main>
    </div>
  );
};
