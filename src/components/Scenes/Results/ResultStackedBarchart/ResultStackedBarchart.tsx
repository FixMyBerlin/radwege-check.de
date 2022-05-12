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
    <section className="relative grid h-20 grid-cols-2 gap-1 border-b border-dotted text-xs">
      <div
        className="grid h-full grid-cols-2"
        title="Der 'Score' ist die Summe der Bewertungen für Gut und Sehr gut."
      >
        <div className="col-span-2 flex h-8 flex-none items-center justify-center">
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
        <div>
          <OtherIconNumber
            otherSceneId={scene.sceneIdCar as string}
            otherVoteScore={scene.voteCarScore as number}
            handleMouseOver={handleHover}
            handleMouseOut={() => handleHover(scene.sceneId as string)}
            icon={<CarIcon className="h-auto w-5" />}
          />
        </div>
        <div>
          <OtherIconNumber
            otherSceneId={scene.sceneIdPedestrian as string}
            otherVoteScore={scene.votePedestrianScore as number}
            handleMouseOver={handleHover}
            handleMouseOut={() => handleHover(scene.sceneId as string)}
            icon={<PedestrianIcon className="h-5 w-auto" />}
          />
        </div>
      </div>
      <BarChart scene={scene} />
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
