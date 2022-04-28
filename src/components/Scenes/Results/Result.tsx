import classNames from 'classnames';
import React from 'react';
import { TextLink } from '~/components/Links/TextLink';
import { aggregationTranslations } from '../constants';
import { SceneImage } from '../SceneImage/SceneImage';
import { ResultItemProps, SearchOptionProps } from '../types';

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
              height: `${parseInt(scene.vote0Unsafe as string, 10)}%`,
              backgroundColor: '#c01d1d',
            }}
            className="w-full"
          >
            {' '}
          </div>
          <div
            style={{
              height: `${parseInt(scene.vote1RatherUnsafe as string, 10)}%`,
              backgroundColor: '#f08141',
            }}
            className="w-full bg-orange-300"
          >
            {' '}
          </div>
          <div
            title={`${scene.vote2Save}`}
            style={{
              height: `${parseInt(scene.vote2Save as string, 10)}%`,
              backgroundColor: '#abc759',
            }}
            className="w-full"
          >
            {' '}
          </div>
          <div
            title={`${scene.vote3VerySave}`}
            style={{
              height: `${parseInt(scene.vote3VerySave as string, 10)}%`,
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
          <strong>{parseInt(scene.voteScore as string, 10)} %</strong>
        </div>
        <div className="flex justify-between">
          <span>{scene.vote0Unsafe}</span>{' '}
          <span className="text-neutral-300">–</span>{' '}
          <span>{scene.vote1RatherUnsafe}</span>{' '}
          <span className="text-neutral-300">–</span>
          <span>{scene.vote2Save}</span>{' '}
          <span className="text-neutral-300">–</span>{' '}
          <span>{scene.vote3VerySave}</span>
        </div>
        <div className="flex justify-between">
          <span>Mittelwert: {scene.voteMeans || '–'}</span>
          <span>Anzahl: {scene.voteCount || '–'}</span>
        </div>
      </div>
      {Object.keys(scene)
        .filter((key) => !['_id'].includes(key))
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
                {aggregationTranslations[key]?.title || key}:
              </div>

              <div className="group-hover:text-pink-900">
                {aggregationTranslations[key]?.buckets[scene[key]] ||
                  scene[key] || (
                    <span className="text-neutral-300">(todo)</span>
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
                Fußgänger:in
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
                Autofahrer:in
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
