import { graphql } from 'gatsby';
import React from 'react';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { Layout } from '~/components/Layout';
import { TextLink } from '~/components/Links/TextLink';

const MyDataIndex = ({
  data: {
    allScenesJson: { edges: sceneNodes },
  },
}) => {
  console.log(sceneNodes);
  return (
    <Layout padding={false}>
      <HelmetSeo title="myData" description="TODO" image="TODO" />
      <div className="mt-60 bg-white">
        <section
          className="relative z-10 mx-auto -mt-32 max-w-7xl px-4 pb-32 sm:px-6 lg:px-8"
          aria-labelledby="contact-heading"
        >
          <h2 className="sr-only" id="contact-heading">
            All Data
          </h2>
          <ul>
            {sceneNodes.map(({ node: scene }) => (
              <li key={scene.sceneId}>
                <TextLink to={scene.path}>
                  {scene.sceneId} – {scene.title}
                </TextLink>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default MyDataIndex;

export const query = graphql`
  query {
    allScenesJson {
      edges {
        node {
          title
          vote1
          vote2
          vote3
          vote4
          voteTotal
          sceneId
          path: gatsbyPath(filePath: "/scenes/{scenesJson.sceneId}")
        }
      }
    }
  }
`;
