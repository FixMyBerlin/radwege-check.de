import { graphql } from 'gatsby';
import React from 'react';
import { LayoutScenes } from '~/components/Layout';
import { Scenes } from '~/components/Scenes';
import { presetsScenesSecondary } from '~/components/Scenes/constants';
import CommingSoon from '../CommingSoon';

const MyDataIndex = ({
  location,
  data: {
    allScenesSecondaryCsv: { edges: sceneNodes },
  },
}) => {
  // TEMP Deactivate page for breta release
  return <CommingSoon />;

  return (
    <LayoutScenes>
      {/* <MetaTags> are part of <Scenes> */}
      <Scenes
        category="secondary"
        rawScenes={sceneNodes}
        presets={presetsScenesSecondary}
        pagePath={location.pathname}
      />
      ;
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

          path: gatsbyPath(
            filePath: "/nebenstrassen/{scenesSecondaryCsv.sceneId}"
          )
        }
      }
    }
  }
`;
