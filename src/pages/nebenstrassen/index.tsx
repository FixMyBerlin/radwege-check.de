import { graphql } from 'gatsby';
import React from 'react';
import { LayoutScenes } from '~/components/Layout';
import { Scenes } from '~/components/Scenes';
import { presetsScenesSecondary } from '~/components/Scenes/constants/presets.const';

const MyDataIndex = ({
  location,
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  return (
    <LayoutScenes>
      {/* <MetaTags> are part of <Scenes> */}
      <Scenes
        rawScenes={sceneNodes}
        presets={presetsScenesSecondary}
        pageUrl={`${location.origin}${location.pathname}`}
      />
      ;
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
