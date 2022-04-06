import { graphql } from 'gatsby';
import React from 'react';
import { HelmetSeo } from '~/components/Helmet/HelmetSeo';
import { Layout } from '~/components/Layout';

const MyData = ({ data: { scenesCsv: scene } }) => {
  console.table(scene);
  return (
    <Layout padding={false}>
      <HelmetSeo
        title={`Titel: ${scene.sceneId}`}
        description="TODO"
        image="TODO"
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <img
            src={`https://fmb-aws-bucket.s3.eu-central-1.amazonaws.com/KatasterKI/scenes/${scene.sceneId}.jpg`}
            alt="Illustration der bewerteten Szene."
          />
          <textarea className="mt-20 h-60 w-full">
            {JSON.stringify(scene)}
          </textarea>
        </div>
      </div>
    </Layout>
  );
};

export default MyData;

export const query = graphql`
  query ($sceneId: String!) {
    scenesCsv(sceneId: { eq: $sceneId }) {
      sceneId
      location
      pointOfView
      leftOfBicycleLane
      divideLeftWidth
      divideLeftCategory
      divideLeftStructural
      leftOfBicycleLaneWithStructuralDivide
      bicycleLaneWidth
      divideRightWidth
      divideRightCategory
      pavementWidth
      pavementHasShows
      bicycleLaneWidthUsable
      vehicleLaneUsage
      vehicleLaneMaxspeed
      bicycleLaneLanes
      bicycleLaneSurface
      divideLeftMarking
      divideRightMarking
      parkingCategory
      rightOfBicycleLane
      divideIsPhysical
      todoMotorVehicleDirection
      bicycleStreetType
      motorVehicleWidth
      motorVehicleTrafficVolumen
      vote0Unsafe
      vote1RatherUnsafe
      vote2Save
      vote3VerySave
      voteSum
      voteCount
      voteMeans
      path: gatsbyPath(filePath: "/scenes/{scenesCsv.sceneId}")
    }
  }
`;
