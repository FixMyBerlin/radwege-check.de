import { graphql } from 'gatsby';
import React, { useMemo } from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { ScenePage } from '~/components/ScenePage';
import { cleanupCsvData } from '~/components/Scenes/utils';

const MyData = ({ data }) => {
  const scene = useMemo(
    () => cleanupCsvData([data.scenesSecondaryCsv])[0],
    [data]
  );

  return (
    <Layout>
      <MetaTags
        article
        title={`Szene ${scene.sceneId}`}
        description="TODO"
        image="TODO"
      />
      <ScenePage scene={scene} />
    </Layout>
  );
};

export default MyData;

export const query = graphql`
  query ($sceneId: String!) {
    scenesSecondaryCsv(sceneId: { eq: $sceneId }) {
      sceneId

      pointOfView

      path: gatsbyPath(filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}")
    }
  }
`;
