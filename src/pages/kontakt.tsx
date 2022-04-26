import { PageProps } from 'gatsby';
import React from 'react';
import { LayoutArticle, MetaTags } from '~/components/Layout';

const KontaktPage: React.FC<PageProps> = ({ location }) => {
  return (
    <LayoutArticle location={location}>
      <MetaTags noindex title="Kontakt" />
      <h1>Kontakt</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate
        dolorem fuga excepturi expedita delectus neque, soluta in vitae
        perspiciatis amet provident a quaerat nemo suscipit quasi debitis
        impedit, fugiat officiis.
      </p>
    </LayoutArticle>
  );
};

export default KontaktPage;
