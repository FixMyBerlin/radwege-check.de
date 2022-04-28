import classNames from 'classnames';
import React from 'react';
import { TextLink } from '~/components/Links/TextLink';
import { TranslationMissing } from '~/components/TranslationMissing/TranslationMissing';
import { aggregationTranslations } from '../constants';
import { SceneImage } from '../SceneImage/SceneImage';
import { ResultItemProps, SearchOptionProps } from '../types';
import { formatPercent } from '../utils';

export type PrevBucketValues = { [key: string]: string | number };

type Props = {
  scene: ResultItemProps;
  index: number;
  searchOptionFilters: SearchOptionProps;
};

export const Result: React.FC<Props> = ({
  scene,
  index,
  searchOptionFilters,
}) => {
  return (
    <div className="flex h-full w-80 flex-col space-y-3" key={scene.sceneId}>
      <div className="flex justify-between">
        <div>{index + 1}</div>
        <div>
          {/* todo types */}
          <TextLink to={scene.path as string}>Details</TextLink>
        </div>
      </div>
      <div className="p-0 align-middle">
        {/* todo types */}
        <SceneImage
          sceneId={scene.sceneId as string}
          className="h-40 object-cover"
        />
      </div>

      <div className="text-xs">
        <div className="flex h-40 w-full flex-col">
          <div
            title={`${scene.vote0Unsafe}`}
            style={{
              height: formatPercent({ value: scene.vote0Unsafe, unit: '%' }),
              backgroundColor: '#c01d1d',
            }}
            className="w-full"
          >
            {' '}
          </div>
          <div
            style={{
              height: formatPercent({
                value: scene.vote1RatherUnsafe,
                unit: '%',
              }),
              backgroundColor: '#f08141',
            }}
            className="w-full bg-orange-300"
          >
            {' '}
          </div>
          <div
            title={`${scene.vote2Save}`}
            style={{
              height: formatPercent({ value: scene.vote2Save, unit: '%' }),
              backgroundColor: '#abc759',
            }}
            className="w-full"
          >
            {' '}
          </div>
          <div
            title={`${scene.vote3VerySave}`}
            style={{
              height: formatPercent({ value: scene.vote3VerySave, unit: '%' }),
              backgroundColor: '#45b834',
            }}
            className="w-full"
          >
            {' '}
          </div>
        </div>
        <div
          className="text-center text-2xl font-thin"
          title="Summe der Bewertungen für Gut und Sehr gut."
        >
          <strong>
            {formatPercent({ value: scene.voteScore, precision: 0 })}
          </strong>
        </div>
        <div className="flex justify-between">
          <span>
            {formatPercent({
              value: scene.vote0Unsafe,
              precision: 1,
              unit: '%',
            })}
          </span>
          <span className="text-neutral-300"> – </span>
          <span>
            {formatPercent({
              value: scene.vote1RatherUnsafe,
              precision: 1,
              unit: '%',
            })}
          </span>
          <span className="text-neutral-300"> – </span>
          <span>
            {formatPercent({ value: scene.vote2Save, precision: 1, unit: '%' })}
          </span>
          <span className="text-neutral-300"> – </span>
          <span>
            {formatPercent({
              value: scene.vote3VerySave,
              precision: 1,
              unit: '%',
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Mittelwert: {scene.voteMeans || '–'}</span>
          <span>Anzahl: {scene.voteCount || '–'}</span>
        </div>
      </div>
      {Object.keys(scene)
        .filter((key) => !['_id', 'pointOfView', 'path'].includes(key))
        .filter((key) => !key.startsWith('vote'))
        .filter((key) => !key.startsWith('sceneId'))
        .filter((key) => !key.endsWith('WidthNumber'))
        .map((key) => {
          const bucketActive = !!searchOptionFilters[key];

          return (
            <div
              title={key}
              key={key}
              className="group relative hover:bg-neutral-100"
            >
              <div
                title={bucketActive ? 'Filter-Gruppe aktiv' : ''}
                className={classNames(
                  'text-xs group-hover:text-pink-700',
                  { 'text-neutral-300': !bucketActive },
                  { 'font-bold text-neutral-400': bucketActive }
                )}
              >
                {aggregationTranslations[key]?.title || (
                  <TranslationMissing value={key} />
                )}
                :
              </div>

              <div className="group-hover:text-pink-900">
                {aggregationTranslations[key]?.buckets[scene[key]] || (
                  <TranslationMissing value={scene[key]} />
                )}

                {key.includes('Name') && (
                  <span className="text-neutral-500">
                    {/* TODO cleanup formatting of number */}{' '}
                    {(scene[`${key.replace('Name', '')}`] as string).replace(
                      '.',
                      ','
                    )}{' '}
                    m
                  </span>
                )}
              </div>
            </div>
          );
        })}
      <div>
        <div className="text-xs text-neutral-300 group-hover:text-pink-700">
          Blickwinkel:
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div>
            {!!scene.sceneIdPedestrian && (
              <>
                Fußgänger:in{' '}
                <abbr className="text-sm font-light">
                  {formatPercent({
                    value: scene.voteScorePedestrian,
                    precision: 0,
                  })}
                </abbr>
                {/* TODO Types */}
                <SceneImage
                  sceneId={scene.sceneIdPedestrian as string}
                  alt="Illustration der bewerteten Szene aus Blickwinkel einer Fußgänger:in"
                  className="w-full rounded"
                />
              </>
            )}
          </div>
          <div>
            {!!scene.sceneIdCar && (
              <>
                Autofahrer:in{' '}
                <abbr className="text-sm font-light">
                  {formatPercent({ value: scene.voteScoreCar, precision: 0 })}
                </abbr>
                {/* TODO Types */}
                <SceneImage
                  sceneId={scene.sceneIdCar as string}
                  alt="Illustration der bewerteten Szene aus Blickwinkel einer Autofahrer:in"
                  className="w-full rounded"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
