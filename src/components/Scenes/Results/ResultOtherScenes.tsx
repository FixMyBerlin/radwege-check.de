import classnames from 'classnames';
import React from 'react';
import { formatPercent } from '~/components/utils';
import { SceneImage } from '../SceneImage/SceneImage';
import { ResultItemProps } from '../types';

type Props = { scene: ResultItemProps };

export const ResultOtherScenes: React.FC<Props> = ({ scene }) => {
  return (
    <section className="mb-4 h-24 flex-none">
      <div className="sr-only text-xs text-neutral-300 group-hover:text-pink-700">
        Blickwinkel:
      </div>
      <div className="grid h-full grid-cols-2 gap-1">
        <div
          className={classnames('relative', {
            'h-full w-full rounded bg-gray-100': !scene.sceneIdPedestrian,
          })}
        >
          {!!scene.sceneIdPedestrian && (
            <>
              <div className="absolute top-1">
                Fußgänger:in{' '}
                <abbr className="text-sm font-light">
                  {formatPercent(scene.voteScorePedestrian, {
                    precision: 0,
                  })}
                </abbr>
              </div>
              {/* TODO Types */}
              <SceneImage
                sceneId={scene.sceneIdPedestrian as string}
                alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                className="h-24 w-full rounded object-cover object-bottom"
              />
            </>
          )}
        </div>
        <div
          className={classnames('relative', {
            'rounded bg-gray-100': !scene.sceneIdCar,
          })}
        >
          {!!scene.sceneIdCar && (
            <>
              <div className="absolute top-1">
                Autofahrer:in{' '}
                <abbr className="text-sm font-light">
                  {formatPercent(scene.voteScoreCar, { precision: 0 })}
                </abbr>
              </div>
              {/* TODO Types */}
              <SceneImage
                sceneId={scene.sceneIdCar as string}
                alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                className="h-24 w-full rounded object-cover object-bottom"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};
