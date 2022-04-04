import React from 'react';
import { Layout } from '~/components/Layout/Layout';

type Props = {
  location?: any; // TODO: define type
};

export const LayoutArticle: React.FC<Props> = ({ location, children }) => {
  return (
    <Layout location={location}>
      <article className="prose mx-auto">{children}</article>
    </Layout>
  );
};
