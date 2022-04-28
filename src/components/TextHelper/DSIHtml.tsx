import React from 'react';

type Props = {
  children: React.ReactNode;
  as?: string;
};

export const DSIHtml: React.FC<Props> = ({ children, as }) => {
  const Tag = as || 'span';
  // return <Tag dangerouslySetInnerHTML={{ __html: children }} />;
  // TODO, das funktioniert nicht
  console.error('This component does not work, yet');
  return (
    <>
      <Tag />
      {children}
    </>
  );
};
