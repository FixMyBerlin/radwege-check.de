import { graphql } from 'gatsby';
import React, { useMemo } from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { ScenePage } from '~/components/ScenePage';
import { cleanupCsvData } from '~/components/Scenes/utils';

const MyData = ({ data }) => {
  const scene = useMemo(
    () => cleanupCsvData([data.scenesPrimaryCsv])[0],
    [data]
  );

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
    scenesPrimaryCsv(
      sceneId: { eq: $sceneId }
      pointOfView: { eq: "bicycle" }
    ) {
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
      votePedestrian1RatherUnsafe
      votePedestrian2Save
      votePedestrian3VerySave
      votePedestrianCount
      votePedestrianMeans
      votePedestrianScore

      path: gatsbyPath(filePath: "/hauptstrassen/{scenesPrimaryCsv.sceneId}")
    }
  }
`;
