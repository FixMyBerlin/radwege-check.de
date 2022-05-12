import { graphql, PageProps } from 'gatsby';
import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { SceneImage } from '~/components/Scenes';

const MyData = ({
  data: { scenesPrimaryCsv: scene },
}: PageProps<Queries.Query>) => {
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
                <div className="text-xl font-light">
                  {scene.votePedestrianScore}
                </div>
                <SceneImage
                  sceneId={scene.sceneIdPedestrian}
                  alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                  className="w-full rounded"
                />
              </div>
            )}
            {!!scene.sceneIdCar && (
              <div>
                Blickwinkel einer Autofahrer:in
                <div className="text-xl font-light">{scene.voteCarScore}</div>
                <SceneImage
                  sceneId={scene.sceneIdCar}
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
      sceneId
      sceneIdCar
      sceneIdCount
      sceneIdPedestrian

      bicycleLaneSurface
      bicycleLaneUsableWidthNumber
      bicycleLaneWidth
      bicycleLaneWidthNumber
      bufferHasPhysicalProtection
      bufferLeftMarking
      bufferLeftPhysicalProtection
      bufferLeftWidth
      bufferLeftWidthNumber
      bufferRightMarking
      bufferRightWidth
      bufferRightWidthNumber
      leftOfBicycleLane
      location
      parking
      pavementHasShops
      pavementWidth
      pavementWidthNumber
      pointOfView
      vehicleLaneMaxspeed
      vehicleLaneUsage
      vehicleTrafficVolume

      vote0Unsafe
      vote1RatherUnsafe
      vote2Save
      voteCar3VerySave
      vote3VerySave
      voteCount
      voteMeans
      voteScore
      voteCar0Unsafe
      voteCar1RatherUnsafe
      voteCar2Save
      voteCarCount
      voteCarMeans
      voteCarScore
      votePedestrian0Unsafe
      votePedestrian2Save
      votePedestrian1RatherUnsafe
      votePedestrian3VerySave
      votePedestrianCount
      votePedestrianMeans
      votePedestrianScore

      path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
    }
  }
`;
