import classNames from 'classnames';
import { graphql } from 'gatsby';
import React from 'react';
import { Layout, MetaTags } from '~/components/Layout';
import { SceneImage } from '~/components/Scenes';
import { ResultCells } from '~/components/Scenes/Results/ResultCells';
import { ResultStackedBarchart } from '~/components/Scenes/Results/ResultStackedBarchart';
import { ResultItemProps } from '~/components/Scenes/types';

const MyData = ({ data: { scenesPrimaryCsv: scene } }) => {
  // console.table(scene);

  const table = {
    'Sehr schlecht': [
      scene.vote0Unsafe,
      scene.votePedestrian0Unsafe,
      scene.voteCar0Unsafe,
    ],
    Schlecht: [
      scene.vote1RatherUnsafe,
      scene.votePedestrian1RatherUnsafe,
      scene.voteCar1RatherUnsafe,
    ],
    Gut: [scene.vote2Save, scene.votePedestrian2Save, scene.voteCar2Save],
    'Sehr gut': [
      scene.vote3VerySave,
      scene.votePedestrian3VerySave,
      scene.voteCar3VerySave,
    ],
    Mittelwert: [
      scene.voteMeans,
      scene.votePedestrianMeans,
      scene.voteCarMeans,
    ],
    'Anzahl Antworten': [
      Math.round(scene.voteCount),
      Math.round(scene.votePedestrianCount),
      Math.round(scene.voteCarCount),
    ],
  };

  return (
    <Layout>
      <MetaTags
        article
        title={`Titel: ${scene.sceneId}`}
        description="TODO"
        image="TODO"
      />
      <div className="mb-6 flex h-full w-auto flex-col items-center bg-white pt-6">
        <h1 className="mb-6 w-full max-w-7xl text-2xl">
          Szene <code>{scene.sceneId}</code>
        </h1>
        <div className="grid max-w-7xl grid-cols-4 gap-6">
          <div className="rounded bg-blue-50 p-6">
            <ResultCells scene={scene as unknown as ResultItemProps} />
          </div>
          <div className="col-span-2">
            <SceneImage
              sceneId={scene.sceneId}
              className="mb-5 h-96 w-full rounded object-cover object-bottom"
            />
            <div className="grid grid-cols-2 gap-5">
              {scene.sceneIdPedestrian ? (
                <div>
                  Blickwinkel einer Fußgänger:in
                  <SceneImage
                    sceneId={scene.sceneIdPedestrian}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                    className="w-full rounded object-cover"
                  />
                </div>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
              {scene.sceneIdCar ? (
                <div>
                  Blickwinkel einer Autofahrer:in
                  <SceneImage
                    sceneId={scene.sceneIdCar}
                    alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                    className="w-full rounded object-cover"
                  />
                </div>
              ) : (
                <div className="rounded bg-gray-50" />
              )}
            </div>
          </div>
          <div className="flex h-96 flex-col">
            <ResultStackedBarchart
              scene={scene as unknown as ResultItemProps}
              classNameBarchartHeight="h-full"
              iconWhenEmpty
            />
            <table className="mt-1 w-full text-xxs">
              {Object.keys(table).map((key) => {
                return (
                  <tr
                    className={classNames(key === 'Mittelwert' && 'border-t')}
                  >
                    <th className="w-2/5 text-left font-semibold">{key}</th>
                    <td className="w-1/5 pr-2 text-right">
                      {table[key][0] || '-'}
                    </td>
                    <td className="w-1/5 pr-2 text-right">
                      {table[key][1] || '-'}
                    </td>
                    <td className="w-1/5 pr-2 text-right">
                      {table[key][2] || '-'}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
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
      votePedestrian1RatherUnsafe
      votePedestrian2Save
      votePedestrian3VerySave
      votePedestrianCount
      votePedestrianMeans
      votePedestrianScore

      path: gatsbyPath(filePath: "/scenes/{scenesPrimaryCsv.sceneId}")
    }
  }
`;
