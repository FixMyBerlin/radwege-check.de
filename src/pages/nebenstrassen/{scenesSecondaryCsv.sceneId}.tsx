import { graphql } from 'gatsby';
import React, { useMemo } from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { ScenePage } from '~/components/ScenePage';
import { cleanupCsvData } from '~/components/Scenes/utils';

const MyData = ({ location, data: { scenesSecondaryCsv: rawScene } }) => {
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene]);

  return (
    <Layout>
      <MetaTags
        article
        title={`Szene ${scene.sceneId}`}
        description="TODO"
        image="TODO"
      />
      <ScenePage
        category="secondary"
        scene={scene}
        pageUrl={`${location.origin}${location.pathname}`}
      />
    </Layout>
  );
};

export default MyData;

export const query = graphql`
  query ($sceneId: String!) {
    scenesSecondaryCsv(sceneId: { eq: $sceneId }) {
      sceneId

      path: gatsbyPath(filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}")
    }
  }
`;
