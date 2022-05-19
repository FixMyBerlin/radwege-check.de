import { graphql } from 'gatsby';
import React from 'react';
import { LayoutScenes, MetaTags } from '~/components/Layout';
import { Scenes } from '~/components/Scenes';

const MyDataIndex = ({
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  return (
    <LayoutScenes>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />
      <Scenes rawScenes={sceneNodes} />;
    </LayoutScenes>
  );
};

export default MyDataIndex;

export const query = graphql`
  query {
    allScenesSecondaryCsv {
      edges {
        node {
          sceneId

          pointOfView

          path: gatsbyPath(
            filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}"
          )
        }
      }
    }
  }
`;
