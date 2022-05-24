import { graphql } from 'gatsby';
import React from 'react';
import { LayoutScenes, MetaTags } from '~/components/Layout';
import { Scenes } from '~/components/Scenes';
import { presetsScenesSecondary } from '~/components/Scenes/constants/presets.const';

const MyDataIndex = ({
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  return (
    <LayoutScenes>
      <MetaTags title="Safetycheck Prototyp" description="TODO" image="TODO" />
      <Scenes rawScenes={sceneNodes} presets={presetsScenesSecondary} />;
    </LayoutScenes>
  );
};

export default MyDataIndex;

export const query = graphql`
  query {
    allScenesSecondaryCsv(filter: { pointOfView: { eq: "bicycle" } }) {
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
