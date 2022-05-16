import { PageProps } from 'gatsby';
import React from 'react';
import { LayoutArticle, MetaTags } from '~/components/Layout';

const AuswertungPage: React.FC<PageProps> = ({ location }) => {
  return (
    <LayoutArticle location={location}>
      <MetaTags article title="Auswertung" description="TODO" image="TODO" />
      <h1>Auswertung</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        dolorem fuga excepturi expedita delectus neque, soluta in vitae
        perspiciatis amet provident a quaerat nemo suscipit quasi debitis
        impedit, fugiat officiis.
      </p>
    </LayoutArticle>
  );
};

export default AuswertungPage;
