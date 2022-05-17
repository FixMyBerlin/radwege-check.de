import { PageProps } from 'gatsby';
import React from 'react';
import { Hero, Presets } from '~/components/Homepage';
import { Layout, MetaTags } from '~/components/Layout';

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <MetaTags
        title="Radwege Check – Vergleiche Radverkehrsführungsformen nach ihrer subjektiven Sicherheit."
        description="TODO"
        image="TODO"
      />
      <Hero />
      <Presets />
    </Layout>
  );
};

export default IndexPage;
