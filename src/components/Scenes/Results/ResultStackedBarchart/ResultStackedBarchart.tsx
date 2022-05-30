import classNames from 'classnames';
import React, { useCallback } from 'react';
import { formatNumber } from '~/components/utils';
import { ScenePrimaryProps, SceneSecondaryProps } from '../../types';
import BikeIcon from './assets/bike-icon.svg';
import CarIcon from './assets/car-icon.svg';
import PedestrianIcon from './assets/pedestrian-icon.svg';
import { BarChart } from './BarChart';
import { OtherIconNumberBarchart } from './OtherIconNumberBarchart';

type Props = {
  scene: ScenePrimaryProps | SceneSecondaryProps;
  handleHover?: (sceneId: string) => void;
  classNameBarchartHeight?: string;
  iconWhenEmpty?: boolean;
};

export const ResultStackedBarchart: React.FC<Props> = ({
  scene,
  handleHover,
  classNameBarchartHeight,
  iconWhenEmpty,
}) => {
  const handleHoverProps = useCallback((sceneId: string) => {
    if (!handleHover) return {};
    if (!sceneId) return {};

    return {
      handleMouseOver: () => handleHover(sceneId),
      handleMouseOut: () => handleHover(scene.sceneId),
    };
  }, []);

  return (
    <section
      className="relative grid h-full grid-cols-5 gap-1 border-b border-dotted text-xs"
      title="Der 'Score' ist die Summe der Bewertungen für Gut und Sehr gut."
    >
      <div className="col-span-3 flex h-full flex-none flex-col items-center justify-center">
        <div className="flex h-8 flex-none items-center justify-center">
          <BikeIcon className="mr-1.5 h-8 w-8" />
          <strong
            className="whitespace-nowrap text-2xl font-semibold"
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
          className={classNames(classNameBarchartHeight || 'h-20')}
        />
      </div>
      {'sceneIdPedestrian' in scene && (
        <OtherIconNumberBarchart
          sceneId={scene.sceneId}
          vote0Unsafe={scene.votePedestrian0Unsafe}
          vote1RatherUnsafe={scene.votePedestrian1RatherUnsafe}
          vote2Save={scene.votePedestrian2Save}
          vote3VerySave={scene.votePedestrian3VerySave}
          voteScore={scene.votePedestrianScore}
          {...handleHoverProps(scene.sceneIdPedestrian)}
          classNameBarchartHeight={classNameBarchartHeight}
          icon={<PedestrianIcon className="h-5 w-auto" />}
          iconWhenEmpty={iconWhenEmpty}
        />
      )}
      <OtherIconNumberBarchart
        sceneId={scene.sceneId}
        vote0Unsafe={scene.voteCar0Unsafe}
        vote1RatherUnsafe={scene.voteCar1RatherUnsafe}
        vote2Save={scene.voteCar2Save}
        vote3VerySave={scene.voteCar3VerySave}
        voteScore={scene.voteCarScore}
        {...handleHoverProps(scene.sceneIdCar)}
        classNameBarchartHeight={classNameBarchartHeight}
        icon={<CarIcon className="h-5 w-auto" />}
        iconWhenEmpty={iconWhenEmpty}
      />

      {/* <div className="flex justify-between">
        <span>Mittelwert: {scene.voteMeans || '–'}</span>
        <span>
          Anzahl: {formatNumber(scene.voteCount, { precision: 0 }) || '–'}
        </span>
      </div> */}
    </section>
  );
};
