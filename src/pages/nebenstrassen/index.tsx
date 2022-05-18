import { graphql } from 'gatsby';
import React from 'react';
import { FixedLayout, MetaTags } from '~/components/Layout';
import { Scenes } from '~/components/Scenes';

const MyDataIndex = ({
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  return (
    <FixedLayout>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />
      <Scenes rawScenes={sceneNodes} />;
    </FixedLayout>
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
