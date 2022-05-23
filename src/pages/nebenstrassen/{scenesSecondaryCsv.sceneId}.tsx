import { graphql } from 'gatsby';
import React, { useMemo } from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { ScenePage } from '~/components/ScenePage';
import { cleanupCsvData } from '~/components/Scenes/utils';
import NotFound from '../404';

const MyData = ({ data: { scenesSecondaryCsv: rawScene } }) => {
  const scene = useMemo(() => cleanupCsvData([rawScene || {}])[0], [rawScene]);

  if (!scene) return <NotFound />;

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
    scenesSecondaryCsv(
      sceneId: { eq: $sceneId }
      pointOfView: { eq: "bicycle" }
    ) {
      sceneId

      pointOfView

      path: gatsbyPath(filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}")
    }
  }
`;
