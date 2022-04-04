import { PageProps } from 'gatsby';
import React from 'react';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { Layout } from '~/components/Layout/Layout';

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <HelmetSeo title="TODO" description="TODO" image="TODO" />
      <h1 className="text-3xl font-bold underline">Safetycheck</h1>
    </Layout>
  );
};

export default IndexPage;
