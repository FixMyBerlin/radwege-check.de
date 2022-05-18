import classNames from 'classnames';
import React from 'react';
import { SceneImage } from '../Scenes';
import { ResultCells } from '../Scenes/Results/ResultCells';
import { ResultStackedBarchart } from '../Scenes/Results/ResultStackedBarchart';
import { HauptstrasseSceneProps } from '../Scenes/types';
import { dataTable } from './dataTable';

type Props = { scene: HauptstrasseSceneProps };

export const ScenePage: React.FC<Props> = ({ scene }) => {
  const table = dataTable(scene);

  return (
    <div className="items-center bg-white p-3 lg:flex lg:flex-col lg:px-0 lg:py-6">
      <h1 className="mb-6 w-full max-w-7xl text-2xl">
        Szene <code>{scene.sceneId}</code>
      </h1>
      <div className="flex max-w-7xl flex-col gap-6 lg:grid lg:grid-cols-4">
        <div className="order-2 rounded bg-blue-50 p-6 lg:order-none">
          <ResultCells scene={scene} />
        </div>
        <div className="order-1 col-span-2 lg:order-none">
          <SceneImage
            sceneId={scene.sceneId}
            className="mb-5 h-96 w-full rounded object-cover object-bottom"
          />
          <div className="grid grid-cols-2 gap-5 text-xs lg:text-base">
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
        <div className="order-3 flex h-96 flex-col lg:order-none">
          <ResultStackedBarchart
            scene={scene}
            classNameBarchartHeight="h-full"
            iconWhenEmpty
          />
          <table className="mt-1 w-full text-xxs">
            <tbody>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
