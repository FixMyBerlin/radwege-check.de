import { PageProps } from 'gatsby';
import React from 'react';
import { Hero, Logos, Presets } from '~/components/Homepage';
import { Layout, MetaTags } from '~/components/Layout';

const IndexPage: React.FC<PageProps> = ({ location }) => {
  return (
    <Layout location={location}>
      <MetaTags
        title="Radwege-Check – Vergleiche die subjektive Sicherheit von 1.700 Radinfrastrukturen."
        sharingTitle="Vergleiche 1.700 Radinfrastrukturen. Mach den Radwege-Check."
        imagePath="/#TODO"
      />

      <Hero />
      <Presets />
      <Logos />
    </Layout>
  );
};

export default IndexPage;
