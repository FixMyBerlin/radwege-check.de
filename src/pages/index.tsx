import { PageProps } from 'gatsby';
import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <MetaTags title="TODO" description="TODO" image="TODO" />
      <h1 className="text-3xl font-bold underline">Safetycheck</h1>
    </Layout>
  );
};

export default IndexPage;
