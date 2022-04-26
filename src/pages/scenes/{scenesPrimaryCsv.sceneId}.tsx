import { graphql } from 'gatsby';
import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { SceneImage } from '~/components/Scenes';

const MyData = ({ data: { scenesPrimaryCsv: scene } }) => {
  // console.table(scene);
  return (
    <Layout padding={false}>
      <MetaTags
        title={`Titel: ${scene.sceneId}`}
        description="TODO"
        image="TODO"
      />
      <div className="bg-white">
        <div className="mx-auto max-w-7xl py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <SceneImage sceneId={scene.sceneId} className="mb-5 w-full rounded" />
          <div className="grid grid-cols-2 gap-5">
            {!!scene.sceneIdPedestrian && (
              <div>
                Blickwinkel einer Fußgänger:in
                <SceneImage
                  sceneId={scene.sceneIdPedestrian}
                  alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                  className="w-full rounded"
                />
              </div>
            )}
            {!!scene.sceneIdVehicle && (
              <div>
                Blickwinkel einer Autofahrer:in
                <SceneImage
                  sceneId={scene.sceneIdVehicle}
                  alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                  className="w-full rounded"
                />
              </div>
            )}
          </div>
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
    scenesPrimaryCsv(sceneId: { eq: $sceneId }) {
      bicycleLaneLanes
      bicycleLaneSurface
      bicycleLaneWidth
      bicycleLaneWidthName
      bicycleLaneWidthUsable
      divideIsPhysical
      divideLeftCategory
      divideLeftMarking
      divideLeftStructural
      divideLeftWidth
      divideLeftWidthName
      divideRightCategory
      divideRightMarking
      divideRightWidth
      divideRightWidthName
      leftOfBicycleLane
      leftOfBicycleLaneWithStructuralDivide
      location
      motorVehicleTrafficVolumen
      parkingCategory
      pavementHasShops
      pavementWidth
      pavementWidthName
      pointOfView
      rightOfBicycleLane
      sceneId
      sceneIdBicycle
      sceneIdCount
      sceneIdPedestrian
      sceneIdVehicle
      vehicleLaneMaxspeed
      vehicleLaneUsage
      vote0Unsafe
      vote1RatherUnsafe
      vote2Save
      vote3VerySave
      voteCount
      voteMeans
      voteScore
      voteSum
      path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
    }
  }
`;
