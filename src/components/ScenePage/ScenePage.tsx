import classNames from 'classnames';
import React from 'react';
import { SceneImage } from '../Scenes';
import { ResultCells } from '../Scenes/Results/ResultCells';
import { ResultStackedBarchart } from '../Scenes/Results/ResultStackedBarchart';
import { HauptstrasseSceneProps } from '../Scenes/types';
import { formatNumber, formatPercent } from '../utils';

type Props = { scene: HauptstrasseSceneProps };

export const ScenePage: React.FC<Props> = ({ scene }) => {
  const table = {
    'Sehr schlecht': [
      formatPercent(scene.vote0Unsafe, {}),
      formatPercent(scene.votePedestrian0Unsafe, {}),
      formatPercent(scene.voteCar0Unsafe, {}),
    ],
    Schlecht: [
      formatPercent(scene.vote1RatherUnsafe, {}),
      formatPercent(scene.votePedestrian1RatherUnsafe, {}),
      formatPercent(scene.voteCar1RatherUnsafe, {}),
    ],
    Gut: [
      formatPercent(scene.vote2Save, {}),
      formatPercent(scene.votePedestrian2Save, {}),
      formatPercent(scene.voteCar2Save, {}),
    ],
    'Sehr gut': [
      formatPercent(scene.vote3VerySave, {}),
      formatPercent(scene.votePedestrian3VerySave, {}),
      formatPercent(scene.voteCar3VerySave, {}),
    ],
    Mittelwert: [
      formatNumber(scene.voteMeans, {}),
      formatNumber(scene.votePedestrianMeans, {}),
      formatNumber(scene.voteCarMeans, {}),
    ],
    'Anzahl Antworten': [
      Math.round(scene.voteCount),
      Math.round(scene.votePedestrianCount),
      Math.round(scene.voteCarCount),
    ],
  };

  return (
    <div className="mb-6 flex h-full w-auto flex-col items-center bg-white pt-6">
      <h1 className="mb-6 w-full max-w-7xl text-2xl">
        Szene <code>{scene.sceneId}</code>
      </h1>
      <div className="grid max-w-7xl grid-cols-4 gap-6">
        <div className="rounded bg-blue-50 p-6">
          <ResultCells scene={scene} />
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
            scene={scene}
            classNameBarchartHeight="h-full"
            iconWhenEmpty
          />
          <table className="mt-1 w-full text-xxs">
            {Object.keys(table).map((key) => {
              return (
                <tr
                  key={key}
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
  );
};
