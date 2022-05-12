/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React from 'react';
import { formatNumber } from '~/components/utils';
import { ResultItemProps } from '../../types';
import BikeIcon from './assets/bike-icon.svg';
import CarIcon from './assets/car-icon.svg';
import PedestrianIcon from './assets/pedestrian-icon.svg';
import { BarChart } from './BarChart';
import { OtherIconNumber } from './OtherIconNumber';

type Props = {
  scene: ResultItemProps;
  handleHover: (sceneId: string) => void;
};

export const ResultStackedBarchart: React.FC<Props> = ({
  scene,
  handleHover,
}) => {
  return (
    <section
      className="relative grid grid-cols-5 gap-1 border-b border-dotted text-xs"
      title="Der 'Score' ist die Summe der Bewertungen für Gut und Sehr gut."
    >
      <div className="col-span-3 flex h-full flex-none flex-col items-center justify-center">
        <div className="flex h-8 flex-none items-center justify-center">
          <BikeIcon className="mr-1.5 h-8 w-8" />
          <strong
            className="text-2xl font-semibold"
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: formatNumber(scene.voteScore, {
                precision: 0,
                unit: '&thinsp;%',
              }),
            }}
          />
        </div>
        <BarChart
          vote0Unsafe={scene.vote0Unsafe}
          vote1RatherUnsafe={scene.vote1RatherUnsafe}
          vote2Save={scene.vote2Save}
          vote3VerySave={scene.vote3VerySave}
          className="h-20"
        />
      </div>
      <div>
        {scene.sceneIdCar ? (
          <div
            // TODO Fix types
            onMouseOver={() => handleHover(scene.sceneIdCar as string)}
            onMouseOut={() => handleHover(scene.sceneId as string)}
            className="cursor-pointer"
          >
            <OtherIconNumber
              otherSceneId={scene.sceneIdCar as string}
              otherVoteScore={scene.voteCarScore as number}
              icon={<CarIcon className="h-auto w-5" />}
            />
            <BarChart
              vote0Unsafe={scene.voteCar0Unsafe}
              vote1RatherUnsafe={scene.voteCar1RatherUnsafe}
              vote2Save={scene.voteCar2Save}
              vote3VerySave={scene.voteCar3VerySave}
              className="h-20"
            />
          </div>
        ) : (
          <>
            <div className="h-8" />
            <div className="h-20 bg-gray-50" />
          </>
        )}
      </div>
      <div>
        {scene.sceneIdPedestrian ? (
          <div
            // TODO Fix types
            onMouseOver={() => handleHover(scene.sceneIdPedestrian as string)}
            onMouseOut={() => handleHover(scene.sceneId as string)}
            className="cursor-pointer"
          >
            <OtherIconNumber
              otherSceneId={scene.sceneIdPedestrian as string}
              otherVoteScore={scene.votePedestrianScore as number}
              icon={<PedestrianIcon className="h-5 w-auto" />}
            />
            <BarChart
              vote0Unsafe={scene.votePedestrian0Unsafe}
              vote1RatherUnsafe={scene.votePedestrian1RatherUnsafe}
              vote2Save={scene.votePedestrian2Save}
              vote3VerySave={scene.votePedestrian3VerySave}
              className="h-20"
            />
          </div>
        ) : (
          <>
            <div className="h-8" />
            <div className="h-20 bg-gray-50" />
          </>
        )}
      </div>
      {/* <div className="flex justify-between">
        <span>
          {formatNumber(scene.vote0Unsafe, {
            precision: 1,
            unit: '%',
          })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote1RatherUnsafe, {
            precision: 1,
            unit: '%',
          })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote2Save, { precision: 1, unit: '%' })}
        </span>
        <span className="text-neutral-300">・</span>
        <span>
          {formatNumber(scene.vote3VerySave, {
            precision: 1,
            unit: '%',
          })}
        </span>
      </div>
      <div className="flex justify-between">
        <span>Mittelwert: {scene.voteMeans || '–'}</span>
        <span>
          Anzahl: {formatNumber(scene.voteCount, { precision: 0 }) || '–'}
        </span>
      </div> */}
    </section>
  );
};
